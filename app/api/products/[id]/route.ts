import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { safeJsonParse } from '@/lib/json-helpers';
import { getCached, CACHE_KEYS, CACHE_TTL } from '@/lib/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productData = await getCached(
      CACHE_KEYS.PRODUCT(id),
      async () => {
        const product = await prisma.product.findUnique({
          where: { id },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            originalPrice: true,
            discount: true,
            images: true,
            rating: true,
            reviewCount: true,
            inStock: true,
            stock: true,
            seller: true,
            specifications: true,
            category: {
              select: { name: true }
            },
          },
        });

        if (!product) {
          return null;
        }

        // Parse JSON fields
        const parsedImages = safeJsonParse<string[]>(product.images, []);
        const parsedSpecs = product.specifications
          ? safeJsonParse<Record<string, string>>(product.specifications, {})
          : undefined;

        // Transform product data to match the expected format
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice ?? undefined,
          discount: product.discount ?? undefined,
          images: parsedImages,
          image: parsedImages[0] || '',
          category: product.category.name,
          rating: product.rating,
          reviewCount: product.reviewCount,
          inStock: product.inStock,
          stock: product.stock,
          seller: product.seller,
          specifications: parsedSpecs,
        };
      },
      CACHE_TTL.MEDIUM // 5 minutes cache
    );

    if (!productData) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(productData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
