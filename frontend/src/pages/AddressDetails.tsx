import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cod",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/add-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Address saved successfully!");
        navigate("/order-summary"); // change this to where you want to redirect
      } else {
        alert("Failed to submit address");
      }
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Full Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Street Address", name: "address" },
          { label: "City", name: "city" },
          { label: "ZIP Code", name: "zip" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
                className="mr-2"
              />
              Cash on Delivery
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
                className="mr-2"
              />
              Debit/Credit Card
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
