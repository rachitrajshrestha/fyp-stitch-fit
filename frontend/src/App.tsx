import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/AddProduct";
import Cart from "./pages/Cart";
import MeasurementForm from "./pages/measurement";
import { ProductPage } from "./pages/Product-Page";
import Navbar from "./component/Navbar";
import ProductDescription from "./pages/Product-Description";
import AddressForm from "./pages/AddressDetails";

import { Payment } from "./component/payment/Payment";
import { Success } from "./component/payment/Success";
import { Faliure } from "./component/payment/Faliure";
import SearchResults from "./pages/SearchResults";

import ProfilePage from "./pages/Profile/ProfilePage";
import OrderPage from "./pages/Profile/OrderPage";
import About from "./pages/About";
import { Contact } from "./pages/Contact";
import AdminFeedbackPage from "./pages/admin/Feedback";

const App: React.FC = () => {
  return (
    <>
      {/* <Navbar
      // theme={"light"}
      // setTheme={function (theme: "light" | "dark"): void {
      //   throw new Error("Function not implemented.");
      // }}
      ></Navbar> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/products/:productId" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/measurements" element={<MeasurementForm />}></Route>
          <Route path="/add-address" element={<AddressForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/faliure" element={<Faliure />}></Route>

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrderPage />} />

          <Route path="/search" element={<SearchResults />} />

          <Route path="/admin/" element={<Dashboard />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/addProduct" element={<ProductForm />}></Route>
          <Route path="/admin/feedback" element={<AdminFeedbackPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
