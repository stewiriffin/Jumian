'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-jumia-orange"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-jumia-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:bg-gray-300"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Mail className="mb-4 text-jumia-orange" size={32} />
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-gray-600">support@jumian.ke</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Phone className="mb-4 text-jumia-orange" size={32} />
            <h3 className="font-bold mb-2">Phone</h3>
            <p className="text-gray-600">+254 700 000 000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MapPin className="mb-4 text-jumia-orange" size={32} />
            <h3 className="font-bold mb-2">Address</h3>
            <p className="text-gray-600">Nairobi, Kenya</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="mb-4 text-jumia-orange" size={32} />
            <h3 className="font-bold mb-2">Business Hours</h3>
            <p className="text-gray-600">Mon - Fri: 8AM - 6PM</p>
            <p className="text-gray-600">Sat: 9AM - 5PM</p>
            <p className="text-gray-600">Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
