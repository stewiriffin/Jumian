import { Target, Eye, BarChart3 } from 'lucide-react';

export default function AdvertisePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Advertise With Us</h1>
      <div className="max-w-4xl">
        <p className="text-xl mb-8">Reach millions of active shoppers on Jumian</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Eye className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">High Visibility</h3>
            <p className="text-sm text-gray-600">Millions of monthly visitors</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Target className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Targeted Ads</h3>
            <p className="text-sm text-gray-600">Reach the right audience</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <BarChart3 className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Measurable Results</h3>
            <p className="text-sm text-gray-600">Track campaign performance</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Advertising Options</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Homepage banner ads</li>
            <li>Category page sponsorships</li>
            <li>Sponsored product listings</li>
            <li>Email marketing campaigns</li>
            <li>Social media promotions</li>
          </ul>
          <div className="mt-6">
            <p className="text-gray-600">Contact our advertising team: <strong>advertising@jumian.ke</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
