import OrderTable from "./common/orderTable";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../image/logo.png";
import Otherbannner from "./common/otherbannner";
import Header from "./common/header";

import Footer from "./common/footer";
import {
  UserData,
  PlaceOrder,
  CartList,
  CheckUserAddress,
  CreateRazorpay,
  UpdatePaymentStatus,
} from "./api/api";
import ProfileInfoModal from "./Modal/productInfo";
import AddAddressForm from "./Modal/addAddressForm";
import { ToastContainer, toast } from "react-toastify";

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
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [newAddess, setNewAddress] = useState("");
  const [onProfileSave, setOnProfileSave] = useState(false);

  const [term, setTerm] = useState(false);
  const [paymentErr, setPaymentErr] = useState(false);
  const [termErr, setTermErr] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [addPass, setAddPass] = useState(false);

  const [singleVendorID, setSingleVendor] = useState("");
  const [showSinglePayment, setShowSinglePayment] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [SingleSelectedPayment, setSingleSelectedPayment] = useState(false);
  const [SinglePaymentErr, setSinglePaymentErr] = useState(false);

  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  let navigate = useNavigate();
  /*Function to get user details */
  let GetData = async () => {
    let UserRes = await UserData(headers);
    let CartRes = await CartList(headers);

    setData(UserRes.data[0]);
    setCartData(CartRes.data.response);

    setTotalCartData(CartRes.data);
    // setCartData(CartRes.response.cart_products);
    // console.log(
    //   "dddddddd-" + JSON.stringify(CartRes.data.response[0].cart_products)
    // );
    setVendorId((CartRes.data.response || []).map((item) => item.vendor_id));
    // if (CartRes.data.length === 0) {
    //   navigate("/");
    // }

    let pin = UserRes.data[0].pincode;
    let v = (CartRes.data.response || []).map((item) => item.vendor_id);

    let responseCheck = await CheckUserAddress(pin, v, headers);

    setAfterAreaCheck(responseCheck.data.service_available || []);
    setAfterAreaCheckNotAvailable(
      responseCheck.data.service_not_available || []
    );

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
    setLast_name(data.last_name);
    setEmail(data.email);
    setPhone_no(data.phone_no);
    setOnProfileSave(data.onProfileSave);
  };

  const DeleteAdditionAddress = () => {
    setNewAddress("");
    setAddress("");
    setPincode("");
    setCity("");
    setFirst_name("");
    setLast_name("");
    setEmail("");
    setPhone_no("");
    setOnProfileSave(false);
    setApicall(true);
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
    last_name:
      last_name === "" ||
      last_name === null ||
      last_name === undefined ||
      last_name === "undefined"
        ? data.last_name
        : last_name,
    email:
      email === "" ||
      email === null ||
      email === undefined ||
      email === "undefined"
        ? data.email
        : email,
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
    replace_address: onProfileSave === "" ? false : onProfileSave,
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
    payment_method: selectedPayment === "COD" ? "cod" : "other",
    delivery_address: deliveryAddress,
    order: order,
  };
  /*Function to check the address if it is avalable to delivery the product or not */
  // const CheckAddress = async (pin) => {
  //   setLoading(true);
  //   setPaymentErr(false);
  //   setTermErr(false);
  //   let response = await CheckUserAddress(pin, vendorId, headers);
  //   if (response.data.status === false) {
  //     toast.error("Area Not available", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //     setLoading(false);
  //     setAddPass(false);
  //   }
  //   if (response.data.service_available.length > 0) {
  //     toast.success("Area available", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //     setLoading(false);
  //     setAddPass(true);
  //   }
  // };

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

      return false;
    }
  };

  const onSingleCheckout = async (
    vendor_id,
    SingleSelectedPayment,
    payAmount
  ) => {
    const result = {
      payment_method: SingleSelectedPayment === "COD" ? "cod" : "other",
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
    } else if (
      data.first_name === null &&
      data.phone_no === null &&
      data.pincode === null &&
      data.address === null &&
      data.city === null
    ) {
      toast.success("Please Update your Profile first for any order", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      if (SingleSelectedPayment === "UPI") {
        console.log("ressponcee---" + JSON.stringify(result));

        OnPlaceOrderApi(result, payAmount);
        // onPayentClick(payAmount, result);
      } else if (SingleSelectedPayment === "COD") {
        console.log("ressponcee---" + JSON.stringify(result));
        setLoading(true);

        let response = await PlaceOrder(result, headers);

        if (
          response.data.response ===
          "Thank you for your order! Your order has been received and is being processed"
        ) {
          toast.success("Order Placed Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);

          setTimeout(() => {
            navigate("/profile?ClickedBy=checkout");
          }, 2000);
        }
      }

      setLoading(false);
    }
  };

  const OnPlaceOrderApi = async (result, payAmount) => {
    setLoading(true);
    let response = await PlaceOrder(result, headers);
    let orders_group_id = response.data.orders_group_id;

    if (
      response.data.response ===
      "Thank you for your order! Your order has been received and is being processed"
    ) {
      toast.success("Order Placed Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setLoading(false);
      setPaymentErr(false);
      setTermErr(false);
      setAddPass(false);
      setcartcall(true);

      onPayentClick(payAmount, orders_group_id);
    }
  };

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
          // paymentObject.close();
          // window.location.reload();
          console.log(" failde--" + JSON.stringify(response.error.reason));
          if (response.error.reason === "payment_failed") {
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
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };
  /*Function to pace the order */
  const OnCheckOutCLick = async (amount, payMethod) => {
    console.log(amount, payMethod);

    setNotavailable(false);

    if (selectedPayment === false) {
      setLoading(false);
      setPaymentErr(true);
    } else if (term === false) {
      setLoading(false);
      setPaymentErr(false);
      setTermErr(true);
    } else if (
      data.first_name === null &&
      data.phone_no === null &&
      data.pincode === null &&
      data.address === null &&
      data.city === null
    ) {
      toast.success("Please Update your Profile first for any order", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else if (afterAreaCheckNotAvailable.length > 0 || shouldApplyRef) {
      // if (divRef.current) {
      //   divRef.current.scrollIntoView({ behavior: "smooth" });
      // }
      // // divRef.current.scrollIntoView({ behavior: "smooth" });
      // document.getElementById("Vendor5");
      setNotavailable(true);
      return;
    } else {
      setLoading(true);

      if (payMethod === "UPI") {
        OnPlaceOrderApi(result, amount);
        // onPayentClick(amount, result);
      } else if (payMethod === "COD") {
        setLoading(true);
        let response = await PlaceOrder(result, headers);

        if (
          response.data.response ===
          "Thank you for your order! Your order has been received and is being processed"
        ) {
          toast.success("placed order successfull", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });

          setLoading(false);
          setPaymentErr(false);
          setTermErr(false);
          setAddPass(false);
          setcartcall(true);

          setTimeout(() => {
            navigate("/profile?ClickedBy=checkout");
          }, 2000);

          // navigate("/profile?ClickedBy=checkout");
        }
        setLoading(false);
      }
      setLoading(false);
    }
  };

  let [isNotAvaibale, setNotavailable] = useState(false);
  function arraysAreEqual(id) {
    if (isNotAvaibale === false) return false;

    for (let i = 0; i < afterAreaCheckNotAvailable.length; i++) {
      // eslint-disable-next-line
      if (afterAreaCheckNotAvailable[i] == id) {
        document.getElementById("Vendor" + id).focus();

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
      {cartData.length === 0 ? (
        <div className="text-center">
          {" "}
          <b>Data Not found</b>
        </div>
      ) : (
        <div>
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
                              style={{
                                display:
                                  data.first_name === null &&
                                  data.phone_no === null &&
                                  data.address === null &&
                                  data.pincode === null &&
                                  data.city === null
                                    ? "none"
                                    : "block",
                              }}
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
                                    // CheckAddress(data.pincode);
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
                                  </ul>
                                </Link>
                              </div>
                            </div>
                            {data.first_name === null ? (
                              <span className="upadte_profile_btn">
                                <button
                                  className="edit p-3  btn btn-success "
                                  title="Edit This"
                                  onClick={() => setOpenProfileInfo(true)}
                                >
                                  <div className="icofont-edit"></div>
                                  Upadte Profile
                                </button>
                              </span>
                            ) : null}
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
                                      // CheckAddress(data.pincode);
                                    }}
                                    className="text-dark"
                                  >
                                    <h6>Other</h6>
                                    <p>
                                      <h5>
                                        {data.first_name} {data.last_name}
                                      </h5>
                                      +91 {data.phone_no}
                                      <br />
                                      {data.alternate_address} , {data.pincode}{" "}
                                      {data.city}
                                    </p>
                                    <ul className="user-action">
                                      {/* <li>
                                    <button
                                      className="edit icofont-edit"
                                      title="Edit This"
                                      onClick={() => setOpenProfileInfo(true)}
                                    ></button>
                                  </li> */}
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
                                      // CheckAddress(pincode);
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
                                    <ul className="user-action">
                                      {/* <li>
                                                        <button className="edit icofont-edit" title="Edit This" 
                                                         onClick={() => setOpenProfileInfo(true)}>
                                                        </button>
                                                    </li> */}
                                      <li>
                                        <button
                                          className="trash icofont-ui-delete"
                                          title="Remove This"
                                          onClick={DeleteAdditionAddress}
                                          data-bs-dismiss="alert"
                                        ></button>
                                      </li>
                                    </ul>
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

                        return (
                          <div
                            id={"Vendor" + item.vendor_id}
                            tabindex={item.vendor_id}
                            key={iddd} // Add a unique key for each div
                            style={{
                              outline:
                                arraysAreEqual(item.vendor_id) === true
                                  ? "2px solid red"
                                  : "none",
                              padding:
                                arraysAreEqual(item.vendor_id) === true
                                  ? "10px"
                                  : "0px",

                              boxShadow:
                                arraysAreEqual(item.vendor_id) === true
                                  ? "2px 2px 4px rgba(0, 0, 0, 0.6)"
                                  : "none",
                              borderRadius:
                                arraysAreEqual(item.vendor_id) === true
                                  ? "10px"
                                  : "0px",
                            }}
                          >
                            <input type="hidden" />
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
                                    (afterAreaCheck || []).map(
                                      // eslint-disable-next-line
                                      (item1, index) => {
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
                                      }
                                    )
                                  }
                                  {(afterAreaCheckNotAvailable || []).map(
                                    // eslint-disable-next-line
                                    (item2, index) => {
                                      // eslint-disable-next-line
                                      if (item2 == iddd) {
                                        return (
                                          <>
                                            <span className="text-danger">
                                              Delivery not available Either
                                              remove this product/change the
                                              address
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
                                  item[
                                    item.vendor_id + "_price_x_cart_qty_amount"
                                  ]
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
                                className="checkout-charge checkout-charge-order"
                                style={{
                                  width: "450px",
                                }}
                              >
                                <ul>
                                  <li className="py-1">
                                    <span className="text-danger">
                                      discount
                                    </span>
                                    <span className="text-danger">
                                      {" "}
                                      - ₹{" "}
                                      {Number(
                                        `${
                                          item[
                                            item.vendor_id + "_discount_amount"
                                          ]
                                        }`
                                      ).toFixed(2)}
                                    </span>
                                  </li>
                                  <li className="py-1">
                                    <span>Total GST</span>
                                    {
                                      <span>
                                        {" "}
                                        ₹{" "}
                                        {Number(
                                          `${
                                            item[item.vendor_id + "_gst_amount"]
                                          }`
                                        ).toFixed(2)}
                                      </span>
                                    }
                                  </li>
                                  <li className="py-1">
                                    <span>
                                      Sub Total
                                      <small>(including GST)</small>
                                    </span>
                                    {
                                      <span>
                                        ₹{" "}
                                        {Number(
                                          `${
                                            item[
                                              item.vendor_id +
                                                "_price_x_cart_qty_amount"
                                            ]
                                          }`
                                        ).toFixed(2)}
                                      </span>
                                    }
                                  </li>
                                  <li className="py-1">
                                    <span>delivery fee</span>
                                    <span>
                                      ₹{" "}
                                      {Number(item.delivery_charges).toFixed(2)}{" "}
                                    </span>
                                  </li>
                                  <li className="py-1">
                                    <span>Total</span>
                                    {
                                      <span>
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
                                      </span>
                                    }
                                  </li>
                                </ul>
                                <div
                                  style={{
                                    flexDirection: "row",
                                    display: "flex",
                                    justifyContent: "center",
                                    // alignItems: "center",
                                    gap: "6px",
                                  }}
                                >
                                  {
                                    // eslint-disable-next-line
                                    (afterAreaCheck || []).map(
                                      // eslint-disable-next-line
                                      (item1, index) => {
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
                                                    Select Payment Method
                                                  </option>
                                                  <option value="COD">
                                                    Cash on Delivary
                                                  </option>
                                                  <option value="UPI">
                                                    Pay now
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
                                                      OnSingleCLick(
                                                        item.vendor_id
                                                      );
                                                    } else {
                                                      setSingleVendor("");
                                                      setShowSinglePayment(
                                                        null
                                                      );

                                                      setSinglePaymentErr(
                                                        false
                                                      );
                                                      setSingleSelectedPayment(
                                                        ""
                                                      );
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
                                                    onSingleCheckout(
                                                      item.vendor_id,
                                                      SingleSelectedPayment,
                                                      (
                                                        Number(
                                                          `${
                                                            item[
                                                              item.vendor_id +
                                                                "_price_x_cart_qty_amount"
                                                            ]
                                                          }`
                                                        ) +
                                                        Number(
                                                          item.delivery_charges
                                                        )
                                                      ).toFixed(2)
                                                    );
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
                                      }
                                    )
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
                              - ₹{" "}
                              {Number(cartTotalData.total_discount).toFixed(2)}
                            </span>
                          </li>
                          <li>
                            <span>Total GST</span>
                            {
                              <span>
                                {" "}
                                ₹ {Number(cartTotalData.total_gst).toFixed(
                                  2
                                )}{" "}
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
                              {Number(
                                cartTotalData.total_delivery_charge
                              ).toFixed(2)}{" "}
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
                            <label htmlFor="UPI" className="form-label mb-0">
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
                        onClick={() => {
                          OnCheckOutCLick(
                            Number(
                              cartTotalData.sub_total_with_shipping_charges
                            ).toFixed(2),
                            selectedPayment
                          );
                        }}
                        // onClick={CheckOutFun()}
                      >
                        proced to checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

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
