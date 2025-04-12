import React, { useState } from "react";

interface MeasurementFormProps {
  userId: number;
  onSubmitSuccess: () => void;
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({
  userId,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    length: "",
    breadth: "",
    waist: "",
    arms: "",
    legs: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Payload to send to the backend
    const measurementData = { ...formData, userId };

    try {
      const response = await fetch("http://localhost:8081/measurements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(measurementData),
      });

      if (response.ok) {
        alert("Measurement added successfully!");
        onSubmitSuccess(); // Trigger any function to update the UI or navigate
      } else {
        alert("Error adding measurement");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Enter Measurements</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["length", "breadth", "waist", "arms", "legs"].map((field) => (
          <div key={field}>
            <label className="block text-gray-700">{field}</label>
            <input
              type="number"
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MeasurementForm;
