"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8081/cart/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or failed to fetch");
        return res.json();
      })
      .then((data) => {
        const products = data[0]?.Products || [];

        const transformed = products.map((item: any) => ({
          id: item.id,
          quantity: item.CartItem.quantity,
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl.replace("\\", "/"),
          },
        }));

        setCart(transformed);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const removeFromCart = (id: number) => {
    fetch(`http://localhost:8081/cart/${id}`, {
      method: "DELETE",
    })
      .then(() => setCart(cart.filter((item) => item.id !== id)))
      .catch((err) => console.error("Error removing item:", err));
  };

  const handleCheckout = () => {
    navigate("/add-address", { state: { totalPrice } });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const taxRate = 0.08;
  const shipping = 0.0;

  const calculateTax = () => {
    return totalPrice * taxRate;
  };

  const calculateTotal = () => {
    return totalPrice + shipping + calculateTax();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <span className="text-2xl">🛒</span>
        Your Cart
      </h1>

      {/* Cart with items */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              {cart.length > 0 ? (
                <ul className="divide-y">
                  {cart.map((item) => (
                    <li key={item.id} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted">
                          <img
                            src={item.product.imageUrl || "/placeholder.svg"}
                            alt={item.product.name}
                            className="object-cover absolute inset-0 w-full h-full"
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="font-medium">
                                {item.product.name}
                              </h3>
                              <p className="font-medium">
                                ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded-md">
                              <button className="h-8 w-8 flex items-center justify-center text-gray-500">
                                <span>−</span>
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <button className="h-8 w-8 flex items-center justify-center text-gray-500">
                                <span>+</span>
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-600 flex items-center text-sm px-2 py-1"
                            >
                              <span className="mr-1">🗑️</span>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mx-auto text-gray-400 mb-2">🛒</div>
                  <h3 className="mt-4 text-lg font-medium">
                    Your cart is empty
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="flex justify-between px-6 py-4 bg-gray-50 rounded-b-lg">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Continue Shopping
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-500 rounded-md hover:bg-red-50">
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div>
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                Shipping and taxes calculated at checkout. Free shipping on
                orders over $100.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
