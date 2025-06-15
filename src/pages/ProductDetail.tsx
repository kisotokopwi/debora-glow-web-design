
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/useProducts';
import { useReviews } from '@/hooks/useReviews';
import { useAddToCart } from '@/hooks/useCart';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/hooks/useWishlist';
import ProductImageGallery from '@/components/ProductImageGallery';
import ReviewsSection from '@/components/ReviewsSection';
import RelatedProducts from '@/components/RelatedProducts';
import WhatsAppSupport from '@/components/WhatsAppSupport';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star, Package, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id!);
  const { data: reviews = [] } = useReviews(id!);
  const { data: wishlist = [] } = useWishlist();
  const addToCart = useAddToCart();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isInWishlist = wishlist.some(item => item.product_id === id);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart.mutate({ productId: product.id });
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist) {
      removeFromWishlist.mutate(product.id);
    } else {
      addToWishlist.mutate(product.id);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-300 aspect-square rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 h-6 rounded w-1/2"></div>
              <div className="bg-gray-300 h-4 rounded"></div>
              <div className="bg-gray-300 h-4 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Premium Cosmetics | Debora Cosmetics</title>
        <meta name="description" content={product.description || `Buy ${product.name} at KSH ${product.price}. Premium quality cosmetics with fast delivery in Kenya.`} />
        <meta name="keywords" content={`${product.name}, cosmetics, makeup, beauty products, Kenya`} />
        <meta property="og:title" content={`${product.name} | Debora Cosmetics`} />
        <meta property="og:description" content={product.description || `Premium ${product.name} available now`} />
        <meta property="og:image" content={product.images?.[0] || '/placeholder.svg'} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="KES" />
        <link rel="canonical" href={`${window.location.origin}/products/${product.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": product.images,
            "offers": {
              "@type": "Offer",
              "url": `${window.location.origin}/products/${product.id}`,
              "priceCurrency": "KES",
              "price": product.price,
              "availability": product.stock_count > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
            },
            "aggregateRating": reviews.length > 0 ? {
              "@type": "AggregateRating",
              "ratingValue": averageRating,
              "reviewCount": reviews.length
            } : undefined
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/products" className="text-rose-600 hover:text-rose-700 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery 
              images={product.images || ['/placeholder.svg']} 
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-rose-600">
                  KSH {product.price}
                </span>
                {product.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
                {product.stock_count && product.stock_count > 0 ? (
                  <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.stock_count || product.stock_count === 0 || addToCart.isPending}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleToggleWishlist}
                  className={isInWishlist ? 'text-rose-600 border-rose-600' : ''}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <WhatsAppSupport 
                className="w-full" 
                size="lg"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Package className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Original Products</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium">7-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <ReviewsSection productId={product.id} />
        </div>

        {/* Related Products */}
        <RelatedProducts 
          currentProductId={product.id} 
          categoryId={product.category_id}
        />

        <WhatsAppSupport variant="floating" />
      </div>
    </>
  );
};

export default ProductDetail;
