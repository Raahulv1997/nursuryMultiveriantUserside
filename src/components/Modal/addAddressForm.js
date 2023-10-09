import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../common/useValidation";
import { CheckUserAddress } from "../api/api";
import { toast } from "react-toastify";
export default function AddAddressForm(props) {
  const [loading, setLoading] = useState(false);
  const [AreaError, setAreaError] = useState([]);
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  const initialFormStateuser = {
    first_name: "",
    last_name: "",
    phone_no: "",
    address: "",
    email: "",
    city: "",
    pincode: "",
    area: "",
    onProfileSave: "",
  };

  // VALIDATION CONDITIONS
  const validators = {
    first_name: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "First name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 2
          ? "First name should have 2 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "First name can not have a number."
          : "",
    ],
    last_name: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? ""
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value.length < 2
          ? "Last name should have 2 or more letter"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Last name can not have a number."
          : "",
    ],
    email: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
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
      (value) =>
        value === "" || value === null
          ? "city is required"
          : value.length < 5
          ? "City should have 5 or more letter"
          : null,
    ],
    pincode: [
      (value) =>
        value === "" || value === null
          ? "Pincode is required"
          : value.length === 6
          ? null
          : "Pincode should be of 6 numbers",
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);

  /*Function to send delivery address data */
  const handleButtonClick = () => {
    // props.setLoading(true);
    if (validate()) {
      CheckAddress();

      props.GetAddress(state);

      // setState(initialFormStateuser);
      // props.setLoading(false);
      setTimeout(() => {
        props.close();
      }, 4000);
    }
  };
  /*Function to check the address if it is avalable to delivery the product or not */
  const CheckAddress = async () => {
    let response = await CheckUserAddress(
      state.pincode,
      props.vendorId,
      headers
    );
    console.log("Area API---" + JSON.stringify(response));

    if (response.data.service_not_available) {
      let array1 = response.data.service_not_available;
      let array2 = props.vendorId;
      const numArray1 = array1.map(Number);
      console.log(numArray1);
      console.log(array2);

      const matchingValues = numArray1.filter((value) =>
        array2.includes(value)
      );

      if (matchingValues.length > 0) {
        setAreaError(matchingValues || []);
      }
    }

    if (response.data.status === false) {
      toast.error("Area Not available", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

      // setLoading(false);
      // props.setLoading(false);
    }
    if (response.data.service_available.length > 0) {
      toast.success("Area available", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setState({ ...state, area: false });
      setErrors("");
      setLoading(false);
      props.setLoading(false);
    }
  };
  return (
    <Modal show={props.show} size="lg">
      <div className="modal-content">
        <button className="modal-close" onClick={props.close}>
          <i className="icofont-close"></i>
        </button>
        <form className="modal-form">
          <div className="form-title">
            <h3>add new address</h3>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">First name</label>
                <input
                  className={
                    errors.first_name
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  type="text"
                  placeholder="Enter First Name"
                  value={state.first_name}
                  name="first_name"
                  onChange={onInputChange}
                />
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
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  className={
                    errors.last_name
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Last Name"
                  type="text"
                  value={state.last_name}
                  name="last_name"
                  onChange={onInputChange}
                  maxLength={15}
                />
                {/*----ERROR MESSAGE FOR last_name----*/}
                {errors.last_name && (
                  <span
                    key={errors.last_name}
                    className="text-danger font-size-3"
                  >
                    {errors.last_name}
                  </span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">phone no</label>
                <input
                  className={
                    errors.phone_no
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  type="number"
                  placeholder="Enter Mobile No"
                  value={state.phone_no}
                  name="phone_no"
                  onChange={onInputChange}
                  maxLength={10}
                />
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
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  className={
                    errors.email
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Email"
                  type="email"
                  value={state.email}
                  name="email"
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR email----*/}
                {errors.email && (
                  <span key={errors.email} className="text-danger font-size-3">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">pincode</label>
                <input
                  className={
                    errors.pincode
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter Pincode"
                  value={state.pincode}
                  name="pincode"
                  // onChange={(e) => {
                  //   onInputChange(e);
                  //   document.getElementById("area").checked = false;
                  //   setState({ ...state.area, area: e.target.checked });
                  //   setErrors("");
                  // }}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR PINCODE----*/}
                {errors.pincode && (
                  <span
                    key={errors.pincode}
                    className="text-danger font-size-3"
                  >
                    {errors.pincode}
                  </span>
                )}
                {AreaError.length > 0 ? (
                  <span className="text-danger font-size-3">
                    {" "}
                    Not available-{" "}
                    {AreaError.map((item) => {
                      return <>Vendor ID: {item},</>;
                    })}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">city</label>
                <input
                  className={
                    errors.city ? "form-control border-danger" : "form-control"
                  }
                  placeholder="Enter city"
                  value={state.city}
                  name="city"
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR CITY----*/}
                {errors.city && (
                  <span key={errors.city} className="text-danger font-size-3">
                    {errors.city}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">address</label>
                <textarea
                  className={
                    errors.address
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter your address"
                  value={state.address}
                  name="address"
                  onChange={onInputChange}
                ></textarea>
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
            </div>
            <div className="col-md-6">
              <input
                className=""
                type="checkbox"
                id="onProfileSave"
                onChange={(e) =>
                  setState({ ...state, onProfileSave: e.target.checked })
                }
              />
              <label htmlFor="onProfileSave" className="form-label">
                Save on Profile
              </label>
              <br />
              {/*----ERROR MESSAGE FOR AREA----*/}
            </div>
          </div>

          {loading ? (
            <button type="button" disabled className="form-btn">
              <span
                className="spinner-border spinner-border-sm "
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Loading...</span>
            </button>
          ) : (
            <button
              className="form-btn"
              type="button"
              onClick={handleButtonClick}
            >
              Check Area & send data
            </button>
          )}
        </form>
      </div>
    </Modal>
  );
}
