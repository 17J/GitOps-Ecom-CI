import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
}

interface ProductContextType {
  products: Product[];
  categories: string[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  filterProducts: (options: FilterOptions) => Product[];
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}

const dummyProducts: Product[] = [
  {
    id: '1',
    title: 'Modern Slim Fit Blazer',
    description: 'A stylish slim-fit blazer perfect for formal occasions or casual Fridays. Made from high-quality fabric that ensures comfort and durability.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800',
    category: 'men',
    rating: 4.5,
    stock: 25
  },
  {
    id: '2',
    title: 'Classic White Dress Shirt',
    description: 'A timeless white dress shirt that belongs in every wardrobe. Made from 100% cotton for breathability and comfort throughout the day.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=800',
    category: 'men',
    rating: 4.3,
    stock: 42
  },
  {
    id: '3',
    title: 'Premium Denim Jeans',
    description: 'High-quality denim jeans with a modern fit. These versatile jeans can be dressed up or down for any occasion.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800',
    category: 'men',
    rating: 4.2,
    stock: 30
  },
  {
    id: '4',
    title: 'Elegant Evening Dress',
    description: 'A stunning evening dress designed to make you stand out. The elegant silhouette flatters any figure while the quality material ensures comfort all night long.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800',
    category: 'women',
    rating: 4.8,
    stock: 15
  },
  {
    id: '5',
    title: 'Summer Floral Blouse',
    description: 'A light and breezy floral blouse perfect for summer days. The breathable fabric keeps you cool while the stylish design turns heads.',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800',
    category: 'women',
    rating: 4.4,
    stock: 38
  },
  {
    id: '6',
    title: 'High-Waisted Trousers',
    description: 'These sleek high-waisted trousers create a flattering silhouette and can be styled for both office and evening wear. Made with stretchy fabric for all-day comfort.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800',
    category: 'women',
    rating: 4.6,
    stock: 22
  },
  {
    id: '7',
    title: 'Kids Dinosaur T-Shirt',
    description: 'A fun and colorful dinosaur t-shirt that kids love. Made from soft, durable cotton that stands up to endless play and washing.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800',
    category: 'kids',
    rating: 4.7,
    stock: 45
  },
  {
    id: '8',
    title: 'Children\'s Denim Overalls',
    description: 'Durable denim overalls designed to handle all your child\'s adventures. Multiple pockets provide space for treasures, while adjustable straps ensure a perfect fit.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?q=80&w=800',
    category: 'kids',
    rating: 4.5,
    stock: 28
  },
  {
    id: '9',
    title: 'Colorful Sneakers',
    description: 'Vibrant and comfortable sneakers perfect for active kids. The durable design and supportive sole keep up with playground activities and everyday wear.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800',
    category: 'kids',
    rating: 4.4,
    stock: 32
  },
  {
    id: '10',
    title: 'Premium Leather Wallet',
    description: 'A luxurious leather wallet with multiple card slots and compartments. The slim design fits comfortably in pockets while having ample space for all essentials.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800',
    category: 'accessories',
    rating: 4.8,
    stock: 20
  },
  {
    id: '11',
    title: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV protection. The timeless style complements any outfit while protecting your eyes from harmful rays.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800',
    category: 'accessories',
    rating: 4.3,
    stock: 35
  },
  {
    id: '12',
    title: 'Silk Scarf',
    description: 'A luxurious silk scarf with a beautiful pattern. Versatile enough to be worn in multiple ways, adding an elegant touch to any outfit.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1584839401450-accbe1a8fca6?q=80&w=800',
    category: 'accessories',
    rating: 4.6,
    stock: 18
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(dummyProducts);
  
  const categories = [...new Set(products.map(product => product.category))];
  
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };
  
  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };
  
  const filterProducts = ({ category, minPrice, maxPrice, searchQuery }: FilterOptions) => {
    return products.filter(product => {
      if (category && product.category !== category) return false;
      
      if (minPrice !== undefined && product.price < minPrice) return false;
      if (maxPrice !== undefined && product.price > maxPrice) return false;
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      categories,
      getProductById,
      getProductsByCategory,
      filterProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
