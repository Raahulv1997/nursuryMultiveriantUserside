import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Product from "../../image/product.jpg"
export default function OrderTable(props) {
    const [active, setActive] = useState(false)

    return (
        <div>


            <div className="table-scroll">
                <table className="table-list">
                    <thead>
                        <tr>
                            <th scope="col">Serial</th>
                            <th scope="col">Product</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">brand</th>
                            <th scope="col">quantity</th>
                            {props.invoice === "other" ? null : <th scope="col">action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table-serial">
                                <h6>01</h6>
                            </td>
                            <td className="table-image">
                                <img src={Product} alt="product" />
                            </td>
                            <td className="table-name">
                                <h6>product name</h6>
                            </td>
                            <td className="table-price">
                                <h6>$19<small>/kilo</small>
                                </h6>
                            </td>
                            <td className="table-brand">
                                <h6>Fresh Company</h6>
                            </td>
                            <td className="table-quantity">
                                <h6>3</h6>
                            </td>
                            {props.invoice === "other" ? null : <td className="table-action">
                                <Link className="view" title="Quick View" data-bs-toggle="modal" data-bs-target="#product-view">
                                    <i className="fas fa-eye">
                                    </i>
                                </Link>
                                <Link className="trash" title="Remove Wishlist">
                                    <i className="icofont-trash">
                                    </i>
                                </Link>
                            </td>}
                        </tr>
                        <tr>
                            <td className="table-serial">
                                <h6>02</h6>
                            </td>
                            <td className="table-image">
                                <img src={Product} alt="product" />
                            </td>
                            <td className="table-name">
                                <h6>product name</h6>
                            </td>
                            <td className="table-price">
                                <h6>$19<small>/kilo</small>
                                </h6>
                            </td>
                            <td className="table-brand">
                                <h6>Radhuni Masala</h6>
                            </td>
                            <td className="table-quantity">
                                <h6>5</h6>
                            </td>
                            {props.invoice === "other" ? null : <td className="table-action">
                                <Link className="view" title="Quick View" data-bs-toggle="modal" data-bs-target="#product-view">
                                    <i className="fas fa-eye">
                                    </i>
                                </Link>
                                <Link className="trash" title="Remove Wishlist">
                                    <i className="icofont-trash">
                                    </i>
                                </Link>
                            </td>}
                        </tr>
                        <tr>
                            <td className="table-serial">
                                <h6>03</h6>
                            </td>
                            <td className="table-image">
                                <img src={Product} alt="product" />
                            </td>
                            <td className="table-name">
                                <h6>product name</h6>
                            </td>
                            <td className="table-price">
                                <h6>$19<small>/kilo</small>
                                </h6>
                            </td>
                            <td className="table-brand">
                                <h6>Pran Prio</h6>
                            </td>
                            <td className="table-quantity">
                                <h6>2</h6>
                            </td>
                            {props.invoice === "other" ? null : <td className="table-action">
                                <Link className="view" title="Quick View" data-bs-toggle="modal" data-bs-target="#product-view">
                                    <i className="fas fa-eye">
                                    </i>
                                </Link>
                                <Link className="trash" title="Remove Wishlist">
                                    <i className="icofont-trash">
                                    </i>
                                </Link>
                            </td>}
                        </tr>
                        <tr>
                            <td className="table-serial">
                                <h6>04</h6>
                            </td>
                            <td className="table-image">
                                <img src={Product} alt="product" />
                            </td>
                            <td className="table-name">
                                <h6>product name</h6>
                            </td>
                            <td className="table-price">
                                <h6>$19<small>/kilo</small>
                                </h6>
                            </td>
                            <td className="table-brand">
                                <h6>Real Food</h6>
                            </td>
                            <td className="table-quantity">
                                <h6>3</h6>
                            </td>
                            {props.invoice === "other" ? null : <td className="table-action">
                                <Link className="view" title="Quick View" data-bs-toggle="modal" data-bs-target="#product-view">
                                    <i className="fas fa-eye">
                                    </i>
                                </Link>
                                <Link className="trash" title="Remove Wishlist">
                                    <i className="icofont-trash">
                                    </i>
                                </Link>
                            </td>}
                        </tr>
                        <tr>
                            <td className="table-serial">
                                <h6>05</h6>
                            </td>
                            <td className="table-image">
                                <img src={Product} alt="product" />
                            </td>
                            <td className="table-name">
                                <h6>product name</h6>
                            </td>
                            <td className="table-price">
                                <h6>$19<small>/kilo</small>
                                </h6>
                            </td>
                            <td className="table-brand">
                                <h6>Rdhuni Company</h6>
                            </td>
                            <td className="table-quantity">
                                <h6>7</h6>
                            </td>
                            {props.invoice === "other" ? null : <td className="table-action">
                                <Link className="view" title="Quick View" data-bs-toggle="modal" data-bs-target="#product-view">
                                    <i className="fas fa-eye">
                                    </i>
                                </Link>
                                <Link className="trash" title="Remove Wishlist">
                                    <i className="icofont-trash">
                                    </i>
                                </Link>
                            </td>}
                        </tr>
                    </tbody>
                </table>
            </div>
           {props.invoice === "other" ? null :  <> <div className="chekout-coupon">
                <button className={active ? "d-none" : "coupon-btn"} onClick={() => setActive(true)}>Do you have a coupon code?</button>
                <form className={active ? "coupon-form d-flex" : "d-none"} >
                    <input type="text" placeholder="Enter your coupon code" />
                    <button type="submit">
                        <span>apply</span>
                    </button>
                </form>
            </div>
            <div className="checkout-charge">
                <ul>
                    <li>
                        <span>Sub total</span>
                        <span>$267.45</span>
                    </li>
                    <li>
                        <span>delivery fee</span>
                        <span>$10.00</span>
                    </li>
                    <li>
                        <span>discount</span>
                        <span>$00.00</span>
                    </li>
                    <li>
                        <span>Total<small>(Incl. VAT)</small>
                        </span>
                        <span>$277.00</span>
                    </li>
                </ul>
            </div>
            </>}
        </div>
    )
}
