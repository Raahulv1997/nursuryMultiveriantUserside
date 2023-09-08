import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ProductList, AddToCart, Add_Remove_wishlist } from "../api/api";
import ProductRating from "../common/productRating";
import { toast } from "react-toastify";
import CartUpdate from "./cartButton";
import Productdescription from "./productdescription";
import ProductImage from "./product_image";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductDetailsBox(props) {
  // eslint-disable-next-line
  const [cartApicCall, setCartApiCall] = useState(false);

  const [disableWishlist, setDisableWishlist] = useState(false);
  let [data, setData] = useState("");
  const [varList, setVarList] = useState([]);
  const [varId, setVarID] = useState(props.var);
  const [datachange, setdatachange] = useState(false);
  const [apicall, setApicall] = useState(false);
  let Token = localStorage.getItem("token");
  let navigate = useNavigate();
  let location = useLocation();
  /*Function to get the product list */
  let GetProductDetails = async () => {
    let response = await ProductList(
      "",
      "",
      "",
      "",
      "10",
      "0",
      "",
      props.id,
      "",
      ""
      // [props.var]
    );

    if (
      response.data.results === undefined ||
      response.data.results === "undefined" ||
      response.data.results === null ||
      response.data.results.length === 0
    ) {
      setData([]);
      props.setLoading(false);
    } else {
      //   console.log("jjjjj");
      // setData(response.data.results[0]);
      setVarList(response.data.results);
      setData(
        response.data.results.find(
          (response) => response.product_verient_id === Number(props.var)
        )
      );
      AllData(varId, response.data.results);
      props.setLoading(false);
    }
  };

  /*Function to get another varient data */
  const AllData = (id, vdata) => {
    // console.log("v data---" + JSON.stringify(vdata));

    props.setLoading(true);
    // console.log(
    //   "id",
    //   id,
    //   "data",
    //   vdata.filter((vdata) => vdata.product_verient_id === Number(id))
    // );
    if (
      vdata === undefined ||
      vdata === "undefined" ||
      vdata === null ||
      vdata.length === 0 ||
      vdata.filter((vdata) => vdata.product_verient_id === Number(id))
        .length === 0
    ) {
      // setData(vdata[0]);
      props.setLoading(false);
    } else {
      setData(vdata.find((vdata) => vdata.product_verient_id === Number(id)));
      props.setLoading(false);
      if (
        location.pathname ===
          `/productdetails?product_id=${vdata.id}&variant_id=${vdata.product_verient_id}` ||
        props.modal === "no"
      ) {
        console.log("props_category---" + vdata[0].category.split(",")[0]);
        props.setproCate(vdata[0].category.split(",")[0]);
      }
    }
    setdatachange(false);
  };
  /*Render Method to get another varient data */
  useEffect(() => {
    AllData(varId, varList);
    if (props.productDetailCall === true) {
      props.setProductDetailCall(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datachange]);

  /*Render method to get product list */
  useEffect(() => {
    GetProductDetails();
    if (apicall === true) {
      setApicall(false);
    }
    if (props.productDetailCall === true) {
      props.setProductDetailCall(false);
    }
    // if (props.var) {
    //   setVarID(props.var);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, props.var, apicall, props.productDetailCall]);
  /*Function to add to cart */
  const onAddToCart = async (id, varId) => {
    props.setLoading(true);
    let response = await AddToCart(id, varId, 1);
    if (response.data.response === "add product successfull") {
      toast.success("Product Added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      props.setcartcall(true);
      props.setLoading(false);
      GetProductDetails();
    }
  };

  /*Function to convert image object in array */

  const imageUrl = data?.cover_image + "," + data?.all_images_url;
  // const imageUrl =
  //   data.cover_image == null ? "" : data.cover_image + data?.all_images_url;
  // console.log("image url--" + JSON.stringify(imageUrl));
  const imageArray =
    imageUrl && typeof imageUrl === "string" ? imageUrl.split(",") : [];
  // const imageArray = imageUrl && typeof imageUrl === "string" ? imageUrl.replace(/,+/g, ',').split(",") : [];
  // const  imageArray = result.split(",")
  const uniqueImages = imageArray.filter((item, index) => {
    // Remove empty strings and keep only the first occurrence of each image path
    return item !== "null" && item !== "" && imageArray.indexOf(item) === index;
  });

  let filteredData = uniqueImages
    .filter((item) => item !== "") // Remove empty strings
    .map((item) => item.replace(/^'|'$/g, "")); // Remove surrounding single quotes

  /*Function add product to wishlist */
  const onWishlistAdd = async (id, verient_id, wishlist) => {
    if (
      Token === null ||
      Token === "null" ||
      Token === "" ||
      Token === undefined ||
      Token === "undefined"
    ) {
      navigate("/login");
    } else {
      props.setLoading(true);
      if (wishlist > 0) {
        setDisableWishlist(true);

        let response = await Add_Remove_wishlist(id, verient_id);

        if (
          response.data.response ===
          "already add in wishlist remove product to wishlist"
        ) {
          toast.success("Removed to wishlist", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setDisableWishlist(false);
          props.setLoading(false);
          setApicall(true);
        }
      } else {
        setDisableWishlist(true);

        let response = await Add_Remove_wishlist(id, verient_id);

        if (response.data.response === "added in wishlist") {
          toast.success("Added to wishlist", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setDisableWishlist(false);
          props.setLoading(false);
          setApicall(true);
        }
      }
    }
  };

  return (
    <>
      <div className="row product_detail_box">
        <div
          className={
            props.page === "details"
              ? "col-md-6 col-lg-6"
              : "col-md-12 col-lg-12 item_show_modal"
          }
        >
          <div
            className={
              props.page === "details" ? "details-gallery" : "view-gallery"
            }
          >
            <div
              className={
                props.page === "details"
                  ? "details-label-group"
                  : "view-label-group"
              }
            >
              {data.is_fetured === null ||
              data.is_fetured === undefined ||
              data.is_fetured === "undefined" ? null : (
                <label
                  className={"details-label"}
                  style={{ background: "#7C4DFF" }}
                >
                  Featured
                </label>
              )}

              {data.discount === (undefined || null || 0) ? null : (
                <label
                  className={
                    props.page === "details"
                      ? "details-label off"
                      : "view-label off"
                  }
                >
                  {data.discount}%
                </label>
              )}
            </div>
            <Carousel>
              {imageArray.length === 0 ? (
                <div>
                  {/* <img
                    src={data.cover_image}
                    alt={data.seo_tag + data.description}
                  /> */}
                  <ProductImage
                    src={data.cover_image}
                    className={"img-fluid"}
                    alt={data.seo_tag + data.description}
                  />
                </div>
              ) : (
                (filteredData || []).map((item, index) => {
                  return (
                    <div key={index}>
                      {/* <img src={item} alt={data.seo_tag + data.description} /> */}
                      <ProductImage
                        src={item}
                        className={"img-fluid"}
                        alt={data.seo_tag + data.description}
                      />
                    </div>
                  );
                })
              )}
            </Carousel>
          </div>
        </div>
        <div
          className={
            props.page === "details"
              ? "col-md-6 col-lg-6"
              : "col-md-12 col-lg-12 "
          }
        >
          <div
            className={
              props.page === "details" ? "details-content" : "view-details"
            }
          >
            <h6 className="text-uppercase fw-normal">{data.verient_name}</h6>

            <h3
              className={
                props.page === "details" ? "details-name" : "view-name"
              }
            >
              <div style={{ cursor: "pointer" }}>{data.name}</div>
              {/* ({data.rating}
              <i className="active icofont-star text-warning"></i>) */}
            </h3>
            <div
              className={
                props.page === "details"
                  ? "details-meta flex-wrap"
                  : "view-meta flex-wrap"
              }
            >
              {/* <p>SKU:<span>1234567</span>
                        </p> */}
              {/* <p>
                BRAND: <b>{data.brand}</b>
              </p> */}
              {/* <p>
                CATEGORY: <b>{data.category}</b>
              </p> */}
              {data.product_stock_quantity <= 0 ? (
                ""
              ) : (
                <p>
                  STOCK QUANTITY: <b> {data.product_stock_quantity}</b>
                </p>
              )}
            </div>
            <div
              className={
                props.page === "details" ? "details-rating" : "view-rating"
              }
            >
              {data.avgRatings > 0 ? (
                <ProductRating rating={data.avgRatings} review={data.review} />
              ) : null}
            </div>
            <h3
              className={
                props.page === "details"
                  ? "details-price mb-0"
                  : "view-price mb-0"
              }
            >
              <span className="fs-2">
                <i className="fas fa-rupee-sign fs-3"></i> {data.price}/-
              </span>
              {data.price >= data.mrp ? (
                ""
              ) : (
                <small className="fs-6 ms-3">
                  <del>
                    MRP: <i className="fas fa-rupee-sign "></i> {data.mrp}/-
                  </del>
                </small>
              )}
            </h3>
            <small className="mb-5 text-italic">
              (MRP Inclusive of all taxes)
            </small>
            <br />
            <label className={"view-list-title mt-2"}>
              Variants description :
            </label>
            <p>{data.verient_description}</p>
            {/* <p className={props.page === "details" ? "details-desc" : "view-desc"}>{data.verient_description}</p> */}
            {/* <div className={props.page === "details" ? "details-list-group" : "view-list-group"}>
            <label className={props.page === "details" ? "details-list-title" : "view-list-title"}>tags:</label>
            <ul className={props.page === "details" ? "details-tag-list" : "view-tag-list"}>
              <li>
                <Link to="">{data.seo_tag}</Link>
              </li>
            </ul>
          </div> */}

            {props.page === "details" ? (
              <div
                className={
                  props.page === "details"
                    ? "details-list-group mb-2"
                    : "view-list-group"
                }
              >
                <label
                  className={
                    props.page === "details"
                      ? "details-list-title"
                      : "view-list-title"
                  }
                >
                  Variants:
                </label>
                <ul
                  className={
                    props.page === "details"
                      ? "details-tag-list d-flex align-content-start flex-wrap"
                      : "view-tag-list d-flex align-content-start flex-wrap"
                  }
                >
                  {(varList || []).map((item, index) => {
                    return (
                      <li key={index}>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setVarID(item.product_verient_id);
                            setdatachange(true);
                          }}
                          className={
                            item.product_verient_id === varId
                              ? "active w-100"
                              : "w-100"
                          }
                        >
                          {/* <img
                          className="w-100"
                          src={item.cover_image}
                          alt={item.description + ", " + item.seo_tag}
                        /> */}
                          <ProductImage
                            src={
                              item.cover_image !== null
                                ? item.cover_image
                                : item.all_images_url
                            }
                            // src={item.cover_image}
                            className={"img-fluid"}
                            alt={item.description + ", " + item.seo_tag}
                          />
                          <small style={{ fontSize: "10px" }}>
                            ₹{item.price}/-
                            <del>₹{data.mrp}/-</del>
                          </small>
                          <div className="text-truncate w-100 var_name">
                            {item.verient_name}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <div
              className={
                props.page === "details"
                  ? "details-add-group"
                  : "view-add-group"
              }
            >
              <div
                className={
                  data.product_stock_quantity <= 0 ? "product-disable" : ""
                }
              >
                {data.cart_count === null || data.cart_count === undefined ? (
                  <button
                    className="product-add"
                    title="Add to Cart"
                    onClick={
                      Token
                        ? () =>
                            onAddToCart(
                              data.product_id,
                              data.product_verient_id
                            )
                        : () => navigate("/login")
                    }
                  >
                    <i className="fas fa-shopping-basket"></i>
                    <span>add</span>
                  </button>
                ) : (
                  <CartUpdate
                    qty={data.cart_count}
                    id={data.product_id}
                    vid={data.product_verient_id}
                    setApicall={setApicall}
                    setCartApiCall={setCartApiCall}
                    setcartcall={props.setcartcall}
                    quantity={data.product_stock_quantity}
                    setLoading={props.setLoading}
                  />
                )}
              </div>
            </div>
            {data.wishlist > 0 ? (
              <button
                className="product-add"
                title="Add to Cart"
                style={{ disabled: disableWishlist ? true : false }}
                onClick={() =>
                  onWishlistAdd(
                    data.product_id,
                    data.product_verient_id,
                    data.wishlist
                  )
                }
              >
                {/* <i className="fas fa-shopping-basket"></i> */}
                <span>Remove from wishlist</span>
              </button>
            ) : data.wishlist === null ? (
              <button
                className="product-add"
                title="Add to Cart"
                style={{ disabled: disableWishlist ? true : false }}
                onClick={() =>
                  onWishlistAdd(
                    data.product_id,
                    data.product_verient_id,
                    data.wishlist
                  )
                }
              >
                {/* <i className="fas fa-shopping-basket"></i> */}
                <span>Add to wishlist</span>
              </button>
            ) : null}

            {/* <div className={props.page === "details" ? "details-action-group" : "view-action-group"}>
            <Link to="" className={props.page === "details" ? "details-wish wish" : "view-wish wish"} title="Add Your Wishlist">
              <i className="icofont-heart">
              </i>
              <span>add to wisdsfsh</span>
            </Link>
             <Link to="" className={props.page === "details" ? "details" : "view-compare"} title="Compare This Item">
                            <i className="fas fa-random">
                            </i>
                            <span>Compare This</span>
                        </Link> 
          </div> */}
          </div>
        </div>
      </div>
      {/* Other details */}
      {props.page === "details" ? (
        <Productdescription id={props.id} data={data} />
      ) : null}
    </>
  );
}
