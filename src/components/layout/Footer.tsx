import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter */}
      <div className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-blue-100 text-sm sm:text-base">Get the latest deals and offers delivered to your inbox</p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none text-sm sm:text-base"
              />
              <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-r-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company info */}
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                <span className="text-xl sm:text-2xl font-bold">ShopHub</span>
              </div>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                Your one-stop destination for all your shopping needs. Quality products, 
                competitive prices, and exceptional service.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm sm:text-base">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm sm:text-base">Contact Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white text-sm sm:text-base">Careers</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white text-sm sm:text-base">Press</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm sm:text-base">Blog</Link></li>
                <li><Link to="/affiliate" className="text-gray-400 hover:text-white text-sm sm:text-base">Affiliate Program</Link></li>
              </ul>
            </div>

            {/* Customer service */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-400 hover:text-white text-sm sm:text-base">Help Center</Link></li>
                <li><Link to="/track-order" className="text-gray-400 hover:text-white text-sm sm:text-base">Track Your Order</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-white text-sm sm:text-base">Returns & Exchanges</Link></li>
                <li><Link to="/shipping" className="text-gray-400 hover:text-white text-sm sm:text-base">Shipping Info</Link></li>
                <li><Link to="/size-guide" className="text-gray-400 hover:text-white text-sm sm:text-base">Size Guide</Link></li>
                <li><Link to="/warranty" className="text-gray-400 hover:text-white text-sm sm:text-base">Warranty</Link></li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <span className="text-gray-400 text-sm sm:text-base">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <span className="text-gray-400 text-sm sm:text-base">support@shophub.com</span>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mt-0.5" />
                  <span className="text-gray-400 text-sm sm:text-base">123 Commerce St, City, State 12345</span>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="font-semibold mb-2 text-sm sm:text-base">Business Hours</h5>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Mon - Fri: 9:00 AM - 8:00 PM<br />
                  Sat - Sun: 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm">
              © 2024 ShopHub. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;