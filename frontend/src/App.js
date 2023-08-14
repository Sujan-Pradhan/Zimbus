import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import ProductDetails from "./components/product/ProductDetails";
import { useEffect, useState } from "react";
import store from "./store/store";
import { loadUser } from "./actions/userAction";

// Auth or User Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgetPassword from "./components/user/ForgetPassword";
import NewPassword from "./components/user/NewPassword";

import ProtectedRoute from "./components/route/ProtectedRoute";

//  Carts Import
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import orderSuccess from "./components/cart/orderSuccess";

// Order Import
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";

import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./components/cart/Payment";
import ListProducts from "./components/admin/ListProducts";
import NewProduct from "./components/admin/NewProduct";
import { useSelector } from "react-redux";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        {/* <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/search/:keyword?" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        <Route path="/me" element={<ProtectedRoute element={Profile} />} />

        <Route path="/me" element={<Profile />} />
        </Route>
        </Routes>
        <ProtectedRoute path="/me" element={Profile} />
        <Footer /> */}

        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgetPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <ProtectedRoute path="/me" element={Profile} />
          <ProtectedRoute path="/me/update" element={UpdateProfile} />
          <ProtectedRoute path="/password/update" element={UpdatePassword} />
          <ProtectedRoute path="/shipping" element={Shipping} />
          <ProtectedRoute path="/order/confirm" element={ConfirmOrder} />
          <ProtectedRoute path="/success" element={orderSuccess} />
          <ProtectedRoute path="/orders/me" element={ListOrder} />
          <ProtectedRoute path="/order/:id" element={OrderDetails} />

          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" element={Payment} />
            </Elements>
          )}
        </div>
        <ProtectedRoute path="/dashboard" isAdmin={true} element={Dashboard} />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          element={ListProducts}
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          element={NewProduct}
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          element={UpdateProduct}
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          element={OrderList}
        />
        {!loading && user.role !== "admin" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
