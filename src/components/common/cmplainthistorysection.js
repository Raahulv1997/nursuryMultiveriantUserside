import React, { useState, useEffect } from 'react'
import { ComplaintList } from '../api/api';
import ProductImage from './product_image';
import moment from 'moment';
import { Link } from 'react-router-dom';
export default function Complainthistorysection({setLoading}) {
    const [compList, setCompList] = useState([])

    let email = localStorage.getItem("email")
    /*Function to get Complaint List */
    const GetComplaintData = async () => {
        setLoading(true)
        let response = await ComplaintList(email)
        console.log(response.data.result)
        if(response.data.result === null || response.data.result === undefined || response.data.result === "" || response.data.result.length === 0){
            setCompList([])
            setLoading(false)
        }else{
            setLoading(false)
            setCompList(response.data.result)
        }
    }
    /*Render method to get the complaint data */
    useEffect(() => {
        window.scrollTo(0, 0);
        GetComplaintData()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="product-details-frame">
                    <ul className="review-list">
                        {(compList || []).map((item, index) => {
                            return (
                                <li className="review-item" key={index}>
                                    <div className="row">
                                        <div className="review-media col">
                                            <Link className="review-avatar">
                                                {/* <img src={user4} alt="review" /> */}
                                                <ProductImage />
                                            </Link>
                                            <h5 className="review-meta row w-100">
                                                   <span className='col-6'>
                                                    <Link >{item.first_name} {item.last_name}</Link> 
                                                <span>
                                                    {moment(item.created_on).format(
                                                        "YYYY-MM-DD"
                                                    )}
                                                </span>
                                                   </span>
                                                    {item.status_ === "pending" ? <span className='col-6 text-end'>
                                                        <h4 className='text-warning fw-bold'>Pending </h4></span>: ""}
                                            </h5>
                                            <br />
                                        </div>
                                        {/* <ul className="review-rating d-flex col">
                    <ProductRating rating={item.review_rating} />
                  </ul> */}
                                    </div>
                                    <h5> Order Id : {item.order_id}</h5>
                                    <h5>{item.subject}</h5>
                                    <p className="review-desc">{item.description}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
