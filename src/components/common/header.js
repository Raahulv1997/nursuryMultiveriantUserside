import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png";
import user from "../../image/user.png";
import Cart from "../cart";
import { toast } from "react-toastify";
import { Container, Navbar } from "react-bootstrap";
import { CategoryList } from "../api/api";
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [catData, setCatData] = useState([]);
  const [search, setSearch] = useState('');

  /*Function of DropDown */
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /*Function to Get Category list */
  const GetCategoryList = async () => {
    let response = await CategoryList()
    // console.log(response.data.response);
    setCatData(response.data.response)
  }
  /*Function to get the data just by parent */
  const parentCategories = catData.filter(category => category.parent_id === 0);

  /*Render method of getting category list */
  useEffect(() => {
    GetCategoryList()
  }, [])

/*Function to search the product from header */
  const onSearch = (event) => {
    event.preventDefault();
    const url = `/shop?search=${encodeURIComponent(search)}`;
    window.location.href = url;
  };

  /*Function to search the product by Category*/
  const OnCategorySearch = (searchCat) => {
    const url = `/shop?category=${encodeURIComponent(searchCat)}`;
    window.location.href = url;
  };
  return (
    <div>
      <Navbar expand="lg" fixed="top" bg="white" className={"p-0"}>
        <Container className={""}>
          <Navbar.Brand to="/">
            <img src={logo} alt="logo" height={"40px"} />
          </Navbar.Brand>
          <div className="header-content w-100 ps-5 ">
            <form className="header-form" onSubmit={onSearch}>
              <input
                type="text"
                placeholder="Search anything..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
            <div className="header-widget-group">
              {/* <Link to="" className="header-widget" title="Compare List">
                <i className="fas fa-random"></i>
                <sup>0</sup>
              </Link>
              <Link to="  " className="header-widget" title="Wishlist">
                <i className="fas fa-heart"></i>
                <sup>0</sup>
              </Link> */}
              <button
                className="header-widget header-cart"
                title="Cartlist"
                onClick={() => setCartOpen(true)}
              >
                <i className="fas fa-shopping-basket"></i>
                <sup>9+</sup>
                <span>
                  total price<small>$345.00</small>
                </span>
              </button>
              {cartOpen ? <Cart close={() => setCartOpen(false)} /> : null}
            </div>
            <Link
              to="/profile"
              className="header-widget ps-4"
              title="My Account"
            >
              <img src={user} alt="user" />
              <span>join</span>
            </Link>
            <Link
              to="/login"
              className="header-widget ps-4"
              title="logout"
              onClick={() => {
                localStorage.clear(); // clear the local storage
                toast.error("Log Out Successfully", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                });
              }}
            >
              <i className="fas fa-sign-out-alt fs-4  "></i>
            </Link>
          </div>
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
                    <Link to="/category" className="navbar-link dropdown-arrow">
                      Category
                    </Link>
                    <div className="megamenu">
                      <div className="container megamenu-scroll">
                        <div className="row row-cols-5">
                          {/* Functin to map the array data of the category */}
                          {parentCategories.map(category => (
                            <div className="col" key={category.id}>
                              <div className="megamenu-wrap">
                                <h5 className="megamenu-title">
                                  <Link to={""}
                                   className="text-muted" 
                                   onClick={() => OnCategorySearch(category.category_name)}>
                                    {category.category_name}
                                  </Link>
                                  </h5>
                                <ul className="megamenu-list">
                                  {catData
                                    .filter(child => child.parent_id === category.id)
                                    .map(child => (
                                      <li key={child.id}>
                                        <Link to={""}
                                         onClick={() => OnCategorySearch(child.category_name)}>
                                          {child.category_name}</Link>
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
                  <li className="navbar-item">
                    <Link to="/about" className="navbar-link">
                      about
                    </Link>
                  </li>
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
    </div>
  );
}
