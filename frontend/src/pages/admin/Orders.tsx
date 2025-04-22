import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

interface User {
  name: string;
  email: string;
}

interface Address {
  addressLine: string;
  city: string;
  postalCode: string;
}

interface Payment {
  transaction_code: string;
}

interface Measurement {
  chest: number;
  waist: number;
  hips: number;
  shoulderWidth: number;
  sleeveLength: number;
  inseam: number;
  neck: number;
  height: number;
  legLength: number;
  thighWidth: number;
  calvesWidth: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  Product: Product;
}

interface Order {
  id: number;
  User?: User;
  Address?: Address;
  Payment?: Payment;
  Measurement?: Measurement;
  OrderItems: OrderItem[];
  totalAmount: number;
  status: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8081/orders/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8081/orders/admin/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin - All Orders</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="border bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <div className="mb-2">
              <strong>Order ID:</strong> #{order.id}
            </div>
            <div className="mb-2">
              <strong>User:</strong> {order.User?.name} ({order.User?.email})
            </div>
            <div className="mb-2">
              <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
            </div>
            <div className="mb-2">
              <strong>Status:</strong>{" "}
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="ml-2 p-1 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="mb-2">
              <strong>Payment Code:</strong> {order.Payment?.transaction_code}
            </div>

            <div className="mb-2">
              <strong>Shipping Address:</strong>
              <div className="ml-4">
                {order.Address?.addressLine}, {order.Address?.city} -{" "}
                {order.Address?.postalCode}
              </div>
            </div>

            <div className="mb-2">
              <strong>Measurement:</strong>
              <div className="ml-4">
                Chest: {order.Measurement?.chest}, Waist:{" "}
                {order.Measurement?.waist}, Hips: {order.Measurement?.hips}
                <br />
                Shoulder: {order.Measurement?.shoulderWidth}, Sleeve:{" "}
                {order.Measurement?.sleeveLength}, Inseam:{" "}
                {order.Measurement?.inseam}
                <br />
                Neck: {order.Measurement?.neck}, Height:{" "}
                {order.Measurement?.height}, Leg: {order.Measurement?.legLength}
                <br />
                Thigh: {order.Measurement?.thighWidth}, Calves:{" "}
                {order.Measurement?.calvesWidth}
              </div>
            </div>

            <div>
              <strong>Products:</strong>
              {order.OrderItems?.map((item) => (
                <div
                  key={item.id}
                  className="ml-4 flex gap-4 items-center my-2"
                >
                  {item.Product?.imageUrl && (
                    <img
                      src={item.Product.imageUrl}
                      alt={item.Product.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  )}
                  <div>
                    {item.Product?.name} (Qty: {item.quantity}) - $
                    {item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
