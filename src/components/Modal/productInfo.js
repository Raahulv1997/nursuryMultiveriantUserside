import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import user from "../../image/user.png";
import useValidation from "../common/useValidation";
import { UpdateUer, UserData } from "../api/api";
import { toast } from "react-toastify";
export default function ProfileInfoModal(props) {
  const [imageSrc, setImageSrctate] = useState();
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  /*Function to get user details */
  let GetUserData = async () => {
    props.setLoading(true);
    let response = await UserData(headers);
    if (
      response.data.length === 0 ||
      response.data === null ||
      response.data === "" ||
      response.data === undefined
    ) {
      setState();
      props.setLoading(false);
    } else {
      setState(response.data[0]);
      props.setLoading(false);
    }
  };
  useEffect(() => {
    GetUserData();
    // eslint-disable-next-line
  }, []);
  // USER PERSONAL DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    address: "",
    alternate_address: "",
    city: "",
    pincode: "",
    image: "",
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
          ? "Mobile number is required"
          : value.length < 10
          ? "Mobile number should be of 10 digits"
          : value.length > 11
          ? "Mobile number should not be more than 11 digits"
          : "",
    ],
    address: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Address is required"
          : value.length < 5
          ? "Address should have 5 or more letter"
          : null,
    ],
    alternate_address: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? ""
          : value.length < 5
          ? "Alternate address should have 5 or more letter"
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
          ? "Status is required"
          : value.length === 6
          ? null
          : "Pincode should be of 6 numbers",
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);

  /*Onchange function of Resume */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setState((prevState) => ({ ...prevState, image: file }));

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImageSrctate(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  /*Function to Update user Profile */
  const OnuserProfileClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      props.setLoading(true);
      let response = await UpdateUer(state, headers);
      if (response.data.message === "updated user successfully") {
        toast.success("Profile Updted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setErrors("");
        setState(initialFormStateuser);
        props.close();
        props.setApicall(true);
        props.setLoading(false);
      }
    }
  };

  return (
    <Modal show={props.show} size="lg">
      <button
        className="modal-close icofont-close"
        data-bs-dismiss="modal"
        onClick={props.close}
      ></button>
      <div>
        <form className="modal-form" onSubmit={OnuserProfileClick}>
          <div className="form-title">
            <h3>edit profile info</h3>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group mx-auto text-center">
                <div className="position-relative d-flex justify-content-center  align-items-end">
                  <div>
                    <input
                      type="file"
                      id="image"
                      accept="image/png,image/jpeg,image/ "
                      onChange={handleFileChange}
                      className="d-none"
                    />
                    <img
                      className="rounded-circle "
                      src={imageSrc ? imageSrc : state?.image ?? user}
                      alt={state.user_log}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                  <label
                    className="bg-white position-absolute border rounded-circle mx-5"
                    htmlFor="image"
                  >
                    <span className="fas fa-pen text-dark bg-gray p-1 rounded"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  className={
                    errors.first_name
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="First Name"
                  type="text"
                  value={state.first_name || ""}
                  name="first_name"
                  onChange={onInputChange}
                  maxLength={30}
                />
                {/*----ERROR MESSAGE FOR first_name----*/}
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
                  value={state.last_name || ""}
                  name="last_name"
                  onChange={onInputChange}
                  maxLength={30}
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
                <label className="form-label">
                  Contact <span className="text-danger">*</span>
                </label>
                <input
                  className={
                    errors.phone_no
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Contact number"
                  type="number"
                  value={state.phone_no || ""}
                  name="phone_no"
                  mixLength={10}
                  min={0}
                  minLength={0}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR phone_no----*/}
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
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  className={
                    errors.address
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Address"
                  type="text"
                  value={state.address || ""}
                  name="address"
                  onChange={onInputChange}
                  maxLength={150}
                />
                {/*----ERROR MESSAGE FOR address----*/}
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
              <div className="form-group">
                <label className="form-label">Alternate Address</label>
                <input
                  className={
                    errors.alternate_address
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Alternate Address"
                  type="text"
                  value={state.alternate_address || ""}
                  name="alternate_address"
                  maxLength={150}
                  onChange={onInputChange}
                />

                {errors.alternate_address && (
                  <span
                    key={errors.alternate_address}
                    className="text-danger font-size-3"
                  >
                    {errors.alternate_address}
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
                  type="text"
                  value={state.email || ""}
                  disabled={state.email ? true : false}
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
                <label className="form-label">
                  Pincode <span className="text-danger">*</span>
                </label>
                <input
                  className={
                    errors.pincode
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Pincode"
                  type="number"
                  value={state.pincode || ""}
                  name="pincode"
                  maxLength={6}
                  min={0}
                  minLength={0}
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR pincode----*/}
                {errors.pincode && (
                  <span
                    key={errors.pincode}
                    className="text-danger font-size-3"
                  >
                    {errors.pincode}
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  className={
                    errors.city
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="City"
                  type="text"
                  value={state.city || ""}
                  name="city"
                  onChange={onInputChange}
                />
                {/*----ERROR MESSAGE FOR city----*/}
                {errors.city && (
                  <span key={errors.city} className="text-danger font-size-3">
                    {errors.city}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button className="form-btn" type="submit">
            save profile info
          </button>
        </form>
      </div>
    </Modal>
  );
}
