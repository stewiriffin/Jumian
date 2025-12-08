'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCartStore } from '@/lib/store/cart-store';

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  inStock: boolean;
  seller: string;
}

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (status === 'authenticated') {
      fetchWishlist();
    }
  }, [status]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist');
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/wishlist?productId=${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove item');

      setProducts(products.filter((p) => p.id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const moveToCart = (product: WishlistProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      seller: product.seller,
      inStock: product.inStock,
    });
    removeFromWishlist(product.id);
    toast.success('Moved to cart');
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin?callbackUrl=/wishlist');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="text-jumia-orange" size={32} />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Save products you love and buy them later
          </p>
          <a
            href="/"
            className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {products.length} {products.length === 1 ? 'item' : 'items'} saved
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 relative group"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-6 right-6 z-10 bg-white rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-6 left-6 bg-jumia-orange text-white px-2 py-1 rounded text-xs font-bold">
                    -{product.discount}%
                  </div>
                )}

                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>

                  {/* Product Info */}
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                  </div>
                </Link>

                {/* Actions */}
                <button
                  onClick={() => moveToCart(product)}
                  disabled={!product.inStock}
                  className="w-full bg-jumia-orange text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
