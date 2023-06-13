import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../image/logo.png"
import user from "../../image/user.png"
import Cart from '../cart';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [LangOpen, setLangOpen] = useState(false);
    const [currencyOpen, setCurrencyOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            {/* top header */}
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-5">
                            <div className="header-top-welcome">
                                <p>Welcome to Ecomart in Your Dream Online Store!</p>
                            </div>
                        </div>
                        <div className="col-md-5 col-lg-3">
                            <div className="header-top-select">
                                <div className="header-select">
                                    <i className="icofont-world"></i>
                                    <select className="select" style={{ display: 'none' }}>
                                        <option value="english" selected>english</option>
                                        <option value="bangali">bangali</option>
                                        <option value="arabic">arabic</option>
                                    </select>
                                    <div className={LangOpen ? "nice-select select open" : "nice-select select"} tabindex="0">
                                        <Link to="" onClick={()=>{LangOpen === false ? setLangOpen(true) : setLangOpen(false)}}>
                                            <span className="current">english</span> 
                                       </Link>
                                        <ul className="list">
                                            <li data-value="english" className="option selected focus">english</li>
                                            <li data-value="bangali" className="option">bangali</li>
                                            <li data-value="arabic" className="option">arabic</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="header-select">
                                    <i className="icofont-money"></i>
                                    <select className="select" style={{ display: 'none' }}>
                                        <option value="english" selected>doller</option>
                                        <option value="bangali">pound</option>
                                        <option value="arabic">taka</option>
                                    </select>
                                    <div className={currencyOpen ? "nice-select select open" : "nice-select select"} tabindex="0">
                                    <Link to="" onClick={()=> {currencyOpen === false ? setCurrencyOpen(true) : setCurrencyOpen(false)}}>
                                            <span className="current">doller</span> 
                                       </Link>
                                        <ul className="list">
                                            <li data-value="english" className="option selected focus">doller</li>
                                            <li data-value="bangali" className="option">pound</li>
                                            <li data-value="arabic" className="option">taka</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-lg-4">
                            <ul className="header-top-list">
                                <li><Link to="" >offers</Link></li>
                                <li><Link to="" >need help</Link></li>
                                <li><Link to="" >contact us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* main header */}
            <header className="header-part">
                <div className="container">
                    <div className="header-content">
                        <div className="header-media-group">
                            <button className="header-user">
                                <img src={user} alt="user" />
                            </button>
                            <Link to="">
                                <img src={logo} alt="logo" />
                            </Link>
                            <button className="header-src">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <Link to="" className="header-logo">
                            <img src={logo} alt="logo" />
                        </Link>
                        <Link to="/profile" className="header-widget" title="My Account">
                            <img src={user} alt="user" />
                            <span>join</span>
                        </Link>
                        <form className="header-form">
                            <input type="text" placeholder="Search anything..." />
                            <button>
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <div className="header-widget-group">
                            <Link to="" className="header-widget" title="Compare List">
                                <i className="fas fa-random"></i>
                                <sup>0</sup>
                            </Link>
                            <Link to="  " className="header-widget" title="Wishlist">
                                <i className="fas fa-heart"></i>
                                <sup>0</sup>
                            </Link>
                            <button className="header-widget header-cart" title="Cartlist" onClick={()=>setCartOpen(true)}>
                                <i className="fas fa-shopping-basket"></i>
                                <sup>9+</sup>
                                <span>
                                    total price<small>$345.00</small>
                                </span>
                            </button>{cartOpen ? <Cart close={() => setCartOpen(false)}/> : null }
                        </div>
                    </div>
                </div>
            </header>
            {/* navbar */}
            <nav className="navbar-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="navbar-content">
                                <ul className="navbar-list">
                                    <li
                                        className={`navbar-item ${isDropdownOpen ? 'active' : ''}`}
                                        onMouseEnter={handleDropdownToggle}
                                        onMouseLeave={handleDropdownToggle}
                                    >
                                        <Link className="navbar-link" to="/" >
                                            home
                                        </Link>
                                    </li>
                                    <li className="navbar-item dropdown-megamenu">
                                        <Link to="/shop" className="navbar-link" >
                                            shop
                                        </Link>
                                    </li>
                                    <li className="navbar-item dropdown-megamenu">
                                        <Link to="/category" className="navbar-link dropdown-arrow" >
                                            Category
                                        </Link>
                                        <div className="megamenu">
                                            <div className="container megamenu-scroll">
                                                <div className="row row-cols-5">
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">vegetables</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>carrot</Link></li>
                                                                <li><Link to={''}>broccoli</Link></li>
                                                                <li><Link to={''}>asparagus</Link></li>
                                                                <li><Link to={''}>cauliflower</Link></li>
                                                                <li><Link to={''}>eggplant</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">fruits</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>Apple</Link></li>
                                                                <li><Link to={''}>orange</Link></li>
                                                                <li><Link to={''}>banana</Link></li>
                                                                <li><Link to={''}>strawberrie</Link></li>
                                                                <li><Link to={''}>watermelon</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">dairy farms</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>Butter</Link></li>
                                                                <li><Link to={''}>Cheese</Link></li>
                                                                <li><Link to={''}>Milk</Link></li>
                                                                <li><Link to={''}>Eggs</Link></li>
                                                                <li><Link to={''}>cream</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">seafoods</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>Lobster</Link></li>
                                                                <li><Link to={''}>Octopus</Link></li>
                                                                <li><Link to={''}>Shrimp</Link></li>
                                                                <li><Link to={''}>Halabos</Link></li>
                                                                <li><Link to={''}>Maeuntang</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">diet foods</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>Salmon</Link></li>
                                                                <li><Link to={''}>Avocados</Link></li>
                                                                <li><Link to={''}>Leafy Greens</Link></li>
                                                                <li><Link to={''}>Boiled Potatoes</Link></li>
                                                                <li><Link to={''}>Cottage Cheese</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">fast foods</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>burger</Link></li>
                                                                <li><Link to={''}>milkshake</Link></li>
                                                                <li><Link to={''}>sandwich</Link></li>
                                                                <li><Link to={''}>doughnut</Link></li>
                                                                <li><Link to={''}>pizza</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">drinks</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>cocktail</Link></li>
                                                                <li><Link to={''}>hard soda</Link></li>
                                                                <li><Link to={''}>shampain</Link></li>
                                                                <li><Link to={''}>Wine</Link></li>
                                                                <li><Link to={''}>barley</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">meats</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>Meatball</Link></li>
                                                                <li><Link to={''}>Sausage</Link></li>
                                                                <li><Link to={''}>Poultry</Link></li>
                                                                <li><Link to={''}>chicken</Link></li>
                                                                <li><Link to={''}>Cows</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">fishes</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>scads</Link></li>
                                                                <li><Link to={''}>pomfret</Link></li>
                                                                <li><Link to={''}>groupers</Link></li>
                                                                <li><Link to={''}>anchovy</Link></li>
                                                                <li><Link to={''}>mackerel</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="megamenu-wrap">
                                                            <h5 className="megamenu-title">dry foods</h5>
                                                            <ul className="megamenu-list">
                                                                <li><Link to={''}>noodles</Link></li>
                                                                <li><Link to={''}>Powdered milk</Link></li>
                                                                <li><Link to={''}>nut &amp; yeast</Link></li>
                                                                <li><Link to={''}>almonds</Link></li>
                                                                <li><Link to={''}>pumpkin</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/about" className="navbar-link" >
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
    )
}



