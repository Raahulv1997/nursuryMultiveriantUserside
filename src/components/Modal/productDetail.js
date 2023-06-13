import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productImg from "../../image/product.jpg"
export default function ProductDetailModal(props) {
    return (
        <Modal show={props.show} close={props.close}>
            <button className="modal-close icofont-close" data-bs-dismiss="modal" onClick={props.close}></button>
        <div>
             <div className="product-view">
                <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <div className="view-gallery">
                            <div className="view-label-group">
                                <label className="view-label new">new</label>
                                <label className="view-label off">-10%</label>
                            </div>
                            <Carousel>
                                <div>
                                    <img src={productImg} alt="product" />
                                </div>
                                <div>
                                    <img src={productImg} alt="product" />
                                </div>
                                <div>
                                    <img src={productImg} alt="product" />
                                </div>
                                <div>
                                    <img src={productImg} alt="product" />
                                </div>
                                <div>
                                    <img src={productImg} alt="product" />
                                </div>
                            </Carousel>
                            {/* <ul className="preview-slider slider-arrow slick-initialized slick-slider"> 
<i className="icofont-arrow-right dandik slick-arrow" style="display: block;"> 
</i> 
<div className="slick-list draggable"> 
<div className="slick-track" style="opacity: 1; width: 2996px;"> 
<li className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style="width: 428px; position: relative; left: 0px; top: 0px; z-index: 999; opacity: 1;" tabindex="0"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="1" aria-hidden="true" style="width: 428px; position: relative; left: -428px; top: 0px; z-index: 998; opacity: 0;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="2" aria-hidden="true" style="width: 428px; position: relative; left: -856px; top: 0px; z-index: 998; opacity: 0;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="3" aria-hidden="true" style="width: 428px; position: relative; left: -1284px; top: 0px; z-index: 998; opacity: 0;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="4" aria-hidden="true" style="width: 428px; position: relative; left: -1712px; top: 0px; z-index: 998; opacity: 0;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="5" aria-hidden="true" style="width: 428px; position: relative; left: -2140px; top: 0px; z-index: 998; opacity: 0;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="6" aria-hidden="true" style="width: 428px; position: relative; left: -2568px; top: 0px; z-index: 998; opacity: 0;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
</div> 
</div> 
<i className="icofont-arrow-left bamdik slick-arrow" style="display: block;"> 
</i> 
</ul> 
<ul className="thumb-slider slick-initialized slick-slider"> 
<div className="slick-list draggable" style="padding: 0px 50px;"> 
<div className="slick-track" style="opacity: 1; width: 1980px; transform: translate3d(-330px, 0px, 0px);"> 
<li className="slick-slide slick-cloned" data-slick-index="-4" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="-3" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="-2" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned slick-active" data-slick-index="-1" aria-hidden="false" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-current slick-active slick-center" data-slick-index="0" aria-hidden="false" style="width: 90px;" tabindex="0"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-active" data-slick-index="1" aria-hidden="false" style="width: 90px;" tabindex="0"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="2" aria-hidden="true" style="width: 90px;" tabindex="0"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="3" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="4" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="5" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide" data-slick-index="6" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="7" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="8" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="9" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned slick-center" data-slick-index="10" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="11" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="12" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
<li className="slick-slide slick-cloned" data-slick-index="13" aria-hidden="true" style="width: 90px;" tabindex="-1"> 
<img src="images/product/01.jpg" alt="product"> 
</li> 
</div> 
</div> 
</ul>  */}
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="view-details">
                            <h3 className="view-name">
                                <Link to="" >existing product name</Link>
                            </h3>
                            <div className="view-meta">
                                <p>SKU:<span>1234567</span>
                                </p>
                                <p>BRAND:<Link to="">radhuni</Link>
                                </p>
                            </div>
                            <div className="view-rating">
                                <i className="active icofont-star">
                                </i>
                                <i className="active icofont-star">
                                </i>
                                <i className="active icofont-star">
                                </i>
                                <i className="active icofont-star">
                                </i>
                                <i className="icofont-star">
                                </i>
                                <Link to="" >(3 reviews)</Link>
                            </div>
                            <h3 className="view-price">
                                <del>$38.00</del>
                                <span>$24.00<small>/per kilo</small>
                                </span>
                            </h3>
                            <p className="view-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit non tempora magni repudiandae sint suscipit tempore quis maxime explicabo veniam eos reprehenderit fuga</p>
                            <div className="view-list-group">
                                <label className="view-list-title">tags:</label>
                                <ul className="view-tag-list">
                                    <li>
                                        <Link to="">organic</Link>
                                    </li>
                                    <li>
                                        <Link to="">vegetable</Link>
                                    </li>
                                    <li>
                                        <Link to="">chilis</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="view-list-group">
                                <label className="view-list-title">Share:</label>
                                <ul className="view-share-list">
                                    <li>
                                        <Link to="" className="icofont-facebook" title="Facebook">
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="" className="icofont-twitter" title="Twitter">
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="" className="icofont-linkedin" title="Linkedin">
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="" className="icofont-instagram" title="Instagram">
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="view-add-group">
                                <button className="product-add" title="Add to Cart">
                                    <i className="fas fa-shopping-basket">
                                    </i>
                                    <span>add to cart</span>
                                </button>
                                <div className="product-action">
                                    <button className="action-minus" title="Quantity Minus">
                                        <i className="icofont-minus">
                                        </i>
                                    </button>
                                    <input className="action-input" title="Quantity Number" type="text" name="quantity" value="1" />
                                    <button className="action-plus" title="Quantity Plus">
                                        <i className="icofont-plus">
                                        </i>
                                    </button>
                                </div>
                            </div>
                            <div className="view-action-group">
                                <Link to="" className="view-wish wish" title="Add Your Wishlist">
                                    <i className="icofont-heart">
                                    </i>
                                    <span>add to wish</span>
                                </Link>
                                <Link to="" className="view-compare" title="Compare This Item">
                                    <i className="fas fa-random">
                                    </i>
                                    <span>Compare This</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Modal>
    )
}


