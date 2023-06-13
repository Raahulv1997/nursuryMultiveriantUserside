import React from 'react'
import { Link } from 'react-router-dom'
import OrderTable from './common/orderTable'
import Footer from './common/footer'
import Header from './common/header';
import Otherbannner from './common/otherbannner';
function Invoice() {
    return (
        <div>
            {/* Hrader */}
            <Header />
            {/* Banner */}
            <Otherbannner heading={"Order Invoice"} bread={"invoice"} />
            {/* Main section */}
            <section className="inner-section invoice-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="alert-info">
                                <p>Thank you! We have recieved your order.</p>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>order recieved</h4>
                                </div>
                                <div className="account-content">
                                    <div className="invoice-recieved">
                                        <h6>order number <span>1665</span>
                                        </h6>
                                        <h6>order date <span>february 02, 2021</span>
                                        </h6>
                                        <h6>total amount <span>$24,176.00</span>
                                        </h6>
                                        <h6>payment method <span>Cash on delivery</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Order Details</h4>
                                </div>
                                <div className="account-content">
                                    <ul className="invoice-details">
                                        <li>
                                            <h6>Total Item</h6>
                                            <p>6 Items</p>
                                        </li>
                                        <li>
                                            <h6>Order Time</h6>
                                            <p>1.00pm 10-12-2021</p>
                                        </li>
                                        <li>
                                            <h6>Delivery Time</h6>
                                            <p>90 Minute Express Delivery</p>
                                        </li>
                                        <li>
                                            <h6>Delivery Location</h6>
                                            <p>House 17/A, West Jalkuri, Dhaka.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Amount Details</h4>
                                </div>
                                <div className="account-content">
                                    <ul className="invoice-details">
                                        <li>
                                            <h6>Sub Total</h6>
                                            <p>$10,864.00</p>
                                        </li>
                                        <li>
                                            <h6>discount</h6>
                                            <p>$20.00</p>
                                        </li>
                                        <li>
                                            <h6>Payment Method</h6>
                                            <p>Cash On Delivery</p>
                                        </li>
                                        <li>
                                            <h6>Total<small>(Incl. VAT)</small>
                                            </h6>
                                            <p>$10,874.00</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <OrderTable invoice={"other"} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center mt-5">
                            <Link className="btn btn-inline" href="#">
                                <i className="icofont-download">
                                </i>
                                <span>download invoice</span>
                            </Link>
                            <div className="back-home">
                                <Link to="/">Back to Home</Link>
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

export default Invoice

