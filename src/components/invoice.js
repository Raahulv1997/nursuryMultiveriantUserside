import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./common/footer";
import Header from "./common/header";
import Otherbannner from "./common/otherbannner";
import { Orderdetails } from "./api/api";
import moment from "moment/moment";
import OrderTable from "../components/common/orderTable";
function Invoice() {
  let [orderDetails, setOrderDetails] = useState("");
  let [orderList, setOrderList] = useState("");
  let [loading, setLoading] = useState(true);
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const OrderId = searchParams.get("id");

  /*Function to get Order data */
  let GetData = async () => {
    let OrderRes = await Orderdetails(OrderId);
    if (
      OrderRes.data === null ||
      OrderRes.data === undefined ||
      OrderRes.data === "" ||
      OrderRes.data.response === "not found"
    ) {
      setOrderDetails("");
      setOrderList([]);
      setLoading(false);
    } else {
      console.log(
        "Aall data--" + JSON.stringify(OrderRes.data.order_detaile[0])
      );
      setOrderDetails(OrderRes.data.order_detaile[0]);

      setOrderList(OrderRes.data.order_product_detaile);
      console.log(
        "Order list" + JSON.stringify(OrderRes.data.order_product_detaile)
      );
      setLoading(false);
    }
  };
  /*Function to Calculation the sum total price of all cart products */
  let subtotal = 0;
  let totalGst = 0;
  let totalDiscount = 0;
  let mrp = 0;
  let qty = 0;
  let taxablePrice = 0;

  /*Function to get the totals */
  const getTotalPrice = () => {
    let totalAmount = 0;
    if (orderList) {
      mrp = 0;
      subtotal = 0;
      totalGst = 0;
      totalDiscount = 0;
      qty = 0;
      taxablePrice = 0;
      orderList.forEach((item) => {
        mrp += item.mrp;
        qty += item.order_cart_count;
        subtotal += item.price * item.order_cart_count;
        taxablePrice +=
          (item.price / (1 + item.gst / 100)).toFixed(2) *
          item.order_cart_count;

        totalGst =
          totalGst +
          (item.price - (item.price / (1 + item.gst / 100)).toFixed(2)).toFixed(
            2
          ) *
            item.order_cart_count;
        totalDiscount =
          totalDiscount +
          ((item.mrp * item.discount) / 100) * item.order_cart_count;
        totalAmount = subtotal + 100;
      });
    }
    const totalPriceInfo = [
      totalAmount,
      totalGst,
      totalDiscount,
      subtotal,
      mrp,
      qty,
      taxablePrice,
    ];
    return totalPriceInfo;
  };
  let TotalPrice = getTotalPrice();

  useEffect(() => {
    GetData();
    // eslint-disable-next-line
  }, [OrderId]);

  /*Function to Download pdf */
  const printContentRef = useRef();
  const handlePrint = () => {
    const printContent = printContentRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div>
      {/* Hrader */}
      <Header loading={loading} setLoading={setLoading} />
      {/* Banner */}
      <Otherbannner heading={"Order Invoice"} bread={"invoice"} />
      {/* Main section */}
      <section className="inner-section invoice-part">
        <div className="container">
          <div className="row" ref={printContentRef}>
            <div className="col-lg-12">
              <div className="alert-info">
                <p>Thank you! We have recieved your order.</p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>order Summary</h4>
                </div>
                <div className="account-content">
                  <div className="invoice-recieved">
                    <h6>
                      order number <span>{orderDetails.order_id}</span>
                    </h6>
                    <h6>
                      order date{" "}
                      <span>
                        {moment(orderDetails.order_date).format("MMMM DD,YYYY")}
                      </span>
                    </h6>
                    <h6>
                      total amount <span>₹{orderDetails.total_amount}</span>
                    </h6>
                    <h6>
                      payment method <span>{orderDetails.payment_mode}</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <OrderTable
                getTotalGstPrice={Number(orderDetails.total_gst).toFixed(2)}
                getTotalDiscountPrice={Number(
                  orderDetails.total_discount
                ).toFixed(2)}
                getSubTotalPrice={Number(
                  orderDetails.only_this_order_product_total
                ).toFixed(2)}
                getTotalPrice={TotalPrice[0].toFixed(2)}
                mrp={TotalPrice[4].toFixed(2)}
                qty={orderDetails.only_this_order_product_quantity}
                taxablePrice={Number(
                  orderDetails.only_this_order_product_total -
                    orderDetails.total_gst
                ).toFixed(2)}
                invoice={"invoice"}
                data={orderList}
              />
            </div>
            <div className="col-lg-6 m-auto pt-3">
              <div className="account-card">
                <div className="account-title">
                  <h4>Order Details</h4>
                </div>
                <div className="account-content">
                  <ul className="invoice-details">
                    <li>
                      <h6>Total Item</h6>
                      <p>
                        {orderDetails.total_order_product_quantity > 1
                          ? orderDetails.total_order_product_quantity + "Items"
                          : orderDetails.total_order_product_quantity}
                      </p>
                    </li>
                    <li>
                      <h6>Order Time</h6>
                      <p>
                        {moment(orderDetails.order_date).format(
                          "h:mm A, MM-DD-YYYY"
                        )}
                      </p>
                    </li>
                    <li>
                      <h6>Delivery Time</h6>
                      <p>
                        {moment(orderDetails.delivery_date).fromNow()} Express
                        Delivery
                      </p>
                    </li>
                    <li>
                      <h6>Delivery Location</h6>
                      <p>
                        {orderDetails.address} {orderDetails.pin_code},
                        {orderDetails.city}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6" style={{ display: "none" }}>
              <div className="account-card">
                <div className="account-title">
                  <h4>Amount Details</h4>
                </div>
                <div className="account-content">
                  <ul className="invoice-details">
                    <li>
                      <h6>Sub Total</h6>
                      {/* Sub total calculation */}
                      <p>₹ {orderDetails.only_this_order_product_total}</p>
                    </li>
                    <li>
                      <h6>Discount</h6>
                      {/* Discount Calculation */}
                      <p className="text-danger">
                        - ₹ {orderDetails.total_discount}
                      </p>
                    </li>
                    <li>
                      <h6>GST</h6>
                      {/* Gst Calculation */}
                      <p>₹ {orderDetails.total_gst}</p>
                    </li>
                    <li>
                      <h6>Delivery charges</h6>
                      {/* Gst Calculation */}
                      <p>₹ 100</p>
                    </li>
                    <li>
                      <h6>Total</h6>
                      {/* Calculation of total amount */}
                      <p>₹ {orderDetails.total_amount}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center mt-5">
              <Link className="btn btn-inline" to={""} onClick={handlePrint}>
                <i className="icofont-download"></i>
                <span>download invoice</span>
              </Link>
              <div className="back-home">
                <Link to="/">Back to Home</Link>
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

export default Invoice;
