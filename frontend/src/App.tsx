import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import Register from "./pages/Register";
import AddProduct from "./pages/admin/AddProduct";
import Layout from "./pages/admin/layout";
import Dashboard from "./pages/admin/Dashboard";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin/" element={<Layout children={undefined} />}></Route>
        <Route path="/admin/addProduct" element={<AddProduct />}></Route>
        <Route path="/admin/Dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
