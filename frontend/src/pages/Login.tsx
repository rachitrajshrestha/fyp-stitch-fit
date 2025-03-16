import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
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
        "http://localhost:8081/auth/login",
        formValues
      );
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 border w-96">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button className="w-full bg-green-600 text-white py-2">
            Submit
          </button>
        </form>
        <div className="text-center">
          <span>Don't have any account?</span>
          <Link to="/register" className="text-blue-500">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
