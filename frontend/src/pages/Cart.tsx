import React, { useEffect, useState } from "react";

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
        console.log("Raw cart data from backend:", data);
        const transformed = data.map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
          product: {
            id: item.Product.id,
            name: item.Product.name,
            price: item.Product.price,
            imageUrl: item.Product.imageUrl,
          },
        }));
        setCart(transformed);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const removeFromCart = (id: number) => {
    fetch(`http://localhost:8081/cart/${id}`, { method: "DELETE" })
      .then(() => setCart(cart.filter((item) => item.id !== id)))
      .catch((err) => console.error("Error removing item:", err));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-2 my-2"
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-16 h-16"
              />
              <span>{item.product.name}</span>
              <span>${item.product.price}</span>
              <span>Qty: {item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 px-3 py-1 text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
