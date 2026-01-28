
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle2, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { items } = useCart();
  const { isAuthenticated } = useAuth();

  // Redirect to cart if cart is empty
  if (items.length === 0) {
    return <Navigate to="/cart" />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=checkout" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center mb-8">
          <Link to="/cart" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} className="mr-1" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="bg-showmoore-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <ShoppingBag size={16} />
              </div>
              <div className="mx-2 text-showmoore-600 font-medium">Cart</div>
            </div>
            <div className="h-1 w-12 bg-showmoore-600 mx-2"></div>
            <div className="flex items-center">
              <div className="bg-showmoore-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                2
              </div>
              <div className="mx-2 text-showmoore-600 font-medium">Checkout</div>
            </div>
            <div className="h-1 w-12 bg-gray-300 mx-2"></div>
            <div className="flex items-center">
              <div className="bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
              <div className="mx-2 text-gray-600 font-medium">Confirmation</div>
            </div>
          </div>
        </div>
        
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default Checkout;
