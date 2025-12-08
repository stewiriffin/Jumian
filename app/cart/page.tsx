'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Sample promo codes (in production, validate with backend)
  const validatePromoCode = (code: string) => {
    const promoCodes: Record<string, number> = {
      'SAVE10': 10, // 10% off
      'SAVE20': 20, // 20% off
      'JUMIA50': 50, // 50 KES off
    };

    const discount = promoCodes[code.toUpperCase()];
    if (discount) {
      setPromoDiscount(discount);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoDiscount(0);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 5000 ? 0 : 500; // Free shipping over KES 5,000

  // Calculate discount (percentage-based for codes > 50, flat rate otherwise)
  const discountAmount = promoDiscount > 50
    ? promoDiscount // Flat discount
    : (subtotal * promoDiscount) / 100; // Percentage discount

  const total = subtotal + shipping - discountAmount;

  // Check if any items are out of stock
  const hasOutOfStock = items.some(item => !item.product.inStock);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg p-12 text-center max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Start shopping to add items to your cart
          </p>
          <Link
            href="/"
            className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg p-4 flex gap-4 relative">
              {!item.product.inStock && (
                <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-1 text-sm font-semibold rounded-t-lg">
                  Out of Stock
                </div>
              )}

              {/* Product Image */}
              <Link href={`/product/${item.product.id}`} className={`relative w-24 h-24 flex-shrink-0 ${!item.product.inStock ? 'mt-8' : ''}`}>
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className={`object-contain ${!item.product.inStock ? 'opacity-50' : ''}`}
                />
              </Link>

              {/* Product Info */}
              <div className={`flex-1 ${!item.product.inStock ? 'mt-8' : ''}`}>
                <Link
                  href={`/product/${item.product.id}`}
                  className="font-semibold hover:text-jumia-orange line-clamp-2 mb-2"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-600 mb-2">
                  Seller: {item.product.seller}
                </p>

                {!item.product.inStock && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mb-2">
                    <AlertCircle size={16} />
                    <span>This item is currently unavailable</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!item.product.inStock}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-1 border-x-2 border-gray-300 font-bold min-w-[60px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!item.product.inStock}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-xl font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                    {item.product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(item.product.originalPrice * item.quantity)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.product.id)}
                className={`text-red-500 hover:text-red-700 ${!item.product.inStock ? 'mt-8' : ''}`}
                aria-label={`Remove ${item.product.name} from cart`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({promoCode})</span>
                  <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-800">
                    Add {formatPrice(5000 - subtotal)} more to get free delivery!
                  </p>
                </div>
              )}

              {hasOutOfStock && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">
                    Some items in your cart are out of stock. Please remove them to proceed.
                  </p>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-jumia-orange">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className={`w-full py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 mb-4 ${
                hasOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                  : 'bg-jumia-orange text-white hover:bg-orange-600'
              }`}
              aria-disabled={hasOutOfStock}
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </Link>

            <Link
              href="/"
              className="block text-center text-jumia-orange hover:underline"
            >
              Continue Shopping
            </Link>

            {/* Promo Code */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">Have a promo code?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-jumia-orange"
                  aria-label="Promo code"
                />
                <button
                  onClick={() => validatePromoCode(promoCode)}
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!promoCode}
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-red-600 text-sm mt-2">{promoError}</p>
              )}
              {promoDiscount > 0 && !promoError && (
                <p className="text-green-600 text-sm mt-2">✓ Promo code applied!</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Try: SAVE10, SAVE20, or JUMIA50
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping Banner */}
      <div className="mt-12 bg-white rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold mb-2">Need something else?</h3>
        <p className="text-gray-600 mb-4">Continue shopping and discover more amazing products</p>
        <Link
          href="/"
          className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
