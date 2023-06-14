import React from 'react'
import OrderTable from "./orderTable"
import { Link } from 'react-router-dom'
export default function Orderhistorysection() {
    return (
        <div>
            <section className="inner-section orderlist-part">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="orderlist-filter">
                                <h5>total order <span>- (4)</span>
                                </h5>
                                <div className="filter-short">
                                    <label className="form-label">short by:</label>
                                    <select className="form-select">
                                        <option value="all">all order</option>
                                        <option value="recieved">recieved order</option>
                                        <option value="processed">processed order</option>
                                        <option value="shipped">shipped order</option>
                                        <option value="delivered">delivered order</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="orderlist">
                                <div className="orderlist-head">
                                    <h5>order#01</h5>
                                    <h5>order recieved</h5>
                                </div>
                                <div className="orderlist-body d-block">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="order-track">
                                                <ul className="order-track-list">
                                                    <li className="order-track-item active">
                                                        <i className="icofont-check">
                                                        </i>
                                                        <span>order recieved</span>
                                                    </li>
                                                    <li className="order-track-item">
                                                        <i className="icofont-close">
                                                        </i>
                                                        <span>order processed</span>
                                                    </li>
                                                    <li className="order-track-item">
                                                        <i className="icofont-close">
                                                        </i>
                                                        <span>order shipped</span>
                                                    </li>
                                                    <li className="order-track-item">
                                                        <i className="icofont-close">
                                                        </i>
                                                        <span>order delivered</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <ul className="orderlist-details">
                                                <li>
                                                    <h6>order id</h6>
                                                    <p>14667</p>
                                                </li>
                                                <li>
                                                    <h6>Total Item</h6>
                                                    <p>6 Items</p>
                                                </li>
                                                <li>
                                                    <h6>Order Time</h6>
                                                    <p>7th February 2021</p>
                                                </li>
                                                <li>
                                                    <h6>Delivery Time</h6>
                                                    <p>12th February 2021</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-4">
                                            <ul className="orderlist-details">
                                                <li>
                                                    <h6>Sub Total</h6>
                                                    <p>$10,864.00</p>
                                                </li>
                                                <li>
                                                    <h6>discount</h6>
                                                    <p>$20.00</p>
                                                </li>
                                                <li>
                                                    <h6>delivery fee</h6>
                                                    <p>$49.00</p>
                                                </li>
                                                <li>
                                                    <h6>Total<small>(Incl. VAT)</small>
                                                    </h6>
                                                    <p>$10,874.00</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="orderlist-deliver">
                                                <h6>Delivery location</h6>
                                                <p>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <OrderTable invoice={"other"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="orderlist">
                            <div className="orderlist-head">
                                <h5>order#02</h5>
                                <h5>order Processed</h5>
                            </div>
                            <div className="orderlist-body d-none">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="order-track">
                                            <ul className="order-track-list">
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order recieved</span>
                                                </li>
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order processed</span>
                                                </li>
                                                <li className="order-track-item">
                                                    <i className="icofont-close">
                                                    </i>
                                                    <span>order shipped</span>
                                                </li>
                                                <li className="order-track-item">
                                                    <i className="icofont-close">
                                                    </i>
                                                    <span>order delivered</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <ul className="orderlist-details">
                                            <li>
                                                <h6>order id</h6>
                                                <p>14667</p>
                                            </li>
                                            <li>
                                                <h6>Total Item</h6>
                                                <p>6 Items</p>
                                            </li>
                                            <li>
                                                <h6>Order Time</h6>
                                                <p>7th February 2021</p>
                                            </li>
                                            <li>
                                                <h6>Delivery Time</h6>
                                                <p>12th February 2021</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4">
                                        <ul className="orderlist-details">
                                            <li>
                                                <h6>Sub Total</h6>
                                                <p>$10,864.00</p>
                                            </li>
                                            <li>
                                                <h6>discount</h6>
                                                <p>$20.00</p>
                                            </li>
                                            <li>
                                                <h6>delivery fee</h6>
                                                <p>$49.00</p>
                                            </li>
                                            <li>
                                                <h6>Total<small>(Incl. VAT)</small>
                                                </h6>
                                                <p>$10,874.00</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="orderlist-deliver">
                                            <h6>Delivery location</h6>
                                            <p>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="table-scroll">
                                            <OrderTable invoice={"other"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="orderlist">
                            <div className="orderlist-head">
                                <h5>order#03</h5>
                                <h5>order shipped</h5>
                            </div>
                            <div className="orderlist-body d-none ">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="order-track">
                                            <ul className="order-track-list">
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order recieved</span>
                                                </li>
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order processed</span>
                                                </li>
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order shipped</span>
                                                </li>
                                                <li className="order-track-item">
                                                    <i className="icofont-close">
                                                    </i>
                                                    <span>order delivered</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <ul className="orderlist-details">
                                            <li>
                                                <h6>order id</h6>
                                                <p>14667</p>
                                            </li>
                                            <li>
                                                <h6>Total Item</h6>
                                                <p>6 Items</p>
                                            </li>
                                            <li>
                                                <h6>Order Time</h6>
                                                <p>7th February 2021</p>
                                            </li>
                                            <li>
                                                <h6>Delivery Time</h6>
                                                <p>12th February 2021</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4">
                                        <ul className="orderlist-details">
                                            <li>
                                                <h6>Sub Total</h6>
                                                <p>$10,864.00</p>
                                            </li>
                                            <li>
                                                <h6>discount</h6>
                                                <p>$20.00</p>
                                            </li>
                                            <li>
                                                <h6>delivery fee</h6>
                                                <p>$49.00</p>
                                            </li>
                                            <li>
                                                <h6>Total<small>(Incl. VAT)</small>
                                                </h6>
                                                <p>$10,874.00</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="orderlist-deliver">
                                            <h6>Delivery location</h6>
                                            <p>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="table-scroll">
                                            <OrderTable invoice={"other"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="orderlist">
                            <div className="orderlist-head">
                                <h5>order#04</h5>
                                <h5>order delivered</h5>
                            </div>
                            <div className="orderlist-body d-none ">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="order-track">
                                            <ul className="order-track-list">
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order recieved</span>
                                                </li>
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order processed</span>
                                                </li>
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order shipped</span>
                                                </li>
                                                <li className="order-track-item active">
                                                    <i className="icofont-check">
                                                    </i>
                                                    <span>order delivered</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <ul className="orderlist-details">
                                            <li>
                                                <h6>order id</h6>
                                                <p>14667</p>
                                            </li>
                                            <li>
                                                <h6>Total Item</h6>
                                                <p>6 Items</p>
                                            </li>
                                            <li>
                                                <h6>Order Time</h6>
                                                <p>7th February 2021</p>
                                            </li>
                                            <li>
                                                <h6>Delivery Time</h6>
                                                <p>12th February 2021</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4">
                                        <ul className="orderlist-details">
                                            <li>
                                                <h6>Sub Total</h6>
                                                <p>$10,864.00</p>
                                            </li>
                                            <li>
                                                <h6>discount</h6>
                                                <p>$20.00</p>
                                            </li>
                                            <li>
                                                <h6>delivery fee</h6>
                                                <p>$49.00</p>
                                            </li>
                                            <li>
                                                <h6>Total<small>(Incl. VAT)</small>
                                                </h6>
                                                <p>$10,874.00</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="orderlist-deliver">
                                            <h6>Delivery location</h6>
                                            <p>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="table-scroll">
                                            <OrderTable invoice={"other"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="pagination">
                            <li className="page-item">
                                <Link className="page-link">
                                    <i className="icofont-arrow-left">
                                    </i>
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link active">1</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link">2</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link">3</Link>
                            </li>
                            <li className="page-item">...</li>
                            <li className="page-item">
                                <Link className="page-link">65</Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link">
                                    <i className="icofont-arrow-right">
                                    </i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section >
        </div >
    )
}
