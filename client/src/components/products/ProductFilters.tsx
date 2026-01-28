
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterOptions } from '@/contexts/ProductContext';
import { Filter, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
  initialFilters?: FilterOptions;
}

const ProductFilters = ({ 
  categories, 
  onFilterChange, 
  className,
  initialFilters = {}
}: ProductFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialFilters.category
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.minPrice ?? 0, 
    initialFilters.maxPrice ?? 200
  ]);
  const [searchQuery, setSearchQuery] = useState(initialFilters.searchQuery ?? '');
  
  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(category);
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const applyFilters = () => {
    onFilterChange({
      category: selectedCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      searchQuery: searchQuery.trim() || undefined,
    });
  };

  const resetFilters = () => {
    setSelectedCategory(undefined);
    setPriceRange([0, 200]);
    setSearchQuery('');
    onFilterChange({});
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Desktop filters
  const DesktopFilters = () => (
    <div className={`hidden md:block ${className}`}>
      <div className="space-y-6">
        {/* Search */}
        <div>
          <h3 className="text-lg font-medium mb-3">Search</h3>
          <form onSubmit={handleSearchSubmit}>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategory === category}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`category-${category}`} className="capitalize cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-lg font-medium mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[priceRange[0], priceRange[1]]}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              max={200}
              step={5}
              className="my-6"
            />
            <div className="flex items-center justify-between">
              <span>${priceRange[0]}</span>
              <span>to</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={resetFilters} 
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile filters using Sheet component
  const MobileFilters = () => (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
          </SheetHeader>
          
          <div className="py-4 space-y-6">
            {/* Search */}
            <div>
              <h3 className="text-lg font-medium mb-3">Search</h3>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`m-category-${category}`}
                      checked={selectedCategory === category}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`m-category-${category}`} className="capitalize cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-medium mb-3">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={handlePriceChange}
                  max={200}
                  step={5}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>to</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="pt-4 flex flex-col gap-2 sm:flex-col">
            <SheetClose asChild>
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
            </SheetClose>
            <Button 
              variant="outline" 
              onClick={resetFilters} 
              className="w-full"
            >
              <X size={16} className="mr-2" />
              Reset Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <>
      <DesktopFilters />
      <MobileFilters />
    </>
  );
};

export default ProductFilters;
