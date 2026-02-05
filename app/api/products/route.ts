import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { safeJsonParse } from '@/lib/json-helpers';
import { logError } from '@/lib/logger';

interface ParsedProduct {
  id: string;
  name: string;
  slug: string | null;
  description: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  images: string[];
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stock: number;
  seller: string;
  specifications: Record<string, string> | null;
  featured: boolean;
  flashSale: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type SortByField = 'createdAt' | 'price' | 'name' | 'rating';
const VALID_SORT_FIELDS: SortByField[] = ['createdAt', 'price', 'name', 'rating'];
const VALID_ORDER_VALUES = ['asc', 'desc'] as const;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const flashSale = searchParams.get('flashSale');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStock = searchParams.get('inStock');
    const sortByParam = searchParams.get('sortBy') || 'createdAt';
    const orderParam = searchParams.get('order') || 'desc';

    const sortBy: SortByField = VALID_SORT_FIELDS.includes(sortByParam as SortByField)
      ? (sortByParam as SortByField)
      : 'createdAt';

    const order = (orderParam === 'asc' || orderParam === 'desc') ? orderParam : 'desc';

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const skip = (page - 1) * limit;

    interface ProductWhere {
      categoryId?: string;
      OR?: Array<{ name?: { contains: string; mode: 'insensitive' }; description?: { contains: string; mode: 'insensitive' } }>;
      featured?: boolean;
      flashSale?: boolean;
      price?: { gte?: number; lte?: number };
      inStock?: boolean;
    }

    const where: ProductWhere = {};

    if (category) {
      const cat = await prisma.category.findUnique({
        where: { slug: category },
      });
      if (cat) {
        where.categoryId = cat.id;
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (flashSale === 'true') {
      where.flashSale = true;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        const min = parseFloat(minPrice);
        if (!isNaN(min) && min >= 0) where.price.gte = min;
      }
      if (maxPrice) {
        const max = parseFloat(maxPrice);
        if (!isNaN(max) && max >= 0) where.price.lte = max;
      }
    }

    if (inStock === 'true') {
      where.inStock = true;
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: {
          [sortBy]: order,
        },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    const parsedProducts: ParsedProduct[] = products.map((product: any) => {
      const parsedImages = safeJsonParse<string[]>(product.images, []);
      const parsedSpecs = product.specifications
        ? safeJsonParse<Record<string, string>>(product.specifications, {})
        : null;

      return {
        ...product,
        images: parsedImages,
        image: parsedImages[0] || '',
        category: product.category.name,
        reviews: product.reviewCount,
        specifications: parsedSpecs,
      };
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    
    return NextResponse.json({
      data: parsedProducts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    logError('Failed to fetch products', error as Error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
