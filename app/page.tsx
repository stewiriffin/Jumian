import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { TrendingUp, Zap, Shield, Truck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { safeJsonParse } from '@/lib/json-helpers';
import { getCached, CACHE_KEYS, CACHE_TTL } from '@/lib/cache';

async function getHomePageData() {
  return getCached(
    'homepage:data',
    async () => {
      try {
        const [categories, featuredProducts, flashSaleProducts] = await Promise.all([
          prisma.category.findMany({
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true,
            },
            orderBy: { name: 'asc' },
          }),
          prisma.product.findMany({
            where: { featured: true, inStock: true },
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              originalPrice: true,
              discount: true,
              images: true,
              rating: true,
              reviewCount: true,
              inStock: true,
              stock: true,
              seller: true,
              createdAt: true,
              category: {
                select: { name: true }
              },
            },
            take: 8,
            orderBy: { createdAt: 'desc' },
          }),
          prisma.product.findMany({
            where: { flashSale: true, inStock: true },
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              originalPrice: true,
              discount: true,
              images: true,
              rating: true,
              reviewCount: true,
              inStock: true,
              stock: true,
              seller: true,
              category: {
                select: { name: true }
              },
            },
            take: 6,
            orderBy: { discount: 'desc' },
          }),
        ]);

        return {
          categories,
          featuredProducts: featuredProducts.map(p => {
            const parsedImages = safeJsonParse<string[]>(p.images, []);
            return {
              ...p,
              images: parsedImages,
              image: parsedImages[0] || '',
              category: p.category.name,
              reviews: p.reviewCount,
              originalPrice: p.originalPrice ?? undefined,
              discount: p.discount ?? undefined,
            };
          }),
          flashSaleProducts: flashSaleProducts.map(p => {
            const parsedImages = safeJsonParse<string[]>(p.images, []);
            return {
              ...p,
              images: parsedImages,
              image: parsedImages[0] || '',
              category: p.category.name,
              reviews: p.reviewCount,
              originalPrice: p.originalPrice ?? undefined,
              discount: p.discount ?? undefined,
            };
          }),
        };
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        return { categories: [], featuredProducts: [], flashSaleProducts: [] };
      }
    },
    CACHE_TTL.MEDIUM // 5 minutes cache
  );
}

// Revalidate every 5 minutes
export const revalidate = 300;

export default async function Home() {
  const { categories, featuredProducts, flashSaleProducts } = await getHomePageData();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden bg-gradient-to-r from-jumia-orange to-yellow-500">
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 lg:p-12 text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Shop Smart,<br />Live Better
              </h1>
              <p className="text-lg mb-6 max-w-md">
                Discover amazing deals on electronics, fashion, home goods and more
              </p>
              <Link
                href="/category/electronics"
                className="bg-white text-jumia-orange px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20">
              <Image
                src="https://placehold.co/800x800/FF6B00/white?text=IAN&font=raleway"
                alt="Shopping"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Side Banners */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <Link href="/category/electronics" className="relative h-[145px] lg:h-[192px] rounded-lg overflow-hidden bg-blue-500 group">
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
              <h3 className="text-xl font-bold mb-2">Electronics</h3>
              <p className="text-sm">Up to 40% OFF</p>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
          <Link href="/category/fashion" className="relative h-[145px] lg:h-[192px] rounded-lg overflow-hidden bg-pink-500 group">
            <div className="absolute inset-0 p-6 flex flex-col justify-center text-white">
              <h3 className="text-xl font-bold mb-2">Fashion</h3>
              <p className="text-sm">New Arrivals</p>
            </div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-white p-6 rounded-lg text-center">
          <Truck className="mx-auto mb-3 text-jumia-orange" size={32} />
          <h3 className="font-bold mb-1">Free Delivery</h3>
          <p className="text-sm text-gray-600">On orders over $50</p>
        </div>
        <div className="bg-white p-6 rounded-lg text-center">
          <Shield className="mx-auto mb-3 text-jumia-orange" size={32} />
          <h3 className="font-bold mb-1">Secure Payment</h3>
          <p className="text-sm text-gray-600">100% protected</p>
        </div>
        <div className="bg-white p-6 rounded-lg text-center">
          <Zap className="mx-auto mb-3 text-jumia-orange" size={32} />
          <h3 className="font-bold mb-1">Flash Sales</h3>
          <p className="text-sm text-gray-600">Daily deals</p>
        </div>
        <div className="bg-white p-6 rounded-lg text-center">
          <TrendingUp className="mx-auto mb-3 text-jumia-orange" size={32} />
          <h3 className="font-bold mb-1">Best Prices</h3>
          <p className="text-sm text-gray-600">Guaranteed</p>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-sm font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sales */}
      {flashSaleProducts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Zap className="text-jumia-orange" size={28} />
              <h2 className="text-2xl font-bold">Flash Sales</h2>
            </div>
            <Link href="/flash-sales" className="text-jumia-orange hover:underline font-medium">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-jumia-orange hover:underline font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bottom Banner - Delivery Info */}
      <div className="relative h-[200px] rounded-lg overflow-hidden bg-gradient-to-r from-jumia-orange to-yellow-500 mb-8">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Fast & Reliable Delivery</h2>
          <p className="text-lg mb-6">Get your orders delivered to your doorstep across Kenya</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">FREE</p>
              <p className="text-sm">Shipping over KES 5,000</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">24-48hrs</p>
              <p className="text-sm">Delivery in major cities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm">Secure payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
