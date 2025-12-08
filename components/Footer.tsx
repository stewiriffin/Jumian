import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-jumia-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">ABOUT JUMIAN</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-jumia-orange">About us</Link></li>
              <li><Link href="/careers" className="hover:text-jumia-orange">Careers</Link></li>
              <li><Link href="/express" className="hover:text-jumia-orange">Jumian Express</Link></li>
              <li><Link href="/terms" className="hover:text-jumia-orange">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-jumia-orange">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/help" className="hover:text-jumia-orange">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-jumia-orange">Contact Us</Link></li>
              <li><Link href="/returns" className="hover:text-jumia-orange">Return Policy</Link></li>
              <li><Link href="/shipping" className="hover:text-jumia-orange">Shipping Info</Link></li>
              <li><Link href="/payment" className="hover:text-jumia-orange">Payment Methods</Link></li>
            </ul>
          </div>

          {/* Make Money */}
          <div>
            <h3 className="font-bold text-lg mb-4">MAKE MONEY WITH US</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/sell" className="hover:text-jumia-orange">Sell on Jumian</Link></li>
              <li><Link href="/vendor" className="hover:text-jumia-orange">Become a Vendor</Link></li>
              <li><Link href="/affiliate" className="hover:text-jumia-orange">Affiliate Program</Link></li>
              <li><Link href="/advertise" className="hover:text-jumia-orange">Advertise</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">CONNECT WITH US</h3>
            <div className="flex gap-4 mb-6">
              <Link href="#" className="hover:text-jumia-orange">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-jumia-orange">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="hover:text-jumia-orange">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-jumia-orange">
                <Youtube size={24} />
              </Link>
            </div>
            <h4 className="font-semibold mb-2">PAYMENT METHODS</h4>
            <p className="text-sm text-gray-300">M-Pesa | Visa | Mastercard | PayPal</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Jumian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
