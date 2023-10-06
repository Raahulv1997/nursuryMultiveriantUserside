import React, { useState } from "react";
import { UpdateCart } from "../api/api";
import { toast } from "react-toastify";

const CartUpdate = (props) => {
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  const [qytErr, setqytErr] = useState("");

  // const onAddToCart = async (id, varId) => {
  //     console.log(id, varId, qtyNo);
  //     let response = await AddToCart(id, varId, qtyNo)
  //     if (response.data.response === "add product successfull") {
  //       toast.success("Product Added Successfully", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 1000,
  //       })
  //     }
  //   }
  /*Function to updt quantity */

  const updateQuantity = async (qty) => {
    props.setLoading(true);
    props.setInProcessVarient(props.vid);

    let newqty = props.qty;
    if (qty === "inc") {
      newqty++;
    }
    if (qty === "dec") {
      newqty--;
    }
    if (props.quantity < newqty) {
      setqytErr(
        `We're sorry! Only ${props.quantity} unit(s) allowed in this product`
      );

      props.setLoading(false);
    } else {
      let response = await UpdateCart(props.id, props.vid, newqty, headers);
      if (response.data.response === "delete successfull") {
        toast.success("Removed successfull", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setqytErr("");

        props.setApicall(true);
        props.setcartcall(true);
        props.setLoading(false);
        props.setCartApiCall(true);
      }
      if (response.data.response === "update successfull") {
        toast.success("Product Quantity Updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setqytErr("");

        props.setApicall(true);
        props.setcartcall(true);

        props.setLoading(false);
        props.setInProcessVarient(null);
      }
      if (response.data.response === "delete opration failed") {
        toast.error("Try again later", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setqytErr("");

        props.setApicall(true);
        props.setcartcall(true);
        props.setLoading(false);
        props.setInProcessVarient(null);
      }
    }
  };

  return (
    <>
      <div className="product-action d-flex">
        <button
          className="action-minus"
          title="Quantity Minus"
          style={{
            // eslint-disable-next-line
            disabled: props.loading == true ? true : false,
          }}
          onClick={() => updateQuantity("dec")}
        >
          <i className="icofont-minus"></i>
        </button>
        <input
          className="action-input"
          title="Quantity Number"
          type="text"
          name="quantity"
          value={props.qty}
          readOnly
        />
        <button
          className="action-plus"
          title="Quantity Plus"
          style={{ disabled: props.loading == true ? true : false }}
          onClick={() => updateQuantity("inc")}
        >
          <i className="icofont-plus"></i>
        </button>
      </div>
      <small className="text-danger d-flex justify-content-center">
        {qytErr}
      </small>
    </>
  );
};

export default CartUpdate;
