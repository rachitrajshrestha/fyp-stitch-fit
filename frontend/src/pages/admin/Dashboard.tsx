"use client";

import type React from "react";

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Package, MessageSquare, ShoppingCart, Users } from "lucide-react";

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Product {
  name: string;
  price: number;
  imageUrl: string;
}

interface TopSeller {
  productId: number;
  totalSold: number;
  Product: Product;
}

interface User {
  id: number;
  username: string;
  email: string;
  address: string;
  phone: number;
}

interface DashboardStats {
  users: User[];
  totalUsers: number;
  totalProducts: number;
  totalFeedbacks: number;
  totalOrders: number;
  topSellers: TopSeller[];
  mostBoughtProducts: { name: string; totalSold: number }[];
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8081/dashboard/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-800">
          Loading dashboard data...
        </p>
      </div>
    );

  if (!stats)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-800">No data available</p>
      </div>
    );

  // Bar chart data
  const chartData = {
    labels: stats.mostBoughtProducts.map((product) => product.name),
    datasets: [
      {
        label: "Total Sold",
        data: stats.mostBoughtProducts.map((product) => product.totalSold),
        backgroundColor: "#1f2937", // gray-800
        borderWidth: 0,
        borderRadius: 4,
      },
    ],
  };

  // Only show top 3 sellers
  const topThreeSellers = stats.topSellers.slice(0, 3);

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Users"
            value={stats.totalUsers}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Products"
            value={stats.totalProducts}
            icon={<Package className="h-5 w-5" />}
          />
          <StatCard
            title="Feedbacks"
            value={stats.totalFeedbacks}
            icon={<MessageSquare className="h-5 w-5" />}
          />
          <StatCard
            title="Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart className="h-5 w-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Sellers Section */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  Top Selling Products
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {topThreeSellers.map((seller, index) => (
                  <div
                    key={seller.productId}
                    className="flex items-start gap-3"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={
                            `http://localhost:8081/${seller.Product.imageUrl}` ||
                            "/placeholder.png"
                          }
                          alt={seller.Product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {seller.Product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Sold: {seller.totalSold}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: Rs {seller.Product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  Most Bought Products
                </h2>
              </div>
              <div className="p-4">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: "rgba(0, 0, 0, 0.05)",
                        },
                      },
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Phone no.
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 text-sm">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="ml-2 text-sm text-gray-800">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.address}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="flex items-center">
      <div className="p-2 rounded-md bg-gray-100 text-gray-800">{icon}</div>
      <div className="ml-3">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);
