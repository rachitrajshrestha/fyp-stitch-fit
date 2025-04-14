import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MeasurementForm: React.FC = () => {
  const [formData, setFormData] = useState({
    chest: "",
    waist: "",
    hips: "",
    shoulderWidth: "",
    sleeveLength: "",
    inseam: "",
    neck: "",
    height: "",
    legLength: "",
    thighWidth: "",
    calvesWidth: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch("http://localhost:8081/measurements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Measurement saved successfully!");
        navigate("/profile");
      } else {
        alert("Failed to submit measurement");
      }
    } catch (error) {
      console.error("Error submitting measurement:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Enter Your Body Measurements</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "chest",
          "waist",
          "hips",
          "shoulderWidth",
          "sleeveLength",
          "inseam",
          "neck",
          "height",
          "legLength",
          "thighWidth",
          "calvesWidth",
        ].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="number"
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Measurements
        </button>
      </form>
    </div>
  );
};

export default MeasurementForm;
