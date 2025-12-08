'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, Grid3x3, List } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  seller: string;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
}

interface Props {
  category: Category;
  initialProducts: Product[];
}

export default function CategoryClient({ category, initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sort products
  let sortedProducts = [...products];
  switch (sortBy) {
    case 'price-low':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      sortedProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      break;
  }

  // Filter by price
  const filteredProducts = sortedProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  return (
    <>
      {/* Category Header */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Price Range (KES)</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>KES {priceRange[0].toLocaleString()}</span>
                  <span>KES {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Rating</h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{rating} stars & above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Availability</h4>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">In Stock Only</span>
              </label>
            </div>

            {/* Discount */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Discount</h4>
              <div className="space-y-2">
                {['50% or more', '40% or more', '30% or more', '20% or more', '10% or more'].map(discount => (
                  <label key={discount} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{discount}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="bg-white rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-jumia-orange"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-jumia-orange text-white' : 'bg-gray-100'}`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-jumia-orange text-white' : 'bg-gray-100'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-600">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
