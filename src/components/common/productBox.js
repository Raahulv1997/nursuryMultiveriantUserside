import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductDetailModal from "../Modal/productDetail";
import {
  ProductList,
  AddToCart,
  TreandingPro,
  Add_Remove_wishlist,
  getwishlist,
} from "../api/api";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CartUpdate from "./cartButton";
import ProductImage from "./product_image";
import moment from "moment";
import Loadeer from "./Loadeer";
const ProductBox = ({
  pricefilter,
  rating,
  cateFilter,
  setNoTreandingData,
  setNoFeaturedData,
  Pages,
  paginationData,
  currentPage,
  sortByAlpha,
  sortByRating,
  sortByPrice,
  cartcall,
  productcall,
  setcartcall,
  setproductcall,
  treanding,

  start_date,
  end_date,
  sort,
  feature,
  setVar_Id,
  setId,
  setProductDetailCall,
  CloseBackDrop,
  setLoading,
  WishlistProduct,
  id,
  varId,
  loading,
}) => {
  // eslint-disable-next-line
  const [cartApicCall, setCartApiCall] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);

  const [inProcessVarient, setInProcessVarient] = useState(null);

  const [prevVendorID, setPrevVendorID] = useState("");
  const [disableWishlist, setDisableWishlist] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState();
  const [productVarId, setProductVarId] = useState();
  const [apicall, setApicall] = useState(false);
  const [oneMonthBefore, setOneMonthBefore] = useState("");
  const [disableCart, setDisableCart] = useState(false);
  const currentDate = new Date();
  const location = useLocation();
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };

  let navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  // console.log(" prodct id---" + setId);
  // console.log(" prodct var  id---" + setVar_Id);
  let CatSearch =
    cateFilter === undefined ||
    cateFilter.length === 0 ||
    cateFilter.length === null ||
    cateFilter.length === undefined
      ? [category]
      : cateFilter;
  let Teanding = location.state
    ? location.state.treanding
    : treanding
    ? treanding
    : "";
  let Featured = location.state
    ? location.state.feature
    : feature
    ? feature
    : "";

  /*Function to get date before 1 month for tending products */
  useEffect(() => {
    const oneMonthBeforeDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate()
    );
    const formattedDate = oneMonthBeforeDate.toISOString().split("T")[0];
    setOneMonthBefore(formattedDate);
    // eslint-disable-next-line
  }, []);
  /*Function to get the product list */
  let GetProductList = async () => {
    setCartLoader(true);

    let response;
    if (Teanding === "Yes" || treanding === "YES") {
      setLoading(true);
      response = await TreandingPro(
        moment(new Date()).format("YYYY-MM-DD"),
        oneMonthBefore,
        headers
      );
      if (
        response.data.results === undefined ||
        response.data.results === "undefined" ||
        response.data.results === null ||
        response.data.results.length === 0
      ) {
        setData([]);
        if (location.pathname === "/") {
          setNoTreandingData("no_treanding");
        }
        if (location.pathname === "/shop") {
          paginationData({});
          setCartLoader(false);
          // setLoading(false);
        }
      } else {
        setData(response.data.results);
        setCartLoader(false);
        setLoading(false);
      }
    } else if (WishlistProduct === "yes") {
      setCartLoader(true);
      let response = await getwishlist(headers);
      let { data } = response;
      if (data) {
        setData(data.response);
        setCartLoader(false);
        // setLoading(false);
      }
      setCartLoader(false);
      setLoading(false);
    } else {
      response = await ProductList(
        pricefilter.to_product_price,
        pricefilter.from_product_price,
        rating,
        CatSearch,
        // brandFilter,
        Pages,
        currentPage,
        // sortByAlpha,
        // sortByRating,
        // sortByPrice,
        sort,
        "",
        search,
        Featured
      );
      setLoading(false);
      if (
        response.data.results === undefined ||
        response.data.results === "undefined" ||
        response.data.results === null ||
        response.data.results.length === 0
      ) {
        setData([]);
        if (location.pathname === "/shop") {
          paginationData({});
          setCartLoader(false);
          setLoading(false);
        }
        if (
          location.pathname === "/" &&
          (feature === "yes" || Featured === "yes")
        ) {
          setNoFeaturedData("no_featured");
        }
      } else {
        setCartLoader(false);
        setLoading(false);
        if (location.pathname === "/shop") {
          paginationData(response.data.pagination);
        }
        if (location.pathname === "/productdetails") {
          // let daaata = response.data.results.filter(
          //   (item) => item.id !== setId && item.product_verient_id !== setVar_Id
          // );
          // let daaata = response.data.results;
          // eslint-disable-next-line
          if (cateFilter == undefined) {
            let daaata = response.data.results.filter((item) => {
              // eslint-disable-next-line
              let Catval = item.category.split(",")[0];

              // eslint-disable-next-line
              return item.id !== Number(setId);
            });
            setData(daaata);
          } else {
            let daaata = response.data.results.filter((item) => {
              // eslint-disable-next-line
              let Catval = item.category.split(",")[0];
              console.log("Catval-" + Catval);
              console.log("cateFilter-" + cateFilter);

              // eslint-disable-next-line
              return item.id !== Number(setId) && Catval == cateFilter;
            });
            setData(daaata);
          }
        } else {
          setData(response.data.results);
          // setData(
          //   response.data.results.filter((item) => item.id !== Number(setId))
          // );
        }
      }
    }
  };

  /*Render method to get product list */
  useEffect(() => {
    GetProductList();
    if (location.pathname === "/shop") {
      CloseBackDrop();
    }
    if (apicall === true) {
      setApicall(false);
    }
    if (productcall === true) {
      setproductcall(false);
    }
    // eslint-disable-next-line
  }, [
    setId,
    setVar_Id,
    pricefilter,
    rating,
    category,
    // brandFilter,
    Pages,
    currentPage,
    sortByAlpha,
    sortByRating,
    sortByPrice,
    search,
    apicall,
    cartcall,
    productcall,
    start_date,
    end_date,
    sort,
    cateFilter,
    Teanding,
    Featured,
    oneMonthBefore,
  ]);

  /*Function to Open Product Detail Page */
  const OpenProductDetailModal = (e, f) => {
    setProductDetailModal(true);
    setProductId(e);
    setProductVarId(f);
  };

  /*Function to add to cart */
  const onAddToCart = async (id, varId, vendor_id) => {
    if (prevVendorID === "") {
    } else {
      if (vendor_id === prevVendorID) {
      } else {
        toast.success("Vendor changed Delivery charges might increase", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    }

    // Store the current vendor_id for future comparison
    setPrevVendorID(vendor_id);
    setCartLoader(true);
    // setLoading(true);
    setDisableCart(true);
    let response = await AddToCart(id, varId, 1, headers);
    if (response.data.response === "add product successfull") {
      toast.success("Product Added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApicall(true);
      setcartcall(true);
      setDisableCart(false);
      setCartLoader(false);
      setLoading(false);
    }
  };

  /*Function add product to wishlist */
  const onWishlistAdd = async (id, verient_id, wishlist, wishlist_id) => {
    if (
      Token === null ||
      Token === "null" ||
      Token === "" ||
      Token === undefined ||
      Token === "undefined"
    ) {
      navigate("/login");
    } else {
      setCartLoader(true);
      if (wishlist > 0 || wishlist_id > 0) {
        // console.log("in remove");
        setDisableWishlist(true);

        let response = await Add_Remove_wishlist(id, verient_id, headers);

        // console.log("respoce- in remove-" + response.data.response);
        if (response.data.response === "remove product to wishlist") {
          toast.success("Removed to wishlist", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setDisableWishlist(false);
          setCartLoader(false);

          setApicall(true);
        }
        // setDisableWishlist(false);
        // setLoading(false);
        // setApicall(true);
      } else {
        // console.log("in add");
        setCartLoader(true);
        setDisableWishlist(true);

        let response = await Add_Remove_wishlist(id, verient_id, headers);

        if (response.data.response === "added in wishlist") {
          toast.success("Added to wishlist", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setDisableWishlist(false);
          setCartLoader(false);

          setApicall(true);
        }
      }
    }
  };

  /*Function to Go detail page */
  // const ProductDetailClick = (item) => {
  //   if (location.pathname === "/productdetails") {
  //     setId(item.id);
  //     setVar_Id(item.product_verient_id);
  //     setProductDetailCall(true);
  //   } else {
  //     localStorage.setItem("product_id", item.id);
  //     localStorage.setItem("product_var_id", item.product_verient_id);
  //     return navigate("/productdetails");
  //   }
  // };
  // const ProductDetailClick = (item) => {
  //   // alert(item.product_id);
  //   console.log("first");
  //   navigate(
  //     `/productdetails?product_id=${item.product_id}&variant_id=${item.product_verient_id}`
  //   );
  // };
  return (
    <>
      {data.length === 0 ? (
        <div className="justify-content-center">
          <b className="text-center">No data Found</b>
        </div>
      ) : (
        (data || []).map((item, index) => {
          return (
            <div className="col p-sm-3 p-1 " key={index}>
              <div
                className={
                  item.product_stock_quantity <= 0
                    ? "product-card p-0 border-0 product-disable inner_loader"
                    : "product-card p-0 border-0 inner_loader"
                }
              >
                {cartLoader && item.product_verient_id === inProcessVarient ? (
                  <Loadeer />
                ) : null}
                <div className="product-media">
                  {/* <div className="product-label">
                    <label className="label-text sale bg-danger">sale</label>
                  </div> */}
                  {item.wishlist > 0 || item.wishlist_id > 0 ? (
                    <button className="product-wish wish">
                      <i
                        className="fas fa-heart"
                        style={{
                          color: "red",
                          disabled: disableWishlist ? true : false,
                        }}
                        onClick={() => {
                          onWishlistAdd(
                            item.id,
                            item.product_verient_id,
                            item.wishlist,
                            item.wishlist_id
                          );
                          setInProcessVarient(item.product_verient_id);
                        }}
                      ></i>
                    </button>
                  ) : (
                    <button className="product-wish wish">
                      <i
                        className="fas fa-heart"
                        style={{
                          color: "",
                          disabled: disableWishlist ? true : false,
                        }}
                        onClick={() => {
                          onWishlistAdd(item.id, item.product_verient_id);
                          setInProcessVarient(item.product_verient_id);
                        }}
                      ></i>
                    </button>
                  )}

                  <div className="product-label">
                    {item.discount === (undefined || null || 0) ? null : (
                      <label className="label-text sale bg-danger">
                        {item?.discount}% <small>OFF</small>
                      </label>
                    )}
                  </div>
                  <Link
                    className="product-image"
                    to={`/productdetails?product_id=${item.product_id}&variant_id=${item.product_verient_id}`}
                    // onClick={() => ProductDetailClick(item)}
                    // onClick={
                    //   location.pathname === "/productdetails"
                    //     ? () => {
                    //         setId(item.product_id);
                    //         setVar_Id(item.product_verient_id);
                    //       }
                    //     : null
                    // }
                  >
                    <ProductImage
                      src={
                        item.cover_image !== null
                          ? item.cover_image
                          : item.all_images_url
                      }
                      className={""}
                      alt={item.seo_tag}
                    />

                    {item.is_fetured === null ||
                    item.is_fetured === undefined ||
                    item.is_fetured === "undefined" ? null : (
                      <div
                        style={{
                          position: "absolute",
                          // top: "0px",
                          // right: "0px",
                          fontSize: "12px",
                          bottom: "150px",
                          background: "#7C4DFF",
                        }}
                        className="product-rating label-text m-0 sale"
                      >
                        <label
                          style={{ display: "inline-block" }}
                          className="m-0"
                        >
                          Featured
                        </label>
                      </div>
                    )}
                    {item.avgRatings > 0 ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "15px",
                          fontSize: "12px",
                          background: " rgba(0, 0, 0, 0.5)",
                        }}
                        className="product-rating label-text m-0 sale"
                      >
                        <label
                          style={{ display: "inline-block" }}
                          className="m-0"
                        >
                          <i className="active icofont-star"></i>
                          {/* Math.round is used for change tha rating value in round of like 3.7 is 4 */}
                          {Math.round(item.avgRatings)}
                        </label>
                      </div>
                    ) : null}
                  </Link>
                  <div className="product-widget">
                    <div
                      title="Product View"
                      className="fas fa-eye eye_icon"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        OpenProductDetailModal(
                          item.product_id,
                          item.product_verient_id
                        )
                      }
                    ></div>
                  </div>
                </div>
                <div className="product-content px-3 pb-3">
                  <small className="text-truncate" style={{ fontSize: "13px" }}>
                    {item.name}
                  </small>
                  <h6 className="product-name">
                    <Link className="text-truncate w-100" to="">
                      {item.verient_name}
                    </Link>
                  </h6>
                  <h6 className="product-price">
                    <small>
                      {" "}
                      <del>₹ {item.mrp} </del>
                    </small>
                    <span>₹ {item.price} </span>
                  </h6>
                  {item.cart_count === null || item.cart_count === undefined ? (
                    <button
                      className="product-add"
                      title="Add to Cart"
                      disabled={disableCart ? true : false}
                      onClick={
                        Token
                          ? () => {
                              onAddToCart(
                                item.product_id,
                                item.product_verient_id,
                                item.vendor_id
                              );
                              setInProcessVarient(item.product_verient_id);
                            }
                          : () => {
                              navigate("/login");
                            }
                      }
                    >
                      <i className="fas fa-shopping-basket"></i>
                      <span>add</span>
                    </button>
                  ) : (
                    <CartUpdate
                      qty={item.cart_count}
                      id={item.product_id}
                      vid={item.product_verient_id}
                      setInProcessVarient={setInProcessVarient}
                      setApicall={setApicall}
                      setCartApiCall={setCartApiCall}
                      setcartcall={setcartcall}
                      quantity={item.product_stock_quantity}
                      setLoading={setCartLoader}
                      loading={cartLoader}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      {productDetailModal ? (
        <ProductDetailModal
          show={productDetailModal}
          close={() => setProductDetailModal(false)}
          id={productId}
          var={productVarId}
          setcartcall={setcartcall}
          setLoading={setCartLoader}
        />
      ) : null}
    </>
  );
};

export default ProductBox;
