import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">StyleHub</h3>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for trendy clothing. Quality fashion at
              affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products?category=Men"
                  className="text-gray-400 hover:text-white"
                >
                  Men's Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Women"
                  className="text-gray-400 hover:text-white"
                >
                  Women's Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=Kids"
                  className="text-gray-400 hover:text-white"
                >
                  Kids' Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@stylehub.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 StyleHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;