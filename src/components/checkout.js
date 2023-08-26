import OrderTable from "./common/orderTable";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState("");
  const [cartData, setCartData] = useState("");
  const [cartTotalData, setTotalCartData] = useState("");
  const [vendorId, setVendorId] = useState([]);
  const [afterAreaCheck, setAfterAreaCheck] = useState([]);
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
  const [selectedPayment, setSelectedPayment] = useState(false);
  const [term, setTerm] = useState(false);
  const [paymentErr, setPaymentErr] = useState(false);
  const [termErr, setTermErr] = useState(false);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [addPass, setAddPass] = useState(false);
  const [locationCheck, setLocationCheck] = useState(false);
  let navigate = useNavigate();

  const divElement = document.getElementById("myDiv");

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
    if (responseCheck.data.status === true) {
      setLocationCheck("avaliable");
    }
    if (responseCheck.data.status === false) {
      setLocationCheck("notAvalaible");
    }

    setLoading(false);
  };

  console.log(afterAreaCheck);

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

  /*Function to pace the order */
  const OnCheckOutCLick = async () => {
    setLoading(true);
    if (selectedPayment === false) {
      setLoading(false);
      setPaymentErr(true);
    } else if (term === false) {
      setLoading(false);
      setPaymentErr(false);
      setTermErr(true);
    } else if (locationCheck === "notAvalaible") {
      setLoading(false);
      setLocationCheck("notAvalaible");
      setTermErr(true);

      divElement.focus();
    } else {
      // CheckAddress(pincode === "" ||
      //   pincode === null ||
      //   pincode === undefined ||
      //   pincode === "undefined"
      //   ? data.pincode
      //   : pincode)
      // if (addPass === true) {
      return false;
      let response = await PlaceOrder(result);
      console.log("responseseee after order--" + JSON.stringify(response));

      if (response.data.response === "order successfully added") {
        toast.success("Order Placed Successfully", {
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
                <div className="account-title">
                  <h4>Your Product</h4>
                </div>
                <div className="account-content">
                  {(cartData || []).map((item) => {
                    var iddd = Number(item.vendor_id);
                    return (
                      <>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",

                            justifyContent: "space-between",
                          }}
                        >
                          <p>Vendor--{item.owner_name}</p>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "end",
                            }}
                          >
                            {afterAreaCheck.map((item1, index) => {
                              if (item1 == iddd) {
                                return (
                                  <>
                                    <span className="label-text sale bg-danger">
                                      available
                                    </span>
                                    <span className="label-text sale bg-success">
                                      order this
                                    </span>
                                  </>
                                );
                              }
                            })}
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
                          qty={`${item[item.vendor_id + "_product_qty_total"]}`}
                          taxablePrice={`${
                            item[item.vendor_id + "_taxable_amount"]
                          }`}
                          deliveryCharges={item.delivery_charges}
                          setApicall={setApicall}
                          data={item.cart_products}
                          setLoading={setLoading}
                          orderData={""}
                        />
                      </>
                    );
                  })}
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
                            setPaymentErr(false);
                          }}
                        />
                        <label className="form-label">Cash on Delivery</label>

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
