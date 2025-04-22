"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

interface CardProps {
  products: Product[];
}

export const Card: React.FC<CardProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <h3 className="text-xl font-medium text-gray-700">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`} className="block">
          <div className="rounded-lg shadow-md hover:shadow-lg overflow-hidden transition duration-300 bg-white">
            <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
              <img
                src={`http://localhost:8081/${product.imageUrl}`}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
              />
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold line-clamp-1">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-lg font-bold mt-2">
                Rs {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
