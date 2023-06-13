import React from 'react'
import { Link } from 'react-router-dom'
import CartBox from './common/cartBox'

export default function Cart({close}) {
  return (
    <div> 
      <div className="cart-sidebar active">
    <div className="cart-header">
        <div className="cart-total">
            <i className="fas fa-shopping-basket">
            </i><span>total item (5)</span>
        </div>
        <button className="cart-close" onClick={close}>
            <i className="icofont-close">
            </i>
        </button>
    </div>
    <ul className="cart-list">
           <CartBox/>
           <CartBox/>
           <CartBox/>
           <CartBox/>
           <CartBox/>
    </ul>
    <div className="cart-footer">
        <button className="coupon-btn">Do you have a coupon code?
        </button>
        <form className="coupon-form">
            <input type="text" placeholder="Enter your coupon code"/>
                <button type="submit">
                    <span>apply
                    </span>
                </button>
        </form>
        <Link className="cart-checkout-btn" >
            <span className="checkout-label">Proceed to Checkout
            </span>
            <span className="checkout-price">$369.78
            </span>
        </Link>
    </div>
</div>
    </div>
  )
}
