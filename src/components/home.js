import React, { useEffect, useState } from "react";
import Footer from "./common/footer";
import ProductBox from "./common/productBox";
import promo from "../image/promoposter.jpg";
import { Link } from "react-router-dom";
// import countdown from "../image/countdown.png";
import BannerSlider from "./common/banner";
import Header from "./common/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [cartcall, setcartcall] = useState(false);
  const [productcall, setproductcall] = useState(false);
  const [loading, setLoading] = useState(false);
  let [noTreandingData, setNoTreandingData] = useState("");
  let [noFeaturedData, setNoFeaturedData] = useState("");
  // const [oneMonthBefore, setOneMonthBefore] = useState('');
  // const currentDate = new Date();

  // useEffect(()=> {
  //   const oneMonthBeforeDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
  //   const formattedDate = oneMonthBeforeDate.toISOString().split('T')[0];
  //   setOneMonthBefore(formattedDate);
  // },[])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        {/* header */}
        <Header
          cartcall={cartcall}
          setcartcall={setcartcall}
          setproductcall={setproductcall}
          loading={loading}
          setLoading={setLoading}
        />
        <ToastContainer />
        {/* Banner */}
        <BannerSlider />
        {/* Recenlty sold item */}
        {noTreandingData === "no_treanding" ? null : (
          <>
            <section
              className="section recent-part pt-5 top_right_bg"
              id="trending"
            >
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-heading">
                      <h2 className="account-title">Trending Products</h2>
                    </div>
                  </div>
                </div>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                  <ProductBox
                    setNoTreandingData={setNoTreandingData}
                    pricefilter={""}
                    rating={""}
                    cateFilter={""}
                    brandFilter={""}
                    Pages={"10"}
                    currentPage={"0"}
                    sortByAlpha={""}
                    sortByRating={""}
                    sortByPrice={""}
                    cartcall={cartcall}
                    setcartcall={setcartcall}
                    productcall={productcall}
                    setproductcall={setproductcall}
                    treanding={"YES"}
                    setLoading={setLoading}
                    loading={loading}

                    // start_date={currentDate}
                    // end_date={oneMonthBefore}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-btn-25">
                      <Link
                        to={"/shop"}
                        /*state={{treanding : true}}*/ className="btn btn-outline"
                      >
                        <i className="fas fa-eye"></i>
                        <span>show more</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*Promo*/}
            <div className="section promo-part">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="promo-img">
                      <Link>
                        <img src={promo} alt="promo" className="img-fluid" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <section className="section recent-part pt-5 " id="trending">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2 className="account-title">Latest Products</h2>
                </div>
              </div>
            </div>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
              <ProductBox
                // setNoData={setNoData}
                pricefilter={""}
                rating={""}
                cateFilter={""}
                brandFilter={""}
                Pages={"10"}
                currentPage={"0"}
                sortByAlpha={""}
                sortByRating={""}
                sortByPrice={""}
                cartcall={cartcall}
                setcartcall={setcartcall}
                productcall={productcall}
                setproductcall={setproductcall}
                setLoading={setLoading}
                loading={loading}

                // treanding={true}
                // start_date={currentDate}
                // end_date={oneMonthBefore}
              />
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="section-btn-25">
                  <Link
                    to={"/shop"}
                    /*state={{treanding : true}}*/ className="btn btn-outline"
                  >
                    <i className="fas fa-eye"></i>
                    <span>show more</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="section countdown-part">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto">
              <div className="countdown-content">
                <h3>special discount offer for vegetable items</h3>
                <p>
                  Reprehenderit sed quod autem molestiae aut modi minus
                  veritatis iste dolorum suscipit quis voluptatum fugiat
                  mollitia quia minima
                </p>
                <div
                  className="countdown countdown-clock"
                  data-countdown="2022/12/22"
                >
                  <span className="countdown-time">
                    <span>00</span>
                    <small>days</small>
                  </span>
                  <span className="countdown-time">
                    <span>00</span>
                    <small>hours</small>
                  </span>
                  <span className="countdown-time">
                    <span>00</span>
                    <small>minutes</small>
                  </span>
                  <span className="countdown-time">
                    <span>00</span>
                    <small>seconds</small>
                  </span>
                </div>
                <Link className="btn btn-inline" to="/shop">
                  <i className="fas fa-shopping-basket"></i>
                  <span>shop now</span>
                </Link>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <div className="countdown-img">
                <img src={countdown} alt="countdown" />
                <div className="countdown-off">
                  <span>20%</span>
                  <span>off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
        {/* Collection sold */}
        {noFeaturedData === "no_featured" ? null : (
          <section className="section recent-part">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-heading">
                    <h2 className="account-title">Featured Products</h2>
                  </div>
                </div>
              </div>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                <ProductBox
                  setNoFeaturedData={setNoFeaturedData}
                  pricefilter={""}
                  rating={""}
                  cateFilter={""}
                  brandFilter={""}
                  Pages={"10"}
                  currentPage={"0"}
                  sortByAlpha={""}
                  sortByRating={""}
                  sortByPrice={""}
                  cartcall={cartcall}
                  setcartcall={setcartcall}
                  productcall={productcall}
                  setproductcall={setproductcall}
                  feature={"yes"}
                  setLoading={setLoading}
                  loading={loading}
                />
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-btn-25">
                    <Link
                      to={"/shop"}
                      state={{ feature: "yes" }}
                      className="btn btn-outline"
                    >
                      <i className="fas fa-eye"></i>
                      <span>show more</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
