
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useProducts, FilterOptions } from '@/contexts/ProductContext';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const location = useLocation();
  const { products, categories, filterProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  
  // Parse query parameters to get initial filters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const query = searchParams.get('query');
    
    const initialFilters: FilterOptions = {};
    
    if (category) initialFilters.category = category;
    if (query) initialFilters.searchQuery = query;
    
    setCurrentFilters(initialFilters);
    handleFilterChange(initialFilters);
  }, [location.search]);
  
  const handleFilterChange = (filters: FilterOptions) => {
    setLoading(true);
    
    // Simulate network delay for loading state
    setTimeout(() => {
      const filtered = filterProducts(filters);
      setFilteredProducts(filtered);
      setCurrentFilters(filters);
      setLoading(false);
    }, 500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop (left sidebar) */}
          <div className="w-full md:w-64 flex-shrink-0">
            <ProductFilters 
              categories={categories}
              onFilterChange={handleFilterChange}
              initialFilters={currentFilters}
            />
          </div>
          
          {/* Product Grid */}
          <div className="flex-grow">
            {/* Filters - Mobile (top) */}
            <div className="md:hidden mb-6">
              <ProductFilters 
                categories={categories}
                onFilterChange={handleFilterChange}
                initialFilters={currentFilters}
              />
            </div>
            
            {/* Results count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            {/* Products */}
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
