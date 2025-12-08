'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  seller: string;
  description: string;
  specifications?: { [key: string]: string };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 300000,
    inStockOnly: false,
    minRating: 0,
  });

  useEffect(() => {
    if (query) {
      searchProducts();
    }
  }, [query, sortBy, filters]);

  const searchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: query,
        sortBy,
        ...(filters.inStockOnly && { inStock: 'true' }),
        ...(filters.minPrice > 0 && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice < 300000 && { maxPrice: filters.maxPrice.toString() }),
      });

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Search failed');

      let data = await response.json();

      // Filter by rating on client side
      if (filters.minRating > 0) {
        data = data.filter((p: Product) => p.rating >= filters.minRating);
      }

      setProducts(data);
    } catch (error) {
      toast.error('Failed to search products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 300000,
      inStockOnly: false,
      minRating: 0,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-jumia-orange">Home</Link>
        {' / '}
        <span className="text-jumia-orange font-medium">Search Results</span>
      </div>

      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          {loading ? 'Searching...' : `${products.length} products found`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full bg-white border-2 border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} />
              <span className="font-semibold">Filters</span>
            </div>
            <span className="text-sm text-gray-600">
              {showFilters ? 'Hide' : 'Show'}
            </span>
          </button>

          {/* Filters Panel */}
          <div className={`bg-white rounded-lg p-6 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-jumia-orange hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range (KES)</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Min Price</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                    className="w-full border-2 border-gray-200 rounded-lg p-2 mt-1"
                    min="0"
                    max="300000"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Max Price</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full border-2 border-gray-200 rounded-lg p-2 mt-1"
                    min="0"
                    max="300000"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === rating}
                      onChange={() => setFilters({ ...filters, minRating: rating })}
                      className="text-jumia-orange"
                    />
                    <span className="text-sm">{rating}+ Stars</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.minRating === 0}
                    onChange={() => setFilters({ ...filters, minRating: 0 })}
                    className="text-jumia-orange"
                  />
                  <span className="text-sm">All Ratings</span>
                </label>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-semibold mb-3">Availability</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                  className="text-jumia-orange"
                />
                <span className="text-sm">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 text-sm focus:border-jumia-orange focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && products.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center">
              <Search size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No products found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <Link
                href="/"
                className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600"
              >
                Browse All Products
              </Link>
            </div>
          )}

          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
