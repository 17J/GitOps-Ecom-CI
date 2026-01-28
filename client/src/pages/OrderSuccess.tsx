
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle2, Package, Home } from 'lucide-react';

const OrderSuccess = () => {
  const { items } = useCart();
  
  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return `SM-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);
  
  // If the cart isn't empty and user directly navigated here, redirect to home
  if (items.length > 0) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for shopping with Showmoore. Your order has been placed successfully and will be processed shortly.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4 pb-4 border-b">
            <h2 className="text-xl font-semibold mb-1">Order Details</h2>
            <p className="text-gray-600">Order Number: {orderNumber}</p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-12">
              <div className="text-center">
                <div className="text-showmoore-600 mb-2">
                  <Package size={28} className="mx-auto" />
                </div>
                <p className="text-sm text-gray-600">Order Placed</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="h-0.5 w-12 bg-gray-200"></div>
              
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <Package size={28} className="mx-auto" />
                </div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-medium">
                  {(() => {
                    const date = new Date();
                    date.setDate(date.getDate() + 5);
                    return date.toLocaleDateString();
                  })()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-gray-600 text-sm">
            <p>
              A confirmation email has been sent to your registered email address.
              You can track your order status in your account dashboard.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link to="/">
            <Button className="flex items-center">
              <Home size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
