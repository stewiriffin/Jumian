'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { CreditCard, Smartphone, Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'cash'>('mpesa');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    county: '',
    town: '',
    address: '',
    notes: '',
    mpesaPhone: '',
  });

  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  }

  if (!session) {
    redirect('/auth/signin?callbackUrl=/checkout');
  }

  if (items.length === 0) {
    redirect('/cart');
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            name: item.product.name,
            image: item.product.image,
          })),
          subtotal,
          shipping,
          tax: 0,
          total,
          paymentMethod,
          shippingAddress: {
            fullName: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            address: formData.address,
            city: formData.town,
            state: formData.county,
            zipCode: '00100',
          },
          billingAddress: {
            fullName: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            address: formData.address,
            city: formData.town,
            state: formData.county,
            zipCode: '00100',
          },
        }),
      });

      if (!response.ok) {
        let errorData;
        const responseText = await response.text();

        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          throw new Error(`Server error (${response.status}): ${responseText.substring(0, 100)}`);
        }
        if (errorData.details) {
          const errorMessages = errorData.details.map((err: any) => `${err.field}: ${err.message}`).join(', ');
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw new Error(errorData.error || 'Failed to create order');
      }

      const order = await response.json();

      // Simulate M-Pesa payment
      if (paymentMethod === 'mpesa') {
        toast.success(
          `M-Pesa STK Push sent to ${formData.mpesaPhone}. Please enter your PIN.`,
          { duration: 5000 }
        );
      }

      clearCart();
      toast.success('Order placed successfully!');

      // Redirect to orders page
      setTimeout(() => {
        window.location.href = '/orders';
      }, 2000);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika',
    'Kiambu', 'Machakos', 'Kajiado', 'Nyeri', 'Meru', 'Kakamega',
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-jumia-orange hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0712345678"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  County *
                </label>
                <select
                  required
                  value={formData.county}
                  onChange={(e) =>
                    setFormData({ ...formData, county: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                >
                  <option value="">Select County</option>
                  {kenyanCounties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Town/City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.town}
                  onChange={(e) =>
                    setFormData({ ...formData, town: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Building, Street, Landmarks..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Delivery Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any special delivery instructions..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {/* M-Pesa */}
              <div
                onClick={() => setPaymentMethod('mpesa')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'mpesa'
                    ? 'border-jumia-orange bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone
                    className={
                      paymentMethod === 'mpesa'
                        ? 'text-jumia-orange'
                        : 'text-gray-400'
                    }
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">M-Pesa</h3>
                    <p className="text-sm text-gray-600">
                      Pay securely with M-Pesa STK Push
                    </p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'mpesa'}
                    onChange={() => setPaymentMethod('mpesa')}
                    className="w-5 h-5"
                  />
                </div>
                {paymentMethod === 'mpesa' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">
                      M-Pesa Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="254712345678"
                      value={formData.mpesaPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, mpesaPhone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                    />
                  </div>
                )}
              </div>

              {/* Card Payment */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-jumia-orange bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard
                    className={
                      paymentMethod === 'card'
                        ? 'text-jumia-orange'
                        : 'text-gray-400'
                    }
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">Card Payment</h3>
                    <p className="text-sm text-gray-600">
                      Visa, Mastercard, etc.
                    </p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cash')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  paymentMethod === 'cash'
                    ? 'border-jumia-orange bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2
                    className={
                      paymentMethod === 'cash'
                        ? 'text-jumia-orange'
                        : 'text-gray-400'
                    }
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">Cash on Delivery</h3>
                    <p className="text-sm text-gray-600">
                      Pay when you receive your order
                    </p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-2">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
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
              <div className="border-t pt-2 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-jumia-orange">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-6 bg-jumia-orange text-white py-4 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing an order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
