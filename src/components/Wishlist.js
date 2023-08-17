import React, { useState } from "react";
import Header from "./common/header";
import Footer from "./common/footer";
import Otherbannner from "./common/otherbannner";

import { ToastContainer } from "react-toastify";
import ProductBox from "./common/productBox";

export default function Wishlist() {
  const [apicall, setApicall] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartcall, setcartcall] = useState(false);
  const [productcall, setproductcall] = useState(false);
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
      <Otherbannner heading={"Wishlist"} bread={"wishlist"} />
      {/* Main Section */}
      <section className="section recent-part pt-5 top_right_bg" id="trending">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2 className="account-title">Wishlist Products</h2>
              </div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <ProductBox
              //   setNoTreandingData={setNoTreandingData}
              pricefilter={""}
              rating={""}
              cateFilter={""}
              brandFilter={""}
              Pages={""}
              currentPage={""}
              sortByAlpha={""}
              sortByRating={""}
              sortByPrice={""}
              cartcall={cartcall}
              setcartcall={setcartcall}
              productcall={productcall}
              setproductcall={setproductcall}
              treanding={""}
              setLoading={setLoading}
              WishlistProduct={"yes"}
            />
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
