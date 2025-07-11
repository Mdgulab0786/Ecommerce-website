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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShopHub</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 mx-8">
            <SearchBar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
            >
              <Heart className="h-6 w-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
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
                    className="flex items-center space-x-2 p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
                  >
                    <User className="h-6 w-6" />
                    <span className="hidden md:block">{user?.full_name || 'Account'}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
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
                  className="flex items-center space-x-2 p-3 text-gray-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block">Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-600 hover:text-blue-600 rounded-xl hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex space-x-8">
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
            <div className="text-sm">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full font-semibold animate-pulse">
                🔥 Flash Sale: Up to 70% off!
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/categories"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              All Categories
            </Link>
            <Link
              to="/deals"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Today's Deals
            </Link>
            <Link
              to="/electronics"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link
              to="/fashion"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Fashion
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;