import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect } from "react";
import store from "./store/store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgetPassword from "./components/user/ForgetPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
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
            <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/me" element={<ProtectedRoute element={Profile} />} /> */}

        {/* <Route path="/me" element={<Profile />} /> */}
        {/* </Route>
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
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
