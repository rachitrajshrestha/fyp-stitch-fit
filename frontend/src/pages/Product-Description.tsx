"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import FeaturedSection from "../component/featured-section";
import Footer from "../component/Footer";

export interface Product {
  stock: string;
  status: string;
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
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

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
    if (isSubmittingOrder) return;
    setIsSubmittingOrder(true);
    if (!product) return;

    if (product.status === "outofstock") {
      alert("This product is out of stock!");
      navigate("/products");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/measurements/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      navigate(
        `/measurements?redirect=cart&productId=${product.id}&quantity=${quantity}`
      );
    } catch (error) {
      console.error("Error checking measurement before cart:", error);
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
        setTheme={(theme: "light" | "dark"): void => {}}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-[500px] w-[500px] overflow-hidden">
                <img
                  src={`http://localhost:8081/${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div
                className={`text-sm font-semibold mb-2 ${
                  product?.status === "instock"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product?.status === "instock"
                  ? "In Stock"
                  : product?.status === "outofstock"
                  ? "Out of Stock"
                  : "Status Unknown"}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
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
                  disabled={product.status === "outofstock"}
                  className={`flex-1 font-semibold py-2 px-6 rounded-md transition ${
                    product.status === "outofstock"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  {product.status === "outofstock"
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDescription;
