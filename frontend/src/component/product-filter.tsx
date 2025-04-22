"use client";

import type React from "react";

interface FilterProps {
  filters: {
    category: string;
    priceRange: number[];
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
  categories: string[];
}

export default function ProductFilters({
  filters,
  onFilterChange,
  categories,
}: FilterProps) {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    const index = e.target.name === "min" ? 0 : 1;
    const newRange = [...filters.priceRange];
    newRange[index] = value;
    onFilterChange({ priceRange: newRange });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-4">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="all-categories"
              name="category"
              checked={filters.category === ""}
              onChange={() => onFilterChange({ category: "" })}
              className="mr-2"
            />
            <label htmlFor="all-categories">All Categories</label>
          </div>

          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                id={category}
                name="category"
                checked={filters.category === category}
                onChange={() => onFilterChange({ category })}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <label htmlFor="min-price" className="w-12">
              Min:
            </label>
            <input
              type="number"
              id="min-price"
              name="min"
              value={filters.priceRange[0]}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="max-price" className="w-12">
              Max:
            </label>
            <input
              type="number"
              id="max-price"
              name="max"
              value={filters.priceRange[1]}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
}
