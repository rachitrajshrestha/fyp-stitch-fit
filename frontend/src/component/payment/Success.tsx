import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Success = () => {
  const navigate = useNavigate();
  const paymentHandledRef = useRef(false);

  useEffect(() => {
    if (paymentHandledRef.current) return;
    paymentHandledRef.current = true;

    const queryParams = new URLSearchParams(window.location.search);
    const encodedData = queryParams.get("data");

    try {
      if (!encodedData) return;

      const decoded = JSON.parse(atob(encodedData));

      handlePaymentSuccess(decoded);
    } catch (err) {
      console.error("Error handling payment success:", err);
    }
  }, []);

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      const token = localStorage.getItem("token");

      const paymentRes = await axios.post(
        "http://localhost:8081/payment",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (paymentRes.status === 200) {
        const paymentId = paymentRes.data.id;

        const orderRes = await axios.post(
          "http://localhost:8081/orders/create-order-after-payment",
          {
            paymentId,
          },
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
      }
    } catch (err) {
      console.error("Error handling payment success:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold">Processing your payment...</h1>
    </div>
  );
};
