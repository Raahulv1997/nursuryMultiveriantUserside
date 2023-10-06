import React, { useEffect, useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
// import { OrderList, Orderdetails, CancelOrder } from "../api/api";
import moment from "moment";
// import TicketModal from "../Modal/ticket";
// import OrderDetailsTable from "./OrderDetailsTable";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Otherbannner from "./common/otherbannner";
import Header from "./common/header";
import Loadeer from "../components/common/Loadeer.js";
import {
  CreateRazorpay,
  FailedPaymentList,
  UpdatePaymentStatus,
} from "./api/api";
import logo from "../image/logo.png";
export default function ReCheckout() {
  const [searchparams] = useSearchParams();
  const OrderGroupID = searchparams.get("orders_group_id");
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };

  //   let nevigate = useNavigate();

  let [orderList, setOrderList] = useState([]);
  let [transectionList, setTransectionList] = useState([]);
  const [remainingTime, setRemainingTime] = useState(900);

  const [paymentErr, setPaymentErr] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  //   /*Function to get Order data */

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const GetPaymentList = async (OrderGroupID) => {
    setLoading(true);
    const response = await FailedPaymentList(OrderGroupID);

    console.log("ffff---" + JSON.stringify(response.data.result));
    setTransectionList(response.data.result.transactionDetaile || []);
    setOrderList(response.data.result.orderDetaile || []);
    setLoading(false);
  };

  useEffect(() => {
    GetPaymentList(OrderGroupID);
    // eslint-disable-next-line
  }, []);

  const PaymentUpdateFuntion = async () => {
    let paymentValue = "failed";
    let payment_method = "other";
    let rs = await UpdatePaymentStatus(
      transectionList.payment_order_id,
      transectionList.amount,
      paymentValue,
      transectionList.orders_group_id,
      payment_method,
      headers
    );
    console.log("rsss00---" + JSON.stringify(rs));
    if (rs.data.msg === "Order Payment-Status Updated successfully.") {
      setTimeout(() => {
        navigate("/profile?ClickedBy=checkout");
      }, 1000);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        //         // Redirect to the order history page when the timer reaches 0

        PaymentUpdateFuntion();
        clearInterval(timer);
      }
    }, 1000); // Update the timer every 1 second

    // Clean up the timer if the component unmounts
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [remainingTime]);
  const onPayentClick = async (amount, orders_group_id) => {
    let amt = Math.round(Number(amount));

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("RazorPay SDK failed to load");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        // const total = userData.cart.reduce((a, b) => a + +b.price, 0).toFixed(0);
        const result = await CreateRazorpay(amt, orders_group_id, headers);
        console.log("CreateRazorpay---" + JSON.stringify(result));
        const { amount, key_id, order_id } = result.data;
        console.log(amount, order_id);

        const options = {
          key: key_id,
          amount: amount,
          image: logo,
          theme: {
            color: "#119744",
          },
          name: "INDIA KI NURSURY",
          description: "FIRST RAZOR PAY",
          order_id: order_id,
          handler: async function (response) {
            console.log("redssss--" + JSON.stringify(response));

            // Perform any additional actions on successful payment here
            toast.success("Payment Successful.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
            let paymentValue = "success";
            let payment_method = "other";
            let rs = await UpdatePaymentStatus(
              order_id,
              amount,
              paymentValue,
              orders_group_id,
              payment_method,
              headers
            );
            paymentObject.close();
            if (rs.data.msg === "Order Payment-Status Updated successfully.") {
              setTimeout(() => {
                navigate("/profile?ClickedBy=checkout");
              }, 1000);
            }
          },
          prefill: {
            name: "We2code PVT LTD",
            email: "ashish.we2code@gmail.com",
            contact: "9754869920",
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed", function (response) {
          console.log(JSON.stringify(response));
          toast.success("Payment Failed.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });

          console.log(" failde--" + JSON.stringify(response.error.reason));
          if (response.error.reason === "payment_failed") {
            paymentObject.close();
            window.location.reload();
            setTimeout(() => {
              const razorPayModalContainer = document.querySelector(
                ".razorpay-container"
              );
              if (razorPayModalContainer) {
                razorPayModalContainer.style.display = "none";
                var element = document.getElementById("main_body");
                element.style.overflow = "visible";
              }

              navigate(`/recheckout?orders_group_id=${orders_group_id}`);
            }, 2000);
          }
        });

        paymentObject.open();
      } catch (error) {
        alert(error);
        // setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  const onReCheckoutClick = async (amount, selectedPayment) => {
    if (selectedPayment === false) {
      setPaymentErr(true);
    } else {
      if (selectedPayment === "UPI") {
        onPayentClick(amount, OrderGroupID);
        // onPayentClick(amount, result);
      } else if (selectedPayment === "COD") {
        let paymentValue = "pending";
        let payment_method = "cod";
        let rs = await UpdatePaymentStatus(
          transectionList.payment_order_id,
          amount,
          paymentValue,
          transectionList.orders_group_id,
          payment_method,
          headers
        );
        console.log("LL---" + JSON.stringify(rs));
        if (rs.data.msg === "Order Payment-Status Updated successfully.") {
          setTimeout(() => {
            navigate("/profile?ClickedBy=checkout");
          }, 1000);
        }
      }
    }
  };

  return (
    <div>
      <Header
        getname={""}
        setGetName={""}
        cartcall={""}
        setcartcall={""}
        setproductcall={""}
        loading={""}
        setLoading={""}
      />
      <ToastContainer />
      {/* Banner */}
      <Otherbannner heading={"Recheckout"} bread={"recheckout"} />
      {orderList.length === 0 || transectionList.length === 0 ? (
        <>
          {" "}
          <div className="text-center">
            {" "}
            <b>Data Not found</b>
          </div>
        </>
      ) : (
        <div>
          <section className="inner-section orderlist-part">
            <div className="container">
              <div className="row">
                {loading === true ? <Loadeer /> : null}
                <div className="col-lg-12">
                  <div className="orderlist-filter">
                    <h5>
                      total order <span>- ({orderList.length})</span>
                    </h5>
                    {/* <div className="filter-short">
                                    <label className="form-label">short by:</label>
                                    <select className="form-select">
                                        <option value="all">all order</option>
                                        <option value="recieved">recieved order</option>
                                        <option value="processed">processed order</option>
                                        <option value="shipped">shipped order</option>
                                        <option value="delivered">delivered order</option>
                                    </select>
                                </div> */}
                  </div>
                </div>
              </div>
              {(orderList || []).map((item, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-lg-12">
                      <div className="orderlist">
                        <Link
                          className="orderlist-head"
                          //   onClick={() => toggleOrderDetail(orderId, item.order_id)}
                        >
                          <h5>order #{item.order_id}</h5>
                          <h5>
                            {item.status_order === "Rejected_by_customer"
                              ? "Order Cancel by customer"
                              : item.status_order === "pending"
                              ? "Order Pending"
                              : item.status_order === "approved"
                              ? "Order Approved by nursury portal"
                              : item.status_order === "Pickuped"
                              ? "Order Pickuped"
                              : item.status_order === "Delivered"
                              ? "Order Delivered"
                              : item.status_order === "Failed_Delivery_Attempts"
                              ? "The order has been canceled as the order was not received by the customer."
                              : item.status_order === "ready_to_pickup"
                              ? "Order in process"
                              : item.status_order === "accepted_by_vendor"
                              ? "Order in process"
                              : item.status_order === "rejected_by_vendor"
                              ? "Order not available"
                              : item.status_order === "ready_to_packing"
                              ? "Order in process"
                              : "pending"}
                          </h5>
                        </Link>
                        <div className={"orderlist-body d-block"}>
                          <div className="row">
                            <div className="col-lg-6">
                              <ul className="orderlist-details">
                                <li>
                                  <h6>order id</h6>
                                  <p>{item.order_id}</p>
                                </li>
                                <li>
                                  <h6>Total Item</h6>
                                  <p>
                                    {item.only_this_order_product_quantity === 1
                                      ? item.only_this_order_product_quantity +
                                        " Item"
                                      : item.only_this_order_product_quantity +
                                        " Items"}
                                  </p>
                                </li>
                                <li>
                                  <h6>Order Date</h6>
                                  <p>
                                    {moment(item.order_date).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </p>
                                </li>
                                <li>
                                  <h6>Payment Mode</h6>
                                  <p>{item.payment_mode}</p>
                                </li>
                                <li>
                                  <h6>Payment Status</h6>
                                  <p>
                                    <span
                                      className={
                                        item.payment_status === "success"
                                          ? "badge bg-success"
                                          : item.payment_status === "pending"
                                          ? "badge bg-primary"
                                          : item.payment_status === "failed"
                                          ? "badge bg-danger"
                                          : "badge bg-info"
                                      }
                                    >
                                      {" "}
                                      {item.payment_status}
                                    </span>
                                  </p>
                                </li>

                                {/* <li>
                              <h6>Delivery Charges</h6>
                              <p> ₹ {item.shipping_charges}</p>
                            </li> */}
                                {/* <li>
                              <h6>Grand Total</h6>
                              <p>
                                {" "}
                                ₹{" "}
                                {Number(
                                  item.only_this_order_product_total
                                ).toFixed(2)}
                              </p>
                            </li> */}
                                {/* <li>
                              <h6>Grand Total</h6>
                              <p>
                                ₹{" "}
                                {Number(
                                  item.only_this_order_product_total
                                ).toFixed(2)}
                              </p>
                            </li> */}
                              </ul>
                            </div>
                            {/* <div className="col-lg-4">
                                                    <ul className="orderlist-details">
                                                        <li>
                                                            <h6>Sub Total</h6>
                                                            <p>₹ {item.only_this_order_product_total - item.total_gst}</p>
                                                        </li>
                                                         <li>
                                                    <h6>Discount</h6>
                                                    <p className='text-danger'> ₹ Don't have in the api list</p>
                                                </li>
                                                        <li>
                                                    <h6>Gst</h6>
                                                    <p > ₹ {item.total_gst}</p>
                                                </li> 
                                                        <li>
                                                            <h6>delivery fee</h6>
                                                            <p>₹ {item.shipping_charges}</p>
                                                        </li>
                                                        <li>
                                                            <h6>Total</h6>
                                                            <p>₹ {item.only_this_order_product_total}</p>
                                                        </li>
                                                    </ul>
                                                </div> */}
                            <div className="col-lg-6">
                              <ul className="orderlist-details pb-0 m-0">
                                <li>
                                  <h6>Mobile No.</h6>
                                  <p>{item.phone_no}</p>
                                </li>
                                <li>
                                  <h6>Delivery Date</h6>
                                  <p>
                                    {moment(item.delivery_date).format(
                                      "DD MMMM YYYY"
                                    )}
                                  </p>
                                </li>
                                <li>
                                  <h6>Driver OTP</h6>
                                  <p>{item.delivery_verify_code}</p>
                                </li>
                              </ul>
                              <div className="orderlist-deliver">
                                <h6>Delivery location</h6>
                                <p>
                                  {item.address}, {item.city}-{item.pin_code}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <h4 className="text-center text-success">
                Total:{transectionList.amount}
              </h4>

              <div className="col-lg-12">
                <div className="account-card mb-0">
                  <div className="account-title">
                    <h4>payment option</h4>
                    {/* <button>add card</button> */}
                  </div>
                  <div className="account-content">
                    <div className="row">
                      <label
                        htmlFor="COD"
                        className="col-md-6 col-lg-4 alert fade show "
                      >
                        <div
                          className={
                            selectedPayment === "COD"
                              ? "payment-card payment active"
                              : "payment-card payment "
                          }
                        >
                          {/* <img src={paypal} alt="payment" /> */}
                          <input
                            type="radio"
                            id="COD"
                            name="paymentOption"
                            value={"COD"}
                            onChange={(e) => {
                              setSelectedPayment(e.target.value);
                              setPaymentErr(false);
                            }}
                          />
                          <label className="form-label mb-0" htmlFor="COD">
                            Cash on Delivery
                          </label>

                          {/* <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                </button> */}
                        </div>
                      </label>
                      <label
                        htmlFor="UPI"
                        className="col-md-6 col-lg-4 alert fade show"
                      >
                        <div
                          className={
                            selectedPayment === "UPI"
                              ? "payment-card payment active"
                              : "payment-card payment "
                          }
                        >
                          {/* <img src={paypal} alt="payment" /> */}
                          <input
                            type="radio"
                            id="UPI"
                            name="paymentOption"
                            value={"UPI"}
                            onChange={(e) => {
                              setSelectedPayment(e.target.value);
                              setPaymentErr(false);
                            }}
                          />
                          <label className="form-label mb-0" htmlFor="UPI">
                            Pay Now
                          </label>

                          {/* <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                </button> */}
                        </div>
                      </label>
                      {/* <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="payment-card payment">
                                                <img src={visa} alt="payment" />
                                                <h4>card number</h4>
                                                <p>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <sup>1876</sup>
                                                </p>
                                                <h5>miron mahmud</h5>
                                                <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="payment-card payment">
                                                <img src={debit} alt="payment" />
                                                <h4>card number</h4>
                                                <p>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <sup>1876</sup>
                                                </p>
                                                <h5>miron mahmud</h5>
                                                <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                </button>
                                            </div>
                                        </div>*/}
                      {paymentErr === true ? (
                        <small className="text-danger">
                          Please select the payment method
                        </small>
                      ) : null}
                    </div>
                  </div>

                  {/* {termErr === true ? (
                      <small className="text-danger">
                        Please agree Term and condition
                      </small>
                    ) : null} */}
                  {/* {addPass === false ? (
                  <div className="checkout-proced">
                    <Link
                      to=""
                      className="btn btn-inline"
                      onClick={() =>
                        CheckAddress(
                          pincode === "" ||
                            pincode === null ||
                            pincode === undefined ||
                            pincode === "undefined"
                            ? data.pincode
                            : pincode
                        )
                      }
                    >
                      Check Address
                    </Link>
                  </div>
                ) : ( */}
                  <div className="checkout-proced">
                    <Button
                      to=""
                      className="btn btn-inline"
                      onClick={() => {
                        onReCheckoutClick(
                          transectionList.amount,
                          selectedPayment
                        );
                      }}
                      // onClick={CheckOutFun()}
                    >
                      proced to recheckout
                    </Button>
                  </div>
                  <p className="text-danger">
                    Your payment has failed. You will be redirected to the order
                    history page in{" "}
                    <span className="text-success fw-bold">{minutes}</span>{" "}
                    minutes and{" "}
                    <span className="text-success fw-bold">{seconds} </span>{" "}
                    seconds.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
