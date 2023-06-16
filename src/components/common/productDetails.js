import React from 'react'
import Header from './header'
import ProfileBanner from "../../image/profile-banner.jpg"
import Footer from './footer'
import { Link } from 'react-router-dom'
import productImg from "../../image/product.jpg"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Productdescription from './productdescription'
import ProductBox from './productBox'
import { useLocation } from 'react-router-dom';
import ProductDetailsBox from './productDetailsBox';
export default function ProductDetails() {
    let location = useLocation()
    let proData = location.state.data
    return (
        <div>
            {/* Header */}
            <Header />
            {/* Banner */}
            <section className="inner-section single-banner" style={{ background: `url(${ProfileBanner}) no-repeat center` }}>
                <div className="container">
                    <h2>Product Details</h2>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Product detail</li>
                    </ol>
                </div>
            </section>
            {/* Product details */}
            <section className="inner-section">
                <div className="container">
                    {/* <div className="row">
                        <div className="col-lg-6">
                            <div className="details-gallery">
                                <div className="details-label-group">
                                    <label className="details-label new">new
                                    </label>
                                    <label className="details-label off">-10%
                                    </label>
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
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ul className="product-navigation">
                                <li className="product-nav-prev">
                                    <Link to="">
                                        <i className="icofont-arrow-left">
                                        </i>prev product
                                        <span className="product-nav-popup">
                                            <img src={productImg} alt="product" />
                                            <small>green chilis
                                            </small>
                                        </span>
                                    </Link>
                                </li>
                                <li className="product-nav-next">
                                    <Link to="">next product
                                        <i className="icofont-arrow-right">
                                        </i>
                                        <span className="product-nav-popup">
                                            <img src={productImg} alt="product" />
                                            <small>green chilis
                                            </small>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                            <div className="details-content">
                                <h3 className="details-name">
                                    <Link to="">existing product name
                                    </Link>
                                </h3>
                                <div className="details-meta">
                                    <p>SKU:
                                        <span>1234567
                                        </span>
                                    </p>
                                    <p>BRAND:
                                        <Link to="">radhuni
                                        </Link>
                                    </p>
                                </div>
                                <div className="details-rating">
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
                                    <Link to="">(3 reviews)
                                    </Link>
                                </div>
                                <h3 className="details-price">
                                    <del>$38.00
                                    </del>
                                    <span>$24.00
                                        <small>/per kilo
                                        </small>
                                    </span>
                                </h3>
                                <p className="details-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit facere harum natus amet soluta fuga consectetur alias veritatis quisquam ab eligendi itaque eos maiores quibusdam.
                                </p>
                                <div className="details-list-group">
                                    <label className="details-list-title">tags:
                                    </label>
                                    <ul className="details-tag-list">
                                        <li>
                                            <Link to="">organic
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">fruits
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="">chilis
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="details-list-group">
                                    <label className="details-list-title">Share:
                                    </label>
                                    <ul className="details-share-list">
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
                                <div className="details-add-group">
                                    <button className="product-add" title="Add to Cart">
                                        <i className="fas fa-shopping-basket">
                                        </i>
                                        <span>add to cart
                                        </span>
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
                                <div className="details-action-group">
                                    <Link to="" className="details-wish wish" title="Add Your Wishlist">
                                        <i className="icofont-heart">
                                        </i>
                                        <span>add to wish
                                        </span>
                                    </Link>
                                    <Link to="" className="details-compare" title="Compare This Item">
                                        <i className="fas fa-random">
                                        </i>
                                        <span>Compare This
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
                     <ProductDetailsBox 
         id={proData.product_id}
          var={proData.product_verient_id}
          page={"details"}/>
                </div>
            </section>
            {/* Other details */}
            <Productdescription />
            {/* More Products */}
            <section className="inner-section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section-heading">
                                <h2>related this items </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {/* <ProductBox />
                        <ProductBox />
                        <ProductBox />
                        <ProductBox />
                        <ProductBox />
                        <ProductBox />
                        <ProductBox />
                        <ProductBox />
                        <ProductBox />
                        <ProductBox /> */}
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-btn-25">
                                <Link to='/shop' className="btn btn-outline">
                                    <i className="fas fa-eye"></i>
                                    <span>view all related </span>
                                </Link>
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



