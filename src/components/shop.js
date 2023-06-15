import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Header from './common/header';
import Otherbannner from './common/otherbannner';
import ProductBox from './common/productBox';
import shoppromo from '../image/shoppromo.jpg'
import { FilterList } from './api/api';
import Pagination from './common/pagination';
export default function Shop() {
    let [price, setPrice] = useState("")
    let [rating, setRating] = useState([])
    let [cateFilter, setCateFilter] = useState([])
    let [brandFilter, setBrandFilter] = useState([])
    let [catData, setCatData] = useState([])
    let [brandData, setBrandData] = useState([])
    let [serachCate, setSerachCate] = useState([])
    let [serachBrand, setSerachBrand] = useState([])
    let [sortByAlpha, setSortByAlpha] = useState("")
    let [sortByRating, setSortByRating] = useState("")
    let [sortByPrice, setSortByPrice] = useState("")
    let [pageNo, setPageNo] = useState("10")
    const [paginationData, setPaginationData] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pricefilter, setpricefilter] = useState({
        to_product_price: 0,
        from_product_price: 0,
    });

    /*Pagination Calculation */
    const nPages = Math.ceil(paginationData.count_rows / pageNo);
    /*Pagination */
    const handlePaginationData = (data) => {
        setPaginationData(data);
    };


    /*Function to get the Filter List */
    const getFilterData = async () => {
        let response = await FilterList()
        setBrandData(response.data.brand_data);
        setCatData(response.data.category_data)
    }
    /*Render functionto get Filter list */
    useEffect(() => {
        getFilterData()
    }, [serachCate === "", serachBrand === ""])

    /*Functionality to get data filtered by price*/
    const onPriceFilterAdd = (e) => {
        setpricefilter({ ...pricefilter, [e.target.name]: e.target.value });
    };

    /*Functionality to get data filtered by Rating*/
    const onRatingChange = (e) => {
        if (e.target.type === "checkbox") {
            const selectedValues = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map((checkbox) => checkbox.value);
            setRating(selectedValues);
        } else {
            setRating([]);
        }
    };

    /*Functionality to Clear Rating filter*/
    const uncheckAll = () => {
        // Get all checkbox elements
        var checkboxes = document.querySelectorAll('input[name="rating"]');

        // Loop through each checkbox and uncheck it
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    }

    /*Functionality to get data filtered by Category*/
    const onCategoryChange = (e) => {
        if (e.target.type === "checkbox") {
            const selectedValues = Array.from(document.querySelectorAll('input[name="category"]:checked')).map((checkbox) => checkbox.value);
            setCateFilter(selectedValues);
        } else {
            setCateFilter([]);
        }
    };

    /*Function to serch the category */
    const onSerchCategory = (e) => {
        const value = e.target.value;
        setSerachCate(value)
        const filteredData = catData.filter((item) => item.categor.toLowerCase().includes(value.toLowerCase()));
        setCatData(filteredData);
    }
    /*Functionality to Clear Category filter*/
    const uncheckAllCategory = () => {
        // Get all checkbox elements
        var checkboxes = document.querySelectorAll('input[name="category"]');

        // Loop through each checkbox and uncheck it
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        setCateFilter([])
    }
    /*Function to serch the Brand */
    const onSerchBrand = (e) => {
        const value = e.target.value;
        setSerachBrand(value)
        const filteredData = brandData.filter((item) => item.brand.toLowerCase().includes(value.toLowerCase()));
        setBrandData(filteredData);
    }
    /*Functionality to get data filtered by Brand*/
    const onBrandChange = (e) => {
        if (e.target.type === "checkbox") {
            const selectedValues = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map((checkbox) => checkbox.value);
            setBrandFilter(selectedValues);
        } else {
            setBrandFilter([]);
        }
    };

    /*Functionality to Clear Brand filter*/
    const uncheckAllBrand = () => {
        // Get all checkbox elements
        var checkboxes = document.querySelectorAll('input[name="brand"]');

        // Loop through each checkbox and uncheck it
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        setBrandFilter([])
    }
    return (
        <div>
            {/* Hrader */}
            <Header />
            {/* Banner */}
            <Otherbannner heading={"Shop"} bread={"shop"} />
            {/* Main section  */}
            <section className="inner-section shop-part">
                <div className="container">
                    <div className="row content-reverse">
                        <div className="col-lg-3">
                            <div className="shop-widget-promo">
                                <Link >
                                    <img src={shoppromo} alt="promo" />
                                </Link>
                            </div>
                            {/* Filter by Price */}
                            <div className="shop-widget">
                                <h6 className="shop-widget-title">Filter by Price
                                </h6>
                                <form>
                                    <div className="shop-widget-group">
                                        <input type="text" placeholder="Min - 00"
                                            value={pricefilter.from_product_price || ""}
                                            onChange={(e) => onPriceFilterAdd(e)}
                                            name="from_product_price" max={0} />
                                        <input type="text" placeholder="Max - 5k"
                                            value={pricefilter.to_product_price || ""}
                                            onChange={(e) => onPriceFilterAdd(e)}
                                            name="to_product_price" max={0} />
                                    </div>
                                    <button className="shop-widget-btn" type="button"
                                        onClick={() => setPrice(pricefilter)}>
                                        <i className="fas fa-search">
                                        </i>
                                        <span>search
                                        </span>
                                    </button>
                                </form>
                            </div>
                            {/* FIlter by Rating */}
                            <div className="shop-widget">
                                <h6 className="shop-widget-title">Filter by Rating
                                </h6>
                                <form>
                                    <ul className="shop-widget-list">
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="feat1"
                                                    value={"5"}
                                                    onChange={onRatingChange}
                                                    name='rating' />
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
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="feat2"
                                                    value={"4"}
                                                    onChange={onRatingChange}
                                                    name='rating' />
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
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="feat3"
                                                    value={"3"}
                                                    onChange={onRatingChange}
                                                    name='rating' />
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
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="feat4"
                                                    value={"2"}
                                                    onChange={onRatingChange}
                                                    name='rating' />
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
                                        </li>
                                        <li>
                                            <div className="shop-widget-content">
                                                <input type="checkbox" id="feat5"
                                                    value={"1"}
                                                    onChange={onRatingChange}
                                                    name='rating' />
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

                                        </li>
                                    </ul>
                                    <button className="shop-widget-btn" type='button'
                                        onClick={() => uncheckAll()}>
                                        <i className="far fa-trash-alt">
                                        </i>
                                        <span>clear filter
                                        </span>
                                    </button>
                                </form>
                            </div>
                            {/* FIlter by brand */}
                            <div className="shop-widget">
                                <h6 className="shop-widget-title">Filter by Brand
                                </h6>
                                <form>
                                    <input className="shop-widget-search" type="text" placeholder="Search..." value={serachBrand} onChange={onSerchBrand} />
                                    <ul className="shop-widget-list shop-widget-scroll">
                                        {(brandData || []).map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="shop-widget-content">
                                                        <input type="checkbox" id={item.id} name='brand' value={item.brand} onChange={(e) => onBrandChange(e)} />
                                                        <label htmlFor={item.id}>{item.brand}
                                                        </label>
                                                    </div>
                                                </li>)
                                        }
                                        )}
                                    </ul>
                                    <button className="shop-widget-btn" type='button' onClick={uncheckAllBrand}>
                                        <i className="far fa-trash-alt">
                                        </i>
                                        <span>clear filter
                                        </span>
                                    </button>
                                </form>
                            </div>
                            {/* Filter by Category */}
                            <div className="shop-widget">
                                <h6 className="shop-widget-title">Filter by Category
                                </h6>
                                <form>
                                    <input className="shop-widget-search" type="text" placeholder="Search..." value={serachCate} onChange={onSerchCategory} />
                                    <ul className="shop-widget-list shop-widget-scroll">
                                        {(catData || []).map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="shop-widget-content">
                                                        <input type="checkbox" id={item.id} name='category' value={item.category} onChange={(e) => onCategoryChange(e)} />
                                                        <label htmlFor={item.id}>{item.category}
                                                        </label>
                                                    </div>
                                                </li>)
                                        }
                                        )}
                                    </ul>
                                    <button className="shop-widget-btn" type='button' onClick={uncheckAllCategory}>
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
                                        {/* Select data per page */}
                                        <div className="filter-show">
                                            <label className="filter-label">Show :
                                            </label>
                                            <select className="form-select filter-select"
                                                onChange={(e) => setPageNo(e.target.value)}>
                                                <option value="12">12
                                                </option>
                                                <option value="24">24
                                                </option>
                                                <option value="36">36
                                                </option>
                                            </select>
                                        </div>
                                        <div className="filter-short">
                                            <label className="filter-label">Short by :
                                            </label>
                                            <select className="form-select filter-select"
                                                onChange={(e) => setSortByAlpha(e.target.value)}>
                                                <option value={""}>Select</option>
                                                <option value="desc">A-Z</option>
                                                <option value="asc">Z-A</option>
                                            </select>
                                        </div>
                                        <div className="filter-short">
                                            <label className="filter-label">Short by Rating:
                                            </label>
                                            <select className="form-select filter-select"
                                                onChange={(e) => setSortByRating(e.target.value)}>
                                                <option value={""}>Select</option>
                                                <option value="desc">High</option>
                                                <option value="asc">Low </option>
                                            </select>
                                        </div>
                                        <div className="filter-short">
                                            <label className="filter-label">Short by Price:
                                            </label>
                                            <select className="form-select filter-select"
                                                onChange={(e) => setSortByPrice(e.target.value)}>
                                                <option value={""}>Select</option>
                                                <option value="desc">High</option>
                                                <option value="asc">Low </option>
                                            </select>
                                        </div>
                                        {/* <div className="filter-action">
                                            <Link className="active" title="Three Column">
                                                <i className="fas fa-th">
                                                </i>
                                            </Link>
                                            <Link title="Two Column">
                                                <i className="fas fa-th-large">
                                                </i>
                                            </Link>
                                            <Link title="One Column">
                                                <i className="fas fa-th-list">
                                                </i>
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                                <ProductBox
                                    pricefilter={price}
                                    rating={rating}
                                    cateFilter={cateFilter}
                                    brandFilter={brandFilter}
                                    Pages={pageNo}
                                    paginationData={handlePaginationData}
                                    currentPage={currentPage}
                                    sortByAlpha={sortByAlpha}
                                    sortByRating={sortByRating}
                                    sortByPrice={sortByPrice}
                                />
                            </div>
                            <div className="row">
                                <Pagination nPages={nPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    total={paginationData.count_rows}
                                    count={pageNo} />
                                {/* <div className="col-lg-12">
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}



