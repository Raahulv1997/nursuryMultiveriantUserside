import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductDetailModal from "../Modal/productDetail";
import { DeleteCart } from "../api/api";
import { toast } from "react-toastify";
import productImg from "../../image/product_demo.png";
import { ReviewModal } from "../Modal/reviewModal";
import ProductImage from "./product_image";
export default function CartTable(props) {
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  // const [active, setActive] = useState(false)
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productId, setProductId] = useState();
  const [productVarId, setProductVarId] = useState();
  const [toReviewData, setToReviewData] = useState(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);

  let location = useLocation();
  /*Function to Open cart Product Detail Page */
  const OpenProductDetailModal = (e, f) => {
    setProductDetailModal(true);
    setProductId(e);
    setProductVarId(f);
  };
  /*Funtion to delete cart */
  const DeleteCartClick = async (id, varId) => {
    let response = await DeleteCart(id, varId, headers);
    if (response.data.response === "delete successfull") {
      toast.success("Product Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      props.setApicall(true);
    }
  };

  const CoverImg = (img) => {
    const result = img.replace(/,+/g, ",");
    return result.split(",")[0];
  };
  /*Function to Open Review modal */
  let AddReviewModal = (e) => {
    setOpenReviewModal(true);
    setToReviewData(e);
  };

  return (
    <div>
      <div className="">
        <table className="table-list">
          <thead>
            <tr>
              <th scope="col" className="p-1">
                Product
              </th>
              <th scope="col" className="p-1">
                Name
              </th>
              <th scope="col" className="p-1">
                Actual price(MRP)
              </th>
              <th scope="col" className="p-1">
                Qty
              </th>
              <th scope="col" className="p-1">
                Dis Amt(%)
              </th>
              <th scope="col" className="p-1">
                Taxable Amt
              </th>
              <th scope="col" className="p-1">
                GST Amt(%)
              </th>
              <th scope="col" className="p-1">
                Total Price
              </th>
              {props.invoice === "invoice" ? null : (
                <th scope="col" className="p-1"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {(props.data || []).map((item, index) => {
              return (
                <tr key={index}>
                  <td className="table-image p-0">
                    {props.invoice === "other" ||
                    props.invoice === undefined ? (
                      <ProductImage
                        src={
                          item.cover_image !== null ||
                          item.cover_image === undefined ||
                          item.cover_image === "undefined" ||
                          item.cover_image === ""
                            ? item.cover_image
                            : item.all_images_url
                        }
                        className={"img-fluid"}

                        // alt={data.description + ", " + data.seo_tag}
                      />
                    ) : (
                      <Link
                        to=""
                        onClick={() =>
                          OpenProductDetailModal(
                            item.product_id,
                            item.product_verient_id
                          )
                        }
                      >
                        <img
                          src={
                            item.cover_image === null ||
                            item.cover_image === undefined ||
                            item.cover_image === "undefined" ||
                            item.cover_image === false ||
                            !item.cover_image
                              ? productImg
                              : CoverImg(item.cover_image)
                          }
                          alt={"product_image"}
                        />
                      </Link>
                    )}
                  </td>
                  <td className="table-name p-1">
                    {props.invoice === "other" ? (
                      <h6>{item.verient_name}</h6>
                    ) : (
                      <Link
                        to=""
                        onClick={() =>
                          OpenProductDetailModal(
                            item.product_id,
                            item.product_verient_id
                          )
                        }
                      >
                        <h6>{item.verient_name}</h6>
                      </Link>
                    )}
                  </td>
                  <td className="table-price p-1">
                    <h6>₹ {item.mrp.toFixed(2)} </h6>
                  </td>
                  <td className="table-quantity p-1">
                    <h6>{item.cart_product_quantity}</h6>
                  </td>
                  <td className="table-discount p-1">
                    <h6 className="text-danger">
                      - ₹ {item.discount_amount.toFixed(2)}
                      <small>({item.discount}%)</small>
                    </h6>
                  </td>
                  <td className="table-brand p-1">
                    <h6>₹ {item.taxable_amount.toFixed(2)}</h6>
                  </td>
                  <td className="table-brand p-1">
                    <h6>
                      ₹ {item.gst_amount.toFixed(2)}
                      <small>
                        ({item.gst}
                        %)
                      </small>
                    </h6>
                  </td>
                  <td className="table-quantity p-1">
                    <h6>₹ {item.price_x_cart_qty.toFixed(2)}</h6>
                  </td>
                  {props.invoice === "other" ? (
                    <Link
                      to=""
                      className="text-end text-decoration-none p-2"
                      onClick={() => AddReviewModal(item)}
                    >
                      <button className="blog-btn">Add Review</button>
                    </Link>
                  ) : props.invoice === "invoice" ? null : (
                    <td className="table-action p-1">
                      <Link
                        className="trash"
                        title="Remove Wishlist"
                        onClick={() =>
                          DeleteCartClick(
                            item.product_id,
                            item.product_verient_id
                          )
                        }
                      >
                        <i className="icofont-trash"></i>
                      </Link>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {props.invoice === "other" ? null : (
        <>
          {/* <div className="chekout-coupon">
                <button className={active ? "d-none" : "coupon-btn"} onClick={() => setActive(true)}>Do you have a coupon code?</button>
                <form className={active ? "coupon-form d-flex" : "d-none"} >
                    <input type="text" placeholder="Enter your coupon code" />
                    <button type="submit">
                        <span>apply</span>
                    </button>
                </form>
            </div> */}
        </>
      )}

      {productDetailModal ? (
        <ProductDetailModal
          show={productDetailModal}
          close={() => setProductDetailModal(false)}
          id={productId}
          var={productVarId}
          setLoading={props.setLoading}
        />
      ) : null}
      {openReviewModal ? (
        <ReviewModal
          show={openReviewModal}
          close={() => setOpenReviewModal(false)}
          data={toReviewData}
          setApicall={props.setApicall}
          setLoading={props.setLoading}
        />
      ) : null}
    </div>
  );
}
