import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  Check,
  X
} from 'lucide-react';
import { Product, Review } from '../types';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductReviews from '../components/product/ProductReviews';
import RelatedProducts from '../components/product/RelatedProducts';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  useEffect(() => {
    if (!slug) return;

    // Mock product data - in real app, this would fetch from API
    const mockProduct: Product = {
      id: '1',
      name: 'Premium Wireless Headphones with Active Noise Cancellation',
      slug: 'premium-wireless-headphones',
      description: `Experience premium audio quality with these state-of-the-art wireless headphones. 
      Featuring advanced active noise cancellation technology, these headphones deliver crystal-clear sound 
      while blocking out unwanted ambient noise. Perfect for music lovers, professionals, and travelers.
      
      Key Features:
      • 40mm dynamic drivers for rich, detailed sound
      • Up to 30 hours of battery life with ANC on
      • Quick charge: 15 minutes for 3 hours of playback
      • Premium materials with comfortable over-ear design
      • Multi-device connectivity with seamless switching
      • Built-in microphone for crystal-clear calls`,
      short_description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
      sku: 'WH-001',
      price: 199.99,
      compare_price: 299.99,
      track_quantity: true,
      quantity: 15,
      category_id: '1',
      brand: 'AudioTech Pro',
      tags: ['electronics', 'audio', 'wireless', 'noise-cancellation'],
      images: [
        { id: '1', product_id: '1', url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', alt_text: 'Premium Wireless Headphones - Main View', sort_order: 0 },
        { id: '2', product_id: '1', url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg', alt_text: 'Premium Wireless Headphones - Side View', sort_order: 1 },
        { id: '3', product_id: '1', url: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg', alt_text: 'Premium Wireless Headphones - Detail View', sort_order: 2 },
        { id: '4', product_id: '1', url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg', alt_text: 'Premium Wireless Headphones - Lifestyle', sort_order: 3 },
      ],
      variants: [
        { id: 'v1', product_id: '1', name: 'Midnight Black', sku: 'WH-001-BLK', price: 199.99, compare_price: 299.99, quantity: 10, options: { color: 'Black' } },
        { id: 'v2', product_id: '1', name: 'Pearl White', sku: 'WH-001-WHT', price: 199.99, compare_price: 299.99, quantity: 5, options: { color: 'White' } },
        { id: 'v3', product_id: '1', name: 'Rose Gold', sku: 'WH-001-RG', price: 219.99, compare_price: 319.99, quantity: 8, options: { color: 'Rose Gold' } },
      ],
      is_active: true,
      is_featured: true,
      rating: 4.6,
      review_count: 128,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mockReviews: Review[] = [
      {
        id: '1',
        product_id: '1',
        user_id: 'user1',
        rating: 5,
        title: 'Excellent sound quality!',
        comment: 'These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is amazing.',
        is_verified_purchase: true,
        helpful_count: 15,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        user: { id: 'user1', email: 'john@example.com', full_name: 'John Smith', role: 'customer', created_at: '', updated_at: '' }
      },
      {
        id: '2',
        product_id: '1',
        user_id: 'user2',
        rating: 4,
        title: 'Great for travel',
        comment: 'Perfect for long flights. Comfortable to wear for hours and the noise cancellation really works.',
        is_verified_purchase: true,
        helpful_count: 8,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        user: { id: 'user2', email: 'sarah@example.com', full_name: 'Sarah Johnson', role: 'customer', created_at: '', updated_at: '' }
      },
    ];

    setTimeout(() => {
      setProduct(mockProduct);
      setReviews(mockReviews);
      setIsLoading(false);
    }, 500);
  }, [slug]);

  const handleAddToCart = async () => {
    if (!isAuthenticated || !user) {
      navigate('/auth');
      return;
    }
    if (!product) return;

    await addToCart(user.id, product.id, selectedVariant || undefined, quantity);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated || !user) {
      navigate('/auth');
      return;
    }
    
    await handleAddToCart();
    navigate('/checkout');
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated || !user || !product) {
      navigate('/auth');
      return;
    }
    
    if (isInWishlist(product.id)) {
      await removeFromWishlist(user.id, product.id);
    } else {
      await addToWishlist(user.id, product.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.short_description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const currentPrice = selectedVariant 
    ? product?.variants?.find(v => v.id === selectedVariant)?.price || product?.price || 0
    : product?.price || 0;

  const comparePrice = selectedVariant 
    ? product?.variants?.find(v => v.id === selectedVariant)?.compare_price
    : product?.compare_price;

  const discountPercentage = comparePrice 
    ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li><button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-700">Home</button></li>
              <li className="text-gray-400">/</li>
              <li><button onClick={() => navigate('/electronics')} className="text-blue-600 hover:text-blue-700">Electronics</button></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.short_description}</p>
            </div>

            {/* Brand */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Brand:</span>
              <span className="text-sm font-medium text-blue-600">{product.brand}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.review_count} reviews)</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{currentPrice.toFixed(2)}
                </span>
                {comparePrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{comparePrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-600 text-sm">Inclusive of all taxes</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Color:</h3>
                <div className="flex space-x-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
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
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.quantity && product.quantity > 0 ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {product.quantity < 10 ? `Only ${product.quantity} left in stock` : 'In Stock'}
                  </span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleBuyNow}
                  disabled={!product.quantity || product.quantity === 0}
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.quantity || product.quantity === 0}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleWishlistToggle}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Free Delivery</div>
                <div className="text-xs text-gray-500">On orders over ₹500</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Easy Returns</div>
                <div className="text-xs text-gray-500">30-day return policy</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium">Warranty</div>
                <div className="text-xs text-gray-500">1 year manufacturer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-12">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${product.review_count})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {product.description}
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">General</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brand</dt>
                      <dd className="font-medium">{product.brand}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Model</dt>
                      <dd className="font-medium">{product.sku}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Type</dt>
                      <dd className="font-medium">Over-ear Wireless</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Noise Cancellation</dt>
                      <dd className="font-medium">Active</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Battery Life</dt>
                      <dd className="font-medium">30 hours</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Connectivity</dt>
                      <dd className="font-medium">Bluetooth 5.0</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews 
                reviews={reviews} 
                averageRating={product.rating} 
                totalReviews={product.review_count} 
              />
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  );
};

export default ProductDetail;