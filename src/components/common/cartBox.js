import React from 'react'
import productImg from "../../image/product.jpg"
import { Link } from 'react-router-dom'
function CartBox() {
    return (
        <>
            <div className='cart-item'>
                <div className="cart-media">
                    <Link >
                        <img src={productImg} alt="product" />
                    </Link><button className="cart-delete">
                        <i className="far fa-trash-alt">
                        </i>
                    </button>
                </div>
                <div className="cart-info-group">
                    <div className="cart-info">
                        <h6>
                            <Link >
                                existing product name</Link>
                        </h6><p>Unit Price - $8.75</p>
                    </div>
                    <div className="cart-action-group">
                        <div className="product-action">
                            <button className="action-minus" title="Quantity Minus">
                                <i className="icofont-minus"></i></button>
                            <input className="action-input" title="Quantity Number" type="text" name="quantity" value="1" />
                            <button className="action-plus" title="Quantity Plus">
                                <i className="icofont-plus"></i>
                            </button>
                        </div>
                        <h6>$56.98</h6>
                    </div>
                </div>
            </div></>
    )
}

export default CartBox