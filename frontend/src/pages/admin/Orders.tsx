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

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  ongoing: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
};

const statusIcons: Record<string, JSX.Element> = {
  pending: <Clock className="h-4 w-4 mr-1" />,
  ongoing: <Truck className="h-4 w-4 mr-1" />,
  delivered: <CheckCircle2 className="h-4 w-4 mr-1" />,
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

        // Enhance user objects with latest address and measurement
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
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {orders.length} Total Orders
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 max-w-md">
            {["all", "pending", "ongoing", "delivered"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full rounded-md px-3 py-1.5 text-sm font-medium ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full bg-white rounded-lg border shadow-sm p-4 animate-pulse"
              >
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="flex flex-col items-center justify-center py-10">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No orders found
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                There are no orders matching your current filter.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border shadow-sm overflow-hidden"
              >
                {/* Card Header */}
                <div className="border-b px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h3 className="text-lg font-medium">Order #{order.id}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusIcons[order.status]}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2 md:mt-0 text-sm text-gray-500">
                    Rs {order.totalAmount.toFixed(2)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-4 md:px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-2">
                      <UserIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm text-gray-500">
                          {order.User?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.User?.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Payment</p>
                        <p className="text-sm text-gray-500">
                          {order.Payment?.transaction_code || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="flex items-center">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order.id, e.target.value)
                          }
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Accordion */}
                  <div className="border-t mt-2 pt-2">
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="flex w-full justify-between items-center py-2 text-sm font-medium text-left text-gray-700 hover:text-gray-900"
                    >
                      Order Details
                      <svg
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          expandedOrders[order.id] ? "transform rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {expandedOrders[order.id] && (
                      <div className="pt-2 pb-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <h4 className="text-sm font-medium">
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
                              <Ruler className="h-4 w-4 text-gray-500" />
                              <h4 className="text-sm font-medium">
                                Measurements
                              </h4>
                            </div>
                            {order.User?.latestMeasurement ? (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 ml-6">
                                <p>
                                  Chest: {order.User.latestMeasurement.chest}
                                </p>
                                <p>
                                  Waist: {order.User.latestMeasurement.waist}
                                </p>
                                <p>Hips: {order.User.latestMeasurement.hips}</p>
                                <p>
                                  Shoulder:{" "}
                                  {order.User.latestMeasurement.shoulderWidth}
                                </p>
                                <p>
                                  Sleeve:{" "}
                                  {order.User.latestMeasurement.sleeveLength}
                                </p>
                                <p>
                                  Inseam: {order.User.latestMeasurement.inseam}
                                </p>
                                <p>Neck: {order.User.latestMeasurement.neck}</p>
                                <p>
                                  Height: {order.User.latestMeasurement.height}
                                </p>
                                <p>
                                  Leg: {order.User.latestMeasurement.legLength}
                                </p>
                                <p>
                                  Thigh:{" "}
                                  {order.User.latestMeasurement.thighWidth}
                                </p>
                                <p>
                                  Calves:{" "}
                                  {order.User.latestMeasurement.calvesWidth}
                                </p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 ml-6">
                                No measurements available
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-6">
                          <div className="flex items-center gap-2 mb-4">
                            <ShoppingBag className="h-4 w-4 text-gray-500" />
                            <h4 className="text-sm font-medium">Products</h4>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Product
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {order.OrderItems?.length ? (
                                  order.OrderItems.map((item) => (
                                    <tr key={item.id}>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                          {item.Product?.imageUrl ? (
                                            <img
                                              src={
                                                `http://localhost:8081/${item.Product.imageUrl}` ||
                                                "/placeholder.svg"
                                              }
                                              alt={item.Product.name}
                                              className="w-10 h-10 object-cover rounded-md"
                                            />
                                          ) : (
                                            <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                                              <Package className="h-5 w-5 text-gray-400" />
                                            </div>
                                          )}
                                          <span className="text-sm font-medium">
                                            {item.Product?.name}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                        {item.quantity}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                        Rs {item.price.toFixed(2)}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan={3}
                                      className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
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
