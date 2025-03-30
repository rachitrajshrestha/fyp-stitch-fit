import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductCard: React.FC = () => {
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

  const addToCart = (productId: number) => {
    fetch("http://localhost:8081/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, productId }),
    }).then(() => alert("Product added to cart!"));
  };

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
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-red-500">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
                ;
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No products found.</div>
      )}
    </div>
  );
};

export default ProductCard;
