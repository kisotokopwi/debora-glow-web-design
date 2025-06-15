
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import WhatsAppSupport from '@/components/WhatsAppSupport';

const Footer = () => {
  const { data: settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  const instagramUrl = settings?.instagram_url || 'https://www.instagram.com/debrah_cosmetics';
  const whatsappNumber = settings?.whatsapp_number || '+255759910385';
  const supportEmail = settings?.support_email || 'support@deboracosmetics.com';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Heart className="h-7 w-7" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                Debora Cosmetics
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your trusted partner for premium cosmetics and beauty products in Tanzania. 
              We offer original products with fast delivery and excellent customer service across Dar es Salaam and beyond.
            </p>
            <div className="flex space-x-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${supportEmail}`}
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Send us an email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  Beauty Blog
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white relative">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-rose-500 to-pink-600"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 group">
                <div className="bg-rose-600 p-2 rounded-lg group-hover:bg-rose-500 transition-colors">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{whatsappNumber}</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="bg-rose-600 p-2 rounded-lg group-hover:bg-rose-500 transition-colors">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors break-all">{supportEmail}</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="bg-rose-600 p-2 rounded-lg group-hover:bg-rose-500 transition-colors">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">Dar es Salaam, Tanzania</span>
              </li>
            </ul>
            <div className="mt-6">
              <WhatsAppSupport size="sm" className="hover:scale-105 transition-transform" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Debora Cosmetics Tanzania. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
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
