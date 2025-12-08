import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Star, Heart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 h-full flex flex-col relative group">
        {/* Wishlist Button */}
        <button className="absolute top-6 right-6 z-10 bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={18} className="text-gray-600 hover:text-red-500" />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-6 left-6 bg-jumia-orange text-white px-2 py-1 rounded text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Product Image */}
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 flex-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-2">
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm">
            <div className="flex items-center">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviews})</span>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="mt-2 text-xs text-red-500 font-medium">
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
