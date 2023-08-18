import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductDetailModal from "../Modal/productDetail";
import { DeleteCart } from "../api/api";
import { toast } from "react-toastify";
import productImg from "../../image/product_demo.png";
import { ReviewModal } from "../Modal/reviewModal";
export default function CartTable(props) {
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
    let response = await DeleteCart(id, varId);
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
      <div className="table-responsive">
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
              <th scope="col" className="p-1" style={{ display: "none" }}>
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
              console.log();
              let qyt =
                location.pathname === "/checkout"
                  ? item.cart_product_quantity
                  : item.order_cart_count;
              return (
                <tr key={index}>
                  <td className="table-image p-0">
                    {props.invoice === "other" ? (
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
                        // alt={item.verient_description}
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
                          alt={item.verient_description}
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
                    <h6>{qyt}</h6>
                  </td>
                  <td
                    className="table-discount p-1"
                    style={{ display: "none" }}
                  >
                    <h6 className="text-danger">
                      - ₹{" "}
                      {(((item.mrp * item.discount) / 100) * qyt).toFixed(2)}
                      <small>({item.discount}%)</small>
                    </h6>
                  </td>
                  <td className="table-brand p-1">
                    <h6>
                      ₹{((item.price / (1 + item.gst / 100)) * qyt).toFixed(2)}
                      {/* {(
                        (item.mrp - (item.mrp * item.discount) / 100) *
                        qyt
                      ).toFixed(2)} */}
                    </h6>
                  </td>
                  <td className="table-brand p-1">
                    <h6>
                      {(
                        item.price -
                        (item.price / (1 + item.gst / 100)).toFixed(2)
                      ).toFixed(2) * qyt}
                      {/* 525/(1+5/100) = 525/1.05 = 500 */}{" "}
                      <small>
                        ({item.gst}
                        %)
                      </small>
                    </h6>
                  </td>
                  <td className="table-quantity p-1">
                    <h6>₹{(item.price * qyt).toFixed(2)}</h6>
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

            <tr>
              <td className="table-image p-1 ">
                <h5>Total</h5>
              </td>
              <td className="table-name p-1 "></td>
              <td className="table-price p-1 ">
                <h6>₹ {props.mrp}</h6>
              </td>
              <td className="table-price p-1 ">
                <h6>{props.qty}</h6>
              </td>
              <td className="table-brand p-1 " style={{ display: "none" }}>
                <h6 className="text-danger">
                  - ₹ {props.getTotalDiscountPrice}
                </h6>
              </td>
              <td className="table-price p-1 ">
                <h6>₹ {props.taxablePrice}</h6>
              </td>
              <td className="table-quantity p-1 ">
                <h6>₹ {props.getTotalGstPrice}</h6>
              </td>
              <td className="table-price p-1 ">
                <h6> ₹ {props.getSubTotalPrice}</h6>
              </td>
            </tr>
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
          <div className="checkout-charge">
            <ul>
              <li>
                <span className="text-danger">discount</span>
                <span className="text-danger">
                  - ₹ {props.getTotalDiscountPrice}{" "}
                </span>
              </li>
              <li>
                <span>Total GST</span>
                <span> ₹ {props.getTotalGstPrice} </span>
              </li>
              <li>
                <span>
                  Sub Total
                  <small>(including GST)</small>
                </span>
                <span>₹ {props.getSubTotalPrice} </span>
              </li>
              <li>
                <span>delivery fee</span>
                <span> ₹100 </span>
              </li>
              <li>
                <span>Total</span>
                <span>₹ {props.getTotalPrice} </span>
              </li>
            </ul>
          </div>
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
