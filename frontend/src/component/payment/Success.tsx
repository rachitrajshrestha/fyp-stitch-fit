import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const encodedData = queryParams.get("data");
    try {
      if (!encodedData) return;

      const decoded = JSON.parse(atob(encodedData));

      console.log(decoded);

      handlePaymentSuccess(decoded);
    } catch (err) {
      console.error("Error handling payment success:", err);
    }
  });

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
          navigate("/profile/order");
        } else {
          console.error("Order creation failed:", orderRes.data);
        }
      }
    } catch (err) {
      console.error("Error handling payment success:", err);
    }
  };
  //   fetch("http://localhost:8081/orders/create-order-after-payment", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ paymentData: decoded }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to process payment/order");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("Order Created:", data);
  //       navigate("/order-summary");
  //     })
  //     .catch((err) => console.error("Error during post-payment process:", err));
  // }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold">Processing your payment...</h1>
    </div>
  );
};
