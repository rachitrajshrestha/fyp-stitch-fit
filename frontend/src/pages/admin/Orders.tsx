"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import {
  Package,
  UserIcon,
  CreditCard,
  MapPin,
  Ruler,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  ChevronDown,
} from "lucide-react";

interface Address {
  address: string;
  city: string;
  zip: string;
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

interface User {
  name: string;
  email: string;
  Addresses?: Address[];
  Measurements?: Measurement[];
  latestAddress?: Address;
  latestMeasurement?: Measurement;
}

interface Payment {
  transaction_code: string;
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
  Payment?: Payment;
  OrderItems: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt?: string;
}

const statusIcons: Record<string, JSX.Element> = {
  pending: <Clock className="h-4 w-4" />,
  ongoing: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle2 className="h-4 w-4" />,
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8081/orders/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedOrders = res.data.map((order: Order) => ({
          ...order,
          User: {
            ...order.User,
            latestAddress: order.User?.Addresses?.[0],
            latestMeasurement: order.User?.Measurements?.[0],
          },
        }));

        setOrders(updatedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8081/orders/${orderId}`,
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

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Orders Management
          </h1>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
              {orders.length} Total Orders
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-md bg-gray-100 p-1 max-w-md">
            {["all", "pending", "ongoing", "delivered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === tab
                    ? "bg-gray-800 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="w-full bg-white rounded-md shadow-sm p-4">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-md shadow-sm p-6 text-center">
            <Package className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-800">
              No orders found
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              There are no orders matching your current filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-md shadow-sm overflow-hidden"
              >
                {/* Card Header */}
                <div className="border-b px-4 py-3 flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h3 className="text-base font-medium text-gray-800">
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center">
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-600">
                        {statusIcons[order.status]}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 text-sm font-medium">
                    Rs {order.totalAmount.toFixed(2)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-4 py-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="flex items-start gap-2">
                      <UserIcon className="h-4 w-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Customer
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.User?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.User?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CreditCard className="h-4 w-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Payment
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.Payment?.transaction_code || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="block w-full rounded-md shadow-sm px-3 py-1.5 text-sm text-gray-800 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Accordion */}
                  <div className="border-t mt-2 pt-2">
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="flex w-full justify-between items-center py-2 text-sm font-medium text-left text-gray-700 hover:text-gray-900"
                    >
                      Order Details
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform ${
                          expandedOrders[order.id] ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedOrders[order.id] && (
                      <div className="pt-2 pb-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-gray-600" />
                              <h4 className="text-sm font-medium text-gray-800">
                                Shipping Address
                              </h4>
                            </div>
                            {order.User?.latestAddress ? (
                              <div className="text-sm text-gray-600 ml-6">
                                <p>{order.User.latestAddress.address}</p>
                                <p>
                                  {order.User.latestAddress.city},{" "}
                                  {order.User.latestAddress.zip}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 ml-6">
                                No address available
                              </p>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Ruler className="h-4 w-4 text-gray-600" />
                              <h4 className="text-sm font-medium text-gray-800">
                                Measurements
                              </h4>
                            </div>
                            {order.User?.latestMeasurement ? (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 ml-6">
                                {Object.entries(
                                  order.User.latestMeasurement
                                ).map(([key, value]) => (
                                  <p key={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    : {value}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 ml-6">
                                No measurements available
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center gap-2 mb-3">
                            <ShoppingBag className="h-4 w-4 text-gray-600" />
                            <h4 className="text-sm font-medium text-gray-800">
                              Products
                            </h4>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                    Product
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                    Qty
                                  </th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {order.OrderItems?.length ? (
                                  order.OrderItems.map((item) => (
                                    <tr key={item.id}>
                                      <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                                            {item.Product?.imageUrl ? (
                                              <img
                                                src={`http://localhost:8081/${item.Product.imageUrl}`}
                                                alt={item.Product.name}
                                                className="w-8 h-8 object-cover rounded-md"
                                              />
                                            ) : (
                                              <Package className="h-4 w-4 text-gray-400" />
                                            )}
                                          </div>
                                          <span className="text-sm text-gray-800">
                                            {item.Product?.name}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-600">
                                        {item.quantity}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-right text-sm text-gray-600">
                                        Rs {item.price.toFixed(2)}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={3}
                                      className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-500"
                                    >
                                      No products found
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
