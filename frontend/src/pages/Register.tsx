"use client";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/stitchandfit/banner/lb2.jpg";

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/auth/register",
        formValues
      );
      console.log(response);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }

    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formValues.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    console.log("Signup with:", formValues);

    setFormValues({
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-screen">
        <img
          src={background}
          alt="Login Background"
          className="object-cover h-[735px] w-full"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-white text-center p-6 max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome Back
            </h1>
            <p className="text-lg md:text-xl">
              Sign in to continue your journey
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Create an account
          </h2>
          <p className="mt-1 text-sm text-gray-500 text-center">
            Fill in the form below to create your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                className="w-full border rounded-md px-4 py-2"
                value={formValues.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="w-full border rounded-md px-4 py-2"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="1234567890"
                className="w-full border rounded-md px-4 py-2"
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="tel"
                name="address"
                placeholder="street-7,pokhara"
                className="w-full border rounded-md px-4 py-2"
                value={formValues.address}
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
                  className="w-full border rounded-md px-4 py-2"
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
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Create account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-gray-900 underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
