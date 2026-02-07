'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { User, Mail, Calendar, Shield, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error('Please enter your password');
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to delete account');
        return;
      }

      toast.success('Account deleted successfully');
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

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

        {/* Delete Account Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 border border-red-200">
          <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <AlertTriangle size={32} />
                <h3 className="text-xl font-bold">Delete Account</h3>
              </div>
              
              <p className="text-gray-600 mb-4">
                This action is permanent and cannot be undone. This will delete:
              </p>
              <ul className="text-sm text-gray-500 mb-4 list-disc list-inside">
                <li>Your account and profile</li>
                <li>Order history</li>
                <li>Wishlist items</li>
                <li>Cart items</li>
                <li>Reviews</li>
              </ul>

              <p className="font-semibold mb-4">
                Enter your password to confirm deletion:
              </p>

              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange mb-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePassword('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || !deletePassword}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
