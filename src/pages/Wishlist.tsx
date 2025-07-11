import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Wishlist: React.FC = () => {
  const { user } = useAuthStore();
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleAddToCart = async (productId: string) => {
    if (!user) return;
    await addToCart(user.id, productId);
    toast.success('Item added to cart');
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!user) return;
    await removeItem(user.id, productId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Save items you love to your wishlist and never lose track of them.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Start Shopping</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              My Wishlist
            </h1>
            <p className="text-gray-600">{items.length} items saved</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <img
                    src={item.product?.images?.[0]?.url || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'}
                    alt={item.product?.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Remove from Wishlist */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product_id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>

                  {/* Discount Badge */}
                  {item.product?.compare_price && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {Math.round(((item.product.compare_price - item.product.price) / item.product.compare_price) * 100)}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <Link
                    to={`/product/${item.product?.slug}`}
                    className="block"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                      {item.product?.name}
                    </h3>
                  </Link>

                  {/* Brand */}
                  {item.product?.brand && (
                    <p className="text-xs text-blue-600 font-medium mb-2 uppercase tracking-wide">
                      {item.product.brand}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.product?.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      ({item.product?.review_count || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.product?.price.toFixed(2)}
                    </span>
                    {item.product?.compare_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.product.compare_price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToCart(item.product_id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                    
                    <Link
                      to={`/product/${item.product?.slug}`}
                      className="block w-full text-center border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;