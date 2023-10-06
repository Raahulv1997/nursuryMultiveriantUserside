import { React } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Profile from "./components/profile";
import Notfound from "./components/common/notfound";
import Login from "./components/login";
import Reset from "./components/reset";
import Signin from "./components/signin";
import Shop from "./components/shop";
import ProductDetails from "./components/common/productDetails";
import Checkout from "./components/checkout";
import Invoice from "./components/invoice";
import PrivacyPolicy from "./components/privacyPolicy";
import ContactUs from "./components/contactUs";
import ChangePassword from "./components/changePassword";
import Wishlist from "./components/Wishlist";
import ReCheckout from "./components/ReCheckout";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/recheckout" element={<ReCheckout />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/singin" element={<Signin />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/productdetails" element={<ProductDetails />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/invoice" element={<Invoice />} />
        <Route exact path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route exact path="/contact" element={<ContactUs />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route exact path="*" element={<Notfound />} />
      </Routes>
      {/* Add more routes for your other pages */}
    </Router>
  );
}

export default App;
