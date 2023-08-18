import React, { useEffect, useState } from "react";
import OrderTable from "./orderTable";
import { Link } from "react-router-dom";
import { OrderList, Orderdetails } from "../api/api";
import moment from "moment";
import TicketModal from "../Modal/ticket";

export default function Orderhistorysection({ setLoading }) {
  let [orderList, setOrderList] = useState([]);
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [openOrderDetail, setOpenOrderDetail] = useState(null);
  const [orderId, setOrderId] = useState(null);
  let [orderProductList, setOrderProductList] = useState("");
  let [orderDataList, setOrderDataList] = useState([]);
  /*Function to get Order data */

  let newTotalGSt = 0;
  let newTotalAmount = 0;
  let newTotalDiscount = 0;
  let newSubTotal = 0;
  let newTotalTaxableAmount = 0;
  let newTotalQty = 0;
  let GetData = async (OrderId) => {
    let OrderRes = await Orderdetails(OrderId);
    if (
      OrderRes.data === null ||
      OrderRes.data === undefined ||
      OrderRes.data === "" ||
      OrderRes.data.response === "not found"
    ) {
      setOrderProductList([]);

      setLoading(false);
    } else {
      console.log("ordddddgffg--" + JSON.stringify(OrderRes.data));
      setOrderProductList(OrderRes.data.order_product_detaile);

      if (OrderId) {
        console.log("orddddd--" + JSON.stringify(OrderRes.data.order_detaile));
        setOrderDataList(OrderRes.data.order_detaile);
      } else {
        setOrderDataList([]);
      }

      setLoading(false);
    }
  };
  /*Function to Calculation the sum total price of all Order products */
  let subtotal = 0;
  let totalGst = 0;
  let totalDiscount = 0;
  let mrp = 0;
  let qty = 0;
  let taxablePrice = 0;

  /*Function to get the totals */
  const getTotalPrice = () => {
    let totalAmount = 0;
    if (orderProductList) {
      mrp = 0;
      subtotal = 0;
      totalGst = 0;
      totalDiscount = 0;
      qty = 0;
      taxablePrice = 0;
      orderProductList.forEach((item) => {
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

    if (orderDataList.length !== 0) {
      newTotalGSt = orderDataList[0].total_gst;
      newTotalAmount = orderDataList[0].total_amount;
      newTotalDiscount = orderDataList[0].total_discount;
      newSubTotal = orderDataList[0].only_this_order_product_total;
      newTotalTaxableAmount = newSubTotal - newTotalGSt;
      newTotalQty = orderDataList[0].only_this_order_product_quantity;
    } else {
      newTotalGSt = 0;
      newTotalAmount = 0;
      newTotalDiscount = 0;
      newSubTotal = 0;
      newTotalTaxableAmount = 0;
      newTotalQty = 0;
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
  }, []);

  /*Function to Open order detail box */
  const toggleOrderDetail = (orderId, id) => {
    if (openOrderDetail === orderId) {
      setOpenOrderDetail(null);
    } else {
      setOpenOrderDetail(orderId);
      GetData(id);
    }
  };
  /*Function to get the order data */
  const GetOrderData = async () => {
    setLoading(true);
    let response = await OrderList();
    if (
      response.data.results === null ||
      response.data.results === undefined ||
      response.data.results === "" ||
      response.data.results.length === 0
    ) {
      setOrderList([]);
      setLoading(false);
    } else {
      setLoading(false);
      setOrderList(response.data.results);
    }
  };

  /*Render method to get order data */
  useEffect(() => {
    window.scrollTo(0, 0);
    GetOrderData();
    // eslint-disable-next-line
  }, [apicall]);

  /*Function to Open complaint modal */
  let AddComplaintModal = (id) => {
    setOpenTicketModal(true);
    setOrderId(id);
  };

  return (
    <div>
      <section className="inner-section orderlist-part">
        <div className="container">
          <div className="row">
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
            const orderId = index;
            const isOrderDetailOpen = openOrderDetail === orderId;
            return (
              <div className="row" key={index}>
                <div className="col-lg-12">
                  <div className="orderlist">
                    <Link
                      className="orderlist-head"
                      onClick={() => toggleOrderDetail(orderId, item.order_id)}
                    >
                      <h5>order #{item.order_id}</h5>
                      <h5>order {item.status_order}</h5>
                    </Link>
                    <div className={"orderlist-body d-block"}>
                      <div className="row">
                        {/* <div className="col-lg-12">
                                            <div className="order-track">
                                                <ul className="order-track-list">
                                                    <li className="order-track-item active">
                                                        <i className="icofont-check">
                                                        </i>
                                                        <span>order recieved</span>
                                                    </li>
                                                    <li className="order-track-item">
                                                        <i className="icofont-close">
                                                        </i>
                                                        <span>order processed</span>
                                                    </li>
                                                    <li className="order-track-item">
                                                        <i className="icofont-close">
                                                        </i>
                                                        <span>order shipped</span>
                                                    </li>
                                                    <li className="order-track-item">
                                                        <i className="icofont-close">
                                                        </i>
                                                        <span>order delivered</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> */}

                        {/* <Link to="" className='text-end text-decoration-none p-2' onClick={() => AddReviewModal(item)}> 
                                                <button className='btn-sm btn-primary'>
                                                    Add Review
                                                    </button>
                                                    </Link> */}
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
                              <h6>Order Time</h6>
                              <p>
                                {moment(item.order_date).format("DD MMMM YYYY")}
                              </p>
                            </li>
                            <li>
                              <h6>Delivery Time</h6>
                              <p>
                                {moment(item.delivery_date).format(
                                  "DD MMMM YYYY"
                                )}
                              </p>
                            </li>
                            <li>
                              <h6>Total</h6>
                              <p>₹ {item.total_amount}</p>
                            </li>
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
                          <div className="orderlist-deliver">
                            <h6>Delivery location</h6>
                            <p>
                              {item.address}, {item.city}-{item.pin_code}
                            </p>
                          </div>
                        </div>
                        <div
                          className={isOrderDetailOpen ? "col-lg-12" : "d-none"}
                        >
                          {/* <OrderTable
invoice={"other"}
getTotalGstPrice={TotalPrice[1].toFixed(2)}
getTotalDiscountPrice={TotalPrice[2].toFixed(2)}
getSubTotalPrice={TotalPrice[3].toFixed(2)}
getTotalPrice={TotalPrice[0].toFixed(2)}
mrp={TotalPrice[4].toFixed(2)}
qty={TotalPrice[5]}
taxablePrice={TotalPrice[6].toFixed(2)}
data={orderProductList}
setLoading={setLoading}
setApicall={setApicall}
orderData={orderDataList}
/> */}
                          <OrderTable
                            invoice={"other"}
                            getTotalGstPrice={Number(newTotalGSt).toFixed(2)}
                            getTotalDiscountPrice={Number(
                              newTotalDiscount
                            ).toFixed(2)}
                            getSubTotalPrice={Number(newSubTotal).toFixed(2)}
                            getTotalPrice={Number(newTotalAmount).toFixed(2)}
                            mrp={TotalPrice[4].toFixed(2)}
                            qty={newTotalQty}
                            taxablePrice={Number(newTotalTaxableAmount).toFixed(
                              2
                            )}
                            data={orderProductList}
                            setLoading={setLoading}
                            setApicall={setApicall}
                            orderData={orderDataList}
                          />
                          <Link
                            to=""
                            className="text-end text-decoration-none"
                            onClick={() => AddComplaintModal(item.order_id)}
                          >
                            <button className="blog-btn">
                              Generate Ticket
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {openTicketModal ? (
        <TicketModal
          show={openTicketModal}
          close={() => setOpenTicketModal(false)}
          order_id={orderId}
          setApicall={setApicall}
          setLoading={setLoading}
        />
      ) : null}
    </div>
  );
}
