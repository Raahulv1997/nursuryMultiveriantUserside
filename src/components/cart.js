import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartBox from "./common/cartBox";
import { CartList } from "./api/api";
import CartEmpty from "../image/cartEmpty.jpg";
import Loadeer from "./common/Loadeer";

export default function Cart({
  setLoading,
  loading,
  RemoveBodyClass,
  show,
  close,
  setCartApiCall,
  cartApicCall,
  setproductcall,
  setCartList,
  cartList,
}) {
  var delCharges = 0;
  let navigate = useNavigate();
  let location = useLocation();
  const [apicall, setApicall] = useState([]);
  const [updatecartLoader, SetUpdateCartLoader] = useState(false);
  const [cartcall, setcartcall] = useState(false);
  let [data, setData] = useState([]);
  let [subTotal, setsubTotal] = useState("");
  let [totalQty, settotalQty] = useState("");

  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  /*Function to get the Cart list */
  let GetCartList = async () => {
    SetUpdateCartLoader(true);
    if (Token) {
      let response = await CartList(headers);
      if (
        response.data === undefined ||
        response.data === "undefined" ||
        response.data === null ||
        response.data.length === 0
      ) {
        setData([]);
        SetUpdateCartLoader(false);
      } else {
        setData(response.data.response || []);
        setsubTotal(response.data.sub_total);
        settotalQty(response.data.total_product_count);
        // setData(response.data);

        SetUpdateCartLoader(false);
      }
    }
  };

  /*Render method to get Cart list */
  useEffect(() => {
    GetCartList();
    if (apicall === true || apicall === undefined) {
      setApicall(false);
    }
    if (cartcall === true) {
      setcartcall(false);
      setproductcall(true);
    }
    if (cartList === true) {
      setCartList(false);
    }
    // eslint-disable-next-line
  }, [apicall, cartcall, cartApicCall, cartList]);

  /*Function to Calculation the sum total price of all cart products */
  // const getTotalPrice = () => {
  //   let totalPrice = 0;
  //   data.forEach((item) => {
  //     totalPrice += item.price * item.cart_product_quantity;
  //   });
  //   return totalPrice;
  // };

  return (
    <div>
      <div
        className={
          show
            ? "cart-sidebar active inner_loader"
            : "cart-sidebar inner_loader"
        }
      >
        {updatecartLoader ? <Loadeer /> : null}
        <div className="cart-header">
          {totalQty === undefined ? null : (
            <div className="cart-total">
              <i className="fas fa-shopping-basket"></i>
              <span>total item ({totalQty})</span>
            </div>
          )}
          <button className="cart-close" onClick={close}>
            <i className="icofont-close"></i>
          </button>
        </div>
        {data.length === 0 ? (
          <div className="cart_empty text-center pt-sm-5">
            <div>
              <img src={CartEmpty} alt={"cart"} />
            </div>
            <h3> Empty Cart</h3>
            {location.pathname === "/shop" ? null : (
              <button
                className="btn btn-primary-sm"
                onClick={() => {
                  if (location.pathname === "/shop") {
                    // alert("ll");

                    // var element = document.getElementById("main_body");
                    // element.classList.add("body_overflow");
                    RemoveBodyClass();
                  } else {
                    navigate("/shop");
                    RemoveBodyClass();
                  }
                }}
              >
                {" "}
                Shop Now
              </button>
            )}
          </div>
        ) : (
          <ul className="cart-list">
            {(data || []).map((item, index) => {
              delCharges += Number(item.delivery_charges);
              return (
                // <Link key={index} onClick={() => ProductDetailClick(item)}>
                <React.Fragment key={index}>
                  <b>{item.owner_name}</b>
                  <div>
                    {(item.cart_products || []).map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <CartBox
                            data={item}
                            apicall={apicall}
                            setApicall={setApicall}
                            setCartApiCall={setCartApiCall}
                            setcartcall={setcartcall}
                            setproductcall={setproductcall}
                            setLoading={SetUpdateCartLoader}
                            loading={updatecartLoader}
                            close={close}
                          />
                        </React.Fragment>
                      );
                    })}
                    <h4 style={{ marginTop: "10px" }}>Summary</h4>

                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                        marginTop: "10px",
                      }}
                    >
                      {" "}
                      <small> SubTotal</small>
                      <small>{`${item[
                        item.vendor_id + "_price_x_cart_qty_amount"
                      ].toFixed(2)}`}</small>
                    </div>
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                      }}
                    >
                      <small> Delivery charge</small>
                      <small>{Number(item.delivery_charges).toFixed(2)}</small>
                    </div>
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                      }}
                    >
                      {" "}
                      <b>Total</b>
                      <b className="text-danger">
                        {(
                          Number(
                            ` ${
                              item[item.vendor_id + "_price_x_cart_qty_amount"]
                            } `
                          ) + Number(item.delivery_charges)
                        ).toFixed(2)}
                      </b>
                    </div>
                    <hr style={{ margin: "10px 0 5px 0" }} />
                  </div>
                </React.Fragment>
                // </Link>
              );
            })}
          </ul>
        )}
        {location.pathname === "/checkout" ? null : (
          <div
            className="cart-footer"
            style={{
              position: "absolute",
              width: "100%",
              bottom: "10px",
            }}
          >
            {/* <button className="coupon-btn">Do you have a coupon code?
  </button>
  <form className="coupon-form">
    <input type="text" placeholder="Enter your coupon code" readOnly />
    <button type="submit">
      <span>apply
      </span>
    </button>
  </form> */}
            <Link
              className="cart-checkout-btn "
              style={{
                width: "100%",
                display: data.length === 0 ? "none" : "block",
              }}
              to={"/checkout"}
              onClick={() => RemoveBodyClass()}
            >
              <span className="checkout-label">Proceed to Checkout</span>
              <span className="checkout-price">
                ₹ {Number(subTotal + delCharges).toFixed(2)}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
