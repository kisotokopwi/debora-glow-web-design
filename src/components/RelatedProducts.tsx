
import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedProductsProps {
  currentProductId: string;
  categoryId?: string;
}

const RelatedProducts = ({ currentProductId, categoryId }: RelatedProductsProps) => {
  const { data: products = [], isLoading } = useProducts({ 
    category: categoryId 
  });

  // Filter out current product and get up to 4 related products
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 aspect-square rounded-lg mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-1"></div>
                <div className="bg-gray-300 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="transform hover:scale-105 transition-transform">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedProducts;
