import React, { useEffect, useState } from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import Otherbannner from "./common/otherbannner";
import { Link } from "react-router-dom";
import branch01 from "../image/branch/01.jpg";
import branch02 from "../image/branch/02.jpg";
import branch03 from "../image/branch/03.jpg";
import branch04 from "../image/branch/04.jpg";
import { OrderList } from "../components/api/api";
import { ToastContainer } from "react-toastify";
import ComplaintForm from "./common/complaintForm";

export default function ContactUs() {
  const [oderList, setoderList] = useState([]);
  const [apicall, setApicall] = useState([]);
  const [loading, setLoading] = useState(true);
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  /*Funtion to get order list */
  let GetOrderList = async () => {
    let response = await OrderList(headers);
    if (
      response.data.results === undefined ||
      response.data.results === "undefined" ||
      response.data.results === null ||
      response.data.results.length === 0
    ) {
      setoderList([]);
      setLoading(false);
    } else {
      setoderList(response.data.results);
      setLoading(false);
    }
  };
  useEffect(() => {
    GetOrderList();
    if (apicall === true) {
      setApicall(false);
    }
  }, [apicall]);
  return (
    <div>
      {/* header */}
      <Header
        cartcall={apicall}
        setcartcall={setApicall}
        setproductcall={setApicall}
        setLoading={setLoading}
        loading={loading}
      />
      <ToastContainer />
      {/* Banner */}
      <Otherbannner heading={"Contact us"} bread={"contact"} />
      {/* Main Section */}
      <section className="inner-section contact-part">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="contact-card">
                <i className="icofont-location-pin"></i>
                <h4>head office</h4>
                <p>1Hd- 50, 010 Avenue, NY 90001 United States</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="contact-card active">
                <i className="icofont-phone"></i>
                <h4>phone number</h4>
                <p>
                  <Link to="">
                    009-215-5596 <span>(toll free)</span>
                  </Link>
                  <Link to="">009-215-5595</Link>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="contact-card">
                <i className="icofont-email"></i>
                <h4>Support mail</h4>
                <p>
                  <Link to="">contact@example.com</Link>
                  <Link to="">info@example.com</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-map">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.3406974350205!2d90.48469931445422!3d23.663771197998262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b0d5983f048d%3A0x754f30c82bcad3cd!2sJalkuri%20Bus%20Stop!5e0!3m2!1sen!2sbd!4v1605354966349!5m2!1sen!2sbd"
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <ComplaintForm
                oderList={oderList}
                setApicall={setApicall}
                setLoading={setLoading}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="branch-card">
                <img src={branch01} alt="branch" />
                <div className="branch-overlay">
                  <h3>dhaka</h3>
                  <p>kawran bazar, 1100 east tejgaon, dhaka.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="branch-card">
                <img src={branch02} alt="branch" />
                <div className="branch-overlay">
                  <h3>Narayanganj</h3>
                  <p>west jalkuri, 1420 shiddirganj, narayanganj.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="branch-card">
                <img src={branch03} alt="branch" />
                <div className="branch-overlay">
                  <h3>chandpur</h3>
                  <p>east lautuli, 2344 faridganj, chandpur.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3">
              <div className="branch-card">
                <img src={branch04} alt="branch" />
                <div className="branch-overlay">
                  <h3>noakhli</h3>
                  <p>begumganj, 3737 shonaimuri, noakhli.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
