"use client";

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

interface DashboardStats {
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
    return <div className="p-6 text-center">Loading dashboard data...</div>;
  if (!stats) return <div className="p-6 text-center">No data available</div>;

  // Bar chart data
  const chartData = {
    labels: stats.mostBoughtProducts.map((product) => product.name),
    datasets: [
      {
        label: "Total Sold",
        data: stats.mostBoughtProducts.map((product) => product.totalSold),
        backgroundColor: "#60a5fa", // Simple blue color
        borderColor: "#3b82f6",
        borderWidth: 1,
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Users" value={stats.totalUsers} />
          <StatCard title="Products" value={stats.totalProducts} />
          <StatCard title="Feedbacks" value={stats.totalFeedbacks} />
          <StatCard title="Orders" value={stats.totalOrders} />
        </div>

        {/* Top Sellers Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Top Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.topSellers.map((seller) => (
              <div
                key={seller.productId}
                className="flex items-center gap-4 p-4 border rounded-lg bg-white"
              >
                <img
                  src={seller.Product.imageUrl || "/placeholder.png"}
                  alt={seller.Product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{seller.Product.name}</p>
                  <p className="text-gray-600">Sold: {seller.totalSold}</p>
                  <p className="text-gray-600">
                    Price: Rs {seller.Product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Most Bought Products</h2>
          <div className="bg-white p-4 border rounded-lg">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Product Table */}
        <div>
          <h2 className="text-xl font-semibold mb-3">All Products</h2>
          <div className="overflow-x-auto bg-white border rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left text-gray-700">Price</th>
                  <th className="px-4 py-3 text-left text-gray-700">Sales</th>
                  <th className="px-4 py-3 text-left text-gray-700">Image</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stats.topSellers.map((seller) => (
                  <tr key={seller.productId}>
                    <td className="px-4 py-3">{seller.Product.name}</td>
                    <td className="px-4 py-3">Rs {seller.Product.price}</td>
                    <td className="px-4 py-3">{seller.totalSold}</td>
                    <td className="px-4 py-3">
                      <img
                        src={seller.Product.imageUrl || "/placeholder.png"}
                        alt={seller.Product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
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

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="p-4 bg-white border rounded-lg text-center">
    <p className="text-gray-600">{title}</p>
    <p className="text-xl font-semibold mt-1">{value}</p>
  </div>
);
