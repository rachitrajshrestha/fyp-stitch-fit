import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

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
}

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("http://localhost:8081/dashboard/stats");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Total Products" value={stats.totalProducts} />
          <StatCard title="Total Feedbacks" value={stats.totalFeedbacks} />
          <StatCard title="Total Orders" value={stats.totalOrders} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            🏆 Top Selling Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.topSellers.map((seller) => (
              <div
                key={seller.productId}
                className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white"
              >
                <img
                  src={seller.Product.imageUrl || "/placeholder.png"}
                  alt={seller.Product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{seller.Product.name}</p>
                  <p className="text-sm text-gray-500">
                    Sold: {seller.totalSold}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: Rs {seller.Product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="p-4 bg-white border rounded-lg shadow-sm text-center">
    <p className="text-lg font-semibold">{title}</p>
    <p className="text-2xl text-blue-600 mt-1">{value}</p>
  </div>
);
