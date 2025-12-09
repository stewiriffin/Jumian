import { Truck, Package, MapPin } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Truck className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">2-5 business days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Package className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over KES 5,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <MapPin className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Nationwide</h3>
            <p className="text-sm text-gray-600">Delivery across Kenya</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Delivery Times</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Nairobi & Mombasa: 1-2 business days</li>
            <li>Major Cities: 2-3 business days</li>
            <li>Other Areas: 3-5 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
