
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import WhatsAppSupport from '@/components/WhatsAppSupport';

const Footer = () => {
  const { data: settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const instagramUrl = settings?.instagram_url || 'https://www.instagram.com/debrah_cosmetics';
  const whatsappNumber = settings?.whatsapp_number || '+254759910385';
  const supportEmail = settings?.support_email || 'support@deboracosmetics.com';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-2 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">Debora Cosmetics</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Your trusted partner for premium cosmetics and beauty products in Kenya. 
              We offer original products with fast delivery and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${supportEmail}`}
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Beauty Blog
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-500" />
                <span className="text-gray-400">{whatsappNumber}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-rose-500" />
                <span className="text-gray-400">{supportEmail}</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-rose-500" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </li>
            </ul>
            <div className="mt-4">
              <WhatsAppSupport size="sm" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Debora Cosmetics. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
