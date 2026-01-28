
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
            <p className="text-gray-600 mb-8">
              Join Showmoore to enjoy exclusive benefits, faster checkout, and a personalized shopping experience.
            </p>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800" 
                alt="Shopping Bags" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
          <div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
