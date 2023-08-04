import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../image/logo.png"
import { ForgotUserPassword, VerifyOtp } from './api/api'
import useValidation from './common/useValidation'
import { ToastContainer, toast } from "react-toastify"
function Reset() {
  let [loading, setLoading] = useState(false)
  let [verifyOtp, setVerifyOtp] = useState(false)
  let navigate =useNavigate()
  // USER CHANGE PASSWORD VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    email: "",
    otp: ""
  };
  // VALIDATION CONDITIONS
  const validators = {
    email: [
      (value) =>
        value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
            ? null
            : "Email is invalid",
    ],
    otp: [
      (value) =>
        verifyOtp === true ?
          value === null || value.trim() === ""
            ? "Otp is required"
            : ""
          : null],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, setState, setErrors, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // USER CHANGE PASSWORD SUBMIT BUTTON
  const onUserForgotPassClick = async (event) => {
    event.preventDefault();
    if (validate() && verifyOtp === false) {
      setLoading(true)
      let Response = await ForgotUserPassword(state)
      if (Response.data.response === "send otp on your mail") {
        toast.success("Send Otp Succesfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setVerifyOtp(true)
        setLoading(false)
        setErrors("")
      }
      if (Response.data.response === "email already exist, check your mail or try after sometime") {
        toast.error("Check your mail or try after sometime", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setLoading(false)
        setErrors({ ...errors, email: ["Check your mail or try after sometime"] })
      }
      
      if (Response.data.response === " eamil not exist") {
        toast.success("Wrong Email", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setLoading(false)
        setState(initialFormState)
        setErrors({ ...errors, email: ["please enter your registered email address"] })
      }
    }
  }

  /*User Otp Verify Api */
  const onUserVerifyOtpClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true)
      let Response = await VerifyOtp(state)
      if(Response.data.success === true){
        localStorage.setItem("token",Response.data.token)
        localStorage.setItem("temp","yes")
        navigate("/changepassword")
        setLoading(false)
        setErrors("")
      }
      if(Response.data.response === "not matched, credential issue"){
        setErrors({ ...errors, otp: ["Invalid Otp"] })
        setLoading(false)
      }

    }
  }
  return (
    <div>
      <ToastContainer/>
      <section className="user-form-part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div className="user-form-logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2>worried?</h2>
                  <p>No Problem! Just Follow The Simple Way</p>
                </div>
                <form className="user-form">
                  <div className="form-group">
                    <input type="email"
                      name='email'
                      className={
                        errors.email
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      placeholder="Enter your email"
                      value={state.email}
                      onChange={onInputChange} />
                    {/*----ERROR MESSAGE FOR EMAIL----*/}
                    {errors.email && (
                      <span>
                        {errors.email.map((error) => (
                          <span
                            key={error}
                            className="text-danger font-size-3"
                          >
                            {error}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  {verifyOtp ? (
                    <div className="form-group">
                      <label
                        htmlFor="otp"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Enter Otp
                      </label>
                      <div className="position-relative">
                        <input
                          type="number"
                          value={state.otp || ""}
                          onChange={onInputChange}
                          maxLength={6}
                          name="otp"
                          id="otp"
                          className={
                            errors.otp
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          placeholder="Otp"
                        />
                        {errors.otp && (
                          <span
                            key={errors.otp}
                            className="text-danger font-size-3"
                          >
                            {errors.otp}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}
                  <div className="form-button">
                    {loading ? <button
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm "
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Loading...</span>
                    </button> : verifyOtp === true ?
                      <button type="submit" onClick={onUserVerifyOtpClick}>get reset link</button>
                      :
                      <button type="submit" onClick={onUserForgotPassClick}>get reset link</button>}
                  </div>
                </form>
              </div>
              <div className="user-form-remind">
                <p>
                  Go Back To<Link to="/login">login here</Link>
                </p>
              </div>
              <div className="user-form-footer">
                <p>
                  © All Copyrights Reserved by <Link to="">WE2CODE</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reset;
