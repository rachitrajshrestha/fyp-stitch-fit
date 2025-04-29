"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Phone, Home, MapPinned, Building, X } from "lucide-react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import esewa from "../assets/esewa-icon.png";
import axios from "axios";

export default function AddressPage() {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice;

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cod",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Show modal if online payment is selected
    if (name === "paymentMethod" && value === "online") {
      setShowModal(true);
    }
  };

  const saveAddress = async (formData: any, token: string) => {
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
        return { success: true };
      } else {
        return { success: false, error: "Failed to submit address" };
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      return { success: false, error: "An error occurred" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveAddress(formData, token);

      if (!result.success) {
        alert("Failed to submit address");
        return;
      }

      if (formData.paymentMethod === "cod") {
        const orderRes = await axios.post(
          "http://localhost:8081/orders/create-cod-order",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (orderRes.status === 200) {
          const orderId = orderRes?.data?.orderId;
          if (!orderId) {
            console.error("Order ID not found!");
            return;
          }
          navigate(`/order-success?orderId=${orderId}`);
        } else {
          console.error("Order creation failed:", orderRes.data);
        }
      } else {
        setShowModal(true); // for online
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred while saving your address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEsewaPayment = async () => {
    if (formData.paymentMethod !== "online") {
      setFormData((prev) => ({ ...prev, paymentMethod: "online" }));
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in.");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await saveAddress(formData, token);

      if (result.success) {
        navigate("/payment", { state: { totalAmount: totalPrice } });
      } else {
        alert("Failed to submit address. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred while processing your request");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
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
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">
                Delivery Address
              </h2>
              <p className="text-gray-200 text-sm mt-1">
                Please enter your shipping details
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Personal Information
                  </h3>

                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-medium mb-1">
                      <User className="w-4 h-4 mr-2 text-gray-600" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-gray-900 placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-medium mb-1">
                      <Mail className="w-4 h-4 mr-2 text-gray-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-gray-900 placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-medium mb-1">
                      <Phone className="w-4 h-4 mr-2 text-gray-600" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-gray-900 placeholder-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Shipping Address
                  </h3>

                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-medium mb-1">
                      <Home className="w-4 h-4 mr-2 text-gray-600" />
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-gray-900 placeholder-gray-400"
                      placeholder="123 Main St, Apt 4B"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-medium mb-1">
                      <Building className="w-4 h-4 mr-2 text-gray-600" />
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-gray-900 placeholder-gray-400"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-medium mb-1">
                      <MapPinned className="w-4 h-4 mr-2 text-gray-600" />
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors text-gray-900 placeholder-gray-400"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">
                  Payment Method
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "border-gray-600 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        formData.paymentMethod === "cod"
                          ? "border-gray-700"
                          : "border-gray-400"
                      }`}
                    >
                      {formData.paymentMethod === "cod" && (
                        <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === "online"
                        ? "border-gray-600 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === "online"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        formData.paymentMethod === "online"
                          ? "border-gray-700"
                          : "border-gray-400"
                      }`}
                    >
                      {formData.paymentMethod === "online" && (
                        <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Online Payment
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay now with digital wallet
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${Number.parseFloat(totalPrice).toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Back to Cart
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Save & Continue"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Your personal data will be used to process your order, support
              your experience, and for other purposes described in our privacy
              policy.
            </p>
          </div>
        </div>

        {/* eSewa Payment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden border border-gray-200">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Choose Payment Method
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    Select your preferred payment method to complete your order.
                  </p>

                  <div
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={handleEsewaPayment}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <img src={esewa} alt="esewa" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">eSewa</p>
                        <p className="text-sm text-gray-500">
                          Pay with your eSewa account
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEsewaPayment}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Continue with eSewa"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
