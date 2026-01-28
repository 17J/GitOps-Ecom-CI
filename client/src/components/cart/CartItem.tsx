
import React from 'react';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { id, title, price, image, quantity } = item;

  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="flex-shrink-0">
        <Link to={`/products/${id}`}>
          <img 
            src={image} 
            alt={title} 
            className="w-20 h-20 object-cover rounded-md"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <Link to={`/products/${id}`}>
          <h3 className="font-medium text-gray-900">{title}</h3>
        </Link>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          <Minus size={14} />
        </Button>
        
        <span className="w-8 text-center">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleIncrement}
        >
          <Plus size={14} />
        </Button>
      </div>
      
      <div className="text-right ml-4">
        <p className="font-medium">${(price * quantity).toFixed(2)}</p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50 -mr-2 mt-1"
          onClick={() => removeItem(id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
