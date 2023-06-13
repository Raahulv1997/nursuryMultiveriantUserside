import OrderTable from "./common/orderTable";
import { Link } from "react-router-dom";
import React from 'react'
import Otherbannner from "./common/otherbannner";
import Header from "./common/header";
import Footer from "./common/footer";
import paypal from "../image/payment/png/01.png"
import visa from "../image/payment/png/02.png"
import debit from "../image/payment/png/03.png"
function Checkout() {
    return (
        <div>
            {/* Header */}
            <Header />
            {/* Banner */}
            <Otherbannner heading={"Checkout"} bread={"checkout"} />
            {/* Main section */}
            <section className="inner-section checkout-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="alert-info">
                                <p>Returning customer? <Link to="/login">Click here to login</Link>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Your order</h4>
                                </div>
                                <div className="account-content">
                                <OrderTable />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Delivery Schedule</h4>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card schedule active">
                                                <h6>express</h6>
                                                <p>90 min express delivery</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card schedule">
                                                <h6>8am-10pm</h6>
                                                <p>8.00 AM - 10.00 PM</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card schedule">
                                                <h6>Next day</h6>
                                                <p>Next day or Tomorrow</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>contact number</h4>
                                    <button data-bs-toggle="modal" data-bs-target="#contact-add">add contact</button>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card contact active">
                                                <h6>primary</h6>
                                                <p>+8801838288389</p>
                                                <ul>
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#contact-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card contact">
                                                <h6>secondary</h6>
                                                <p>+8801941101915</p>
                                                <ul>
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#contact-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card contact">
                                                <h6>secondary</h6>
                                                <p>+8801747875727</p>
                                                <ul>
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#contact-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>delivery address</h4>
                                    <button data-bs-toggle="modal" data-bs-target="#address-add">add address</button>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card address active">
                                                <h6>Home</h6>
                                                <p>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</p>
                                                <ul className="user-action">
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#address-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card address">
                                                <h6>Office</h6>
                                                <p>east tejturi bazar, dhaka-1200. word no-04, road no-13/c, house no-4/b</p>
                                                <ul className="user-action">
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#address-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card address">
                                                <h6>Bussiness</h6>
                                                <p>kawran bazar, dhaka-1100. word no-02, road no-13/d, house no-7/m</p>
                                                <ul className="user-action">
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" data-bs-toggle="modal" data-bs-target="#address-edit">
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card mb-0">
                                <div className="account-title">
                                    <h4>payment option</h4>
                                    <button data-bs-toggle="modal" data-bs-target="#payment-add">add card</button>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="payment-card payment active">
                                                <img src={paypal} alt="payment" />
                                                <h4>card number</h4>
                                                <p>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <sup>1876</sup>
                                                </p>
                                                <h5>miron mahmud</h5>
                                                <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="payment-card payment">
                                                <img src={visa} alt="payment" />
                                                <h4>card number</h4>
                                                <p>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <sup>1876</sup>
                                                </p>
                                                <h5>miron mahmud</h5>
                                                <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="payment-card payment">
                                                <img src={debit} alt="payment" />
                                                <h4>card number</h4>
                                                <p>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <span>****</span>
                                                    <sup>1876</sup>
                                                </p>
                                                <h5>miron mahmud</h5>
                                                <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout-check">
                                    <input type="checkbox" id="checkout-check" />
                                    <label for="checkout-check">By making this purchase you agree to our <Link >Terms and Conditions</Link>.</label>
                                </div>
                                <div className="checkout-proced">
                                    <Link to="/invoice" className="btn btn-inline">proced to checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Checkout
