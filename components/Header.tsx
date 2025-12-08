'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, Heart, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/store/cart-store';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-jumia-orange text-white text-center py-2 text-sm">
        <p>Free delivery on orders above KES 5,000 | Shop Now!</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-3xl font-bold">
              <span className="text-jumia-orange">JUMIAN</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands and categories..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-jumia-orange text-white px-4 py-1 rounded">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="hidden md:flex items-center gap-2 relative group">
                <User size={24} />
                <span className="text-sm">{session.user?.name}</span>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
                    My Orders
                  </Link>
                  {(session.user as any)?.role === 'admin' && (
                    <Link href="/admin" className="block px-4 py-2 hover:bg-gray-100 text-jumia-orange">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin" className="hidden md:flex items-center gap-2 hover:text-jumia-orange">
                <User size={24} />
                <span className="text-sm">Sign In</span>
              </Link>
            )}
            <Link href="/wishlist" className="hidden md:flex items-center gap-2 hover:text-jumia-orange">
              <Heart size={24} />
              <span className="text-sm">Wishlist</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-2 hover:text-jumia-orange relative">
              <ShoppingCart size={24} />
              <span className="hidden md:inline text-sm">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-jumia-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-jumia-orange text-white px-3 py-1 rounded">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {session ? (
              <>
                <Link href="/profile" className="block py-2 hover:text-jumia-orange">
                  My Profile
                </Link>
                <Link href="/orders" className="block py-2 hover:text-jumia-orange">
                  My Orders
                </Link>
                <Link href="/wishlist" className="block py-2 hover:text-jumia-orange">
                  Wishlist
                </Link>
                {(session.user as any)?.role === 'admin' && (
                  <Link href="/admin" className="block py-2 text-jumia-orange">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="block py-2 text-red-600 text-left w-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="block py-2 hover:text-jumia-orange">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="block py-2 hover:text-jumia-orange">
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/help" className="block py-2 hover:text-jumia-orange">
              Help
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
