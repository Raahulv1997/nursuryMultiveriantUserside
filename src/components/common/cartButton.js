import React from "react";
import { AddToCart } from "../api/api";
const CartUpdate = (props) => {

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
    console.log();

    const updateQuantity= async (qty) =>{
        let newqty=props.qty;
        if(qty === "inc"){
            newqty++;
        }
        if(qty === "dec"){
            newqty--;
        }
        let response = await AddToCart(props.id, props.vid, newqty);
        console.log(newqty);
    }
  return (
    <div className='product-action d-flex'>
    <button
      className='action-minus'
      title='Quantity Minus'
      onClick={() =>
        updateQuantity("dec")
      }
    >
      <i className='icofont-minus'></i>
    </button>
    <input
      className='action-input'
      title='Quantity Number'
      type='text'
      name='quantity'
      value={props.qty}
      readOnly
    />
    <button
      className='action-plus'
      title='Quantity Plus'
      onClick={() =>
        updateQuantity("inc")
      }
    >
      <i className='icofont-plus'></i>
    </button>
  </div>
  );
};

export default CartUpdate;
