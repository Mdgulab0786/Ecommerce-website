import React, { useState } from 'react';
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

const categoriesData = [
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
  },
];

const Categories: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredCategories = categoriesData.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center gap-2 mb-2">
              <Grid3X3 className="h-6 w-6 text-blue-600" />
              <span className="uppercase font-semibold text-blue-600 tracking-widest">Explore</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">
              Browse across categories to discover great products!
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
          </motion.div>
        </div>

        {/* Search bar */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredCategories.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No categories found.</p>
          ) : (
            filteredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={`/categories/${category.id}`}
                    className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-2">
                        <motion.div
                          className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mb-3 group-hover:rotate-12 transition duration-300"
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <h3 className="text-lg font-bold text-center group-hover:scale-105 transition-transform">
                          {category.name}
                        </h3>
                        <motion.span
                          className="text-xs bg-white/20 px-3 py-1 mt-1 rounded-full backdrop-blur-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {category.count}
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
