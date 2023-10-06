import React from "react";
import { Link } from "react-router-dom";
// import logo from "../. ,ko0./image/logo.png";
// import google from "../../image/google-store.png";
// import appStore from "../../image/app-store.png";
// import payment01 from "../../image/payment/jpg/01.jpg";
// import payment02 from "../../image/payment/jpg/02.jpg";
// import payment03 from "../../image/payment/jpg/03.jpg";
// import payment04 from "../../image/payment/jpg/04.jpg";
// import newspaper from "../../image/newsletter.jpg";
const Footer = () => {
  return (
    <>
      {/* Discount */}
      {/* <section
        className="news-part"
        style={{ background: `url(${newspaper}) no-repeat center` }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 col-lg-6 col-xl-7">
              <div className="news-text">
                <h2>Get 20% Discount for Subscriber</h2>
                <p>Lorem ipsum dolor consectetur adipisicing accusantium</p>
              </div>
            </div>
            <div className="col-md-7 col-lg-6 col-xl-5">
              <form className="news-form">
                <input type="text" placeholder="Enter Your Email Address" />
                <button>
                  <span>
                    <i className="icofont-ui-email"></i>Subscribe
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> */}
      {/* Delivery */}
      {/* <section className="intro-part">
        <div className="container">
          <div className="row intro-content">
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon">
                  <i className="fas fa-truck"></i>
                </div>
                <div className="intro-content">
                  <h5>free home delivery</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <div className="intro-content">
                  <h5>instant return policy</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="intro-content">
                  <h5>quick support system</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="intro-wrap">
                <div className="intro-icon">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="intro-content">
                  <h5>secure payment way</h5>
                  <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <footer className="footer-part">
        <div className="container">
          <div className="row justify-content-between">
            {/* <div className="col-sm-6 col-xl-3">
              <div className="footer-widget">
                <Link className="footer-logo" to={""}>
                  <img src={logo} alt="logo" />
                </Link>
                <p className="footer-desc">
                  Adipisci asperiores ipsum ipsa repellat consequatur
                  repudiandae quisquam assumenda dolor perspiciatis sit ipsum
                  dolor amet.
                </p>
                <ul className="footer-social">
                  <li>
                    <Link className="icofont-facebook" to={""}></Link>
                  </li>
                  <li>
                    <Link className="icofont-twitter" to={""}></Link>
                  </li>
                  <li>
                    <Link className="icofont-linkedin" to={""}></Link>
                  </li>
                  <li>
                    <Link className="icofont-instagram" to={""}></Link>
                  </li>
                  <li>
                    <Link className="icofont-pinterest" to={""}></Link>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="col-sm-6 col-xl-3">
              <div className="footer-widget contact">
                <h3 className="footer-title">contact us</h3>
                <ul className="footer-contact">
                  <li>
                    <i className="icofont-ui-email"></i>
                    <p>
                      <span>support@indiakinursury.com</span>
                      <span>carrer@indiakinursury.com</span>
                    </p>
                  </li>
                  <li>
                    <i className="icofont-ui-touch-phone"></i>
                    <p>
                      <span>+91 279 532 13</span>
                      <span>+91 279 532 14</span>
                    </p>
                  </li>
                  <li>
                    <i className="icofont-location-pin"></i>
                    <p>45 PU4 Scheme No. 54 Vijay Nagar Indore</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="footer-widget">
                <h3 className="footer-title">quick Links</h3>
                <div className="footer-links">
                  <ul>
                    <li>
                      <Link to={"/profile"}>My Account</Link>
                    </li>
                    <li>
                      <Link to={"/profile?ClickedBy=checkout"}>
                        Order History
                      </Link>
                    </li>
                    {/* <li>
                      <Link to={""}>Order Tracking</Link>
                    </li> */}
                    <li>
                      <Link to={"#trending"}>Best Seller</Link>
                    </li>
                    <li>
                      <Link to={"/shop"}>New Arrivals</Link>
                    </li>
                  </ul>
                  <ul>
                    {/* <li>
                      <Link to={""}>Location</Link>
                    </li>
                    <li>
                      <Link to={""}>Affiliates</Link>
                    </li> */}
                    <li>
                      <Link to={"/contact"}>Contact</Link>
                    </li>
                    {/* <li>
                      <Link to={""}>Carrer</Link>
                    </li>
                    <li>
                      <Link to={""}>Faq</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="footer-widget">
                <h3 className="footer-title">Download App</h3>
                <p className="footer-desc">
                  Shop wide range of natural plants, miniature garden toys,
                  pebbles & bulbs online in India. We delivers 6000+ nursery
                  plants across all major cities in India!
                </p>
                {/* <div className="footer-app">
                  <Link to={""}>
                    <img src={google} alt="google" />
                  </Link>
                  <Link to={""}>
                    <img src={appStore} alt="app" />
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="footer-bottom">
                <p className="footer-copytext">
                  © All Copyrights Reserved by
                  <Link to={"/"}>WE2CODE</Link>
                </p>
                {/* <div className="footer-card">
                  <Link to={""}>
                    <img src={payment01} alt="payment" />
                  </Link>
                  <Link to={""}>
                    <img src={payment02} alt="payment" />
                  </Link>
                  <Link to={""}>
                    <img src={payment03} alt="payment" />
                  </Link>
                  <Link to={""}>
                    <img src={payment04} alt="payment" />
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
