import Link from 'next/link';
import { ShoppingCart, Truck, Shield, Heart, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-jumia-orange">Home</Link>
        {' / '}
        <span className="text-jumia-orange font-medium">About Us</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jumia-orange to-yellow-500 rounded-lg p-8 lg:p-12 text-white mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Jumian</h1>
        <p className="text-lg lg:text-xl max-w-3xl">
          Kenya's leading online marketplace, bringing you the best products at unbeatable prices.
          Your one-stop shop for electronics, fashion, home goods, and everything in between.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4 text-gray-700">
            <p>
              Founded with a vision to revolutionize online shopping in Kenya, Jumian has grown to become
              one of the most trusted e-commerce platforms in the region. We believe that everyone deserves
              access to quality products at affordable prices, delivered right to their doorstep.
            </p>
            <p>
              Our platform connects thousands of sellers with millions of shoppers, creating a vibrant
              marketplace where quality meets convenience. From the latest smartphones to everyday essentials,
              we've got you covered.
            </p>
            <p>
              What sets us apart is our commitment to customer satisfaction, secure payments through M-Pesa
              and other trusted methods, and fast delivery across Kenya. We're not just an online store –
              we're your shopping companion.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Why Choose Jumian?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Shield className="text-jumia-orange mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong>100% Secure Payments</strong>
                  <p className="text-sm text-gray-600">M-Pesa, cards, and cash on delivery</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="text-jumia-orange mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong>Fast Delivery</strong>
                  <p className="text-sm text-gray-600">Free shipping on orders over KES 5,000</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="text-jumia-orange mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong>Quality Products</strong>
                  <p className="text-sm text-gray-600">Verified sellers and authentic products</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="text-jumia-orange mt-1 flex-shrink-0" size={20} />
                <div>
                  <strong>24/7 Support</strong>
                  <p className="text-sm text-gray-600">Always here to help you shop</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-jumia-orange" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Trust</h3>
            <p className="text-gray-600">
              Building lasting relationships through transparency and reliability
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-jumia-orange" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Constantly improving to give you the best shopping experience
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-jumia-orange" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our top priority in everything we do
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white rounded-lg p-8 lg:p-12 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Jumian by the Numbers</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-jumia-orange mb-2">10K+</div>
            <p className="text-gray-600">Products</p>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-jumia-orange mb-2">50K+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-jumia-orange mb-2">100+</div>
            <p className="text-gray-600">Verified Sellers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold text-jumia-orange mb-2">47</div>
            <p className="text-gray-600">Counties Served</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of satisfied customers and discover amazing deals today!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-jumia-orange text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
        >
          <ShoppingCart size={24} />
          Browse Products
        </Link>
      </section>
    </div>
  );
}
