import { CreditCard, Smartphone, Wallet } from 'lucide-react';

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Payment Methods</h1>
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Smartphone className="mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">M-Pesa</h3>
            <p className="text-gray-600">Pay securely with M-Pesa STK Push</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CreditCard className="mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Cards</h3>
            <p className="text-gray-600">Visa, Mastercard accepted</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Wallet className="mb-4 text-jumia-orange" size={48} />
            <h3 className="font-bold mb-2">Cash on Delivery</h3>
            <p className="text-gray-600">Pay when you receive</p>
          </div>
        </div>
      </div>
    </div>
  );
}
