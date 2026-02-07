'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart-store';
import { useWishlistStore } from '@/lib/store/wishlist-store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;
    
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      seller: product.seller || 'Jumian',
      inStock: product.inStock,
    }, 1);
    
    toast.success('Added to cart!');
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        inStock: product.inStock,
      });
      toast.success('Added to wishlist!');
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 h-full flex flex-col relative group cursor-pointer">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-6 right-14 z-10 rounded-full p-2 shadow-sm transition-all cursor-pointer ${
          inWishlist
            ? 'bg-red-50 text-red-500'
            : 'bg-white text-gray-600 hover:text-red-500 opacity-100'
        }`}
      >
        <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
      </button>

      {/* Discount Badge */}
      {product.discount && product.discount > 0 && (
        <div className="absolute top-6 left-6 bg-jumia-orange text-white px-2 py-1 rounded text-xs font-bold">
          -{product.discount}%
        </div>
      )}

      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading="lazy"
            quality={75}
          />
        </div>
      </Link>

      {/* Product Info */}
      <Link href={`/product/${product.id}`}>
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 flex-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm mb-2">
            <div className="flex items-center">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviews || 0})</span>
          </div>

          {/* Price */}
          <div className="mb-2">
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="mt-2 text-xs text-red-500 font-medium">
              Out of Stock
            </div>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      {product.inStock && (
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full mt-3 py-2 bg-jumia-orange text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          <ShoppingCart size={18} />
          {isAdding ? 'Added!' : 'Add to Cart'}
        </button>
      )}
    </div>
  );
}
