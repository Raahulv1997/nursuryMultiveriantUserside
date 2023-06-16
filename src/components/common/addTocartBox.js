import React from 'react'

export default function addTocartBox({ data, onAddToCart, updateQuantity }) {
    const handleAddToCart = () => {
      onAddToCart(data.product_id, data.product_verient_id);
    };
  
    const handleQuantityMinus = () => {
      updateQuantity(data.product_id, 
        data.product_verient_id, 
        data.cart_count - 1);
    };
  
    const handleQuantityPlus = () => {
      updateQuantity(data.product_id,
         data.product_verient_id, 
         data.cart_count + 1);
    };
  
    return (
      <div className="product-component">
        {data.cart_count === null ? (
          <button className="product-add" title="Add to Cart" onClick={handleAddToCart}>
            <i className="fas fa-shopping-basket"></i>
            <span>add</span>
          </button>
        ) : (
          <div className="product-action d-flex">
            <button className="action-minus" title="Quantity Minus" onClick={handleQuantityMinus}>
              <i className="icofont-minus"></i>
            </button>
            <input
              className="action-input"
              title="Quantity Number"
              type="text"
              name="quantity"
              value={data.cart_count}
              readOnly
            />
            <button className="action-plus" title="Quantity Plus" onClick={handleQuantityPlus}>
              <i className="icofont-plus"></i>
            </button>
          </div>
        )}
      </div>
    );
  };




