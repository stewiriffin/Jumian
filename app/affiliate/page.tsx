import { DollarSign, Users, TrendingUp } from 'lucide-react';

export default function AffiliatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Affiliate Program</h1>
      <div className="max-w-4xl">
        <p className="text-xl mb-8">Earn money by promoting Jumian products</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <DollarSign className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Earn Commission</h3>
            <p className="text-sm text-gray-600">Up to 10% per sale</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Easy to Start</h3>
            <p className="text-sm text-gray-600">Quick sign up process</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <TrendingUp className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Track Performance</h3>
            <p className="text-sm text-gray-600">Real-time analytics</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Sign up for free affiliate account</li>
            <li>Get your unique referral links</li>
            <li>Share links on your website, blog, or social media</li>
            <li>Earn commission on every sale</li>
          </ol>
          <div className="mt-6">
            <p className="text-gray-600">Contact us: <strong>affiliates@jumian.ke</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
