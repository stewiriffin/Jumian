'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-jumia-orange">Home</Link>
        {' / '}
        <span className="text-jumia-orange font-medium">Contact Us</span>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help! Reach out to us through any
          of the channels below or send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-jumia-orange" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">+254 712 345 678</p>
                  <p className="text-gray-600">+254 733 456 789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-jumia-orange" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">support@jumian.com</p>
                  <p className="text-gray-600">sales@jumian.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-jumia-orange" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">
                    Kimathi Street, Nairobi CBD<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="text-jumia-orange" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 5:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link href="/orders" className="block text-jumia-orange hover:underline">
                Track Your Order
              </Link>
              <Link href="/wishlist" className="block text-jumia-orange hover:underline">
                View Wishlist
              </Link>
              <Link href="/about" className="block text-jumia-orange hover:underline">
                About Us
              </Link>
              <Link href="/auth/signin" className="block text-jumia-orange hover:underline">
                My Account
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="text-jumia-orange" size={32} />
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-jumia-orange focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-jumia-orange focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-jumia-orange focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-jumia-orange focus:outline-none resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-jumia-orange text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">How do I track my order?</h3>
            <p className="text-gray-600 text-sm">
              Once your order ships, you'll receive a tracking number via email. You can also view
              your order status in the "My Orders" section of your account.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600 text-sm">
              We accept M-Pesa, Visa, Mastercard, and Cash on Delivery for your convenience.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">Do you offer free shipping?</h3>
            <p className="text-gray-600 text-sm">
              Yes! We offer free shipping on all orders over KES 5,000. Orders below this amount
              have a flat shipping fee of KES 500.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">What is your return policy?</h3>
            <p className="text-gray-600 text-sm">
              We offer a 7-day return policy for most products. Items must be unused and in
              original packaging. Contact our support team to initiate a return.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
