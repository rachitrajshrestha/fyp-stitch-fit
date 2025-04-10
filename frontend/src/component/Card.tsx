"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
  oldPrice?: number;
}

export default function ProductList() {
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
    <div className="container mx-auto px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.length > 0 ? (
        products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="block"
          >
            <div className="rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
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
                  {/* {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                    Rs {product.oldPrice.toFixed(2)}
                    </span>
                    )} */}
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-500">No products found.</div>
      )}
    </div>
  );
}
