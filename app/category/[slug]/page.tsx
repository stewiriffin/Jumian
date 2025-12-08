import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CategoryClient from './CategoryClient';
import { safeJsonParse } from '@/lib/json-helpers';

async function getCategoryData(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) return null;

    const products = await prisma.product.findMany({
      where: { categoryId: category.id },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    return {
      category,
      products: products.map(p => {
        const parsedImages = safeJsonParse<string[]>(p.images, []);
        const parsedSpecs = p.specifications
          ? safeJsonParse<Record<string, string>>(p.specifications, {})
          : null;

        return {
          ...p,
          images: parsedImages,
          image: parsedImages[0] || '',
          category: {
            id: p.category.id,
            name: p.category.name,
          },
          description: p.description,
          reviews: p.reviewCount,
          reviewCount: p.reviewCount,
          specifications: parsedSpecs ?? undefined,
          originalPrice: p.originalPrice ?? undefined,
          discount: p.discount ?? undefined,
        };
      }),
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:text-jumia-orange">Home</Link>
        {' / '}
        <span className="text-jumia-orange font-medium">{data.category.name}</span>
      </div>

      <CategoryClient
        category={data.category}
        initialProducts={data.products}
      />
    </div>
  );
}
