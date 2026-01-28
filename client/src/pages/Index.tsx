
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useProducts, Product } from '@/contexts/ProductContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { products, categories } = useProducts();

  // Get featured products (top 4 by rating)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Get products for each category (top 4 of each)
  const productsByCategory = categories.map(category => {
    const categoryProducts = products
      .filter(product => product.category === category)
      .slice(0, 4);
    
    return {
      category,
      products: categoryProducts
    };
  });

  // Category images mapping
  const categoryImages = {
    men: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1000",
    women: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000",
    kids: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=1000",
    accessories: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1000"
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-showmoore-800 to-showmoore-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Discover Your Perfect Style at <span className="text-gold">Showmoore</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200">
                Elevate your wardrobe with our curated collection of premium fashion and accessories.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-gold text-showmoore-800 hover:bg-gold-light">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1080" 
                alt="Fashion Model" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                to={`/products?category=${category}`} 
                key={category}
                className="group relative overflow-hidden rounded-lg shadow-md aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img 
                  src={categoryImages[category as keyof typeof categoryImages] || `https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=1000&fit=crop`}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                  <h3 className="text-white text-xl font-bold capitalize">{category}</h3>
                  <p className="text-white/80 text-sm group-hover:underline">
                    Shop Now
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-showmoore-600 hover:text-showmoore-800 flex items-center">
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Products by Category */}
      {productsByCategory.map(({ category, products }) => (
        <section key={category} className="py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold capitalize">{category}</h2>
              <Link 
                to={`/products?category=${category}`} 
                className="text-showmoore-600 hover:text-showmoore-800 flex items-center"
              >
                View All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah J.",
                text: "The quality of clothes from Showmoore exceeds my expectations every time. Customer for life!",
                avatar: "https://randomuser.me/api/portraits/women/45.jpg"
              },
              {
                name: "Michael T.",
                text: "Fast shipping, excellent customer service, and the best selection of men's fashion I've found online.",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Emma L.",
                text: "I love how easy it is to find pieces that fit perfectly. The size guide is spot on!",
                avatar: "https://randomuser.me/api/portraits/women/63.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-showmoore-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md text-gray-900"
              required
            />
            <Button className="bg-gold text-showmoore-800 hover:bg-gold-light whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
