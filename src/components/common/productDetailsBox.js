import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import productImg from "../../image/product.jpg";
import { ProductList, AddToCart } from "../api/api";
import ProductRating from "../common/productRating";
import { toast } from "react-toastify";

export default function ProductDetailsBox(props) {
  let [data, setData] = useState("");
  const [qtyNo, setQtyvarIdNo] = useState(1);
  const [varList, setVarList] = useState([]);
  const [varId, setVarID] = useState(props.var);
  const [datachange, setdatachange] = useState(false);
  let Token = localStorage.getItem("token");
  let navigate = useNavigate();
  /*Function to get the product list */
  let GetProductDetails = async () => {
    let response = await ProductList(
      "",
      "",
      "",
      "",
      "",
      "10",
      "0",
      "",
      "",
      "",
      props.id
    );
    if (
      response.data.results === undefined ||
      response.data.results === "undefined" ||
      response.data.results === null ||
      response.data.results.length === 0
    ) {
      setData([]);
    } else {
      setVarList(response.data.results);
      AllData(varId, response.data.results);
    }
  };
  /*Function to get another varient data */
  const AllData = (id, vdata) => {
    if (
      vdata === undefined ||
      vdata === "undefined" ||
      vdata === null ||
      vdata.length === 0
    ) {
      setData([]);
    } else {
      setData(vdata.find((vdata) => vdata.product_verient_id === id));
    }
    setdatachange(false);
  };
  /*Render Method to get another varient data */
  useEffect(() => {
    AllData(varId, varList);
  }, [datachange]);

  /*Render method to get product list */
  useEffect(() => {
    GetProductDetails();
  }, [qtyNo, props.id]);

  /*Function to add to cart */
  console.log("Whole data", varList);
  const onAddToCart = async (id, varId, quantity) => {
    let response = await AddToCart(id, varId, quantity);
    if (response.data.response === "add product successfull") {
      toast.success("Product Added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      GetProductDetails();
    }
  };
  /* Function to update quantity */
  const updateQuantity = (productId, productVariantId, quantity) => {
    setQtyvarIdNo(quantity);
    setVarID(productVariantId);
    onAddToCart(productId, productVariantId, quantity);
  };
  /*Function to convert image object in array */
  // const imageUrl = "https://assets.winni.in/product/primary/2014/10/50382.jpeg?dpr=1&w=400,http://192.168.29.109:8888/product_images/test_32_img_384498.png";
  // const imageArray = imageUrl.split(',');
  // console.log(imageArray);
  return (
    <div className="row">
      <div className="col-md-6 col-lg-6">
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
            {/* <label className={props.page === "details" ? "details" : "view-label new">new</label> */}
            {data.discount === (undefined || null) ? null : (
              <label
                className={
                  props.page === "details"
                    ? "details-label off"
                    : "view-label off"
                }
              >
                {data?.discount}%
              </label>
            )}
          </div>
          <Carousel>
            <div>
              <img src={data.cover_image} alt="product" />
            </div>
            <div>
              <img src={productImg} alt="product" />
            </div>
            <div>
              <img src={productImg} alt="product" />
            </div>
            <div>
              <img src={productImg} alt="product" />
            </div>
            <div>
              <img src={productImg} alt="product" />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="col-md-6 col-lg-6">
        <div
          className={
            props.page === "details" ? "details-content" : "view-details"
          }
        >
          <h3
            className={props.page === "details" ? "details-name" : "view-name"}
          >
            <Link to="">{data.name}</Link>
          </h3>
          <div
            className={props.page === "details" ? "details-meta" : "view-meta"}
          >
            {/* <p>SKU:<span>1234567</span>
                        </p> */}
            <p>
              BRAND:<Link to="">{data.brand}</Link>
            </p>
          </div>
          <div
            className={
              props.page === "details" ? "details-rating" : "view-rating"
            }
          >
            <ProductRating rating={data.rating} review={data.review} />
          </div>
          <h3
            className={
              props.page === "details" ? "details-price" : "view-price"
            }
          >
            <del>{data.mrp}</del>
            <span>
              {data.price}
              <small>/per</small>
            </span>
          </h3>
          <p
            className={props.page === "details" ? "details-desc" : "view-desc"}
          >
            {data.description}
          </p>
          <div
            className={
              props.page === "details"
                ? "details-list-group"
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
              tags:
            </label>
            <ul
              className={
                props.page === "details" ? "details-tag-list" : "view-tag-list"
              }
            >
              <li>
                <Link to="">{data.seo_tag}</Link>
              </li>
            </ul>
          </div>
          <div
            className={
              props.page === "details"
                ? "details-list-group"
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
              variants:
            </label>
            <ul
              className={
                props.page === "details" ? "details-tag-list" : "view-tag-list"
              }
            >
              {(varList || []).map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to=""
                      onClick={() => (
                        setVarID(item.product_verient_id), setdatachange(true)
                      )}
                    >
                      {item.verient_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className={
              props.page === "details" ? "details-add-group" : "view-add-group"
            }
          >
            {data.cart_count === (null || undefined) ? (
              <button
                className="product-add"
                title="Add to Cart"
                onClick={
                  Token
                    ? () =>
                        onAddToCart(data.product_id, data.product_verient_id)
                    : () => navigate("/login")
                }
              >
                <i className="fas fa-shopping-basket"></i>
                <span>add</span>
              </button>
            ) : (
              <div className="product-action d-flex">
                <button
                  className="action-minus"
                  title="Quantity Minus"
                  onClick={() =>
                    updateQuantity(
                      data.product_id,
                      data.product_verient_id,
                      data.cart_count - 1
                    )
                  }
                >
                  <i className="icofont-minus"></i>
                </button>
                <input
                  className="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  value={data.cart_count}
                  readOnly
                />
                <button
                  className="action-plus"
                  title="Quantity Plus"
                  onClick={() =>
                    updateQuantity(
                      data.product_id,
                      data.product_verient_id,
                      data.cart_count + 1
                    )
                  }
                >
                  <i className="icofont-plus"></i>
                </button>
              </div>
            )}
          </div>
          <div
            className={
              props.page === "details"
                ? "details-action-group"
                : "view-action-group"
            }
          >
            <Link
              to=""
              className={
                props.page === "details"
                  ? "details-wish wish"
                  : "view-wish wish"
              }
              title="Add Your Wishlist"
            >
              <i className="icofont-heart"></i>
              <span>add to wisdsfsh</span>
            </Link>
            {/* <Link to="" className={props.page === "details" ? "details" : "view-compare" title="Compare This Item">
                            <i className="fas fa-random">
                            </i>
                            <span>Compare This</span>
                        </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
