import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

interface OrderItem {
  Product: Product;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  OrderItems: OrderItem[];
}

export const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8081/orders/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setOrders)
      .catch((err) => console.error("Failed to fetch user orders", err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧾 Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">Order</p>
                <p className="text-sm text-gray-500">
                  Placed: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="font-semibold capitalize text-blue-600">
                Status: {order.status}
              </p>
            </div>

            <ul className="divide-y mt-2">
              {order.OrderItems.map((item, idx) => (
                <li key={idx} className="py-2 flex gap-4">
                  <img
                    src={
                      `http://localhost:8081/${item.Product.imageUrl}` ||
                      "/placeholder.png"
                    }
                    alt={item.Product.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.Product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right font-semibold mt-4">
              Total: ${order.totalAmount.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
