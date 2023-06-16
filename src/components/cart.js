import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import CartBox from './common/cartBox'
import { CartList } from './api/api'

export default function Cart({close}) {
    let [data, setData] = useState([])
  /*Function to get the Cart list */
  let GetCartList = async () => {
    let response = await CartList()
    console.log(response)
    // if (response.data.results === undefined
    //   || response.data.results === "undefined"
    //   || response.data.results === null
    //   || response.data.results.length === 0) {
    //   setData([])
    // } else {
    //   setData(response.data.results)
    //   if (location.pathname === "/shop") {
    //     // paginationData(response.data.pagination)
    //   }
    // }
  }
  console.log("Cart List", data)
  
  /*Render method to get Cart list */
  useEffect(() => {
    GetCartList()
  }, [])
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
