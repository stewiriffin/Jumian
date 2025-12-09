import { Package, Clock, CheckCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Return Policy</h1>
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">14 Days</h3>
            <p className="text-sm text-gray-600">Return within 14 days</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Package className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Original Condition</h3>
            <p className="text-sm text-gray-600">Items must be unused</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <CheckCircle className="mx-auto mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Easy Process</h3>
            <p className="text-sm text-gray-600">Simple online returns</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">How to Return</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Go to My Orders and select the item</li>
            <li>Click Return and select a reason</li>
            <li>Pack the item securely</li>
            <li>Ship it back or schedule pickup</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
