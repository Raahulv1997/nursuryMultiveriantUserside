import OrderTable from "./common/orderTable";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Otherbannner from "./common/otherbannner";
import Header from "./common/header";
import Footer from "./common/footer";
import { UserData, PlaceOrder, CartList, CheckUserAddress } from "./api/api";
import ProfileInfoModal from "./Modal/productInfo";
import AddAddressForm from "./Modal/addAddressForm";
import { ToastContainer, toast } from "react-toastify";
// import paypal from "../image/payment/png/01.png"
// import visa from "../image/payment/png/02.png"
// import debit from "../image/payment/png/03.png"
function Checkout() {
  var shouldApplyRef;
  const [data, setData] = useState("");
  const [cartData, setCartData] = useState("");
  const [cartTotalData, setTotalCartData] = useState("");
  const [vendorId, setVendorId] = useState([]);
  const [afterAreaCheck, setAfterAreaCheck] = useState([]);
  const [afterAreaCheckNotAvailable, setAfterAreaCheckNotAvailable] = useState(
    []
  );

  const [openProfileInfo, setOpenProfileInfo] = useState(false);
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [apicall, setApicall] = useState(false);
  const [cartcall, setcartcall] = useState(false);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [newAddess, setNewAddress] = useState("");

  const [term, setTerm] = useState(false);
  const [paymentErr, setPaymentErr] = useState(false);
  const [termErr, setTermErr] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [addPass, setAddPass] = useState(false);
  const [locationCheck, setLocationCheck] = useState(false);
  let navigate = useNavigate();
  const divRef = useRef(null);
  /*Function to get user details */
  let GetData = async () => {
    let UserRes = await UserData();
    let CartRes = await CartList();

    setData(UserRes.data[0]);
    setCartData(CartRes.data.response);
    setTotalCartData(CartRes.data);
    // setCartData(CartRes.response.cart_products);
    // console.log(
    //   "dddddddd-" + JSON.stringify(CartRes.data.response[0].cart_products)
    // );
    setVendorId(CartRes.data.response.map((item) => item.vendor_id));
    // if (CartRes.data.length === 0) {
    //   navigate("/");
    // }

    let pin = UserRes.data[0].pincode;
    let v = CartRes.data.response.map((item) => item.vendor_id);

    let responseCheck = await CheckUserAddress(pin, v);
    console.log("after callll----" + JSON.stringify(responseCheck));
    setAfterAreaCheck(responseCheck.data.service_available);
    setAfterAreaCheckNotAvailable(responseCheck.data.service_not_available);
    if (responseCheck.data.status === true) {
      setLocationCheck("avaliable");
    }
    if (responseCheck.data.status === false) {
      setLocationCheck("notAvalaible");
    }

    setLoading(false);
  };

  useEffect(() => {
    GetData();
    if (apicall === true) {
      setApicall(false);
      setcartcall(true);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [apicall]);

  /*Function to get the additional Information */
  const AdditionalAddress = (data) => {
    setNewAddress(data.address);
    setAddress(data.address);
    setPincode(data.pincode);
    setCity(data.city);
    setFirst_name(data.first_name);
    setPhone_no(data.phone_no);
  };

  /* Delivery Object*/
  const deliveryAddress = {
    first_name:
      first_name === "" ||
      first_name === null ||
      first_name === undefined ||
      first_name === "undefined"
        ? data.first_name
        : first_name,
    email: "",
    phone_no:
      phone_no === "" ||
      phone_no === null ||
      phone_no === undefined ||
      phone_no === "undefined"
        ? data.phone_no
        : phone_no,
    image: "",
    address:
      address === "" ||
      address === null ||
      address === undefined ||
      address === "undefined"
        ? data.address
        : address,
    city:
      city === "" || city === null || city === undefined || city === "undefined"
        ? data.city
        : city,
    pincode:
      pincode === "" ||
      pincode === null ||
      pincode === undefined ||
      pincode === "undefined"
        ? data.pincode
        : pincode,
    user_lat: null,
    user_log: null,
  };
  /*Order object */
  const order = (cartData || []).map((item) => {
    return {
      vendor_id: item.vendor_id,
      coupan_code: "",
    };
  });

  /*Final object for placing and order */
  const result = {
    delivery_address: deliveryAddress,
    order: order,
  };
  /*Function to check the address if it is avalable to delivery the product or not */
  const CheckAddress = async (pin) => {
    setLoading(true);
    setPaymentErr(false);
    setTermErr(false);
    let response = await CheckUserAddress(pin, vendorId);
    if (response.data.status === false) {
      toast.error("Area Not available", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setLoading(false);
      setAddPass(false);
    }
    if (response.data.service_available.length > 0) {
      toast.success("Area available", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setLoading(false);
      setAddPass(true);
    }
  };

  const [singleVendorID, setSingleVendor] = useState("");
  const [showSinglePayment, setShowSinglePayment] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [SingleSelectedPayment, setSingleSelectedPayment] = useState(false);
  const [SinglePaymentErr, setSinglePaymentErr] = useState(false);

  const OnSingleCLick = async (vendor_id) => {
    if (singleVendorID === null || singleVendorID === "") {
      setShowSinglePayment(vendor_id);
      setSingleVendor(vendor_id);
      setSinglePaymentErr(false);
      setSingleSelectedPayment(false);
      return;
    }

    if (SingleSelectedPayment === false) {
      setSinglePaymentErr(true);
    } else {
      // setLoading(true);
      console.log("call  api");
      return false;
    }
  };

  const onSingleCheckout = async (vendor_id) => {
    const result = {
      delivery_address: deliveryAddress,
      order: [
        {
          vendor_id: vendor_id,
          coupan_code: "",
        },
      ],
    };
    if (SingleSelectedPayment === false) {
      setSinglePaymentErr(true);
    } else {
      let response = await PlaceOrder(result);

      if (response.response === "placed order successfull") {
        toast.success("Order Placed Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        navigate("/profile?ClickedBy=checkout");
        // const url = `/invoice?order_id=${encodeURIComponent(
        //   response.data.invoice_id
        // )}`;
        // window.location.href = url;
      }
    }
  };
  useEffect(() => {
    if (shouldApplyRef && divRef.current) {
      divRef.current.focus();
    }
  }, [shouldApplyRef]);
  /*Function to pace the order */
  const OnCheckOutCLick = async () => {
    setNotavailable(false);

    if (selectedPayment === false) {
      setLoading(false);
      setPaymentErr(true);
    } else if (term === false) {
      setLoading(false);
      setPaymentErr(false);
      setTermErr(true);
    } else if (afterAreaCheckNotAvailable.length > 0 || shouldApplyRef) {
      if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: "smooth" });
      }
      // divRef.current.scrollIntoView({ behavior: "smooth" });
      setNotavailable(true);
      return;
    } else {
      setLoading(true);

      let response = await PlaceOrder(result);
      console.log("ressponcee---" + JSON.stringify(response));
      if (response.response === "placed order successfull") {
        toast.success("placed order successfull", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        setLoading(false);
        setPaymentErr(false);
        setTermErr(false);
        setAddPass(false);
        setcartcall(true);
        navigate("/profile?ClickedBy=checkout");
        // const url = `/invoice?order_id=${encodeURIComponent(
        //   response.data.invoice_id
        // )}`;
        // window.location.href = url;
      }
    }
    // else {
    //   setLoading(false)
    //   setAddPass(false)
    //   toast.error("Get the correct address", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 1000,
    //   });
    // }
    // }
  };

  let [isNotAvaibale, setNotavailable] = useState(false);
  function arraysAreEqual(id) {
    if (isNotAvaibale === false) return false;

    for (let i = 0; i < afterAreaCheckNotAvailable.length; i++) {
      if (afterAreaCheckNotAvailable[i] == id) {
        console.log(" i---" + afterAreaCheckNotAvailable[i], id);
        return true;
      }
    }

    // afterAreaCheckNotAvailable.map((item) => {
    //   if (item === id) {
    //     console.log("not id--" + item);
    //     console.log("vendor id--" + id);
    //     return true;
    //   }
    // });

    return false;
  }

  return (
    <div>
      {/* Header */}
      <Header
        cartcall={cartcall}
        setproductcall={setApicall}
        setcartcall={setcartcall}
        loading={loading}
        setLoading={setLoading}
      />
      <ToastContainer />
      {/* Banner */}
      <Otherbannner heading={"Checkout"} bread={"checkout"} />
      {/* Main section */}
      <section className="inner-section checkout-part">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12">
                            <div className="alert-info">
                                <p>Returning customer? <Link to="/login">Click here to login</Link>
                                </p>
                            </div>
                        </div> */}
            <div className="col-lg-12">
              <div className="account-card">
                <div className="col-lg-12">
                  <div className="account-card">
                    <div className="account-title">
                      <h4>delivery address</h4>
                      <button onClick={() => setOpenAddressForm(true)}>
                        add address
                      </button>
                    </div>
                    <div className="account-content">
                      <div className="row">
                        <div
                          className="col-md-6 col-lg-4 alert fade show"
                          id="myDiv"
                        >
                          <div
                            className={
                              address === data.address
                                ? "profile-card address active"
                                : address === ""
                                ? "profile-card address active"
                                : "profile-card address"
                            }
                          >
                            <Link
                              to=""
                              onClick={() => {
                                setAddress(data.address);
                                CheckAddress(data.pincode);
                              }}
                              className="text-dark"
                            >
                              <h6>Home</h6>

                              <p>
                                <h5>
                                  {data.first_name} {data.last_name}
                                </h5>
                                +91 {data.phone_no}
                                <br />
                                {data.address} , {data.pincode} {data.city}
                              </p>
                              <ul className="user-action">
                                <li>
                                  <button
                                    className="edit icofont-edit"
                                    title="Edit This"
                                    onClick={() => setOpenProfileInfo(true)}
                                  ></button>
                                </li>
                                {/* <li>
                             <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                              </button>
                                </li> */}
                              </ul>
                            </Link>
                          </div>
                          {locationCheck === "avaliable" ? (
                            <span className="text-success">
                              {" "}
                              Area is available!!!
                            </span>
                          ) : locationCheck === "notAvalaible" ? (
                            <span className="text-danger">
                              {" "}
                              Area is not available!!!
                            </span>
                          ) : null}
                        </div>

                        {data.alternate_address ? (
                          <div className="col-md-6 col-lg-4 alert fade show">
                            <div
                              className={
                                address === data.alternate_address
                                  ? "profile-card address active"
                                  : "profile-card address"
                              }
                            >
                              <Link
                                to=""
                                onClick={() => {
                                  setAddress(data.alternate_address);
                                  CheckAddress(data.pincode);
                                }}
                                className="text-dark"
                              >
                                <h6>Other</h6>
                                <p>
                                  <h5>
                                    {data.first_name} {data.last_name}
                                  </h5>
                                  {data.alternate_address} , {data.pincode}{" "}
                                  {data.city}
                                </p>
                                <ul className="user-action">
                                  <li>
                                    <button
                                      className="edit icofont-edit"
                                      title="Edit This"
                                      onClick={() => setOpenProfileInfo(true)}
                                    ></button>
                                  </li>
                                  {/* <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li> */}
                                </ul>
                              </Link>
                            </div>
                            {/* {locationCheck === "avaliable" ? (
                          <span className="text-success">
                            {" "}
                            Area is available!!!
                          </span>
                        ) : locationCheck === "notAvalaible" ? (
                          <span className="text-danger">
                            {" "}
                            Area is not available!!!
                          </span>
                        ) : null} */}
                          </div>
                        ) : null}
                        {newAddess === "" ||
                        newAddess === undefined ||
                        newAddess === null ? null : (
                          <div className="col-md-6 col-lg-4 alert fade show">
                            <div
                              className={
                                address === newAddess
                                  ? "profile-card address active"
                                  : "profile-card address"
                              }
                            >
                              <Link
                                to=""
                                onClick={() => {
                                  setAddress(newAddess);
                                  setCity(city);
                                  setPincode(pincode);
                                  CheckAddress(pincode);
                                }}
                                className="text-dark"
                              >
                                <h6>New Address</h6>
                                <p>
                                  <h5>{first_name}</h5>
                                  +91 {phone_no}
                                  <br />
                                  {newAddess} , {pincode} {city}
                                </p>
                                {/* <ul className="user-action">
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" 
                                                         onClick={() => setOpenProfileInfo(true)}>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul> */}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="account-card">
                <div className="account-title">
                  <h4>Your Product</h4>
                </div>
                <div className="account-content">
                  {(cartData || []).map((item) => {
                    var iddd = Number(item.vendor_id);
                    shouldApplyRef = arraysAreEqual(item.vendor_id);

                    console.log(shouldApplyRef);
                    return (
                      <div
                        ref={shouldApplyRef ? divRef : null}
                        tabIndex={shouldApplyRef ? "0" : null} // Make the div focusable
                        key={iddd} // Add a unique key for each div
                        style={{
                          border:
                            arraysAreEqual(item.vendor_id) == true
                              ? "2px solid red"
                              : "none",
                        }}
                      >
                        <div className="checkout_page">
                          <div
                            className="checkout_vander_name"
                            style={{
                              display: "flex",
                              flexDirection: "row",

                              justifyContent: "space-between",
                            }}
                          >
                            <b>{item.owner_name}</b>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "end",
                              }}
                            >
                              {
                                // eslint-disable-next-line
                                afterAreaCheck.map((item1, index) => {
                                  // eslint-disable-next-line
                                  if (item1 == iddd) {
                                    return (
                                      <>
                                        <span className="text-success">
                                          Delivery is available
                                        </span>
                                      </>
                                    );
                                  } else if (item1 !== iddd) {
                                    <span className="text-danger">
                                      Not available
                                    </span>;
                                  }
                                })
                              }
                              {afterAreaCheckNotAvailable.map(
                                (item2, index) => {
                                  // eslint-disable-next-line
                                  if (item2 == iddd) {
                                    return (
                                      <>
                                        <span className="text-danger">
                                          Delivery not available
                                        </span>
                                      </>
                                    );
                                  }
                                }
                              )}
                            </div>
                          </div>

                          <OrderTable
                            getTotalGstPrice={`${
                              item[item.vendor_id + "_gst_amount"]
                            }`}
                            getTotalDiscountPrice={`${
                              item[item.vendor_id + "_discount_amount"]
                            }`}
                            getSubTotalPrice={`${
                              item[item.vendor_id + "_price_x_cart_qty_amount"]
                            }`}
                            getTotalPrice={""}
                            mrp={""}
                            qty={`${
                              item[item.vendor_id + "_product_qty_total"]
                            }`}
                            taxablePrice={`${
                              item[item.vendor_id + "_taxable_amount"]
                            }`}
                            deliveryCharges={item.delivery_charges}
                            setApicall={setApicall}
                            data={item.cart_products}
                            setLoading={setLoading}
                            orderData={""}
                          />

                          <div
                            className="table-responsive"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: "4px",
                              alignItems: "center",
                            }}
                          >
                            <table className="table-list-amount">
                              <thead className="amount-table-header ">
                                <tr>
                                  <th scope="col" className="p-1 ">
                                    Discount
                                  </th>
                                  <th scope="col" className="p-1">
                                    Total Gst
                                  </th>
                                  <th scope="col" className="p-1">
                                    SubTotal
                                  </th>
                                  <th scope="col" className="p-1">
                                    Delivary Fee
                                  </th>
                                  <th scope="col" className="p-1">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="table-image p-0">
                                    {" "}
                                    <h6 className="text-danger">
                                      {" "}
                                      - ₹{" "}
                                      {Number(
                                        `${
                                          item[
                                            item.vendor_id + "_discount_amount"
                                          ]
                                        }`
                                      ).toFixed(2)}
                                    </h6>
                                  </td>

                                  <td className="table-price p-1">
                                    <h6>
                                      {" "}
                                      ₹{" "}
                                      {Number(
                                        `${
                                          item[
                                            item.vendor_id + "_discount_amount"
                                          ]
                                        }`
                                      ).toFixed(2)}
                                    </h6>
                                  </td>
                                  <td className="table-quantity p-1">
                                    <h6>
                                      ₹{" "}
                                      {Number(
                                        `${
                                          item[
                                            item.vendor_id +
                                              "_price_x_cart_qty_amount"
                                          ]
                                        }`
                                      ).toFixed(2)}
                                    </h6>
                                  </td>
                                  <td className="table-discount p-1">
                                    <h6>
                                      ₹{" "}
                                      {Number(item.delivery_charges).toFixed(2)}
                                    </h6>
                                  </td>
                                  <td className="table-brand p-1">
                                    <h6 className="text-success">
                                      ₹{" "}
                                      {(
                                        Number(
                                          `${
                                            item[
                                              item.vendor_id +
                                                "_price_x_cart_qty_amount"
                                            ]
                                          }`
                                        ) + Number(item.delivery_charges)
                                      ).toFixed(2)}{" "}
                                    </h6>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div
                              style={{
                                flexDirection: "row",
                                display: "flex",
                                alignItems: "start",
                                gap: "6px",
                              }}
                            >
                              {
                                // eslint-disable-next-line
                                afterAreaCheck.map((item1, index) => {
                                  // eslint-disable-next-line
                                  if (item1 == iddd) {
                                    return (
                                      <>
                                        <div
                                          className="payment-card-signle-order"
                                          style={{
                                            display:
                                              showSinglePayment ===
                                              item.vendor_id
                                                ? "block"
                                                : "none",
                                          }}
                                        >
                                          <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            value={SingleSelectedPayment}
                                            onChange={(e) => {
                                              setSingleSelectedPayment(
                                                e.target.value
                                              );
                                              setSinglePaymentErr(false);
                                            }}
                                          >
                                            <option>
                                              Select Payment Mathod
                                            </option>
                                            <option value="COD">
                                              Case on Delivary
                                            </option>
                                          </select>
                                          {SinglePaymentErr === true ? (
                                            <small className="text-danger">
                                              Payment method is required
                                            </small>
                                          ) : null}
                                        </div>

                                        <div
                                          className="payment-card-signle-order"
                                          style={{
                                            display:
                                              showSinglePayment ===
                                              item.vendor_id
                                                ? "none"
                                                : "block",
                                          }}
                                        >
                                          <button
                                            onClick={() => {
                                              if (singleVendorID === "") {
                                                OnSingleCLick(item.vendor_id);
                                              } else {
                                                setSingleVendor("");
                                                setShowSinglePayment(null);

                                                setSinglePaymentErr(false);
                                                setSingleSelectedPayment("");
                                              }
                                              // if (
                                              //   singleVendorID !==
                                              //   item.vendor_id
                                              // ) {
                                              //   console.log(
                                              //     "if first time from new venfor"
                                              //   );
                                              //   setSingleVendor("");
                                              //   setShowSinglePayment(null);

                                              //   setSinglePaymentErr(false);
                                              //   setSingleSelectedPayment(false);

                                              //   console.log(
                                              //     "after clcik showSinglePayment-----" +
                                              //       showSinglePayment
                                              //   );
                                              // } else {
                                              //   OnSingleCLick(item.vendor_id);
                                              // }
                                            }}
                                          >
                                            Order Now
                                          </button>
                                        </div>

                                        <div
                                          className="payment-card-signle-order"
                                          style={{
                                            display:
                                              showSinglePayment ===
                                              item.vendor_id
                                                ? "block"
                                                : "none",
                                          }}
                                        >
                                          <button
                                            className="btn"
                                            onClick={() => {
                                              onSingleCheckout(item.vendor_id);
                                            }}
                                            // onClick={() => {
                                            //   if (
                                            //     singleVendorID !==
                                            //     item.vendor_id
                                            //   ) {
                                            //     console.log(
                                            //       "if first time from new venfor"
                                            //     );
                                            //     setSingleVendor("");
                                            //     setShowSinglePayment(null);

                                            //     setSinglePaymentErr(false);
                                            //     setSingleSelectedPayment(false);

                                            //     console.log(
                                            //       "after clcik showSinglePayment-----" +
                                            //         showSinglePayment
                                            //     );
                                            //   }
                                            //   console.log(
                                            //     "showSinglePayment-----" +
                                            //       showSinglePayment
                                            //   );
                                            //   OnSingleCLick(item.vendor_id);
                                            // }}
                                          >
                                            checkout
                                          </button>
                                        </div>
                                      </>
                                    );
                                  }
                                })
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="account-title">
                    <h4>Grand Totals</h4>
                  </div>
                  <div className="checkout-charge">
                    <ul>
                      <li>
                        <span className="text-danger">discount</span>
                        <span className="text-danger">
                          - ₹ {Number(cartTotalData.total_discount).toFixed(2)}
                        </span>
                      </li>
                      <li>
                        <span>Total GST</span>
                        {
                          <span>
                            {" "}
                            ₹ {Number(cartTotalData.total_gst).toFixed(2)}{" "}
                          </span>
                        }
                      </li>
                      <li>
                        <span>
                          Sub Total
                          <small>(including GST)</small>
                        </span>
                        {
                          <span>
                            ₹ {Number(cartTotalData.sub_total).toFixed(2)}{" "}
                          </span>
                        }
                      </li>
                      <li>
                        <span>delivery fee</span>
                        <span>
                          ₹{" "}
                          {Number(cartTotalData.total_delivery_charge).toFixed(
                            2
                          )}{" "}
                        </span>
                      </li>
                      <li>
                        <span>Total</span>
                        {
                          <span>
                            ₹{" "}
                            {Number(
                              cartTotalData.sub_total_with_shipping_charges
                            ).toFixed(2)}{" "}
                          </span>
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Delivery Schedule</h4>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card schedule active">
                                                <h6>express</h6>
                                                <p>90 min express delivery</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card schedule">
                                                <h6>8am-10pm</h6>
                                                <p>8.00 AM - 10.00 PM</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card schedule">
                                                <h6>Next day</h6>
                                                <p>Next day or Tomorrow</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            {/* <div className="col-lg-12">
              <div className="account-card">
                <div className="account-title">
                  <h4>contact number</h4>
                  <button data-bs-toggle="modal" data-bs-target="#contact-add">add contact</button>
                </div>
                <div className="account-content">
                  <div className="row">
                    <div className="col-md-6 col-lg-4 alert fade show">
                      <div className="profile-card contact active">
                        <h6>primary</h6>
                        <p>+91 {data.phone_no}</p>
                        <ul>
                          <li>
                            <button
                              className="edit icofont-edit"
                              title="Edit This"
                              onClick={() => setOpenProfileInfo(true)}
                            ></button>
                          </li>
                          <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card contact">
                                                <h6>secondary</h6>
                                                <p>+8801941101915</p>
                                                <ul>
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#contact-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card contact">
                                                <h6>secondary</h6>
                                                <p>+8801747875727</p>
                                                <ul>
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#contact-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> 
                  </div>
                </div>
              </div>
            </div> */}

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
                      className="col-md-6 col-lg-4 alert fade show"
                    >
                      <div className="payment-card payment active">
                        {/* <img src={paypal} alt="payment" /> */}
                        <input
                          type="radio"
                          id="COD"
                          value={"Cash on Delivery"}
                          onChange={(e) => {
                            setSelectedPayment(e.target.value);
                          }}
                        />
                        <label className="form-label mb-0">
                          Cash on Delivery
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
                <div className="checkout-check">
                  <input
                    type="checkbox"
                    id="checkout-check"
                    onChange={(e) => {
                      setTerm(e.target.checked);
                      setTermErr(false);
                    }}
                  />
                  <label htmlFor="checkout-check">
                    By making this purchase you agree to our{" "}
                    <Link>Terms and Conditions</Link>.
                  </label>
                </div>
                {termErr === true ? (
                  <small className="text-danger">
                    Please agree Term and condition
                  </small>
                ) : null}
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
                  <Link
                    to=""
                    className="btn btn-inline"
                    onClick={OnCheckOutCLick}
                  >
                    proced to checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
      {openProfileInfo ? (
        <ProfileInfoModal
          show={openProfileInfo}
          close={() => setOpenProfileInfo(false)}
          setApicall={setApicall}
          setLoading={setLoading}
        />
      ) : null}
      {openAddressForm ? (
        <AddAddressForm
          show={openAddressForm}
          close={() => setOpenAddressForm(false)}
          GetAddress={AdditionalAddress}
          vendorId={vendorId}
          setLoading={setLoading}
        />
      ) : null}
    </div>
  );
}

export default Checkout;
