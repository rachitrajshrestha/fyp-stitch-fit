import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/measurements.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPage = queryParams.get("redirect");

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
        localStorage.setItem("hasMeasurement", "true");
        alert("Measurement saved successfully!");

        if (redirectPage === "cart") {
          navigate("/cart");
        } else {
          navigate("/profile");
        }
      } else {
        alert("Failed to submit measurement");
      }
    } catch (error) {
      console.error("Error submitting measurement:", error);
    }
  };

  return (
    <>
      <Navbar
        theme={"light"}
        setTheme={function (theme: "light" | "dark"): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="container">
        <h1 className="page-title">Your Measurements</h1>
        <p className="page-description">
          Take accurate measurements to ensure your custom clothing fits
          perfectly. Follow the guide below.
        </p>

        {/* Measurement Guide */}
        <div className="guide-section">
          <h2 className="section-title">How to Measure</h2>
          <div className="guide-cards">
            <div className="guide-card">
              <div className="img-container">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="How to measure chest/bust"
                  className="guide-img"
                />
              </div>
              <h3 className="guide-title">1. Chest/Bust</h3>
              <p className="guide-description">
                Measure around the fullest part of your chest/bust, keeping the
                tape measure horizontal.
              </p>
            </div>

            <div className="guide-card">
              <div className="img-container">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="How to measure waist"
                  className="guide-img"
                />
              </div>
              <h3 className="guide-title">2. Waist</h3>
              <p className="guide-description">
                Measure around your natural waistline, keeping the tape measure
                comfortably loose.
              </p>
            </div>

            <div className="guide-card">
              <div className="img-container">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="How to measure hips"
                  className="guide-img"
                />
              </div>
              <h3 className="guide-title">3. Hips</h3>
              <p className="guide-description">
                Measure around the fullest part of your hips, keeping the tape
                measure horizontal.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Enter Your Body Measurements (cm)
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "chest", label: "Chest/Bust", placeholder: "e.g., 92" },
                { name: "waist", label: "Waist", placeholder: "e.g., 76" },
                { name: "hips", label: "Hips", placeholder: "e.g., 98" },
                {
                  name: "shoulderWidth",
                  label: "Shoulder Width",
                  placeholder: "e.g., 42",
                },
                {
                  name: "sleeveLength",
                  label: "Sleeve Length",
                  placeholder: "e.g., 60",
                },
                { name: "inseam", label: "Inseam", placeholder: "e.g., 78" },
                { name: "neck", label: "Neck", placeholder: "e.g., 38" },
                { name: "height", label: "Height", placeholder: "e.g., 175" },
                {
                  name: "legLength",
                  label: "Leg Length",
                  placeholder: "e.g., 100",
                },
                {
                  name: "thighWidth",
                  label: "Thigh Width",
                  placeholder: "e.g., 55",
                },
                {
                  name: "calvesWidth",
                  label: "Calves Width",
                  placeholder: "e.g., 40",
                },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-gray-700 font-medium mb-1"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type="number"
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Save Measurements
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MeasurementForm;
