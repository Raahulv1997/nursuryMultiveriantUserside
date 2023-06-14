import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../image/logo.png";
import user from "../../image/user.png";
import Cart from "../cart";
import { Container, Navbar } from "react-bootstrap";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <Navbar expand="lg" fixed="top" bg="white" className={"p-0"}>
        <Container className={""}>
          <Navbar.Brand to="/">
            <img src={logo} alt="logo" height={"70px"} />
          </Navbar.Brand>
          <div className="header-content w-100 ps-5 ">
            <form className="header-form">
              <input type="text" placeholder="Search anything..." />
              <button>
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
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">vegetables</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>carrot</Link>
                                </li>
                                <li>
                                  <Link to={""}>broccoli</Link>
                                </li>
                                <li>
                                  <Link to={""}>asparagus</Link>
                                </li>
                                <li>
                                  <Link to={""}>cauliflower</Link>
                                </li>
                                <li>
                                  <Link to={""}>eggplant</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">fruits</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>Apple</Link>
                                </li>
                                <li>
                                  <Link to={""}>orange</Link>
                                </li>
                                <li>
                                  <Link to={""}>banana</Link>
                                </li>
                                <li>
                                  <Link to={""}>strawberrie</Link>
                                </li>
                                <li>
                                  <Link to={""}>watermelon</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">dairy farms</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>Butter</Link>
                                </li>
                                <li>
                                  <Link to={""}>Cheese</Link>
                                </li>
                                <li>
                                  <Link to={""}>Milk</Link>
                                </li>
                                <li>
                                  <Link to={""}>Eggs</Link>
                                </li>
                                <li>
                                  <Link to={""}>cream</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">seafoods</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>Lobster</Link>
                                </li>
                                <li>
                                  <Link to={""}>Octopus</Link>
                                </li>
                                <li>
                                  <Link to={""}>Shrimp</Link>
                                </li>
                                <li>
                                  <Link to={""}>Halabos</Link>
                                </li>
                                <li>
                                  <Link to={""}>Maeuntang</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">diet foods</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>Salmon</Link>
                                </li>
                                <li>
                                  <Link to={""}>Avocados</Link>
                                </li>
                                <li>
                                  <Link to={""}>Leafy Greens</Link>
                                </li>
                                <li>
                                  <Link to={""}>Boiled Potatoes</Link>
                                </li>
                                <li>
                                  <Link to={""}>Cottage Cheese</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">fast foods</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>burger</Link>
                                </li>
                                <li>
                                  <Link to={""}>milkshake</Link>
                                </li>
                                <li>
                                  <Link to={""}>sandwich</Link>
                                </li>
                                <li>
                                  <Link to={""}>doughnut</Link>
                                </li>
                                <li>
                                  <Link to={""}>pizza</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">drinks</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>cocktail</Link>
                                </li>
                                <li>
                                  <Link to={""}>hard soda</Link>
                                </li>
                                <li>
                                  <Link to={""}>shampain</Link>
                                </li>
                                <li>
                                  <Link to={""}>Wine</Link>
                                </li>
                                <li>
                                  <Link to={""}>barley</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">meats</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>Meatball</Link>
                                </li>
                                <li>
                                  <Link to={""}>Sausage</Link>
                                </li>
                                <li>
                                  <Link to={""}>Poultry</Link>
                                </li>
                                <li>
                                  <Link to={""}>chicken</Link>
                                </li>
                                <li>
                                  <Link to={""}>Cows</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">fishes</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>scads</Link>
                                </li>
                                <li>
                                  <Link to={""}>pomfret</Link>
                                </li>
                                <li>
                                  <Link to={""}>groupers</Link>
                                </li>
                                <li>
                                  <Link to={""}>anchovy</Link>
                                </li>
                                <li>
                                  <Link to={""}>mackerel</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="col">
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">dry foods</h5>
                              <ul className="megamenu-list">
                                <li>
                                  <Link to={""}>noodles</Link>
                                </li>
                                <li>
                                  <Link to={""}>Powdered milk</Link>
                                </li>
                                <li>
                                  <Link to={""}>nut &amp; yeast</Link>
                                </li>
                                <li>
                                  <Link to={""}>almonds</Link>
                                </li>
                                <li>
                                  <Link to={""}>pumpkin</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
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
