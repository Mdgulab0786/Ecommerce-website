import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, SortAsc, ChevronDown } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import QuickView from '../components/common/QuickView';
import { Product, Category, SearchFilters } from '../types';
import { motion } from 'framer-motion';

const Categories: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  // Mock categories data
  const mockCategories: Category[] = [
    { id: 'electronics', name: 'Electronics', slug: 'electronics', is_active: true, sort_order: 1 },
    { id: 'fashion', name: 'Fashion', slug: 'fashion', is_active: true, sort_order: 2 },
    { id: 'home-garden', name: 'Home & Garden', slug: 'home-garden', is_active: true, sort_order: 3 },
    { id: 'sports', name: 'Sports & Fitness', slug: 'sports', is_active: true, sort_order: 4 },
    { id: 'books', name: 'Books', slug: 'books', is_active: true, sort_order: 5 },
    { id: 'automotive', name: 'Automotive', slug: 'automotive', is_active: true, sort_order: 6 },
  ];

  // Mock products data by category
  const mockProductsByCategory: Record<string, Product[]> = {
    electronics: [
      {
        id: 'elec-1', name: 'iPhone 15 Pro Max', slug: 'iphone-15-pro-max',
        description: 'Latest iPhone with A17 Pro chip and titanium design',
        sku: 'IP15PM', price: 1199.99, compare_price: 1299.99, track_quantity: true, quantity: 10,
        category_id: 'electronics', brand: 'Apple', tags: ['smartphone', 'ios'],
        images: [{ id: '1', product_id: 'elec-1', url: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg', sort_order: 0 }],
        is_active: true, is_featured: true, rating: 4.8, review_count: 245,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
      {
        id: 'elec-2', name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra',
        description: 'Premium Android smartphone with S Pen and AI features',
        sku: 'SGS24U', price: 1099.99, compare_price: 1199.99, track_quantity: true, quantity: 15,
        category_id: 'electronics', brand: 'Samsung', tags: ['smartphone', 'android'],
        images: [{ id: '2', product_id: 'elec-2', url: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg', sort_order: 0 }],
        is_active: true, is_featured: false, rating: 4.7, review_count: 189,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
      {
        id: 'elec-3', name: 'MacBook Pro 16"', slug: 'macbook-pro-16',
        description: 'Powerful laptop with M3 Pro chip for professionals',
        sku: 'MBP16', price: 2499.99, compare_price: 2699.99, track_quantity: true, quantity: 8,
        category_id: 'electronics', brand: 'Apple', tags: ['laptop', 'macbook'],
        images: [{ id: '3', product_id: 'elec-3', url: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg', sort_order: 0 }],
        is_active: true, is_featured: true, rating: 4.9, review_count: 156,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
      {
        id: 'elec-4', name: 'Sony WH-1000XM5', slug: 'sony-wh-1000xm5',
        description: 'Industry-leading noise canceling headphones',
        sku: 'SWHXM5', price: 399.99, compare_price: 449.99, track_quantity: true, quantity: 25,
        category_id: 'electronics', brand: 'Sony', tags: ['headphones', 'wireless'],
        images: [{ id: '4', product_id: 'elec-4', url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', sort_order: 0 }],
        is_active: true, is_featured: false, rating: 4.6, review_count: 312,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
    ],
    fashion: [
      {
        id: 'fash-1', name: 'Premium Cotton T-Shirt', slug: 'premium-cotton-tshirt',
        description: 'Soft and comfortable cotton t-shirt in multiple colors',
        sku: 'PCT001', price: 29.99, compare_price: 39.99, track_quantity: true, quantity: 50,
        category_id: 'fashion', brand: 'StyleCo', tags: ['tshirt', 'cotton'],
        images: [{ id: '1', product_id: 'fash-1', url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', sort_order: 0 }],
        is_active: true, is_featured: true, rating: 4.4, review_count: 89,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
      {
        id: 'fash-2', name: 'Designer Jeans', slug: 'designer-jeans',
        description: 'Premium denim jeans with perfect fit and comfort',
        sku: 'DJ001', price: 89.99, compare_price: 119.99, track_quantity: true, quantity: 30,
        category_id: 'fashion', brand: 'DenimPro', tags: ['jeans', 'denim'],
        images: [{ id: '2', product_id: 'fash-2', url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg', sort_order: 0 }],
        is_active: true, is_featured: false, rating: 4.5, review_count: 156,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
    ],
    'home-garden': [
      {
        id: 'home-1', name: 'Smart Air Purifier', slug: 'smart-air-purifier',
        description: 'HEPA filter air purifier with app control',
        sku: 'SAP001', price: 299.99, compare_price: 399.99, track_quantity: true, quantity: 20,
        category_id: 'home-garden', brand: 'AirTech', tags: ['air-purifier', 'smart'],
        images: [{ id: '1', product_id: 'home-1', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', sort_order: 0 }],
        is_active: true, is_featured: true, rating: 4.3, review_count: 78,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
    ],
    sports: [
      {
        id: 'sport-1', name: 'Professional Yoga Mat', slug: 'professional-yoga-mat',
        description: 'Non-slip yoga mat with alignment lines',
        sku: 'PYM001', price: 49.99, compare_price: 69.99, track_quantity: true, quantity: 40,
        category_id: 'sports', brand: 'YogaPro', tags: ['yoga', 'fitness'],
        images: [{ id: '1', product_id: 'sport-1', url: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg', sort_order: 0 }],
        is_active: true, is_featured: false, rating: 4.6, review_count: 134,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    setCategories(mockCategories);
    
    if (categoryId) {
      const category = mockCategories.find(cat => cat.slug === categoryId);
      setCurrentCategory(category || null);
      setProducts(mockProductsByCategory[categoryId] || []);
    } else {
      // Show all products if no category selected
      const allProducts = Object.values(mockProductsByCategory).flat();
      setProducts(allProducts);
    }
    
    setIsLoading(false);
  }, [categoryId]);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const filteredProducts = products.filter(product => {
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.inStock && (!product.quantity || product.quantity === 0)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_asc': return a.price - b.price;
      case 'price_desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default: return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md">
                  <div className="aspect-square bg-gray-300"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
              <li><Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link></li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-600">
                {currentCategory ? currentCategory.name : 'All Categories'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    <Link
                      to="/categories"
                      className={`block text-sm hover:text-blue-600 ${!categoryId ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                    >
                      All Categories
                    </Link>
                    {categories.map(category => (
                      <Link
                        key={category.id}
                        to={`/categories/${category.slug}`}
                        className={`block text-sm hover:text-blue-600 ${categoryId === category.slug ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value) || undefined})}
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value) || undefined})}
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          onChange={(e) => setFilters({...filters, rating: Number(e.target.value)})}
                          className="mr-2"
                        />
                        <span className="text-sm">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {currentCategory ? currentCategory.name : 'All Products'}
                </h1>
                <p className="text-gray-600">{sortedProducts.length} products found</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                {/* Sort */}
                <select
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                  className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Sort by</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-md w-full sm:w-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 sm:flex-none p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 sm:flex-none p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard 
                    product={product} 
                    onQuickView={handleQuickView}
                    className={viewMode === 'list' ? 'flex' : ''}
                  />
                </motion.div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </div>
  );
};

export default Categories;