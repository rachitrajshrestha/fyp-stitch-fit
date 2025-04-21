"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

const Card = () => {
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
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg">Loading products...</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg shadow-md transition-all duration-300
                      hover:shadow-lg hover:scale-[1.02] hover:border-primary/20
                      bg-white cursor-pointer"
          >
            <div className="overflow-hidden rounded-md">
              <img
                src={`../${product.imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md transition-transform duration-300
                          hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-bold mt-3 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm">{product.category}</p>
            <p className="text-primary font-semibold text-lg mt-1">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm mt-2 text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-lg text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
};
export default Card;
