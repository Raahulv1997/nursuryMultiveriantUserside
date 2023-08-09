import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./common/header";
import Otherbannner from "./common/otherbannner";
import ProductBox from "./common/productBox";
import shoppromo from "../image/shoppromo.jpg";
import { CategoryList } from "./api/api";
import Pagination from "./common/pagination";
import { ToastContainer } from "react-toastify";
import Footer from "./common/footer";
export default function Shop() {
  let [price, setPrice] = useState("");
  let [rating, setRating] = useState([]);
  let [cateFilter, setCateFilter] = useState([]);
  // let [brandFilter, setBrandFilter] = useState([]);
  let [catData, setCatData] = useState([]);
  // let [brandData, setBrandData] = useState([]);
  let [serachCate, setSerachCate] = useState([]);
  // let [serachBrand, setSerachBrand] = useState([]);
  let [sort, setSort] = useState("");
  const [priceError, setPriceError] = useState("");
  const [filertOpen, setFilertOpen] = useState(false);
  const [cartcall, setcartcall] = useState(false);
  const [productcall, setproductcall] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState({});
  let [pageNo, setPageNo] = useState("12");
  const [currentPage, setCurrentPage] = useState(0);
  const [pricefilter, setpricefilter] = useState({
    to_product_price: 0,
    from_product_price: 0,
  });

  /*Function to add and remove class */
  const AddBodyClass = () => {
    var element = document.getElementById("main_body");
    element.classList.add("body_overflow");
  };
  const RemoveBodyClass = () => {
    var element = document.getElementById("main_body");
    element.classList.remove("body_overflow");
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(
    paginationData ? paginationData.count_rows / pageNo : null
  );
  /*Function to get the Filter List */
  const getFilterData = async () => {
    let response = await CategoryList();
    // setBrandData(response.data.brand_data);
    setCatData(response.data.response);
  };
  /*Render functionto get Filter list */
  useEffect(() => {
    getFilterData();
    window.scrollTo(0, 0);
  }, [currentPage]);

  /*Functionality to get data filtered by price*/
  const onPriceFilterAdd = (e) => {
    setpricefilter({ ...pricefilter, [e.target.name]: e.target.value });
    setCurrentPage(0);
    setPriceError("");
  };
  /*FUnction to clear the price filter  */
  const OnClearPriceFIlter = () => {
    setPrice("");
    setpricefilter({
      ...pricefilter,
      to_product_price: 0,
      from_product_price: 0,
    });
    setproductcall(true);
    setPriceError("");
  };

  //onPrice submit click funtion for validate the min and max price and checking than set the price value
  const OnPriceFilterCheck = () => {
    if (
      pricefilter.from_product_price === 0 ||
      pricefilter.to_product_price === 0
    ) {
      setPriceError("price is blank");
    } else if (pricefilter.from_product_price < 0) {
      setPriceError("min is negative");
    } else if (pricefilter.to_product_price < 0) {
      setPriceError("max is negative");
    } else if (
      Number(pricefilter.from_product_price) >=
      Number(pricefilter.to_product_price)
    ) {
      console.log("min----(" + pricefilter.from_product_price);
      console.log("max----(" + pricefilter.to_product_price);

      setPriceError("Min les than max");
    } else {
      setPrice(pricefilter);
    }
  };
  /*Functionality to get data filtered by Rating*/
  const onRatingChange = (e) => {
    if (e.target.type === "checkbox") {
      const selectedValues = Array.from(
        document.querySelectorAll('input[name="rating"]:checked')
      ).map((checkbox) => checkbox.value);
      console.log(selectedValues);
      setRating(JSON.stringify(selectedValues));
      setCurrentPage(0);
    } else {
      setRating([]);
    }
  };

  /*Functionality to Clear Rating filter*/
  const uncheckAll = () => {
    // Get all checkbox elements
    var checkboxes = document.querySelectorAll('input[name="rating"]');

    // Loop through each checkbox and uncheck it
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
    setRating([]);
  };

  /*Functionality to get data filtered by Category*/
  const onCategoryChange = (e) => {
    if (e.target.type === "checkbox") {
      const selectedValues = Array.from(
        document.querySelectorAll('input[name="category"]:checked')
      ).map((checkbox) => checkbox.value);
      setCateFilter(selectedValues);
      setCurrentPage(0);
    } else {
      setCateFilter([]);
    }
  };

  /*Function to serch the category */
  const onSerchCategory = (e) => {
    const value = e.target.value;
    setSerachCate(value);
    // console.log("data---" + JSON.stringify(catData));
    const filteredData = catData.filter((item) =>
      item.category_name.toLowerCase().includes(value.toLowerCase())
    );
    setCatData(filteredData);
    setCurrentPage(0);
    // getFilterData();
  };
  /*Functionality to Clear Category filter*/
  const uncheckAllCategory = () => {
    // Get all checkbox elements
    var checkboxes = document.querySelectorAll('input[name="category"]');

    // Loop through each checkbox and uncheck it
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
    setCateFilter([]);
  };

  useEffect(() => {
    setCurrentPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  /*Function to open the mobile filter sidebar */
  const OpenMobileFilter = () => {
    setFilertOpen(true);
    AddBodyClass();
  };
  /*Function to close the fade back drop */
  const CloseBackDrop = () => {
    setFilertOpen(false);
    RemoveBodyClass();
  };

  /*Function to serch the Brand */
  // const onSerchBrand = (e) => {
  //   const value = e.target.value;
  //   setSerachBrand(value);
  //   const filteredData = brandData.filter((item) =>
  //     item.brand.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setBrandData(filteredData);
  //   setCurrentPage(0)
  // };

  /*Functionality to get data filtered by Brand*/
  // const onBrandChange = (e) => {
  //   if (e.target.type === "checkbox") {
  //     const selectedValues = Array.from(
  //       document.querySelectorAll('input[name="brand"]:checked')
  //     ).map((checkbox) => checkbox.value);
  //     setBrandFilter(selectedValues);
  //     setCurrentPage(0)
  //   } else {
  //     setBrandFilter([]);
  //   }
  // };

  /*Functionality to Clear Brand filter*/
  // const uncheckAllBrand = () => {
  //   // Get all checkbox elements
  //   var checkboxes = document.querySelectorAll('input[name="brand"]');

  //   // Loop through each checkbox and uncheck it
  //   checkboxes.forEach(function (checkbox) {
  //     checkbox.checked = false;
  //   });
  //   setBrandFilter([]);
  // };

  return (
    <>
      <div>
        {/* Hrader */}
        <Header
          cartcall={cartcall}
          setcartcall={setcartcall}
          setproductcall={setproductcall}
          loading={loading}
          setLoading={setLoading}
        />
        <ToastContainer />
        {/* Banner */}
        <Otherbannner heading={"Shop"} bread={"shop"} />
        {/* Main section  */}
        <section className="inner-section shop-part">
          <div className="container">
            <div className="row content-reverse">
              {
                <div
                  className={
                    filertOpen
                      ? "mobile_filter_slider col-lg-3 category-sidebar active"
                      : "mobile_filter_slider category-sidebar col-lg-3"
                  }
                >
                  <div className="w-100 text-end main_filter_close">
                    <button className="" onClick={CloseBackDrop}>
                      <i className="icofont-close"></i>
                    </button>
                  </div>
                  {/* Filter by Price */}
                  <div className="shop-widget">
                    <h6 className="shop-widget-title border-0">
                      Filter by Price
                    </h6>
                    <form>
                      <div className="shop-widget-group d-flex mb-2 gap-1">
                        <input
                          type="number"
                          min={0}
                          placeholder="Min"
                          value={pricefilter.from_product_price || ""}
                          onChange={(e) => onPriceFilterAdd(e)}
                          name="from_product_price"
                        />

                        <input
                          type="number"
                          min={0}
                          placeholder="Max"
                          value={pricefilter.to_product_price || ""}
                          onChange={(e) => onPriceFilterAdd(e)}
                          name="to_product_price"
                        />
                      </div>

                      {priceError === "price is blank" ? (
                        <small className="text-danger">
                          Please fill price first
                        </small>
                      ) : null}
                      {priceError === "min is negative" ? (
                        <small className="text-danger">
                          Min price should be greter than 0
                        </small>
                      ) : null}
                      {priceError === "max is negative" ? (
                        <small className="text-danger">
                          Max price should be greter than 0
                        </small>
                      ) : null}
                      {priceError === "Min les than max" ? (
                        <small className="text-danger">
                          Min price should be less than max price
                        </small>
                      ) : null}

                      <button
                        className="shop-widget-btn"
                        type="button"
                        onClick={OnPriceFilterCheck}
                      >
                        <i className="fas fa-search"></i>
                        <span>search</span>
                      </button>
                      <button
                        className="shop-widget-btn mt-2"
                        type="button"
                        onClick={() => {
                          OnClearPriceFIlter();
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                        <span>clear filter</span>
                      </button>
                    </form>
                  </div>
                  {/* FIlter by Rating */}
                  <div className="shop-widget">
                    <h6 className="shop-widget-title border-0">
                      Filter by Rating
                    </h6>
                    <form>
                      <ul className="shop-widget-list">
                        <li>
                          <div className="shop-widget-content">
                            <input
                              type="checkbox"
                              id="feat1"
                              value={"5.0"}
                              onChange={onRatingChange}
                              name="rating"
                            />
                            <label htmlFor="feat1">
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="shop-widget-content">
                            <input
                              type="checkbox"
                              id="feat2"
                              value={"4.0"}
                              onChange={onRatingChange}
                              name="rating"
                            />
                            <label htmlFor="feat2">
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star"></i>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="shop-widget-content">
                            <input
                              type="checkbox"
                              id="feat3"
                              value={"3.0"}
                              onChange={onRatingChange}
                              name="rating"
                            />
                            <label htmlFor="feat3">
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="shop-widget-content">
                            <input
                              type="checkbox"
                              id="feat4"
                              value={"2.0"}
                              onChange={onRatingChange}
                              name="rating"
                            />
                            <label htmlFor="feat4">
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="shop-widget-content">
                            <input
                              type="checkbox"
                              id="feat5"
                              value={"1.0"}
                              onChange={onRatingChange}
                              name="rating"
                            />
                            <label htmlFor="feat5">
                              <i className="fas fa-star active"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </label>
                          </div>
                        </li>
                      </ul>
                      <button
                        className="shop-widget-btn"
                        type="button"
                        onClick={() => uncheckAll()}
                      >
                        <i className="far fa-trash-alt"></i>
                        <span>clear filter</span>
                      </button>
                    </form>
                  </div>
                  {/* FIlter by brand */}
                  {/* <div className="shop-widget">
                <h6 className="shop-widget-title border-0">Filter by Brand</h6>
                <form>
                  <input
                    className="shop-widget-search"
                    type="text"
                    placeholder="Search..."
                    value={serachBrand}
                    onChange={onSerchBrand}
                  />
                  <ul className="shop-widget-list shop-widget-scroll">
                    {(brandData || []).map((item, index) => {
                      return (
                        item.brand === null ? null :
                        <li key={index}>
                          <div className="shop-widget-content">
                            <input
                              type="checkbox"
                              id={item.id}
                              name="brand"
                              value={item.brand}
                              onChange={(e) => onBrandChange(e)}
                            />
                            <label htmlFor={item.id}>{item.brand}</label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    className="shop-widget-btn"
                    type="button"
                    onClick={uncheckAllBrand}
                  >
                    <i className="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div> */}
                  {/* Filter by Category */}
                  <div className="shop-widget">
                    <h6 className="shop-widget-title border-0">
                      Filter by Category
                    </h6>
                    <form>
                      <input
                        className="shop-widget-search"
                        type="text"
                        placeholder="Search..."
                        value={serachCate}
                        onChange={onSerchCategory}
                      />
                      <ul className="shop-widget-list shop-widget-scroll">
                        {(catData || []).map((item, index) => {
                          return (
                            <li key={index}>
                              <div className="shop-widget-content">
                                <input
                                  type="checkbox"
                                  id={item.id}
                                  name="category"
                                  value={item.id}
                                  onChange={(e) => onCategoryChange(e)}
                                />
                                <label htmlFor={item.id}>
                                  {item.category_name}
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <button
                        className="shop-widget-btn"
                        type="button"
                        onClick={uncheckAllCategory}
                      >
                        <i className="far fa-trash-alt"></i>
                        <span>clear filter</span>
                      </button>
                    </form>
                  </div>
                  <div className="shop-widget-promo">
                    <div>
                      <img src={shoppromo} alt="promo" />
                    </div>
                  </div>
                </div>
              }
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mobile_filter text-end py-2">
                      <Link onClick={OpenMobileFilter} className="">
                        <i className="icofont-filter fs-3 text-dark"></i>
                      </Link>
                    </div>
                    <div className="top-filter">
                      {/* Select data per page */}

                      <div className="filter-show">
                        <label className="filter-label">Show :</label>
                        <select
                          className="form-select filter-select"
                          onChange={(e) => setPageNo(e.target.value)}
                        >
                          <option value="12">12</option>
                          <option value="24">24</option>
                          <option value="36">36</option>
                        </select>
                      </div>
                      {/* Sorting */}
                      <div className="filter-short">
                        <label className="filter-label">Short by :</label>
                        <select
                          className="form-select filter-select"
                          onChange={(e) => {
                            setSort(e.target.value);
                            setCurrentPage(0);
                          }}
                        >
                          <option value={""}>Select</option>
                          <option value={["verient_name", "ASC"]}>
                            Product : A-Z
                          </option>
                          <option value={["verient_name", "DESC"]}>
                            Product : Z-A
                          </option>
                          <option value={["price", "DESC"]}>
                            Price : High to Low
                          </option>
                          <option value={["price", "ASC"]}>
                            Price : Low to High
                          </option>
                          <option value={["avgRatings", "DESC"]}>
                            Rating : High to Low
                          </option>
                          <option value={["avgRatings", "ASC"]}>
                            Rating : Low to High
                          </option>
                        </select>
                      </div>
                      {/* <div className="filter-short">
                      <label className="filter-label">Short by Rating:</label>
                      <select
                        className="form-select filter-select"
                        onChange={(e) => setSortByRating(e.target.value)}
                      >
                        <option value={""}>Select</option>
                        <option value="desc">High</option>
                        <option value="asc">Low </option>
                      </select>
                    </div>
                    <div className="filter-short">
                      <label className="filter-label">Short by Price:</label>
                      <select
                        className="form-select filter-select"
                        onChange={(e) => setSortByPrice(e.target.value)}
                      >
                        <option value={""}>Select</option>
                        <option value="desc">High</option>
                        <option value="asc">Low </option>
                      </select>
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                  <ProductBox
                    pricefilter={price}
                    rating={rating}
                    cateFilter={cateFilter}
                    // brandFilter={brandFilter}
                    Pages={pageNo}
                    paginationData={setPaginationData}
                    currentPage={currentPage}
                    // sortByAlpha={sortByAlpha}
                    // sortByRating={sortByRating}
                    // sortByPrice={sortByPrice}
                    sort={sort}
                    cartcall={cartcall}
                    setcartcall={setcartcall}
                    productcall={productcall}
                    setproductcall={setproductcall}
                    CloseBackDrop={CloseBackDrop}
                    setLoading={setLoading}
                    WishlistProduct={"no"}
                  />
                </div>
                <div className="row">
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    total={paginationData.count_rows}
                    count={pageNo}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="backdrop"
        style={filertOpen ? { display: "block" } : { display: "none" }}
        onClick={CloseBackDrop}
      ></div>
      <Footer />
    </>
  );
}
