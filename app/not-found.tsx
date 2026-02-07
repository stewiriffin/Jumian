'use client';

import Link from 'next/link';
import { Home, Search, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-jumia-orange mb-4">404</h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
          Don't worry, we'll help you find what you need!
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-jumia-orange text-white px-6 py-4 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          >
            <Home size={20} />
            Go Home
          </Link>

          <Link
            href="/search?q="
            className="flex items-center justify-center gap-2 bg-white border-2 border-jumia-orange text-jumia-orange px-6 py-4 rounded-lg font-bold hover:bg-orange-50 transition-colors"
          >
            <Search size={20} />
            Search Products
          </Link>

          <Link
            href="/cart"
            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg font-bold hover:border-jumia-orange transition-colors"
          >
            <ShoppingCart size={20} />
            View Cart
          </Link>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/category/electronics" className="p-4 border-2 border-gray-200 rounded-lg hover:border-jumia-orange transition-colors">
              <div className="text-3xl mb-2">📱</div>
              <p className="font-semibold text-sm">Electronics</p>
            </Link>

            <Link href="/category/fashion" className="p-4 border-2 border-gray-200 rounded-lg hover:border-jumia-orange transition-colors">
              <div className="text-3xl mb-2">👕</div>
              <p className="font-semibold text-sm">Fashion</p>
            </Link>

            <Link href="/category/home-kitchen" className="p-4 border-2 border-gray-200 rounded-lg hover:border-jumia-orange transition-colors">
              <div className="text-3xl mb-2">🏠</div>
              <p className="font-semibold text-sm">Home & Kitchen</p>
            </Link>

            <Link href="/category/beauty" className="p-4 border-2 border-gray-200 rounded-lg hover:border-jumia-orange transition-colors">
              <div className="text-3xl mb-2">💄</div>
              <p className="font-semibold text-sm">Beauty</p>
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-jumia-orange hover:underline"
        >
          <ArrowLeft size={20} />
          Go back to previous page
        </button>
      </div>
    </div>
  );
}
