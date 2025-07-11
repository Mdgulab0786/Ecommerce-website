// /pages/CategoryPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products'; // local product dataset
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryId } = useParams();

  const categoryProducts = products[categoryId] || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {categoryId.replace('-', ' ')}
      </h1>

      {categoryProducts.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
