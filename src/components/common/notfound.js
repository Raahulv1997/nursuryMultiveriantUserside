import React from "react";
import { Link } from "react-router-dom";
import error from "../../image/error.png";
import Footer from "./footer";
import Header from "./header";
export default function Notfound() {
  return (
    <div>
      {/* Header */}

      {/* Main content */}
      <section className="error-part">
        <div className="container">
          <h1>404 | Not Found</h1>
          <img className="img-fluid" src={error} alt="error" />
          <h3>ooopps! this page can't be found.</h3>
          <p>It looks like nothing was found at this location.</p>
          <Link to="/">go to home</Link>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
