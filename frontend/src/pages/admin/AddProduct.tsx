import { useState } from "react";
import { AdminSidebar } from "./Sidebar";
import AdminLayout from "./AdminLayout";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //   const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setProduct({ ...product, imageUrl: file });
  //       setImagePreview(URL.createObjectURL(file));
  //     }
  //   };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:8081/products/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(product),
  //   });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch("http://localhost:8081/products/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Product added successfully!");
      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        imageUrl: "",
      });
    } else {
      alert("Error adding product");
    }
  };

  return (
    <AdminLayout>
      <div className="rounded-lg border border-gray-200 bg-white p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Party">Party</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Occasion">Occasion</option>
              <option value="Traditional">Traditional</option>
              <option value="Bridal">Bridal</option>
              <option value="Festives">Festives</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md min-h-[100px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
