import React from "react";
import productImg from "../../image/product_demo.png";

const ProductImage = (props) => {
  const CoverImg = (img) => {
    const result = img.replace(/,+/g, ',');
    return result.split(",")[0];
  };
  return (
    <img
      src={
        props.src === null ||
        props.src === undefined ||
        props.src === "undefined" ||
        props.src === ""
          ? productImg
          : CoverImg(props.src)
      }
      className="img-fluid"
      alt={props.alt}
    />
  );
};

export default ProductImage;
