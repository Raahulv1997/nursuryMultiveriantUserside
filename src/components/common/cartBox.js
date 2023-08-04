import React from "react";
import CartUpdate from "./cartButton";
import { DeleteCart } from "../api/api";
import { toast } from "react-toastify";
import productImg from "../../image/product_demo.png";
import { useNavigate } from "react-router-dom";

function CartBox({
  setLoading,
  data,
  setApicall,
  setCartApiCall,
  setcartcall,
  close,
}) {
  let navigate = useNavigate();
  /*Funtion to delete cart */
  const DeleteCartClick = async (id, varId) => {
    setLoading(true);
    let response = await DeleteCart(id, varId);
    if (response.data.response === "delete successfull") {
      toast.success("Product Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setApicall(true);
      setCartApiCall(true);
      setLoading(false);
    }
  };
  const CoverImg = (img) => {
    const result = img.replace(/,+/g, ",");
    return result.split(",")[0];
  };

  // console.log("id " + data.product_id);
  // console.log(" vid" + data.product_verient_id);

  // const ProductDetailsClick = () => {
  //   if (location.pathname === "/productdetails") {
  //     //         setId(item.id)
  //     //  setVar_Id(item.product_verient_id)
  //     alert("lll");
  //   }
  //   localStorage.setItem("product_id", data.product_id);
  //   localStorage.setItem("product_var_id", data.product_verient_id);
  //   navigate("/productdetails");
  //   close();
  // };
  const ProductDetailsClick = () => {
    navigate(
      `/productdetails?product_id=${data.product_id}&&variant_id=${data.product_verient_id}`
    );
    close();
  };
  return (
    <>
      <div className="cart-item">
        <div className="cart-media">
          <img
            src={
              data.cover_image === null ||
              data.cover_image === undefined ||
              data.cover_image === "undefined"
                ? productImg
                : CoverImg(data.cover_image)
            }
            alt={data.seo_tag}
            width={"100px"}
            height={"100px"}
          />
          <button
            className="cart-delete"
            onClick={() =>
              DeleteCartClick(data.product_id, data.product_verient_id)
            }
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
        <div className="cart-info-group">
          <div
            className="cart-info"
            onClick={ProductDetailsClick}
            style={{ cursor: "pointer" }}
          >
            <h6>{data.verient_name}</h6>
            <p>₹Unit Price - ₹{data.price}</p>
          </div>
          <div className="cart-action-group">
            <CartUpdate
              qty={data.cart_product_quantity}
              id={data.product_id}
              vid={data.product_verient_id}
              setApicall={setApicall}
              setCartApiCall={setCartApiCall}
              setcartcall={setcartcall}
              setLoading={setLoading}
              quantity={data.product_stock_quantity}
            />
            {/* Total price of the product */}
            <h6>₹{(data.cart_product_quantity * data.price).toFixed(2)}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartBox;
