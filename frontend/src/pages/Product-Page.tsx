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
    "Blouses",
    "Party",
    "Formal",
    "Casual",
    "Occasion",
    "Fabrics",
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

  const applyFilters = (updatedFilter: Partial<typeof filters>) => {
    const newFilters = { ...filters, ...updatedFilter };
    setFilters(newFilters);

    let result = [...products];

    if (newFilters.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === newFilters.category.toLowerCase()
      );
    }

    result = result.filter(
      (p) =>
        p.price >= newFilters.priceRange[0] &&
        p.price <= newFilters.priceRange[1]
    );

    switch (newFilters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProducts(result);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <main className="min-h-screen">
      <Navbar
        theme={"light"}
        setTheme={function (theme: "light" | "dark"): void {
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
              onFilterChange={applyFilters}
              categories={categories}
            />
          </div>

          <div className="w-full md:w-3/4">
            <Card />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
