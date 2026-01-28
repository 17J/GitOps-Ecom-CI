
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const storedToken = localStorage.getItem('showmoore_token');
    const storedUser = localStorage.getItem('showmoore_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // In a real application, these would make axios requests to your backend
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // For development/demo purposes - we'll use hardcoded login
      // In production, uncomment the axios call below
      
      // Simulate API call to demonstrate functionality
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Hardcoded dummy users for testing
      const dummyUsers = [
        { id: '1', name: 'Test User', email: 'user@example.com', password: 'password123', role: 'user' },
        { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' }
      ];
      
      const foundUser = dummyUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Mock user and token
      const mockUser = { 
        id: foundUser.id, 
        name: foundUser.name, 
        email: foundUser.email,
        role: foundUser.role
      };
      const mockToken = 'mock-jwt-token-' + foundUser.id;
      
      // Uncomment for real API implementation:
      /*
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      */
      
      // Save to state and localStorage
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('showmoore_token', mockToken);
      localStorage.setItem('showmoore_user', JSON.stringify(mockUser));
      
      toast.success("Login successful!");
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // For development/demo purposes - simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Hardcoded check to prevent duplicate emails
      const dummyUsers = [
        { id: '1', name: 'Test User', email: 'user@example.com', password: 'password123' },
        { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'admin123' }
      ];
      
      if (dummyUsers.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // Mock user and token for demo
      const mockUser = { id: '3', name, email, role: 'user' };
      const mockToken = 'mock-jwt-token-new-user';
      
      // Uncomment for real API implementation:
      /*
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { token, user } = response.data;
      */
      
      // Save to state and localStorage
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('showmoore_token', mockToken);
      localStorage.setItem('showmoore_user', JSON.stringify(mockUser));
      
      toast.success("Registration successful!");
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('showmoore_token');
    localStorage.removeItem('showmoore_user');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated: !!user && !!token,
      login, 
      register, 
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
