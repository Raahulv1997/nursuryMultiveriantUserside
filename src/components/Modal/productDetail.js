import React, { useState , useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productImg from "../../image/product.jpg"
import { ProductList , AddToCart } from '../api/api';
import ProductRating from '../common/productRating';
import {toast} from "react-toastify"
export default function ProductDetailModal(props) {
    let[data,setData] = useState("")
    const [qtyNo, setQtyvarIdNo] = useState(1)
    const [varList, setVarList] = useState([])
    const [varId, setVarID] = useState(props.var)
    /*Function to get the product list */
    let GetProductDetails = async () => {
        let response = await ProductList("", "", "", "", "", "10", "0", "", "", "",props.id)
        console.log("Response True",response.data.results,"____________________________________________",response.data.results.find(data => data.product_verient_id === varId));
        if (response.data.results === undefined
            || response.data.results === "undefined"
            || response.data.results === null
            || response.data.results.length === 0) {
            setData([])
        } else {
            // setData(response.data.results.find(data => data.product_verient_id === varId))  
            setVarList(response.data.results)
            AllData(response.data.results,varId)       
        }
    }
    const AllData = (data, varId) =>{
      console.log("varient data",data,varId);
        if (data === undefined
            || data === "undefined"
            || data === null
            || data.length === 0) {
            setData([])
        } else {
            setData(data.find(data => data.product_verient_id === varId))                     
        }
    }
    console.log("whole data",data);
    /*Render method to get product list */
    useEffect(() => {
        GetProductDetails()
    }, [qtyNo])

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
        setQtyvarIdNo(quantity);
        console.log(productId, productVariantId, quantity);
        // onAddToCart(productId, productVariantId);
    };
console.log(varId,data?.discount);
    /*Function to convert image object in array */
    // const imageUrl = "https://assets.winni.in/product/primary/2014/10/50382.jpeg?dpr=1&w=400,http://192.168.29.109:8888/product_images/test_32_img_384498.png";
    // const imageArray = imageUrl.split(',');
    // console.log(imageArray);    
    return (
        <Modal show={props.show} >
            <button className="modal-close icofont-close" data-bs-dismiss="modal" onClick={props.close}></button>
        <div>
             <div className="product-view">
                <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <div className="view-gallery">
                            <div className="view-label-group">
                                {/* <label className="view-label new">new</label> */}
                               {data.discount === (undefined||null) ? null :
                               <label className="view-label off">{data?.discount}%</label>}
                            </div>
                            <Carousel>
                                <div>
                                    <img src={data.cover_image} alt="product" />
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
                    <div className="col-md-6 col-lg-6">
                        <div className="view-details">
                            <h3 className="view-name">
                                <Link to="" >{data.name}</Link>
                            </h3>
                            <div className="view-meta">
                                {/* <p>SKU:<span>1234567</span>
                                </p> */}
                                <p>BRAND:<Link to="">{data.brand}</Link>
                                </p>
                            </div>
                            <div className="view-rating">
                                <ProductRating rating={data.rating} review={data.review}/>
                            </div>
                            <h3 className="view-price">
                                <del>{data.mrp}</del>
                                <span>{data.price}<small>/per</small>
                                </span>
                            </h3>
                            <p className="view-desc">{data.description}</p>
                            <div className="view-list-group">
                                <label className="view-list-title">tags:</label>
                                <ul className="view-tag-list">
                                    <li>
                                        <Link to="">{data.seo_tag}</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="view-list-group">
                                <label className="view-list-title">variants:</label>
                                <ul className="view-tag-list">
                                    {(varList || []).map((item, index)=>{return(
                                        <li key={index} >
                                            <Link to="" onClick={()=>AllData(item,item.product_verient_id)}> 
                                            {item.verient_name}
                                            </Link>
                                        </li>
                                    )})}
                                </ul>
                            </div>
                            <div className="view-add-group">
                            {data.cart_count === null ? (
                                    <button
                                        className='product-add'
                                        title='Add to Cart'
                                        onClick={() =>
                                            onAddToCart(
                                                data.product_id,
                                                data.product_verient_id
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
                                                    data.product_id,
                                                    data.product_verient_id,
                                                    data.cart_count - 1
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
                                            value={data.cart_count}
                                            readOnly
                                        />
                                        <button
                                            className='action-plus'
                                            title='Quantity Plus'
                                            onClick={() =>
                                                updateQuantity(
                                                    data.product_id,
                                                    data.product_verient_id,
                                                    data.cart_count + 1
                                                )
                                            }
                                        >
                                            <i className='icofont-plus'></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="view-action-group">
                                <Link to="" className="view-wish wish" title="Add Your Wishlist">
                                    <i className="icofont-heart">
                                    </i>
                                    <span>add to wisdsfsh</span>
                                </Link>
                                {/* <Link to="" className="view-compare" title="Compare This Item">
                                    <i className="fas fa-random">
                                    </i>
                                    <span>Compare This</span>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    </Modal>
  );
}
