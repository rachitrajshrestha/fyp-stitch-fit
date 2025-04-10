import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isNew?: boolean;
  oldPrice?: number;
}

const ProductDescription: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ensure productId is converted to a number
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

  // const addToCart = (productId: number) => {
  //   fetch("http://localhost:8081/cart", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId: 1, productId }),
  //   }).then(() => alert("Product added to cart!"));
  // };

  // const addToCart = (productId: number) => {
  //   const token = localStorage.getItem("token");

  //   fetch("http://localhost:8081/cart", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ productId }), // No userId
  //   }).then(() => alert("Product added to cart!"));
  // };

  // const addToCart = async () => {
  //   if (!product) return;

  //   try {
  //     const response = await fetch("http://localhost:8081/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         productId: product.id,
  //         quantity: 1, // Default quantity to 1
  //       }),
  //     });

  //     if (!response.ok) throw new Error("Failed to add product to cart");

  //     // Redirect to cart page after adding
  //     navigate("/cart");
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };

  const addToCart = async () => {
    if (!product) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8081/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading product details...</p>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 my-4">{product.description}</p>
          <p className="text-xl font-semibold text-red-500">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
