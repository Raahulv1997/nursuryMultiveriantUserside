import React from 'react'
import { Link } from "react-router-dom";
import Header from './common/header';
import Otherbannner from './common/otherbannner';
import ProductBox from './common/productBox';
import shoppromo from '../image/shoppromo.jpg'
export default function Shop() {
    return (
        <div>
            {/* Hrader */}
            <Header />
            {/* Banner */}
            <Otherbannner  heading={"Shop"} bread={"shop"}/>
            {/* Main section  */}
            <section className="inner-section shop-part">
    <div className="container">
        <div className="row content-reverse">
            <div className="col-lg-3">
                <div className="shop-widget-promo">
                    <Link >
                        <img src={shoppromo} alt="promo"/>
                    </Link>
                </div>
                <div className="shop-widget">
                    <h6 className="shop-widget-title">Filter by Price
                    </h6>
                    <form>
                        <div className="shop-widget-group">
                            <input type="text" placeholder="Min - 00"/>
                                <input type="text" placeholder="Max - 5k"/>
                                </div>
                                <button className="shop-widget-btn">
                                    <i className="fas fa-search">
                                    </i>
                                    <span>search
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className="shop-widget">
                            <h6 className="shop-widget-title">Filter by Rating
                            </h6>
                            <form>
                                <ul className="shop-widget-list">
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="feat1"/>
                                                <label htmlFor="feat1">
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(13)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="feat2"/>
                                                <label htmlFor="feat2">
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(28)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="feat3"/>
                                                <label htmlFor="feat3">
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(35)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="feat4"/>
                                                <label htmlFor="feat4">
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(47)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="feat5"/>
                                                <label htmlFor="feat5">
                                                    <i className="fas fa-star active">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                    <i className="fas fa-star">
                                                    </i>
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(59)
                                        </span>
                                    </li>
                                </ul>
                                <button className="shop-widget-btn">
                                    <i className="far fa-trash-alt">
                                    </i>
                                    <span>clear filter
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className="shop-widget">
                            <h6 className="shop-widget-title">Filter by Tag
                            </h6>
                            <form>
                                <ul className="shop-widget-list">
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="tag1"/>
                                                <label htmlFor="tag1">new items
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(13)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="tag2"/>
                                                <label htmlFor="tag2">sale items
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(28)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="tag3"/>
                                                <label htmlFor="tag3">rating items
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(35)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="tag4"/>
                                                <label htmlFor="tag4">feature items
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(47)
                                        </span>
                                    </li>
                                    <li>
                                        <div className="shop-widget-content">
                                            <input type="checkbox" id="tag5"/>
                                                <label htmlFor="tag5">discount items
                                                </label>
                                        </div>
                                        <span className="shop-widget-number">(59)
                                        </span>
                                    </li>
                                </ul>
                                <button className="shop-widget-btn">
                                    <i className="far fa-trash-alt">
                                    </i>
                                    <span>clear filter
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className="shop-widget">
                            <h6 className="shop-widget-title">Filter by Brand
                            </h6>
                            <form>
                                <input className="shop-widget-search" type="text" placeholder="Search..."/>
                                    <ul className="shop-widget-list shop-widget-scroll">
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand1"/>
                                                    <label htmlFor="brand1">mari gold
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(13)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand2"/>
                                                    <label htmlFor="brand2">tredar
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(28)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand3"/>
                                                    <label htmlFor="brand3">keya
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(35)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand4"/>
                                                    <label htmlFor="brand4">diamond
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(47)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand5"/>
                                                    <label htmlFor="brand5">lilly's
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(59)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand6"/>
                                                    <label htmlFor="brand6">fremant
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(64)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand7"/>
                                                    <label htmlFor="brand7">avocads
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(77)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="brand8"/>
                                                    <label htmlFor="brand8">boroclas
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(85)
                                            </span>
                                        </li>
                                    </ul>
                                    <button className="shop-widget-btn">
                                        <i className="far fa-trash-alt">
                                        </i>
                                        <span>clear filter
                                        </span>
                                    </button>
                            </form>
                        </div>
                        <div className="shop-widget">
                            <h6 className="shop-widget-title">Filter by Category
                            </h6>
                            <form>
                                <input className="shop-widget-search" type="text" placeholder="Search..."/>
                                    <ul className="shop-widget-list shop-widget-scroll">
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate1"/>
                                                    <label htmlFor="cate1">vegetables
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(13)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate2"/>
                                                    <label htmlFor="cate2">groceries
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(28)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate3"/>
                                                    <label htmlFor="cate3">fruits
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(35)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate4"/>
                                                    <label htmlFor="cate4">dairy farm
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(47)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate5"/>
                                                    <label htmlFor="cate5">sea foods
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(59)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate6"/>
                                                    <label htmlFor="cate6">diet foods
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(64)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate7"/>
                                                    <label htmlFor="cate7">dry foods
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(77)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate8"/>
                                                    <label htmlFor="cate8">fast foods
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(85)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate9"/>
                                                    <label htmlFor="cate9">drinks
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(92)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate10"/>
                                                    <label htmlFor="cate10">coffee
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(21)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate11"/>
                                                    <label htmlFor="cate11">meats
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(14)
                                            </span>
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="cate12"/>
                                                    <label htmlFor="cate12">fishes
                                                    </label>
                                            </div>
                                            <span className="shop-widget-number">(56)
                                            </span>
                                        </li>
                                    </ul>
                                    <button className="shop-widget-btn">
                                        <i className="far fa-trash-alt">
                                        </i>
                                        <span>clear filter
                                        </span>
                                    </button>
                            </form>
                        </div>
                </div>
                <div className="col-lg-9">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="top-filter">
                                <div className="filter-show">
                                    <label className="filter-label">Show :
                                    </label>
                                    <select  className="form-select filter-select">
                                        <option value="1">12
                                        </option>
                                        <option value="2">24
                                        </option>
                                        <option value="3">36
                                        </option>
                                    </select>
                                </div>
                                <div className="filter-short">
                                    <label className="filter-label">Short by :
                                    </label>
                                    <select  className="form-select filter-select">
                                        <option value="">default
                                        </option>
                                        <option value="3">trending
                                        </option>
                                        <option value="1">featured
                                        </option>
                                        <option value="2">recommend
                                        </option>
                                    </select>
                                </div>
                                <div className="filter-action">
                                    <Link  className="active" title="Three Column">
                                        <i className="fas fa-th">
                                        </i>
                                    </Link>
                                    <Link  title="Two Column">
                                        <i className="fas fa-th-large">
                                        </i>
                                    </Link>
                                    <Link  title="One Column">
                                        <i className="fas fa-th-list">
                                        </i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                        <ProductBox/>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bottom-paginate">
                                <p className="page-info">Showing 12 of 60 Results
                                </p>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <Link className="page-link" >
                                            <i className="fas fa-long-arrow-alt-left">
                                            </i>
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link active" >1
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" >2
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" >3
                                        </Link>
                                    </li>
                                    <li className="page-item">...
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" >60
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" >
                                            <i className="fas fa-long-arrow-alt-right">
                                            </i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</section>
        </div>
    )
}



