import React, { useState, useEffect } from "react";
import productImg from "../../image/product.jpg";
import { Link, useNavigate } from "react-router-dom";
import ProductDetailModal from "../Modal/productDetail";
import { ProductList, AddToCart } from "../api/api";
import ProductRating from "./productRating";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CartUpdate from "./cartButton";
const ProductBox = ({
  pricefilter,
  rating,
  cateFilter,
  brandFilter,
  Pages,
  paginationData,
  currentPage,
  sortByAlpha,
  sortByRating,
  sortByPrice,
}) => {
  const location = useLocation();
  let Token = localStorage.getItem("token");
  let navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState();
  const [productVarId, setProductVarId] = useState();
  const [qtyNo, setQtyNo] = useState(1);
  const [apicall, setapicall] = useState(false);
  let CatSearch = cateFilter.length === 0 ? category : cateFilter;
  // console.log(cateFilter, category);
  /*Function to get the product list */
  let GetProductList = async () => {
    let response = await ProductList(
      pricefilter.to_product_price,
      pricefilter.from_product_price,
      rating,
      CatSearch,
      brandFilter,
      Pages,
      currentPage,
      sortByAlpha,
      sortByRating,
      sortByPrice,
      "",
      search
    );
    // console.log(response.data.results)
    if (
      response.data.results === undefined ||
      response.data.results === "undefined" ||
      response.data.results === null ||
      response.data.results.length === 0
    ) {
      setData([]);
    } else {
      setData(response.data.results);
      if (location.pathname === "/shop") {
        paginationData(response.data.pagination);
      }
    }
  };
  /*Render method to get product list */
  useEffect(() => {
    GetProductList();
  }, [
    pricefilter,
    rating,
    CatSearch,
    brandFilter,
    Pages,
    currentPage,
    sortByAlpha,
    sortByRating,
    sortByPrice,
    qtyNo,
    search,
  ]);

  /*Function to Open Product Detail Page */
  const OpenProductDetailModal = (e, f) => {
    setProductDetailModal(true);
    setProductId(e);
    setProductVarId(f);
  };

  /*Function to add to cart */
  const onAddToCart = async (id, varId) => {
    // console.log(id, varId, qtyNo);
    let response = await AddToCart(id, varId, qtyNo);
    if (response.data.response === "add product successfull") {
      toast.success("Product Added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  /* Function to update quantity */
  const updateQuantity = (productId, productVariantId, quantity) => {
    setQtyNo(quantity);
    // console.log(productId, productVariantId, quantity);
    // onAddToCart(productId, productVariantId);
  };
  return (
    <>
      {data.length === 0 ? (
        <div className="justify-content-center">
          <b className="text-center">No data Found</b>
        </div>
      ) : (
        (data || []).map((item, index) => {
          return (
            <div className="col" key={index}>
              <div className="product-card p-0 border-0">
                <div className="product-media">
                  {/* <div className="product-label">
              <label className="label-text sale bg-danger">sale</label>
            </div> */}
                  {/* <button className="product-wish wish">
              <i className="fas fa-heart"></i>
            </button> */}
                  <div className="product-label">
                    {item.discount === (undefined || null) ? null : (
                      <label className="label-text sale bg-danger">
                        {item?.discount}% off
                      </label>
                    )}
                  </div>
                  <Link
                    className="product-image"
                    to="/productdetails"
                    state={{ data: item }}
                  >
                    <img
                      src={
                        item.cover_image === null ||
                        item.cover_image === undefined ||
                        item.cover_image === "undefined"
                          ? productImg
                          : item.cover_image
                      }
                      alt="product"
                    />
                  </Link>
                  <div className="product-widget">
                    <Link
                      title="Product View"
                      className="fas fa-eye"
                      onClick={() =>
                        OpenProductDetailModal(
                          item.product_id,
                          item.product_verient_id
                        )
                      }
                    ></Link>
                  </div>
                </div>
                <div className="product-content px-3 pb-3">
                  <div className="product-rating">
                    {/* Ratind Component */}
                    <ProductRating rating={item.rating} review={item.review} />
                  </div>
                  <h6 className="product-name">
                    <Link to="">{item.verient_name}</Link>
                  </h6>
                  <h6 className="product-price">
                    <del>{item.mrp}</del>
                    <span>{item.price}</span>
                  </h6>
                  {item.cart_count === null || item.cart_count === undefined ? (
                    <button
                      className="product-add"
                      title="Add to Cart"
                      onClick={
                        Token
                          ? () =>
                              onAddToCart(
                                item.product_id,
                                item.product_verient_id
                              )
                          : () => navigate("/login")
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
        />
      ) : null}
    </>
  );
};

export default ProductBox;
