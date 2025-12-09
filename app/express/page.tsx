import { Zap, Clock, Shield } from 'lucide-react';

export default function ExpressPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Jumian Express</h1>
      <div className="max-w-4xl">
        <p className="text-xl mb-8">Get your orders delivered faster with Jumian Express - same day delivery in Nairobi!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Zap className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Same Day Delivery</h3>
            <p className="text-sm text-gray-600">Order before 2PM</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Real-time Tracking</h3>
            <p className="text-sm text-gray-600">Track your order live</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Safe & Secure</h3>
            <p className="text-sm text-gray-600">Professional delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
