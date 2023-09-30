import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductDetailModal from "../Modal/productDetail";

import { toast } from "react-toastify";
import productImg from "../../image/product_demo.png";
import { ReviewModal } from "../Modal/reviewModal";
import ProductImage from "./product_image";
export default function OrderDetailsTable(props) {
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
              let qyt =
                location.pathname === "/checkout"
                  ? item.cart_product_quantity
                  : item.order_cart_count;
              return (
                <tr key={index}>
                  <td className="table-image  p-0">
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
                    <h6>{qyt}</h6>
                  </td>
                  <td
                    className="table-discount p-1"
                    style={{ display: "none" }}
                  >
                    <h6 className="text-danger">
                      {/* - ₹ {item.discount_amount.toFixed(2)} */}- ₹{" "}
                      {item.discount_amount}
                      <small>({item.discount}%)</small>
                    </h6>
                  </td>
                  <td className="table-brand p-1">
                    <h6>
                      <h6>
                        ₹{" "}
                        {((item.price / (1 + item.gst / 100)) * qyt).toFixed(2)}
                      </h6>
                    </h6>
                  </td>
                  <td className="table-brand p-1">
                    <h6>
                      ₹{" "}
                      {Number(
                        (item.price - item.price / (1 + item.gst / 100)) * qyt
                      ).toFixed(2)}
                      {/* 525/(1+5/100) = 525/1.05 = 500 */}{" "}
                      <small>
                        ({item.gst}
                        %)
                      </small>
                    </h6>
                  </td>
                  <td className="table-quantity p-1">
                    <h6>₹ {(item.price * qyt).toFixed(2)}</h6>
                  </td>
                  <td className="table-quantity p-1">
                    {props.orderStatus === "Delivered" ? (
                      <Link
                        to=""
                        className="text-end text-decoration-none p-2"
                        onClick={() => AddReviewModal(item)}
                      >
                        <button className="blog-btn">Add Review</button>
                      </Link>
                    ) : null}
                  </td>
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

      <div
        className="checkout-charge checkout-charge-order"
        style={{
          width: "356px",
        }}
      >
        <ul>
          <li className="py-1">
            <span className="text-danger">discount</span>
            <span className="text-danger">₹ {props.getTotalDiscountPrice}</span>
          </li>
          <li className="py-1">
            <span>Total GST</span>
            {<span> ₹ {props.getTotalGstPrice}</span>}
          </li>
          <li className="py-1">
            <span>
              Sub Total
              <small>(including GST)</small>
            </span>
            {<span>₹ {props.getSubTotalPrice}</span>}
          </li>
          <li className="py-1">
            <span>delivery fee</span>
            <span>₹ {props.deliveryCharges} </span>
          </li>
          <li className="py-1">
            <span>Total</span>
            {
              <span>
                ₹{" "}
                {(
                  Number(props.getSubTotalPrice) + Number(props.deliveryCharges)
                ).toFixed(2)}{" "}
              </span>
            }
          </li>
        </ul>
      </div>

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
