<<<<<<< Updated upstream
import React, { useState } from "react";
import productImg from "../../image/product.webp";
import { Link } from "react-router-dom";
import ProductDetailModal from "../Modal/productDetail";
const ProductBox = () => {
  const [productDetailModal, setProductDetailModal] = useState(false);

  return (
    <>
      <div className="col">
        <div className="product-card p-0 border-0">
          <div className="product-media">
            <div className="product-label">
              <label className="label-text sale bg-danger">sale</label>
            </div>
            {/* <button className="product-wish wish">
              <i className="fas fa-heart"></i>
            </button> */}
            <Link className="product-image" to="">
              <img src={productImg} alt="product" />
            </Link>
            <div className="product-widget">
              <Link
                title="Product Compare"
                to=""
                className="fas fa-random"
              ></Link>
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
                onClick={() => setProductDetailModal(true)}
              ></Link>
            </div>
          </div>
          <div className="product-content px-3 pb-3">
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
      {productDetailModal ? (
        <ProductDetailModal
          show={productDetailModal}
          close={() => setProductDetailModal(false)}
        />
      ) : null}
    </>
  );
=======
import React, { useState, useEffect } from 'react';
import productImg from "../../image/product.jpg"
import { Link } from 'react-router-dom';
import ProductDetailModal from '../Modal/productDetail';
import { ProductList, AddToCart } from '../api/api';
import ProductRating from './productRating';
import { useLocation } from 'react-router-dom';
import {toast} from "react-toastify"

const ProductBox = ({ pricefilter, rating, cateFilter, brandFilter, Pages, paginationData, currentPage, sortByAlpha, sortByRating, sortByPrice }) => {
    const location = useLocation();
    const [productDetailModal, setProductDetailModal] = useState(false)
    const [data, setData] = useState([])
    const [productId, setProductId] = useState()
    const [productVarId, setProductVarId] = useState()
    const [qtyNo, setQtyNo] = useState(1)

    /*Function to get the product list */
    let GetProductList = async () => {
        let response = await ProductList(pricefilter.to_product_price
            , pricefilter.from_product_price, rating, cateFilter, brandFilter, Pages, currentPage, sortByAlpha, sortByRating, sortByPrice)
        // console.log(response.data.results)
        if (response.data.results === undefined
            || response.data.results === "undefined"
            || response.data.results === null
            || response.data.results.length === 0) {
            setData([])
        } else {
            setData(response.data.results)
            if (location.pathname === "/shop") {
                paginationData(response.data.pagination)
            }
        }
    }
    /*Render method to get product list */
    useEffect(() => {
        GetProductList()
    }, [pricefilter, rating, cateFilter, brandFilter, Pages, currentPage, sortByAlpha, sortByRating, sortByPrice , qtyNo])

    /*Function to Open Product Detail Page */
    const OpenProductDetailModal = (e,f) => {
        setProductDetailModal(true)
        setProductId(e)
        setProductVarId(f)
    }

    /*Function to add to cart */
    const onAddToCart = async (id, varId ) => {
        console.log(id, varId, qtyNo);
        let response = await AddToCart(id, varId, qtyNo)
        if(response.data.response === "add product successfull"){
            toast.success("Product Added Successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        }
    }
     /* Function to update quantity */
     const updateQuantity = (productId, productVariantId, quantity) => {
        setQtyNo(quantity);
        console.log(productId, productVariantId, quantity);
        // onAddToCart(productId, productVariantId);
    };
    return (
        <>
            {data.length === 0 ?
                <div className='justify-content-center'>
                    <b className='text-center'>
                        No data Found
                    </b>
                </div> :
                (data || []).map((item, index) => {
                    return (
                        <div className='col' key={index}>
                            <div className="product-card" >
                                <div className="product-media">
                                    {/* <div className="product-label">
                                        <label className="label-text sale">sale</label>
                                    </div> */}
                                    <button className="product-wish wish">
                                        <i className="fas fa-heart"></i>
                                    </button>
                                    <Link className="product-image" to="">
                                        <img src={item.cover_image === null
                                            || item.cover_image === undefined
                                            || item.cover_image === "undefined"
                                            ? productImg
                                            : item.cover_image} alt="product" />
                                    </Link>
                                    <div className="product-widget">
                                        <Link
                                            title="Product View"
                                            className="fas fa-eye"
                                            onClick={() => OpenProductDetailModal(item.product_id ,item.product_verient_id)}
                                        ></Link>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <div className="product-rating">
                                        {/* Ratind Component */}
                                        <ProductRating rating={item.rating} review={item.review} />
                                    </div>
                                    <h6 className="product-name">
                                        <Link to="">{item.verient_name}</Link>
                                    </h6>
                                    <h6 className="product-price">
                                        <del>{item.mrp}</del>
                                        <span>
                                            {item.price}<small>/piece</small>
                                        </span>
                                    </h6>
                                    {item.cart_count === null ? (
                                    <button
                                        className='product-add'
                                        title='Add to Cart'
                                        onClick={() =>
                                            onAddToCart(
                                                item.product_id,
                                                item.product_verient_id
                                            )
                                        }
                                    >
                                        <i className='fas fa-shopping-basket'></i>
                                        <span>add</span>
                                    </button>
                                ) : (
                                    <div className='product-action d-flex'>
                                        <button
                                            className='action-minus'
                                            title='Quantity Minus'
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product_id,
                                                    item.product_verient_id,
                                                    item.cart_count - 1
                                                )
                                            }
                                        >
                                            <i className='icofont-minus'></i>
                                        </button>
                                        <input
                                            className='action-input'
                                            title='Quantity Number'
                                            type='text'
                                            name='quantity'
                                            value={item.cart_count}
                                            readOnly
                                        />
                                        <button
                                            className='action-plus'
                                            title='Quantity Plus'
                                            onClick={() =>
                                                updateQuantity(
                                                    item.product_id,
                                                    item.product_verient_id,
                                                    item.cart_count + 1
                                                )
                                            }
                                        >
                                            <i className='icofont-plus'></i>
                                        </button>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>)
                })
            }
            {productDetailModal ?
                <ProductDetailModal
                    show={productDetailModal}
                    close={() => setProductDetailModal(false)}
                    id={productId}
                    var={productVarId} /> : null}
        </>
    );
>>>>>>> Stashed changes
};

export default ProductBox;
