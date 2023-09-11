import React from "react";
import NotificationBox from "./common/notificationBox";
export default function Notification({ data, close, show }) {
  console.log("ddd--" + JSON.stringify(data));
  return (
    <div>
      <div className={show ? "cart-sidebar active" : " cart-sidebar"}>
        <div className="cart-header">
          <div className="cart-total">
            <i className="fas fa-bell"></i>
            <span>
              Notification{data.length > 0 ? `(${data.length - 1})` : null}
            </span>
          </div>
          <button className="cart-close" onClick={close}>
            <i className="icofont-close"></i>
          </button>
        </div>
        <ul className="">
          {(data || []).map((item, index) => {
            return <NotificationBox data={item} key={index} />;
          })}
        </ul>
        {/* <div
                    className="cart-footer"
                    style={{ position: "absolute", width: "100%" }}
                > */}
        {/* <button className="coupon-btn">Do you have a coupon code?
        </button>
        <form className="coupon-form">
          <input type="text" placeholder="Enter your coupon code" readOnly />
          <button type="submit">
            <span>apply
            </span>
          </button>
        </form> */}
        {/* <Link
          className="cart-checkout-btn"
          to={data.length === 0 ? "" : "/checkout"}
        >
          <span className="checkout-label">Proceed to Checkout</span>
          <span className="checkout-price">
            ₹{getTotalPrice().toFixed(2)}
          </span>
        </Link> */}
        {/* </div> */}
      </div>
    </div>
  );
}
