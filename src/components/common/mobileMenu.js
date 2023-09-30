import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import user from "../../image/user.png";
import { CartList, CategoryList } from "../api/api";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Accordion from "react-bootstrap/Accordion";
export default function MobileMenu({
  RemoveBodyClass,
  AddBodyClass,
  setDiableOther,
  open,
  OpenCart,
  setOpen,
  OpenNotification,
  OnLogout,
  allApicall,
  setAllApicall,
}) {
  const [cartData, setCartData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchErr, setSearchErr] = useState("");
  let profileImage = localStorage.getItem("image");
  let name = localStorage.getItem("username");
  let Token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  /*Function to Get Category list */
  const GetCategoryList = async () => {
    let response = await CategoryList();
    if (Token) {
      let CartRes = await CartList(headers);
      setCartData(CartRes.data);
    }
    // console.log(response.data.response);
    setCatData(response.data.response);
  };

  useEffect(() => {
    GetCategoryList();
    if (allApicall === true) {
      setAllApicall(false);
    }
    /*Function to close the fade back drop */
    if (open === false) {
      setSearchOpen(false);
      setSearch("");
      setSearchErr("");
      setCatOpen(false);
    }
    // eslint-disable-next-line
  }, [allApicall, open]);

  /*Function to get the data just by parent */
  const parentCategories = catData.filter(
    (category) => category.parent_id === 0
  );

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

  /*Functions to open and close the category sidebar */
  const handleCateClose = () => {
    setCatOpen(false);
    setOpen(false);
    setDiableOther(false);
    RemoveBodyClass();
  };

  /*Function to open categbory sidebar */
  const handleCateShow = () => {
    setCatOpen(true);
    setOpen(true);
    setDiableOther(true);
    AddBodyClass();
  };

  /*Function to open search */
  const OnSearchFeild = () => {
    setSearchOpen(true);
    setOpen(true);
    AddBodyClass();
  };

  /*Function to Close search */
  const CloseSearchFeild = () => {
    setSearchErr("");
    setSearch("");
    setSearchOpen(false);
    setOpen(false);
    RemoveBodyClass();
  };
  return (
    <>
      <div className="mobile_menu_main">
        <div className={"mobile-menu"}>
          <Link to={"/"} title="Home Page">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          <button
            className="cate-btn"
            title="Category List"
            onClick={handleCateShow}
          >
            <i className="fas fa-list"></i>
            <span>category</span>
          </button>

          {Token ? (
            <button
              className="cart-btn"
              title="Cartlist"
              onClick={() => OpenCart()}
            >
              <i className="fas fa-shopping-basket"></i>
              <span>cartlist</span>
              {cartData.total_product_count === undefined ? null : (
                <sup>{cartData.total_product_count}</sup>
              )}
            </button>
          ) : null}
          {/* Search functionality */}
          <button
            className="header-src"
            title="search"
            onClick={() => OnSearchFeild()}
          >
            <i className="fas fa-search"></i>
            <span>Search</span>
          </button>

          {/* <Link to="/profile" className="header-user">
                    <img src={profileImage ? profileImage : user} alt="user" />
                </Link> */}
          {Token ? (
            <div className="header-src">
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
                  //   as={ButtonGroup}
                  //   key={".."}
                  id={`dropdown-button-drop-${"up-centered"}`}
                  drop={"up-centered"}
                  variant="secondary"
                  title={`${".."} `}
                >
                  <Dropdown.Item eventKey="1" href="/profile" title="profile">
                    My Account
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
                    onClick={() => OpenNotification()}
                    title="notification"
                  >
                    Notification
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="5"
                    href="/login"
                    title="logout"
                    onClick={OnLogout}
                  >
                    Logout
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          ) : null}
        </div>
        <div
          className={
            catOpen === false ? "category-sidebar" : "category-sidebar active"
          }
        >
          <div className="category-header">
            <h4 className="category-title">
              <i className="fas fa-align-left"></i>
              <span>categories</span>
            </h4>
            <button
              className="category-close close_categeory"
              onClick={handleCateClose}
            >
              <i className="icofont-close"></i>
            </button>
          </div>
          <div className="mobile_sidebar">
            <ul className="category-list">
              <Accordion>
                {parentCategories.map((category, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Accordion.Item eventKey={category.id} className="p-1">
                        <Accordion.Header className="category-item" key={index}>
                          <Link
                            className="category-link"
                            // onClick={() => OnCategorySearch(category.category_name)}
                          >
                            <span className="parent_category">
                              {category.category_name}
                            </span>
                          </Link>
                        </Accordion.Header>
                        <Accordion.Body>
                          {catData
                            .filter((child) => child.parent_id === category.id)
                            .map((child, index) => (
                              <li key={index}>
                                <Link
                                  className="text-dark"
                                  to={""}
                                  onClick={() =>
                                    OnCategorySearch(child.category_name)
                                  }
                                >
                                  {child.category_name}
                                </Link>
                              </li>
                            ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    </React.Fragment>
                  );
                })}
              </Accordion>
            </ul>
          </div>
          <div className="category-footer">
            <p>
              All Rights Reserved by <Link to="#">We2code</Link>
            </p>
          </div>
        </div>
        {searchOpen ? (
          <div className="header-content mobile_search">
            <Link className="close_btn" onClick={() => CloseSearchFeild()}>
              <i class="icofont-close m-0"></i>
            </Link>
            <form className="header-form active">
              <input
                type="text"
                placeholder="Search anything..."
                autoFocus
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchErr("");
                }}
              />
              <button onClick={onSearch}>
                <i className="fas fa-search"></i>
              </button>
            </form>
            <small className="text-danger bg-white px-2">{searchErr}</small>
          </div>
        ) : null}
      </div>
    </>
  );
}
