import React, { useState } from "react";
import { UpdateCart } from "../api/api";
import { toast } from "react-toastify";

const CartUpdate = (props) => {
  const [qytErr, setqytErr] = useState("");
  const [disableqtyButton, setDisableQtyButton] = useState(false);
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
    setDisableQtyButton(true);
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
      let response = await UpdateCart(props.id, props.vid, newqty);
      if (response.data.response === "delete successfull") {
        toast.success("Removed successfull", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setqytErr("");
        setDisableQtyButton(false);
        props.setApicall(true);
        props.setcartcall(true);
        props.setLoading(false);
      }
      if (response.data.response === "update successfull") {
        toast.success("Product Quantity Updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setqytErr("");
        setDisableQtyButton(false);
        props.setApicall(true);
        props.setcartcall(true);
        props.setLoading(false);
      }
      if (response.data.response === "delete opration failed") {
        toast.error("Try again later", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setqytErr("");
        setDisableQtyButton(false);
        props.setApicall(true);
        props.setcartcall(true);
        props.setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="product-action d-flex">
        <button
          className="action-minus"
          title="Quantity Minus"
          style={{ disabled: disableqtyButton ? true : false }}
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
          style={{ disabled: disableqtyButton ? true : false }}
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
