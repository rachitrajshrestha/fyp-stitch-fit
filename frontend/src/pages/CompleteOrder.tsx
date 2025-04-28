import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

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

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8081/orders/user/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order", err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="p-6 text-center">Order not found.</div>;
  }

  return (
    <>
      <Navbar
        theme={"light"}
        setTheme={function (theme: "light" | "dark"): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Order Placed Successfully!
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <p className="text-lg font-semibold">Order</p>
            <p className="text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 capitalize">
              Status: {order.status}
            </p>
          </div>

          <ul className="divide-y">
            {order.OrderItems.map((item, idx) => (
              <li key={idx} className="flex gap-4 py-4">
                <img
                  src={
                    `http://localhost:8081/${item.Product.imageUrl}` ||
                    "/placeholder.png"
                  }
                  alt={item.Product.name}
                  className="w-16 h-16 object-cover rounded"
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

          <div className="text-right font-bold text-lg mt-6">
            Total: ${order.totalAmount.toFixed(2)}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
