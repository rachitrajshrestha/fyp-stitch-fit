import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/measurements.css";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import descImg from "../assets/stitchandfit/measurementImage/measurement description 1.jpg";
import descImg1 from "../assets/stitchandfit/measurementImage/measurement description 2.jpg";
import descImg2 from "../assets/stitchandfit/measurementImage/measurement description 3 .png";

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
  const productId = queryParams.get("productId");
  const quantity = queryParams.get("quantity");
  const [hasOldMeasurement, setHasOldMeasurement] = useState(false);

  useEffect(() => {
    const checkOldMeasurement = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:8081/measurements/check",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.hasMeasurement) {
              setHasOldMeasurement(true);
            }
          }
        } catch (error) {
          console.error("Error checking old measurement:", error);
        }
      }
    };

    checkOldMeasurement();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addToCartAfterMeasurement = async (
    productId: string,
    quantity: string
  ) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8081/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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

        if (redirectPage === "cart" && productId && quantity) {
          await addToCartAfterMeasurement(productId, quantity);
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

  const handleUseOldMeasurement = async () => {
    if (productId && quantity) {
      await addToCartAfterMeasurement(productId, quantity);
    }
  };

  return (
    <>
      <Navbar theme={"light"} setTheme={() => {}} />
      <div className="container">
        <h1 className="page-title">How to Measure</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Bust/Chest",
              description:
                "Measure around the fullest part of your bust/chest, keeping the tape measure parallel to the floor.",
              img: descImg,
              alt: "Bust/Chest measurement",
            },
            {
              title: "Waist",
              description:
                "Measure around your natural waistline, which is the narrowest part of your torso, typically 1-2 inches above your belly button.",
              img: descImg1,
              alt: "Waist measurement",
            },
            {
              title: "Hips",
              description:
                "Measure around the fullest part of your hips, approximately 7-9 inches below your waistline.",
              img: descImg2,
              alt: "Hip measurement",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-md rounded-lg p-4 bg-white"
            >
              <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Enter Your Body Measurements (Inch)
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
                className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition duration-300"
              >
                Save Measurements
              </button>
            </div>
          </form>

          {hasOldMeasurement && (
            <div className="mt-6 text-center">
              <button
                onClick={handleUseOldMeasurement}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition duration-300"
              >
                Use Old Measurement
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MeasurementForm;
