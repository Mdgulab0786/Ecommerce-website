import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import QuickView from '../common/QuickView';
import { Product } from '../../types';
import { db, isSupabaseConfigured } from '../../lib/supabase';
import { motion } from 'framer-motion';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Check if Supabase is properly configured
        if (isSupabaseConfigured()) {
          const { data, error } = await db.getProducts({ featured: true });
          if (error) throw error;
          setProducts(data?.slice(0, 8) || []);
        } else {
          // Use mock data when Supabase is not configured
          throw new Error('Supabase not configured, using mock data');
        }
      } catch (error) {
        console.log('Using mock data for featured products');
        // Mock data for demo
        setProducts([
          {
            id: '1',
            name: 'Premium Wireless Headphones',
            slug: 'premium-wireless-headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            sku: 'WH-001',
            price: 199.99,
            compare_price: 249.99,
            track_quantity: true,
            quantity: 15,
            category_id: '1',
            brand: 'AudioTech',
            tags: ['electronics', 'audio', 'wireless'],
            images: [{ id: '1', product_id: '1', url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', sort_order: 0 }],
            is_active: true,
            is_featured: true,
            rating: 4.5,
            review_count: 128,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Smart Fitness Watch',
            slug: 'smart-fitness-watch',
            description: 'Advanced fitness tracking with heart rate monitor',
            sku: 'SW-002',
            price: 299.99,
            compare_price: 399.99,
            track_quantity: true,
            quantity: 8,
            category_id: '2',
            brand: 'FitTech',
            tags: ['electronics', 'fitness', 'smartwatch'],
            images: [{ id: '2', product_id: '2', url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', sort_order: 0 }],
            is_active: true,
            is_featured: true,
            rating: 4.7,
            review_count: 89,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            name: 'Organic Cotton T-Shirt',
            slug: 'organic-cotton-tshirt',
            description: 'Comfortable organic cotton t-shirt in multiple colors',
            sku: 'TS-003',
            price: 29.99,
            compare_price: 39.99,
            track_quantity: true,
            quantity: 50,
            category_id: '3',
            brand: 'EcoWear',
            tags: ['fashion', 'organic', 'cotton'],
            images: [{ id: '3', product_id: '3', url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', sort_order: 0 }],
            is_active: true,
            is_featured: true,
            rating: 4.3,
            review_count: 156,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '4',
            name: 'Professional Camera Lens',
            slug: 'professional-camera-lens',
            description: '85mm f/1.4 portrait lens for professional photography',
            sku: 'CL-004',
            price: 899.99,
            compare_price: 1199.99,
            track_quantity: true,
            quantity: 3,
            category_id: '4',
            brand: 'LensMaster',
            tags: ['photography', 'lens', 'professional'],
            images: [{ id: '4', product_id: '4', url: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg', sort_order: 0 }],
            is_active: true,
            is_featured: true,
            rating: 4.9,
            review_count: 45,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <span className="text-blue-600 font-semibold uppercase tracking-wide">Trending Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of premium products loved by millions
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6"></div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg animate-pulse">
                <div className="aspect-square bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-blue-600 font-semibold uppercase tracking-wide">Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Handpicked selection of premium products</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mt-4"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/categories"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={handleQuickView}
            />
          ))}
        </div>
        
        <QuickView
          product={quickViewProduct}
          isOpen={isQuickViewOpen}
          onClose={closeQuickView}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;