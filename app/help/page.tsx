'use client';

import { useState } from 'react';
import { Search, Package, CreditCard, RefreshCw, HelpCircle, ShoppingCart, UserCircle, Truck, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: ShoppingCart, title: 'Orders & Tracking', link: '/help#orders', color: 'bg-blue-500' },
    { icon: Package, title: 'Shipping & Delivery', link: '/shipping', color: 'bg-green-500' },
    { icon: CreditCard, title: 'Payment Methods', link: '/payment', color: 'bg-purple-500' },
    { icon: RefreshCw, title: 'Returns & Refunds', link: '/returns', color: 'bg-orange-500' },
    { icon: UserCircle, title: 'Account & Security', link: '/help#account', color: 'bg-pink-500' },
    { icon: Shield, title: 'Safety & Privacy', link: '/privacy', color: 'bg-indigo-500' },
  ];

  const faqs = [
    {
      category: 'Orders',
      q: "How do I track my order?",
      a: "Tracking your order is easy! Simply log in to your account, go to 'My Orders' section, and click on the order you want to track. You'll see real-time tracking information including current status, estimated delivery date, and tracking number. You can also track via SMS by texting your order number to our support line."
    },
    {
      category: 'Payment',
      q: "What payment methods do you accept?",
      a: "We accept multiple payment methods for your convenience: M-Pesa (STK Push and Paybill), all major credit/debit cards (Visa, Mastercard), and Cash on Delivery for eligible orders. All online payments are secured with SSL encryption."
    },
    {
      category: 'Delivery',
      q: "How long does delivery take?",
      a: "Delivery times vary by location: Nairobi & Mombasa (1-2 business days), Major cities (2-3 business days), Other areas (3-5 business days). Jumian Express offers same-day delivery in Nairobi for orders placed before 2 PM."
    },
    {
      category: 'Orders',
      q: "Can I cancel my order?",
      a: "Yes! You can cancel your order anytime before it ships. Go to 'My Orders', select the order, and click 'Cancel Order'. If the order has already shipped, you can refuse delivery or initiate a return once you receive it. Refunds are processed within 5-7 business days."
    },
    {
      category: 'Returns',
      q: "What is your return policy?",
      a: "We offer a hassle-free 14-day return policy. Items must be unused, in original packaging with tags attached. Simply request a return through your account, pack the item securely, and ship it back using our prepaid label. Refunds are issued within 7-14 business days after we receive the item."
    },
    {
      category: 'Account',
      q: "How do I reset my password?",
      a: "Click 'Forgot Password' on the sign-in page. Enter your registered email address and we'll send you a password reset link. The link expires in 24 hours for security. If you don't receive the email, check your spam folder or contact support."
    },
    {
      category: 'Payment',
      q: "Is it safe to use my credit card on Jumian?",
      a: "Absolutely! We use industry-standard SSL encryption and PCI-DSS compliant payment gateways. We never store your full card details. All transactions are monitored for fraud, and we offer buyer protection on all purchases."
    },
    {
      category: 'Delivery',
      q: "Do you offer free shipping?",
      a: "Yes! We offer free standard shipping on all orders over KES 5,000. Orders below this amount have a flat shipping fee of KES 500. Jumian Express same-day delivery has additional charges based on distance."
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">How can we help you?</h1>
        <p className="text-xl text-gray-600 mb-8">Find answers to your questions or get in touch with our support team</p>

        {/* Search Bar */}
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles, FAQs, guides..."
            className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-jumia-orange shadow-lg"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Link
              key={index}
              href={category.link}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <IconComponent className="text-white" size={28} />
              </div>
              <h3 className="font-semibold text-sm">{category.title}</h3>
            </Link>
          );
        })}
      </div>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-jumia-orange/10 text-jumia-orange text-xs font-semibold rounded-full mb-2">
                    {faq.category}
                  </span>
                  <h3 className="font-bold text-lg">{faq.q}</h3>
                </div>
                {openFaq === index ? (
                  <ChevronUp className="text-jumia-orange flex-shrink-0 ml-4" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" size={24} />
                )}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="mx-auto mb-4 text-gray-400" size={64} />
            <p className="text-xl text-gray-600 mb-4">No results found</p>
            <p className="text-gray-500">Try different keywords or contact our support team</p>
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <div className="mt-16 bg-gradient-to-r from-jumia-orange to-yellow-500 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
        <p className="text-xl mb-8">Our customer support team is here for you 24/7</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact" className="bg-white text-jumia-orange px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Contact Support
          </Link>
          <a href="tel:+254700000000" className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-jumia-orange transition-colors">
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
}
