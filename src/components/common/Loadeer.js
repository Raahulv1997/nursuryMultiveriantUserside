import React from "react";
import "./loader.css";
// loader.gif
import loaderImage from "../../image/loader.gif";
// import Spinner from "react-bootstrap/Spinner";
const Loadeer = () => {
  return (
    <div className="loader_page d-block">
      <div className="loader_img">
        <img src={loaderImage} alt={"loaderimage"} />
      </div>
    </div>
  );
};

export default Loadeer;
