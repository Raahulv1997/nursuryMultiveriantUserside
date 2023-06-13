import React,{useState} from 'react';
import productImg from "../../image/product.jpg"
import { Link } from 'react-router-dom';
import ProductDetailModal from '../Modal/productDetail';
const ProductBox = () => {
    const [productDetailModal, setProductDetailModal] = useState(false)
    
    return (
        <>
        <div className='col'>
            <div className="product-card">
                <div className="product-media">
                    <div className="product-label">
                        <label className="label-text sale">sale</label>
                    </div>
                    <button className="product-wish wish">
                        <i className="fas fa-heart"></i>
                    </button>
                    <Link className="product-image" to="">
                        <img src={productImg} alt="product" />
                    </Link>
                    <div className="product-widget">
                        <Link title="Product Compare" to="" className="fas fa-random"></Link>
                        <Link
                            title="Product Video"
                            to=""
                            className="venobox fas fa-play vbox-item"
                            data-autoplay="true"
                            data-vbtype="video"
                        ></Link>
                        <Link
                            title="Product View"
                            className="fas fa-eye"
                            onClick={()=> setProductDetailModal(true)}
                        ></Link>
                    </div>
                </div>
                <div className="product-content">
                    <div className="product-rating">
                        <i className="active icofont-star"></i>
                        <i className="active icofont-star"></i>
                        <i className="active icofont-star"></i>
                        <i className="active icofont-star"></i>
                        <i className="icofont-star"></i>
                        <Link to="">(3)</Link>
                    </div>
                    <h6 className="product-name">
                        <Link to="">fresh green chilis</Link>
                    </h6>
                    <h6 className="product-price">
                        <del>$34</del>
                        <span>
                            $28<small>/piece</small>
                        </span>
                    </h6>
                    <button className="product-add" title="Add to Cart">
                        <i className="fas fa-shopping-basket"></i>
                        <span>add</span>
                    </button>
                    <div className="product-action">
                        <button className="action-minus" title="Quantity Minus">
                            <i className="icofont-minus"></i>
                        </button>
                        <input
                            className="action-input"
                            title="Quantity Number"
                            type="text"
                            name="quantity"
                            value="1"
                            readOnly
                        />
                        <button className="action-plus" title="Quantity Plus">
                            <i className="icofont-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {productDetailModal ? <ProductDetailModal show={productDetailModal} close={()=> setProductDetailModal(false)}/> : null}
        </>
    );
};

export default ProductBox;
