import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Faliure } from "./component/payment/Faliure";
import { Payment } from "./component/payment/Payment";
import { Success } from "./component/payment/Success";
import ProductForm from "./pages/admin/AddProduct";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MeasurementForm from "./pages/measurement";
import ProductDescription from "./pages/Product-Description";
import { ProductPage } from "./pages/Product-Page";
import ProfilePage from "./pages/Profile/ProfilePage";
import { Register } from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import { Contact } from "./pages/Contact";
import AddressDetails from "./pages/AddressDetails";
import AdminFeedbackPage from "./pages/admin/Feedback";
import AdminOrders from "./pages/admin/Orders";
import { UserOrders } from "./pages/Profile/OrderHistory";
import { AdminRoute } from "./component/AdminRoute";
import ProductTable from "./pages/admin/AllProducts";

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
          <Route path="/add-address" element={<AddressDetails />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/faliure" element={<Faliure />}></Route>

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/order" element={<UserOrders />}></Route>
          {/* <Route path="/orders" element={<OrderPage />} /> */}

          <Route path="/search" element={<SearchResults />} />

          {/* <Route
            path="/admin/"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          /> */}
          {/* <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            /> */}
          <Route
            path="/admin/productDetails"
            element={
              <AdminRoute>
                <ProductTable />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/addProduct"
            element={
              <AdminRoute>
                <ProductForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/feedback"
            element={
              <AdminRoute>
                <AdminFeedbackPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/order"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
