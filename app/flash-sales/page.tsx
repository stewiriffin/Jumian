import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Zap, Clock } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { safeJsonParse } from '@/lib/json-helpers';

async function getFlashSaleProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        flashSale: true,
        inStock: true,
      },
      include: { category: true },
      orderBy: { discount: 'desc' },
    });

    return products.map(p => {
      const parsedImages = safeJsonParse<string[]>(p.images, []);
      const parsedSpecs = p.specifications
        ? safeJsonParse<Record<string, string>>(p.specifications, {})
        : undefined;

      return {
        ...p,
        images: parsedImages,
        image: parsedImages[0] || '',
        category: p.category.name,
        reviews: p.reviewCount,
        specifications: parsedSpecs,
        originalPrice: p.originalPrice ?? undefined,
        discount: p.discount ?? undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching flash sale products:', error);
    return [];
  }
}

export default async function FlashSalesPage() {
  const products = await getFlashSaleProducts();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-jumia-orange">Home</Link>
        {' / '}
        <span className="text-jumia-orange font-medium">Flash Sales</span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-jumia-orange to-yellow-500 rounded-lg p-8 lg:p-12 text-white mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap size={48} />
              <h1 className="text-4xl lg:text-5xl font-bold">Flash Sales</h1>
            </div>
            <p className="text-lg lg:text-xl">
              Limited time offers! Grab these amazing deals before they're gone.
            </p>
          </div>

          {/* Countdown Timer (Static for now) */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center min-w-[200px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock size={24} />
              <span className="text-sm font-semibold">ENDS IN</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="text-3xl font-bold">12</div>
                <div className="text-xs">HRS</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div>
                <div className="text-3xl font-bold">45</div>
                <div className="text-xs">MIN</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div>
                <div className="text-3xl font-bold">30</div>
                <div className="text-xs">SEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {products.length} Flash Sale Products
        </h2>
        <div className="text-sm text-gray-600">
          Save up to 29% on selected items
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-12 text-center">
          <Zap size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Flash Sales Active</h2>
          <p className="text-gray-600 mb-6">
            Check back soon for amazing deals!
          </p>
          <Link
            href="/"
            className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600"
          >
            Browse All Products
          </Link>
        </div>
      )}

      {/* Flash Sale Benefits */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 text-center shadow-md">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold text-lg mb-2">Limited Time Only</h3>
          <p className="text-sm text-gray-600">
            Deals expire fast! Don't miss out on these incredible savings.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 text-center shadow-md">
          <div className="text-4xl mb-3">💰</div>
          <h3 className="font-bold text-lg mb-2">Best Prices</h3>
          <p className="text-sm text-gray-600">
            Save up to 29% off regular prices during flash sales.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 text-center shadow-md">
          <div className="text-4xl mb-3">📦</div>
          <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
          <p className="text-sm text-gray-600">
            Enjoy free delivery on orders over KES 5,000.
          </p>
        </div>
      </div>
    </div>
  );
}
