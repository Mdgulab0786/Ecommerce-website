import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, Zap, Truck } from 'lucide-react';
import { Product } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { motion } from 'framer-motion';
import Badge from './Badge';
import QuickView from './QuickView';

interface ProductCardProps {
  product: Product;
  className?: string;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '', onQuickView }) => {
  const { user, isAuthenticated } = useAuthStore();
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      // Redirect to auth
      return;
    }
    await addToCart(user.id, product.id);
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      // Redirect to auth
      return;
    }
    
    if (isInWishlist(product.id)) {
      await removeFromWishlist(user.id, product.id);
    } else {
      await addToWishlist(user.id, product.id);
    }
  };

  const discountPercentage = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const mainImage = product.images?.[0]?.url || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg';

  return (
    <motion.div 
      className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${className}`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Discount badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="error" size="sm" className="flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>{discountPercentage}% OFF</span>
          </Badge>
        </div>
      )}

      {/* Fast delivery badge */}
      <div className="absolute top-3 right-12 z-10">
        <Badge variant="success" size="sm" className="flex items-center space-x-1">
          <Truck className="h-3 w-3" />
          <span>Fast</span>
        </Badge>
      </div>

      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 hover:scale-110"
      >
        <Heart 
          className={`h-4 w-4 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} 
        />
      </button>

      <Link to={`/product/${product.slug}`} className="block">
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView?.(product);
                }}
                className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-lg"
              >
                <Eye className="h-4 w-4 text-gray-600" />
                <span>Quick View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="p-5">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-blue-600 font-medium mb-1 uppercase tracking-wide">{product.brand}</p>
          )}

          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2 font-medium">
              ({product.review_count})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-2 mb-3">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.toFixed(2)}
            </span>
            {product.compare_price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.compare_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock status */}
          <div className="mb-4">
            {product.track_quantity && product.quantity !== undefined ? (
              product.quantity > 0 ? (
                <Badge variant="success" size="sm">
                  {product.quantity < 10 ? `Only ${product.quantity} left` : 'In Stock'}
                </Badge>
              ) : (
                <Badge variant="error" size="sm">Out of Stock</Badge>
              )
            ) : (
              <Badge variant="success" size="sm">In Stock</Badge>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="px-5 pb-5">
        <button
          onClick={handleAddToCart}
          disabled={product.track_quantity && product.quantity === 0}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;