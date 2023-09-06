import React, { useState, useEffect } from "react";
import Header from "./header";
import ProfileBanner from "../../image/profile-banner.jpg";
import Footer from "./footer";
import { Link, useSearchParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductBox from "./productBox";
import ProductDetailsBox from "./productDetailsBox";
import { ToastContainer } from "react-toastify";
export default function ProductDetails() {
  const [searchparams] = useSearchParams();
  const [cartcall, setcartcall] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productDetailCall, setProductDetailCall] = useState(false);

  // const [id, setId] = useState(localStorage.getItem("product_id"));
  // const [var_id, setVar_Id] = useState(localStorage.getItem("product_var_id"));
  const [proCate, setproCate] = useState();
  const Product_id = searchparams.get("product_id");
  const variant_id = searchparams.get("variant_id");
  /*Function to open the page from the top */
  useEffect(() => {
    window.scrollTo(0, 10);
  }, [Product_id, variant_id, productDetailCall]);

  /*Function o send category to the shop page to get the related products as per the detail page */
  const ViewAllRelatedProducts = () => {
    // Assuming proCate is the category you want to pass as a query parameter.
    const searchCat = proCate;

    // Construct the URL with the category as a query parameter.
    const url = `/shop?category=${encodeURIComponent(searchCat)}`;

    // Navigate to the new URL with state and query parameter.
    window.location.href = url;
  };
  return (
    <div>
      {/* Header */}
      <Header
        cartcall={cartcall}
        setcartcall={setcartcall}
        setproductcall={setProductDetailCall}
        loading={loading}
        setLoading={setLoading}
      />
      <ToastContainer />

      {/* Banner */}
      <section
        className="inner-section single-banner"
        style={{ background: `url(${ProfileBanner}) no-repeat center` }}
      >
        <div className="container">
          <h2>Product Details</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product detail
            </li>
          </ol>
        </div>
      </section>
      {/* Product details */}
      <section className="inner-section">
        <div className="container">
          <ProductDetailsBox
            id={Product_id}
            var={variant_id}
            page={"details"}
            setcartcall={setcartcall}
            productDetailCall={productDetailCall}
            setProductDetailCall={setProductDetailCall}
            setLoading={setLoading}
            setproCate={setproCate}
            modal={"no"}
          />
        </div>
      </section>

      {/* More Products */}
      <section className="inner-section">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-heading">
                <h2>related this items </h2>
              </div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductBox
              setId={Product_id}
              setVar_Id={variant_id}
              pricefilter={""}
              rating={""}
              cateFilter={proCate}
              brandFilter={""}
              Pages={"10"}
              currentPage={"0"}
              sortByAlpha={""}
              sortByRating={""}
              sortByPrice={""}
              setcartcall={setcartcall}
              setProductDetailCall={setProductDetailCall}
              setLoading={setLoading}
              WishlistProduct={"no"}
            />
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="section-btn-25">
                <Link
                  to="/shop"
                  onClick={ViewAllRelatedProducts}
                  className="btn btn-outline"
                >
                  <i className="fas fa-eye"></i>
                  <span>view all related </span>
                </Link>
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
