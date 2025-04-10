import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/AddProduct";
import Cart from "./pages/Cart";
import MeasurementForm from "./pages/measurement";
import ProductPage from "./pages/Product-Page";
import Navbar from "./component/Navbar";
import ProductDescription from "./pages/Product-Description";
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
          <Route
            path="/measurement"
            element={
              <MeasurementForm
                productId={undefined}
                userId={undefined}
                onSubmitSuccess={undefined}
              />
            }
          ></Route>
          {/* <Route
            path="/measurement-form/:productId"
            element={
              <MeasurementForm
                userId={undefined}
                onSubmitSuccess={undefined}
                productId={undefined}
              />
            }
          /> */}

          <Route path="/admin/" element={<Dashboard />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/addProduct" element={<ProductForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
