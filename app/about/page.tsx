import { Store, Users, Truck, Shield, Award, Globe, TrendingUp, Heart, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { label: 'Active Customers', value: '5M+', icon: Users },
    { label: 'Products Listed', value: '100K+', icon: Store },
    { label: 'Daily Orders', value: '50K+', icon: TrendingUp },
    { label: 'Seller Partners', value: '10K+', icon: Award },
  ];

  const timeline = [
    { year: '2020', title: 'Foundation', description: 'Jumian was founded with a vision to transform e-commerce in Kenya' },
    { year: '2021', title: 'Rapid Growth', description: 'Reached 1 million customers and expanded delivery network nationwide' },
    { year: '2022', title: 'Market Leader', description: 'Became the most trusted e-commerce platform in East Africa' },
    { year: '2023', title: 'Innovation', description: 'Launched Jumian Express for same-day delivery and mobile app' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded operations to neighboring countries and introduced AI shopping' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-jumia-orange/10 to-yellow-500/10 rounded-3xl -z-10" />
        <div className="text-center py-16 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-jumia-orange to-yellow-600 bg-clip-text text-transparent">
            About Jumian
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Empowering Africa through innovative e-commerce solutions that connect millions of people with the products they love
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <IconComponent className="mx-auto mb-3 text-jumia-orange" size={40} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="max-w-6xl mx-auto">
        {/* Story Section */}
        <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Jumian was born from a simple yet powerful idea: to make online shopping accessible, affordable, and enjoyable for everyone in Kenya. What started as a small startup in 2020 has grown into East Africa's most trusted e-commerce platform.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Today, we connect millions of customers with thousands of sellers, offering everything from electronics and fashion to home goods and beauty products. Our platform has processed over 10 million orders and continues to grow every day.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We're not just a marketplace – we're a community that's transforming how Africa shops, sells, and thrives in the digital economy.
            </p>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-jumia-orange to-yellow-500 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="https://placehold.co/600x600/FF6B00/white?text=JUMIAN&font=raleway"
                alt="Jumian Story"
                fill
                className="object-cover opacity-30"
              />
              <div className="relative z-10 text-white text-center p-8">
                <Globe size={80} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Transforming Africa</h3>
                <p className="mt-2">One order at a time</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Store className="mx-auto mb-4 text-jumia-orange" size={48} />
              <h3 className="font-bold mb-2">Customer First</h3>
              <p className="text-sm text-gray-600">We put our customers at the heart of everything we do</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="mx-auto mb-4 text-jumia-orange" size={48} />
              <h3 className="font-bold mb-2">Trust</h3>
              <p className="text-sm text-gray-600">Building lasting relationships through transparency and reliability</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Truck className="mx-auto mb-4 text-jumia-orange" size={48} />
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick and reliable delivery across Kenya</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="mx-auto mb-4 text-jumia-orange" size={48} />
              <h3 className="font-bold mb-2">Secure</h3>
              <p className="text-sm text-gray-600">Safe and secure payment methods for peace of mind</p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-jumia-orange to-yellow-500" />
            {timeline.map((event, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-jumia-orange font-bold text-2xl mb-2">{event.year}</div>
                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-jumia-orange rounded-full border-4 border-white shadow" />
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-jumia-orange to-yellow-500 text-white p-8 rounded-2xl">
            <Heart className="mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              To revolutionize commerce in Africa by providing a platform that empowers businesses and improves the lives of consumers through technology and innovation. We strive to make quality products accessible to everyone.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-8 rounded-2xl">
            <Globe className="mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="leading-relaxed">
              To be Africa's most trusted and innovative e-commerce platform, connecting billions of people with endless opportunities and creating lasting economic impact across the continent.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Jumian?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: CheckCircle, title: 'Authentic Products', desc: 'Wide selection of genuine products from verified sellers' },
              { icon: TrendingUp, title: 'Best Prices', desc: 'Competitive prices with regular deals and flash sales' },
              { icon: Shield, title: 'Secure Payments', desc: 'Multiple secure payment options including M-Pesa' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide delivery with express options available' },
              { icon: Heart, title: 'Customer First', desc: '24/7 support and easy returns within 14 days' },
              { icon: Award, title: 'Quality Guarantee', desc: 'Buyer protection on all purchases' },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <IconComponent className="text-jumia-orange flex-shrink-0" size={32} />
                  <div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-jumia-orange via-yellow-500 to-jumia-orange text-white p-12 rounded-3xl text-center">
          <h2 className="text-4xl font-bold mb-4">Join Millions of Happy Customers</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the best online shopping in Kenya. Discover amazing deals and enjoy seamless delivery to your doorstep.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="bg-white text-jumia-orange px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
              Start Shopping
            </Link>
            <Link href="/sell" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-jumia-orange transition-colors">
              Become a Seller
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
