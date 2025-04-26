"use client";

import { useEffect, useState } from "react";

interface Product {
  imageUrl: string;
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
  oldPrice?: number;
}

export default function FeaturedSection() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => {
        // Get first 4 products as featured
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured products:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-700">
        <p>Loading featured products...</p>
      </div>
    );

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="block"
            >
              <div className="rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg shadow-md border border-gray-200">
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={`http://localhost:8081/${product.imageUrl}`}
                    alt={product.name}
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      Rs {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-4">
            No featured products found.
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/products"
          className="inline-flex items-center text-rose-600 hover:text-rose-700 font-medium"
        >
          View all products
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
