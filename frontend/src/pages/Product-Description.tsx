"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import FeaturedSection from "../component/featured-section";
import Footer from "../component/Footer";

export interface Product {
  imageUrl: string;
  id: number;
  name: string;
  price: number;
  description: string;
  isNew?: boolean;
  oldPrice?: number;
}

const ProductDescription: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const id = Number(productId);
    if (!id) {
      console.error("Invalid product ID:", productId);
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8081/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [productId]);

  const addToCart = async () => {
    if (!product) return;

    try {
      const token = localStorage.getItem("token");
      const hasMeasurement = JSON.parse(
        localStorage.getItem("hasMeasurement") || "false"
      );

      if (!hasMeasurement) {
        // Redirect to measurement form with cart as redirect param
        navigate("/measurements?redirect=cart");
        return;
      }

      // Add to cart
      const response = await fetch("http://localhost:8081/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
        }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading product details...</p>
    );
  if (!product)
    return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <>
      <Navbar
        theme={"light"}
        setTheme={(theme: "light" | "dark"): void => {
          throw new Error("Function not implemented.");
        }}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-96 md:h-full">
                <img
                  src={`http://localhost:8081/${product.imageUrl}`}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="text-sm text-green-600 font-semibold mb-2">
                In Stock
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <span className="ml-2 text-gray-600 text-sm">
                  (121 reviews)
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                Rs {product.price.toFixed(2)}
              </div>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex border rounded-md">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-600"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center border-x"
                  />
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-600"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <FeaturedSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDescription;
