import React, { useEffect, useState } from "react";
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
    fetch(`http://localhost:8081/cart/${id}`, { method: "DELETE" })
      .then(() => setCart(cart.filter((item) => item.id !== id)))
      .catch((err) => console.error("Error removing item:", err));
  };

  const handleCheckout = () => {
    navigate("/add-address");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

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
                className="w-16 h-16 object-cover"
              />
              <span className="w-1/4">{item.product.name}</span>
              <span className="w-1/6">${item.product.price.toFixed(2)}</span>
              <span className="w-1/6">Qty: {item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 px-3 py-1 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <h3 className="text-xl font-semibold mb-2">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
