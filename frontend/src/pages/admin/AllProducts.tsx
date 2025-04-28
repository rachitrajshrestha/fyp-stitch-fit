"use client";

import type React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Edit, Trash2, Search, Plus, X, Save, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  status: string; // New field for status
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  const deleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:8081/products/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          setProducts(products.filter((product) => product.id !== id));
        })
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  const updateProductStatus = async (productId: number, status: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8081/products/admin/${productId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedProduct = res.data.product;

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, status: updatedProduct.status }
            : product
        )
      );
    } catch (error) {
      console.error("Failed to update product status:", error);
    }
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Product Management
            </h2>
            <Link to="/admin/addProduct">
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus size={18} />
                Add Product
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Sort by:</span>
                <div className="relative">
                  <select
                    value={`${sortField}-${sortDirection}`}
                    onChange={(e) => {
                      const [field, direction] = e.target.value.split("-");
                      setSortField(field as keyof Product);
                      setSortDirection(direction as "asc" | "desc");
                    }}
                    className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low-High)</option>
                    <option value="price-desc">Price (High-Low)</option>
                    <option value="category-asc">Category (A-Z)</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-3 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {filteredProducts.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Stock Status
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={`http://localhost:8081/${product.imageUrl}`}
                              className="h-12 w-12 object-cover rounded-md"
                              alt={product.name}
                            />
                            <span className="font-medium text-gray-800">
                              {product.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6">{product.category}</td>
                        <td className="py-4 px-6 max-w-xs text-gray-700">
                          {product.description.length > 80
                            ? `${product.description.slice(0, 80)}...`
                            : product.description}
                        </td>
                        <td className="py-4 px-6 text-right">
                          ${product.price}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <select
                            value={product.status ?? ""}
                            onChange={(e) =>
                              updateProductStatus(product.id, e.target.value)
                            }
                            className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                          >
                            <option value="instock">In Stock</option>
                            <option value="outofstock">Out of Stock</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 ml-3"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center py-6 text-gray-500">
                  No products found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductTable;
