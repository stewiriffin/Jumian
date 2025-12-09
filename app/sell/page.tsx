import { TrendingUp, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function SellPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Sell on Jumian</h1>
      <div className="max-w-4xl">
        <p className="text-xl mb-8">Reach millions of customers and grow your business with Jumian</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Millions of Customers</h3>
            <p className="text-sm text-gray-600">Access to large customer base</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <TrendingUp className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Grow Your Business</h3>
            <p className="text-sm text-gray-600">Tools to scale</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <DollarSign className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Competitive Fees</h3>
            <p className="text-sm text-gray-600">Low commission rates</p>
          </div>
        </div>
        <div className="bg-jumia-orange text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Selling?</h2>
          <Link href="/vendor" className="bg-white text-jumia-orange px-6 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block">
            Become a Vendor
          </Link>
        </div>
      </div>
    </div>
  );
}
