"use client";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  product: {
    imageUrl: string;
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

const CartPage = () => {
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
      .then((res) => res.json())
      .then((data) => {
        const products = data[0]?.Products || [];
        const transformed = products.map((item: any) => ({
          id: item.id,
          quantity: item.CartItem.quantity,
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl
              ? item.imageUrl.replace("\\", "/")
              : "/placeholder.svg",
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
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    navigate("/add-address", { state: { totalPrice } });
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  console.log("cart", cart);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <div className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:8081/${item.product.imageUrl}`}
                      alt={item.product.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="font-medium">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button className="h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-md">
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="h-8 w-12 border-x text-center"
                        />
                        <button className="h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-md">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 flex items-center justify-center text-red-500 hover:bg-gray-100 rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="border rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr className="my-2 border-gray-200" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md font-medium"
                >
                  Proceed to Checkout
                </button>
                <div className="mt-4 text-center">
                  <Link
                    to="/product"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/product">
            <button className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
