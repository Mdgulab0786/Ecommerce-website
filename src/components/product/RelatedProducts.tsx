import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { Product } from '../../types';

interface RelatedProductsProps {
  currentProduct: Product;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock related products - in real app, this would fetch from API
    const mockRelatedProducts: Product[] = [
      {
        id: 'related-1',
        name: 'Premium Bluetooth Speaker',
        slug: 'premium-bluetooth-speaker',
        description: 'High-quality portable speaker with deep bass',
        sku: 'BS-001',
        price: 149.99,
        compare_price: 199.99,
        track_quantity: true,
        quantity: 25,
        category_id: currentProduct.category_id,
        brand: 'SoundTech',
        tags: ['electronics', 'audio', 'portable'],
        images: [{ id: '1', product_id: 'related-1', url: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg', sort_order: 0 }],
        is_active: true,
        is_featured: false,
        rating: 4.4,
        review_count: 89,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'related-2',
        name: 'Wireless Gaming Mouse',
        slug: 'wireless-gaming-mouse',
        description: 'Precision gaming mouse with RGB lighting',
        sku: 'GM-002',
        price: 79.99,
        compare_price: 99.99,
        track_quantity: true,
        quantity: 15,
        category_id: currentProduct.category_id,
        brand: 'GameTech',
        tags: ['electronics', 'gaming', 'wireless'],
        images: [{ id: '2', product_id: 'related-2', url: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg', sort_order: 0 }],
        is_active: true,
        is_featured: false,
        rating: 4.6,
        review_count: 156,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'related-3',
        name: 'USB-C Fast Charger',
        slug: 'usb-c-fast-charger',
        description: '65W fast charging adapter with multiple ports',
        sku: 'CH-003',
        price: 39.99,
        compare_price: 59.99,
        track_quantity: true,
        quantity: 50,
        category_id: currentProduct.category_id,
        brand: 'ChargeTech',
        tags: ['electronics', 'charger', 'usb-c'],
        images: [{ id: '3', product_id: 'related-3', url: 'https://images.pexels.com/photos/4526943/pexels-photo-4526943.jpeg', sort_order: 0 }],
        is_active: true,
        is_featured: false,
        rating: 4.3,
        review_count: 203,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'related-4',
        name: 'Smartphone Stand',
        slug: 'smartphone-stand',
        description: 'Adjustable phone stand for desk and bedside',
        sku: 'PS-004',
        price: 24.99,
        compare_price: 34.99,
        track_quantity: true,
        quantity: 100,
        category_id: currentProduct.category_id,
        brand: 'StandTech',
        tags: ['electronics', 'accessories', 'stand'],
        images: [{ id: '4', product_id: 'related-4', url: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg', sort_order: 0 }],
        is_active: true,
        is_featured: false,
        rating: 4.2,
        review_count: 78,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setRelatedProducts(mockRelatedProducts);
      setIsLoading(false);
    }, 500);
  }, [currentProduct]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
              <div className="aspect-square bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Related Products</h3>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;