
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get redirect path from query parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
            <p className="text-gray-600 mb-8">
              Log in to your Showmoore account to access your orders, wishlist, and personalized shopping experience.
            </p>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800" 
                alt="Shopping" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
