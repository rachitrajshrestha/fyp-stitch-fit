"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    if (!formValues.email || !formValues.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formValues.password.length < 1) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        formValues
      );
      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        const measurementRes = await axios.get(
          "http://localhost:8081/measurements/has-measurement",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const hasMeasurement = measurementRes.data.hasMeasurement;
        localStorage.setItem("hasMeasurement", JSON.stringify(hasMeasurement));
        navigate("/");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <p className="mt-1 text-sm text-center text-gray-500">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full rounded-md border px-4 py-2 focus:border-gray-500 focus:ring-gray-500"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full rounded-md border px-4 py-2 focus:border-gray-500 focus:ring-gray-500"
                value={formValues.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
          >
            Login
          </button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-gray-900 underline hover:text-gray-700"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
