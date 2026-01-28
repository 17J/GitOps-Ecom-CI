
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-showmoore-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-gold">Show</span>
              <span>moore</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your premium destination for quality fashion and accessories. Elevate your style with Showmoore.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-gold transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-gold" />
                <span className="text-gray-300">123 Fashion Avenue, Style District</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gold" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gold" />
                <span className="text-gray-300">support@showmoore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {currentYear} Showmoore. All rights reserved.</p>
          <p className="mt-2 text-sm">Designed for quality, crafted for style.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
