
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/contexts/ProductContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { id, title, price, image, category, stock } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      title,
      price,
      image,
    });
  };

  return (
    <Link to={`/products/${id}`}>
      <Card className="product-card h-full flex flex-col">
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="product-image w-full h-48 object-cover"
          />
          <Badge 
            className="absolute top-2 right-2 capitalize bg-showmoore-600"
          >
            {category}
          </Badge>
          {stock < 10 && stock > 0 && (
            <Badge 
              className="absolute top-2 left-2 bg-amber-500"
            >
              Low Stock
            </Badge>
          )}
          {stock === 0 && (
            <Badge 
              className="absolute top-2 left-2 bg-red-500"
            >
              Out of Stock
            </Badge>
          )}
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
          <p className="text-showmoore-800 font-bold">${price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <Eye size={16} className="mr-1" />
            Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-showmoore-600 hover:bg-showmoore-700"
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            <ShoppingCart size={16} className="mr-1" />
            {stock === 0 ? 'Sold Out' : 'Add'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
