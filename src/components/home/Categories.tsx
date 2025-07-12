import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Laptop, 
  Shirt, 
  Home, 
  Dumbbell, 
  Book,
  Car,
  Gamepad2,
  Grid3X3
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    count: '10,000+ items'
  },
  {
    id: 'computers',
    name: 'Computers',
    icon: Laptop,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
    count: '5,000+ items'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: Shirt,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    count: '25,000+ items'
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    icon: Home,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    count: '15,000+ items'
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    icon: Dumbbell,
    image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg',
    count: '8,000+ items'
  },
  {
    id: 'books',
    name: 'Books',
    icon: Book,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    count: '50,000+ items'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: Car,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    count: '12,000+ items'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    count: '3,000+ items'
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
              <Grid3X3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-blue-600 font-semibold uppercase tracking-wide text-sm sm:text-base">Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Discover our extensive collection across multiple categories. From cutting-edge electronics 
              to trendy fashion, find everything you need in one place.
            </p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 sm:mt-6"></div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="w-full"
              >
                <Link
                  to={`/categories/${category.id}`}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 block"
                >
                  <div className="aspect-square relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 sm:p-3 lg:p-4">
                      <motion.div 
                        className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl mb-2 sm:mb-3 group-hover:bg-white/30 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                      </motion.div>
                      
                      <h3 className="text-xs sm:text-sm lg:text-lg font-bold mb-1 sm:mb-2 text-center group-hover:scale-105 transition-transform duration-300 leading-tight">
                        {category.name}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-gray-200 font-medium bg-white/20 backdrop-blur-sm px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full text-center">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;