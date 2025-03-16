import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((formValues) => ({
      ...formValues,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormValues({ ...formValues, [e.target.name]: e.target.value });
  // };

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
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 border w-96">
        <h2 className="text-lg font-bold mb-4">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border"
              placeholder="Enter your username"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border"
              placeholder="Enter your email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Phone number</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border"
              placeholder="Enter your phone number"
              name="phone"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              placeholder="Enter your password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button className="w-full bg-green-600 text-white py-2 ">
              Submit
            </button>
          </div>
        </form>
        <div className="text-center">
          <span>Already have account?</span>
          <Link to="/login" className="text-blue-500">
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
