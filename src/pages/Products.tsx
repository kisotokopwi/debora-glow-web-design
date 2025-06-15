
import React, { useState, useEffect } from 'react';
import { useProducts, useCategories } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import ProductFilters, { FilterState } from '@/components/ProductFilters';
import WhatsAppSupport from '@/components/WhatsAppSupport';
import { Helmet } from 'react-helmet-async';

const Products = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categories: [],
    priceRange: [0, 10000],
    sortBy: 'newest',
    featured: false,
    inStock: true
  });

  const { data: products = [], isLoading } = useProducts(filters);
  const { data: categories = [] } = useCategories();

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Premium Cosmetics - Shop All Products | Debora Cosmetics</title>
        <meta name="description" content="Discover our complete collection of premium cosmetics including lipsticks, foundations, eyeshadows, and skincare products. Original products with fast delivery in Kenya." />
        <meta name="keywords" content="cosmetics Kenya, makeup products, beauty products, lipstick, foundation, skincare, Nairobi cosmetics" />
        <meta property="og:title" content="Premium Cosmetics - Shop All Products | Debora Cosmetics" />
        <meta property="og:description" content="Discover our complete collection of premium cosmetics with fast delivery in Kenya." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${window.location.origin}/products`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            All Products
          </h1>
          <p className="text-gray-600">Discover our complete collection of premium cosmetics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters 
              onFiltersChange={handleFiltersChange}
              categories={categories}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <WhatsAppSupport variant="floating" />
      </div>
    </>
  );
};

export default Products;
