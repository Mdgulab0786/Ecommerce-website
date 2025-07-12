import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck, Star, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 mb-2 sm:mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-yellow-400 font-semibold text-sm sm:text-base">4.9/5</span>
                <span className="text-blue-200 text-sm sm:text-base">from 50K+ reviews</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                Shop Smart,
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Save More
                </span>
              </h1>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100 leading-relaxed">
              Discover millions of premium products at unbeatable prices. From cutting-edge electronics 
              to trendy fashion, we have everything you need with lightning-fast, free shipping.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                <span className="text-green-400 font-semibold text-sm sm:text-base">2M+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm sm:text-base">Best E-commerce 2024</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/categories"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl text-sm sm:text-base"
                >
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/categories"
                  className="border-2 border-white/50 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-sm sm:text-base"
                >
                  Browse Categories
                </Link>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
                alt="Shopping"
                className="rounded-xl sm:rounded-2xl shadow-2xl transform rotate-1 sm:rotate-2 hover:rotate-0 transition-transform duration-500 w-full"
              />
              <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-white text-gray-900 p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                    <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm sm:text-lg">100% Secure</p>
                    <p className="text-xs sm:text-sm text-gray-600">Protected Shopping</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold">50%</p>
                  <p className="text-xs sm:text-sm">OFF Today</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features bar */}
      <div className="bg-white/95 backdrop-blur-sm text-gray-900 py-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <motion.div 
              className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-blue-50 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 sm:p-4 rounded-xl shadow-lg">
                <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-lg">Free Shipping</h3>
                <p className="text-gray-600 text-xs sm:text-base">On orders over ₹500</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-green-50 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 sm:p-4 rounded-xl shadow-lg">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-lg">Secure Payment</h3>
                <p className="text-gray-600 text-xs sm:text-base">100% protected transactions</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl hover:bg-purple-50 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 sm:p-4 rounded-xl shadow-lg">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-lg">Lightning Fast</h3>
                <p className="text-gray-600 text-xs sm:text-base">Same day in select cities</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;