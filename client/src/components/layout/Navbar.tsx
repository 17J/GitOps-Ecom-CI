
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would implement search functionality here
    console.log('Search for:', searchQuery);
    setSearchQuery('');
  };

  return (
    <nav className="bg-showmoore-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-gold">Show</span>
            <span>moore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gold-light transition-colors">Home</Link>
            <Link to="/products" className="hover:text-gold-light transition-colors">Products</Link>
            <Link to="/about" className="hover:text-gold-light transition-colors">About</Link>
            <Link to="/contact" className="hover:text-gold-light transition-colors">Contact</Link>
          </div>

          {/* Search, Cart, Account */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-gold-light">
                  <Search size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Search Products</SheetTitle>
                  <SheetDescription>
                    Find the perfect item for your needs
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSearch} className="py-4">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    <Button type="submit">Search</Button>
                  </div>
                </form>
              </SheetContent>
            </Sheet>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <Button variant="ghost" size="icon" className="text-white hover:text-gold-light group-hover:animate-cart-bounce">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gold text-black">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-white hover:text-gold-light">
                    <User size={16} className="mr-1" />
                    {user?.name}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-white hover:text-gold-light"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="text-white hover:text-showmoore-800 hover:bg-gold border-gold">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gold text-showmoore-800 hover:bg-gold-light">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-gold-light">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Showmoore</SheetTitle>
                </SheetHeader>
                <div className="py-4 flex flex-col space-y-4">
                  <Link to="/" className="text-foreground hover:text-primary transition-colors py-2">Home</Link>
                  <Link to="/products" className="text-foreground hover:text-primary transition-colors py-2">Products</Link>
                  <Link to="/about" className="text-foreground hover:text-primary transition-colors py-2">About</Link>
                  <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-2">Contact</Link>
                  
                  <div className="border-t border-border pt-4">
                    {isAuthenticated ? (
                      <>
                        <Link to="/profile" className="flex items-center py-2 text-foreground hover:text-primary transition-colors">
                          <User size={16} className="mr-2" />
                          Profile
                        </Link>
                        <Button 
                          variant="ghost" 
                          onClick={logout}
                          className="flex items-center py-2 text-foreground hover:text-primary transition-colors w-full justify-start"
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Link to="/login">
                          <Button variant="outline" className="w-full">Login</Button>
                        </Link>
                        <Link to="/register">
                          <Button className="w-full">Register</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
