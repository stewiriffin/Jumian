'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { User, Mail, Calendar, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin?callbackUrl=/profile');
  }

  const user = session.user as any;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-jumia-orange rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <User className="text-jumia-orange mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Full Name</h3>
                <p className="text-gray-600">{user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-jumia-orange mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Email Address</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="text-jumia-orange mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Account Role</h3>
                <p className="text-gray-600 capitalize">{user.role || 'User'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-jumia-orange mt-1" size={20} />
              <div>
                <h3 className="font-semibold mb-1">Member Since</h3>
                <p className="text-gray-600">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/orders"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-jumia-orange transition-colors"
            >
              <h3 className="font-semibold mb-1">My Orders</h3>
              <p className="text-sm text-gray-600">View order history and track shipments</p>
            </a>
            <a
              href="/wishlist"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-jumia-orange transition-colors"
            >
              <h3 className="font-semibold mb-1">Wishlist</h3>
              <p className="text-sm text-gray-600">View saved products</p>
            </a>
            <a
              href="/cart"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-jumia-orange transition-colors"
            >
              <h3 className="font-semibold mb-1">Shopping Cart</h3>
              <p className="text-sm text-gray-600">View items in your cart</p>
            </a>
            {user.role === 'admin' && (
              <a
                href="/admin"
                className="p-4 border-2 border-jumia-orange bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <h3 className="font-semibold mb-1 text-jumia-orange">Admin Dashboard</h3>
                <p className="text-sm text-gray-600">Manage products and orders</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
