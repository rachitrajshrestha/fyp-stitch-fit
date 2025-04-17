import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const paymentId = localStorage.getItem("paymentId");

        if (!paymentId) {
          console.error("Payment ID not found");
          return;
        }

        const res = await axios.post(
          "http://localhost:8081/order/create",
          { paymentId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Order created:", res.data);
        // Clear cart/payment data from storage
        localStorage.removeItem("paymentId");

        // Optionally redirect or show confirmation
        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      } catch (err) {
        console.error("Failed to create order:", err);
      }
    };

    createOrder();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p>We are processing your order...</p>
    </div>
  );
};
