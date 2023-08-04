import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import useValidation from '../common/useValidation';
import { CheckUserAddress } from "../api/api"
import { toast } from 'react-toastify';
export default function AddAddressForm(props) {
    const [loading, setLoading] = useState(false)

    const initialFormStateuser = {
        first_name: "",
        phone_no: "",
        address: "",
        city: "",
        pincode: "",
        area: ""
    };

    // VALIDATION CONDITIONS
    const validators = {
        first_name: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? null
                    : value.length < 2
                        ? "Name should have 2 or more letters"
                        : null,
        ],
        phone_no: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? null
                    : value.length < 10 || value.length > 10
                        ? "Mobile no should have 10 numbers"
                        : null,
        ],
        address: [
            (value) =>
                value === "" || value === null || value.trim() === ""
                    ? "Address is required"
                    : value.length < 5
                        ? "Address should have 5 or more letter"
                        : null,
        ],
        city: [
            (value) => value === "" || value === null ? "city is required"
                : value.length < 5
                    ? "City should have 5 or more letter"
                    : null,
        ],
        pincode: [
            (value) => value === "" || value === null ? "Status is required"
                : value.length === 6
                    ? null
                    : "Pincode should be of 6 numbers"
        ],
    };

    // CUSTOM VALIDATIONS IMPORT
    const { state, setState, onInputChange, errors, validate, setErrors } =
        useValidation(initialFormStateuser, validators);

    /*Function to send delivery address data */
    const handleButtonClick = () => {
        props.setLoading(true)
        if (validate()) {
            props.GetAddress(state);
            setErrors("")
            setState(initialFormStateuser)
            props.setLoading(false)
            props.close()
        }
    };
    /*Function to check the address if it is avalable to delivery the product or not */
    const CheckAddress = async () => {
        if (validate()) {
            props.setLoading(true)
            setLoading(true)
            setErrors("")
            let response = await CheckUserAddress(state.pincode, props.vendorId)
            if (response.data.status === false ) {
                toast.error("Area Not available", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setErrors({ ...errors, area: ["Delivery Not available for this address"] })
                setLoading(false)
                props.setLoading(false)
            } if (response.data.service_available.length > 0) {
                toast.success("Area available", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setState({ ...state, area: false })
                setErrors("")
                setLoading(false)
                props.setLoading(false)
            }
        }
    }
    return (
        <Modal show={props.show}>
            <div className="modal-content">
                <button className="modal-close" onClick={props.close}>
                    <i className="icofont-close"></i>
                </button>
                <form className="modal-form" >
                    <div className="form-title">
                        <h3>add new address</h3>
                    </div>
                    {/* <div className="form-group">
          <label className="form-label">title</label>
          <select className="form-select">
            <option selected="">choose title</option>
            <option value="home">home</option>
            <option value="office">office</option>
            <option value="Bussiness">Bussiness</option>
            <option value="academy">academy</option>
            <option value="others">others</option>
          </select>
        </div> */}
                    <div className="form-group">
                        <label className="form-label">name</label>
                        <input className={errors.first_name ?
                            "form-control border-danger" :
                            "form-control"}
                            placeholder="Enter Name"
                            value={state.first_name}
                            name='first_name'
                            onChange={onInputChange} />
                        {/*----ERROR MESSAGE FOR NAME----*/}
                        {errors.first_name && (
                            <span
                                key={errors.first_name}
                                className="text-danger font-size-3"
                            >
                                {errors.first_name}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">phone no</label>
                        <input className={errors.phone_no ?
                            "form-control border-danger" :
                            "form-control"}
                            placeholder="Enter Mobile No"
                            value={state.phone_no}
                            name='phone_no'
                            onChange={onInputChange}
                            maxLength={10} />
                        {/*----ERROR MESSAGE FOR PHONE NO----*/}
                        {errors.phone_no && (
                            <span
                                key={errors.phone_no}
                                className="text-danger font-size-3"
                            >
                                {errors.phone_no}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">address</label>
                        <textarea className={errors.address ?
                            "form-control border-danger" :
                            "form-control"}
                            placeholder="Enter your address"
                            value={state.address}
                            name='address'
                            onChange={onInputChange}></textarea>
                        {/*----ERROR MESSAGE FOR ADDRESS----*/}
                        {errors.address && (
                            <span
                                key={errors.address}
                                className="text-danger font-size-3"
                            >
                                {errors.address}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">pincode</label>
                        <input className={errors.address ?
                            "form-control border-danger" :
                            "form-control"}
                            placeholder="Enter Pincode"
                            value={state.pincode}
                            name='pincode'
                            onChange={onInputChange} />
                        {/*----ERROR MESSAGE FOR PINCODE----*/}
                        {errors.pincode && (
                            <span
                                key={errors.pincode}
                                className="text-danger font-size-3"
                            >
                                {errors.pincode}
                            </span>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">city</label>
                        <input className={errors.city ?
                            "form-control border-danger" :
                            "form-control"}
                            placeholder="Enter city"
                            value={state.city}
                            name='city'
                            onChange={onInputChange} />
                        {/*----ERROR MESSAGE FOR CITY----*/}
                        {errors.city && (
                            <span
                                key={errors.city}
                                className="text-danger font-size-3"
                            >
                                {errors.city}
                            </span>
                        )}
                    </div>

                    <input className={errors.area ?
                        "border-danger" : ""}
                        type='checkbox'
                        id="area"
                        onChange={(e) => setState({ ...state, area: e.target.checked })} />
                    <label htmlFor="area" className="form-label">Area availablity</label>
                    <br />
                    {/*----ERROR MESSAGE FOR AREA----*/}
                    {errors.area && (
                        <span
                            key={errors.area}
                            className="text-danger font-size-3 mt-5"
                        >
                            {errors.area}
                        </span>
                    )}
                    {loading ? (
                        <button type="button" disabled className='form-btn'>
                            <span
                                className="spinner-border spinner-border-sm "
                                role="status"
                                aria-hidden="true"
                            ></span>
                            <span className="sr-only">Loading...</span>
                        </button>
                    ) :
                        <button className="form-btn" type="button" onClick={state.area === true ? CheckAddress : handleButtonClick}>{state.area === true ? "Check Address" : "Send Data"}</button>}
                </form>
            </div>
        </Modal>)
}
