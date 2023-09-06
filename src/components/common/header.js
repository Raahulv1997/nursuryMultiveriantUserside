import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png";
import user from "../../image/user.png";
import Cart from "../cart";
import { toast } from "react-toastify";
import { Container, Navbar } from "react-bootstrap";
import { CategoryList, CartList, GetUserNotificationList } from "../api/api";
import Notification from "../Notification";
import MobileMenu from "./mobileMenu";
import Loadeer from "../common/Loadeer";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
export default function Header({
  setLoading,
  loading,
  cartcall,
  setcartcall,
  setproductcall,
  getname,
  setGetName,
  searchValue,
  CategoryValue,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartApicCall, setCartApiCall] = useState(false);
  const [cartList, setCartList] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [catData, setCatData] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [allApicall, setAllApicall] = useState(false);
  const [search, setSearch] = useState(searchValue);
  const [searchErr, setSearchErr] = useState("");
  const [diableOther, setDiableOther] = useState(false);

  let name = localStorage.getItem("username");
  let Token = localStorage.getItem("token");
  let profileImage = localStorage.getItem("image");

  /*Function to add and remove class */
  const AddBodyClass = () => {
    var element = document.getElementById("main_body");
    element.classList.add("body_overflow");
  };
  const RemoveBodyClass = () => {
    var element = document.getElementById("main_body");
    element.classList.remove("body_overflow");
  };
  /*Function of DropDown */
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  console.log("cat val---" + CategoryValue);
  /*Function to Get Category list */
  const GetCategoryList = async () => {
    let response = await CategoryList();
    if (Token) {
      let NotiRes = await GetUserNotificationList();

      let CartRes = await CartList();
      if (NotiRes.data.response === "empty") {
        setNotificationData([]);
      } else {
        setNotificationData(NotiRes.data, "Notification list");
      }

      setCartData(CartRes.data);
    }
    // console.log(response.data.response);
    setCatData(response.data.response);
  };

  /*Function to get the data just by parent */
  const parentCategories = catData.filter(
    (category) => category.parent_id === 0
  );

  /*Render method of getting category list */
  useEffect(() => {
    // window.scrollTo(0, 0)
    GetCategoryList();
    if (cartcall === true) {
      setcartcall(false);
      setCartList(true);
      setAllApicall(true);
    }
    if (cartApicCall === true) {
      setproductcall(true);
      setCartApiCall(false);
      setCartList(true);
      setAllApicall(true);
    }

    // eslint-disable-next-line
  }, [cartcall, cartApicCall]);

  useEffect(() => {
    // eslint-disable-next-line
    profileImage = localStorage.getItem("image");
    // eslint-disable-next-line
    name = localStorage.getItem("username");
    if (getname === true) {
      setGetName(false);
    }
  }, [getname]);

  /*Function to search the product from header */
  const onSearch = (event) => {
    event.preventDefault();
    if (search === "" || search === null || search.trim() === "") {
      setSearchErr("Search Feild is required");
    } else if (/[^A-Za-z 0-9]/g.test(search)) {
      setSearchErr("Cannot use special character ");
    } else if (search.length < 2) {
      setSearchErr("Search Feild should have 2 or more letter");
    } else if (/[-]?\d+(\.\d+)?/.test(search)) {
      setSearchErr("Search Feild can not have a number.");
    } else {
      const url = `/shop?search=${encodeURIComponent(search)}`;
      window.location.href = url;
    }
  };

  /*Function to search the product by Category*/
  const OnCategorySearch = (searchCat) => {
    const url = `/shop?category=${encodeURIComponent(searchCat)}`;
    window.location.href = url;
  };

  /* Function to Logout User */
  const OnLogout = () => {
    localStorage.clear(); // clear the local storage
    toast.error("Log Out Successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };
  /*Function to open cart */
  const OpenCart = () => {
    setCartOpen(true);
    setDiableOther(true);
    AddBodyClass();
  };
  /*Function to close the cart  */
  const CloseCart = () => {
    setCartOpen(false);
    RemoveBodyClass();
    setDiableOther(false);
  };

  /*Function to close the fade back drop */
  const CloseBackDrop = () => {
    setCartOpen(false);
    setOpen(false);
    setNotificationOpen(false);
    setDiableOther(false);
    RemoveBodyClass();
  };
  /*Function to open Notification */
  const OpenNotification = () => {
    setNotificationOpen(true);
    AddBodyClass();
  };

  /*Function to close the Notification */
  const CloseNotification = () => {
    setNotificationOpen(false);
    RemoveBodyClass();
  };

  return (
    <div>
      {loading ? <Loadeer /> : null}

      <Navbar expand="lg" fixed="top" bg="white" className={"p-0"}>
        <Container className={""}>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="logo" height={"40px"} className="logo_img" />
            </Link>
            {/* <button className="header-user"><img src="images/user.png" alt="user" /></button> */}
          </Navbar.Brand>
          <Cart
            show={cartOpen}
            close={() => CloseCart()}
            setCartApiCall={setCartApiCall}
            cartApicCall={cartApicCall}
            setproductcall={setproductcall}
            setCartList={setCartList}
            cartList={cartList}
            RemoveBodyClass={RemoveBodyClass}
            setLoading={setLoading}
          />
          <Notification
            show={notificationOpen}
            data={notificationData}
            close={() => CloseNotification()}
          />
          <div className="header-content w-100 ps-3 ">
            <form
              className="header-form  position-relative"
              onSubmit={onSearch}
            >
              <input
                type="text"
                placeholder="Search anything..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
              <small className="text-danger search_error">{searchErr}</small>
            </form>
            {Token ? (
              <div className="header-widget-group">
                {/* <Link
                  to=""
                  onClick={OpenNotification}
                  className="header-widget"
                  title="Wishlist"
                >
                  <i className="fas fa-bell"></i>
                  {notificationData.length > 0 ? (
                    <sup> {notificationData.length}</sup>
                  ) : null} 
                </Link> */}
                <Link
                  to="/wishlist"
                  // onClick={OpenNotification}
                  className="header-widget"
                  title="Wishlist"
                >
                  <i className="fas fa-heart"></i>
                  {/* {notificationData.length > 0 ? (
                    <sup> {notificationData.length}</sup>
                  ) : null} */}
                </Link>
                <button
                  className="header-widget header-cart"
                  title="Cartlist"
                  onClick={() => OpenCart()}
                >
                  <i className="fas fa-shopping-basket"></i>
                  {cartData.total_product_count === undefined ? null : (
                    <sup>{cartData.total_product_count}</sup>
                  )}{" "}
                  <span>
                    Total price
                    <small>
                      ₹
                      {cartData.sub_total === undefined
                        ? (0).toFixed(2)
                        : Number(cartData.sub_total).toFixed(2)}
                    </small>
                  </span>
                </button>
              </div>
            ) : null}
          </div>
          {Token ? (
            <div className="header-src screen_profile d-none">
              <i className="">
                {" "}
                <img
                  src={
                    profileImage === undefined ||
                    profileImage === null ||
                    profileImage === ""
                      ? user
                      : profileImage
                  }
                  alt="user"
                />
              </i>
              <span>{name}</span>
              <div className="profile_dropsdown">
                <DropdownButton
                  id={`dropdown-button-drop-${"down-left"}`}
                  drop={"down-left"}
                  variant="secondary"
                  title={`${".."} `}
                >
                  <Dropdown.Item eventKey="1" href="/profile" title="profile">
                    My Account
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="3"
                    href=""
                    title="profile"
                    onClick={OpenNotification}
                  >
                    Notification
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    href="/contact"
                    title="contact us"
                  >
                    Contact us
                  </Dropdown.Item>
                  {/* <Dropdown.Item eventKey="3" href="/about" title='about us'>About us</Dropdown.Item> */}
                  <Dropdown.Item
                    eventKey="4"
                    href="/login"
                    title="logout"
                    onClick={OnLogout}
                  >
                    Logout
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="header-widget ps-4"
              title={Token ? "logout" : "login"}
              onClick={OnLogout}
            >
              <i className="fas fa-sign-in-alt fs-4  "></i>
            </Link>
          )}
        </Container>
      </Navbar>
      <nav className="navbar-part category_header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navbar-content">
                <ul className="navbar-list">
                  <li
                    className={`navbar-item ${isDropdownOpen ? "active" : ""}`}
                    onMouseEnter={handleDropdownToggle}
                    onMouseLeave={handleDropdownToggle}
                  >
                    <Link className="navbar-link" to="/">
                      home
                    </Link>
                  </li>
                  <li className="navbar-item dropdown-megamenu">
                    <Link to="/shop" className="navbar-link">
                      shop
                    </Link>
                  </li>
                  <li className="navbar-item dropdown-megamenu">
                    <Link to="" className="navbar-link dropdown-arrow">
                      Category
                    </Link>
                    <div className="megamenu">
                      <div className="container megamenu-scroll">
                        <div className="row row-cols-5">
                          {/* Functin to map the array data of the category */}
                          {parentCategories.map((category) => (
                            <div className="col" key={category.id}>
                              <div className="megamenu-wrap">
                                <h5 className="megamenu-title">
                                  <Link
                                    to={""}
                                    className={
                                      CategoryValue == category.id
                                        ? "gourav"
                                        : ""
                                    }
                                    onClick={() =>
                                      OnCategorySearch(category.id)
                                    }
                                  >
                                    {category.category_name}
                                  </Link>
                                </h5>
                                <ul className="megamenu-list">
                                  {catData
                                    .filter(
                                      (child) => child.parent_id === category.id
                                    )
                                    .map((child) => (
                                      <li key={child.id}>
                                        <Link
                                          className={
                                            CategoryValue == child.id
                                              ? "gourav"
                                              : ""
                                          }
                                          to={""}
                                          onClick={() =>
                                            OnCategorySearch(child.id)
                                          }
                                        >
                                          {child.category_name}
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="navbar-item">
                    <Link to="/about" className="navbar-link">
                      about
                    </Link>
                  </li> */}
                  <li className="navbar-item">
                    <Link to="/contact" className="navbar-link">
                      contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu
        OpenCart={() => OpenCart()}
        setOpen={setOpen}
        open={open}
        OpenNotification={() => OpenNotification()}
        OnLogout={OnLogout}
        allApicall={allApicall}
        setAllApicall={setAllApicall}
        diableOther={diableOther}
        setDiableOther={setDiableOther}
        RemoveBodyClass={() => RemoveBodyClass()}
        AddBodyClass={() => AddBodyClass()}
      />
      {/* Backdrop */}
      <div
        className="backdrop"
        style={
          cartOpen || notificationOpen || open
            ? { display: "block" }
            : { display: "none" }
        }
        onClick={CloseBackDrop}
      >
        {/* <Link to="" onClick={()=>CloseBackDrop()}></Link> */}
      </div>
    </div>
  );
}
