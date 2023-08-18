import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartBox from "./common/cartBox";
import { CartList } from "./api/api";
import CartEmpty from "../image/cartEmpty.jpg";

export default function Cart({
  setLoading,
  RemoveBodyClass,
  show,
  close,
  setCartApiCall,
  cartApicCall,
  setproductcall,
  setCartList,
  cartList,
}) {
  let navigate = useNavigate();
  let location = useLocation();
  const [apicall, setApicall] = useState(false);
  const [cartcall, setcartcall] = useState(false);
  let [data, setData] = useState([]);
  let Token = localStorage.getItem("token");
  /*Function to get the Cart list */
  let GetCartList = async () => {
    setLoading(true);
    if (Token) {
      let response = await CartList();
      if (
        response.data === undefined ||
        response.data === "undefined" ||
        response.data === null ||
        response.data.length === 0
      ) {
        setData([]);
        setLoading(false);
      } else {
        setData(response.data);
        setLoading(false);
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
  const getTotalPrice = () => {
    let totalPrice = 0;
    data.forEach((item) => {
      totalPrice += item.price * item.cart_product_quantity;
    });
    return totalPrice;
  };

  /*Function to Go detail page */
  // const ProductDetailClick = (item) => {
  //   // if (location.pathname === "/productdetails") {
  //   //   setId(item.id)
  //   //   setVar_Id(item.product_verient_id)
  //   //   setProductDetailCall(true)
  //   // } else {
  //   localStorage.setItem("product_id", item.product_id);
  //   localStorage.setItem("product_var_id", item.product_verient_id);
  //   close();
  //   // return navigate("/productdetails");
  //   // }
  // };
  console.log("hhh-" + location.pathname);
  return (
    <div>
      <div className={show ? "cart-sidebar active" : "cart-sidebar"}>
        <div className="cart-header">
          <div className="cart-total">
            <i className="fas fa-shopping-basket"></i>
            <span>total item ({data.length})</span>
          </div>
          <button className="cart-close" onClick={close}>
            <i className="icofont-close"></i>
          </button>
        </div>
        {data.length === 0 ? (
          <div className="cart_empty text-center pt-sm-5">
            <div>
              <img src={CartEmpty} />
            </div>
            <h3> Empty Cart</h3>
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
          </div>
        ) : (
          <ul className="cart-list">
            {(data || []).map((item, index) => {
              return (
                // <Link key={index} onClick={() => ProductDetailClick(item)}>
                <CartBox
                  data={item}
                  apicall={apicall}
                  setApicall={setApicall}
                  setCartApiCall={setCartApiCall}
                  setcartcall={setcartcall}
                  setproductcall={setproductcall}
                  setLoading={setLoading}
                  close={close}
                />
                // </Link>
              );
            })}
          </ul>
        )}

        <div
          className="cart-footer"
          style={{ position: "absolute", width: "100%", bottom: "10px" }}
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
              ₹{getTotalPrice().toFixed(2)}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
