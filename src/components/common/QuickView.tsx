import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import Modal from './Modal';
import Badge from './Badge';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuthStore();
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!isAuthenticated || !user) return;
    await addToCart(user.id, product.id, selectedVariant || undefined, quantity);
    onClose();
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated || !user) return;
    await addToWishlist(user.id, product.id);
  };

  const discountPercentage = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.images?.[0]?.url || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-gray-600 mt-1">{product.short_description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.review_count} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
            {product.compare_price && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.compare_price.toFixed(2)}
                </span>
                <Badge variant="error" size="sm">{discountPercentage}% OFF</Badge>
              </>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Color:</h4>
              <div className="flex space-x-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedVariant === variant.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {variant.options.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Quantity:</h4>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 border border-gray-300 rounded min-w-[50px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div>
            {product.quantity && product.quantity > 0 ? (
              <Badge variant="success" size="sm">
                {product.quantity < 10 ? `Only ${product.quantity} left` : 'In Stock'}
              </Badge>
            ) : (
              <Badge variant="error" size="sm">Out of Stock</Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.quantity || product.quantity === 0}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
            
            <button
              onClick={handleWishlistToggle}
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickView;