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

export const Card: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        <p>Loading products...</p>
      </div>
    );

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`} className="block">
          <div className="rounded-lg border hover:shadow-lg overflow-hidden transition">
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
