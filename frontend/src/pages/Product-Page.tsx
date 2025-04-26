"use client";

import { useState, useEffect } from "react";
import ProductFilters from "../component/product-filter";
import { Card } from "../component/Card";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

interface Product {
  category: string;
  imageUrl: string;
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
  oldPrice?: number;
}

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 10000],
    sortBy: "default",
  });

  const categories = [
    "Party",
    "Formal",
    "Casual",
    "Occasion",
    "Traditional",
    "Bridal",
    "Festives",
  ];

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Apply filters whenever the filters state changes
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply price range filter
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      // default sorting (no specific order)
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <main className="min-h-screen">
      <Navbar
        theme={"light"}
        setTheme={(theme: "light" | "dark"): void => {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src="/hero-banner.jpg"
          alt="Shop the latest collection"
          className="object-cover absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Summer Collection 2024
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
            Discover our latest arrivals with styles perfect for the season
          </p>
          <button className="bg-white text-black font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
            />
          </div>

          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <Card products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
