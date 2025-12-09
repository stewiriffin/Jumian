import { Store, Package, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function VendorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Become a Vendor</h1>
      <div className="max-w-4xl">
        <p className="text-xl mb-8">Join thousands of successful sellers on Jumian</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Store className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Your Own Store</h3>
            <p className="text-sm text-gray-600">Get your branded storefront</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Package className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Easy Management</h3>
            <p className="text-sm text-gray-600">Simple inventory tools</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <BarChart className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">Track your performance</p>
          </div>
        </div>
        <div className="bg-jumia-orange text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="mb-6">Contact us at vendors@jumian.ke to get started</p>
          <Link href="/contact" className="bg-white text-jumia-orange px-6 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
