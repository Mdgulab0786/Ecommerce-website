import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';

const Home: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <Categories />
      <FeaturedProducts />
    </motion.div>
  );
};

export default Home;