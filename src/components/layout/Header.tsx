import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X,
  ShoppingBag,
  LogOut,
  Settings,
  Package
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import SearchBar from '../common/SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const { totalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span>Free shipping on orders over $50</span>
              <span>•</span>
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/track-order" className="hover:underline">Track Order</Link>
              <Link to="/help" className="hover:underline">Help</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl">
                <ShoppingBag className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShopHub</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 mx-2 sm:mx-4 lg:mx-8 hidden sm:block">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 sm:p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-lg sm:rounded-xl hover:bg-blue-50"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 sm:p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-lg sm:rounded-xl hover:bg-blue-50"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User menu */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-lg sm:rounded-xl hover:bg-blue-50"
                  >
                    <User className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="hidden lg:block text-sm sm:text-base">{user?.full_name || 'Account'}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                      <Link
                        to="/account"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-lg sm:rounded-xl hover:bg-blue-50"
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="hidden lg:block text-sm sm:text-base">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="sm:hidden px-2 pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">
            <div className="hidden md:flex space-x-4 lg:space-x-8 overflow-x-auto">
              <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium">
                All Categories
              </Link>
              <Link to="/categories/electronics" className="text-gray-700 hover:text-blue-600 font-medium">
                Electronics
              </Link>
              <Link to="/categories/fashion" className="text-gray-700 hover:text-blue-600 font-medium">
                Fashion
              </Link>
              <Link to="/categories/home-garden" className="text-gray-700 hover:text-blue-600 font-medium">
                Home & Garden
              </Link>
              <Link to="/categories/sports" className="text-gray-700 hover:text-blue-600 font-medium">
                Sports
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium">
                Today's Deals
              </Link>
            </div>
            <div className="text-xs sm:text-sm">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full font-semibold animate-pulse">
                🔥 Flash Sale: Up to 70% off!
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/categories"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              All Categories
            </Link>
            <Link
              to="/categories"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Today's Deals
            </Link>
            <Link
              to="/categories/electronics"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link
              to="/categories/fashion"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Fashion
            </Link>
            <Link
              to="/categories/home-garden"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home & Garden
            </Link>
            <Link
              to="/categories/sports"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Sports
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;