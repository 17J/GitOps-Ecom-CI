
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProducts } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Heart, Share2 } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Layout>
    );
  }
  
  const { title, description, price, image, category, rating, stock } = product;
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === category && p.id !== id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };
  
  const handleAddToWishlist = () => {
    toast.success(`${title} added to your wishlist`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center mt-2">
                <div className="flex text-gold mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">{rating.toFixed(1)}/5</span>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-showmoore-800">
              ${price.toFixed(2)}
            </div>
            
            <div className="prose max-w-none">
              <p>{description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="font-medium">Category:</span>
              <span className="capitalize">{category}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="font-medium">Availability:</span>
              {stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({stock} available)
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
            
            {stock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <div className="h-8 w-12 flex items-center justify-center border-y border-input">
                    {quantity}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= stock}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 bg-showmoore-600 hover:bg-showmoore-700"
                disabled={stock === 0}
              >
                <ShoppingCart size={18} className="mr-2" />
                {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleAddToWishlist}
                className="flex-1 sm:flex-none"
              >
                <Heart size={18} className="mr-2" />
                Wishlist
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex-1 sm:flex-none"
              >
                <Share2 size={18} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
