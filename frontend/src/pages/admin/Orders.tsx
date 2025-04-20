import { useEffect, useState } from "react";
import axios from "axios";

// Types for better readability
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
  // Add other fields as needed
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

  console.log("orders", orders);

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8081/orders/admin/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update state without reload
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
    <div></div>
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-4">Admin - All Orders</h1>
    //   {orders.map((order) => (
    //     <div
    //       key={order.id}
    //       className="border p-4 rounded-lg shadow-md mb-4 bg-white"
    //     >
    //       <p>
    //         <strong>User:</strong> {order.User?.name} ({order.User?.email})
    //       </p>
    //       <p>
    //         <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
    //       </p>
    //       <p>
    //         <strong>Status:</strong>
    //         <select
    //           value={order.status}
    //           onChange={(e) => updateStatus(order.id, e.target.value)}
    //           className="ml-2 p-1 border rounded"
    //         >
    //           <option value="pending">Pending</option>
    //           <option value="ongoing">Ongoing</option>
    //           <option value="delivered">Delivered</option>
    //         </select>
    //       </p>
    //       <p>
    //         <strong>Payment ID:</strong> {order.Payment?.transaction_code}
    //       </p>

    //       <div className="mt-2">
    //         <strong>Shipping Address:</strong>
    //         <p>
    //           {order.Address?.addressLine}, {order.Address?.city},{" "}
    //           {order.Address?.postalCode}
    //         </p>
    //       </div>

    //       <div className="mt-2">
    //         <strong>Measurement:</strong>
    //         <p>
    //           Chest: {order.Measurement?.chest}, Waist:{" "}
    //           {order.Measurement?.waist}
    //           {/* Add more fields if needed */}
    //         </p>
    //       </div>

    //       <div className="mt-2">
    //         <strong>Products:</strong>
    //         {order.OrderItems?.map((item) => (
    //           <div key={item.id} className="ml-4">
    //             <p>
    //               {item.Product?.name} (Qty: {item.quantity}) - ${item.price}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default AdminOrders;
