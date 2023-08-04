import React from 'react'
import { Modal } from 'react-bootstrap'
import { AddReview } from "../api/api"
import { toast } from 'react-toastify'
import useValidation from '../common/useValidation'
export const ReviewModal = (props) => {
    // USER PERSONAL DETAIL VALIDATION
    // INITIAL STATE ASSIGNMENT
    const initialFormStatereview = {
        product_id: props.data.product_id,
        user_name: "",
        product_name: props.data.name,
        review_date: new Date(),
        review_rating: "",
        comment: "",
    };

    // VALIDATION CONDITIONS
    const validators = {
        user_name: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? "User name is required"
                    : /[^A-Za-z 0-9]/g.test(value)
                        ? "Cannot use special character "
                        : value.length < 2
                            ? "User name should have 2 or more letter"
                            : /[-]?\d+(\.\d+)?/.test(value)
                                ? "User name can not have a number."
                                : "",
        ],
        // product_name: [
        //     (value) =>
        //         value === "" || value === null || value.trim() === ""
        //             ? ""
        //             : /[^A-Za-z 0-9]/g.test(value)
        //                 ? "Cannot use special character "
        //                 : value.length < 2
        //                     ? "Product name should have 2 or more letter"
        //                     : /[-]?\d+(\.\d+)?/.test(value)
        //                         ? "Product name can not have a number."
        //                         : "",
        // ],
        review_rating: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? "Email is required"
                    : "",
        ],
        comment: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? "comment is required"
                    : value.length < 5
                        ? "comment should have 5 or more letter"
                        : null,
        ],

        email: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? "Email is required"
                    : /\S+@\S+\.\S+/.test(value)
                        ? null
                        : "Email is invalid",
        ],
    };

    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, onInputChange, errors, validate, setErrors } =
        useValidation(initialFormStatereview, validators);

    /*Function to Add review Profile */
    const OnReviewClick = async (event) => {
        // console.log(state)
        event.preventDefault();
        if (validate()) {
            let response = await AddReview(state)
            if (response.data.message ===
                "Review Rating Data Insert Succecsfully") {
                toast.success("Review Rating Data Insert Succecsfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                })
                setErrors("")
                setState(initialFormStatereview)
                props.close()
                props.setApicall(true)
            }
            if (response.data.message ===
                "User already Reviewed") {
                toast.error("Already Reviewed", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                })
                setErrors("")
                setState(initialFormStatereview)
                props.close()
                props.setApicall(true)
            }
        }
    }
    return (
        <Modal show={props.show} close={props.close}>
            <button className="modal-close icofont-close" data-bs-dismiss="modal" onClick={props.close}></button>
            <div className="product-details-frame">
                <h3 className="frame-title">add your review</h3>
                <form className="review-form" onSubmit={OnReviewClick}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="star-rating">
                                <input
                                    type="radio"
                                    name="review_rating"
                                    onChange={(e) => setState({ ...state, review_rating: e.target.value })}
                                    value={"" || 5}
                                    id="star-1" />
                                <label htmlFor="star-1"></label>
                                <input
                                    type="radio"
                                    name="review_rating"
                                    onChange={(e) => setState({ ...state, review_rating: e.target.value })}
                                    value={"" || 4}
                                    id="star-2" />
                                <label htmlFor="star-2"></label>
                                <input
                                    type="radio"
                                    name="review_rating"
                                    onChange={(e) => setState({ ...state, review_rating: e.target.value })}
                                    value={"" || 3}
                                    id="star-3" />
                                <label htmlFor="star-3"></label>
                                <input
                                    type="radio"
                                    name="review_rating"
                                    onChange={(e) => setState({ ...state, review_rating: e.target.value })}
                                    value={"" || 2}
                                    id="star-4" />
                                <label htmlFor="star-4"></label>
                                <input
                                    type="radio"
                                    name="review_rating"
                                    onChange={(e) => setState({ ...state, review_rating: e.target.value })}
                                    value={"" || 1}
                                    id="star-5" />
                                <label htmlFor="star-5"></label>
                            </div>
                            {/*----ERROR MESSAGE FOR review_rating----*/}
                            {errors.review_rating && (
                                <span
                                    key={errors.review_rating}
                                    className="text-danger font-size-3"
                                >
                                    {errors.review_rating}
                                </span>
                            )}
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group">
                                <textarea
                                    name='comment'
                                    value={"" || state.comment}
                                    onChange={onInputChange}
                                    className={errors.comment ? "form-control border-danger" : "form-control"}
                                    placeholder="Describe"
                                ></textarea>
                                {/*----ERROR MESSAGE FOR comment----*/}
                                {errors.comment && (
                                    <span
                                        key={errors.comment}
                                        className="text-danger font-size-3"
                                    >
                                        {errors.comment}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    name="user_name"
                                    value={"" || state.user_name}
                                    onChange={onInputChange}
                                    type="text"
                                    className={errors.user_name ? "form-control border-danger" : "form-control"}
                                    placeholder="Name"
                                />
                                {/*----ERROR MESSAGE FOR user_name----*/}
                                {errors.user_name && (
                                    <span
                                        key={errors.user_name}
                                        className="text-danger font-size-3"
                                    >
                                        {errors.user_name}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <input
                                    name='email'
                                    value={state.email}
                                    type="email"
                                    className={errors.user_name ? "form-control border-danger" : "form-control"}
                                    placeholder="Email"
                                />
                                {/*----ERROR MESSAGE FOR email----*/}
                                {errors.email && (
                                    <span
                                        key={errors.email}
                                        className="text-danger font-size-3"
                                    >
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <button className="btn btn-inline">
                                <i className="icofont-water-drop"></i>
                                <span>drop your review</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
