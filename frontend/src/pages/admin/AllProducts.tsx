"use client";

import type React from "react";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Edit, Trash2, Search, Plus, X, Save, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
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

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    fetch(`http://localhost:5000/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: Number.parseFloat(formData.price),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingProduct(null);
        fetchProducts(); // Refresh product list
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
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

            {editingProduct && (
              <div className="mb-8 p-6 border border-gray-300 rounded-lg bg-gray-50">
                <form onSubmit={handleUpdate}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Edit Product
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 min-h-[100px]"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="overflow-x-auto">
              {filteredProducts.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("category")}
                          className="flex items-center gap-1 hover:text-gray-900"
                        >
                          Category
                          {sortField === "category" && (
                            <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </button>
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => handleSort("price")}
                          className="flex items-center gap-1 hover:text-gray-900 ml-auto"
                        >
                          Price
                          {sortField === "price" && (
                            <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </button>
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                              <img
                                src={`http://localhost:8081/${product.imageUrl}`}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/placeholder.svg?height=64&width=64";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                ID: {product.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {product.description}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                              title="Edit product"
                            >
                              <Edit size={18} />
                              <span className="sr-only">Edit</span>
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              title="Delete product"
                            >
                              <Trash2 size={18} />
                              <span className="sr-only">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm
                      ? "Try adjusting your search term"
                      : "Add some products to get started"}
                  </p>
                </div>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                <div>
                  Showing{" "}
                  <span className="font-medium">{filteredProducts.length}</span>{" "}
                  of <span className="font-medium">{products.length}</span>{" "}
                  products
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductTable;
