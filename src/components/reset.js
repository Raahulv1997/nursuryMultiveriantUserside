import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../image/logo.png"
import { ForgotUserPassword } from './api/api'
import useValidation from './common/useValidation'
function Reset() {
  let [loading, setLoading] = useState(false)
  // USER CHANGE PASSWORD VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    email: ""
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
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, setState, setErrors, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // USER CHANGE PASSWORD SUBMIT BUTTON
  const onUserForgotPassClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true)
      let Response = await ForgotUserPassword(state)
      // if(Response.response === "update your password successfully"){
      //     toast.success("Password updated successfully", {
      //         position: toast.POSITION.TOP_RIGHT,
      //         autoClose: 1000,
      //     });
      //     setLoading(false)
      //     setState(initialFormState)
      //     setErrors("")
      // }
      console.log(Response);
    }
  }

  return (
    <div>
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
                <form className="user-form" onSubmit={onUserForgotPassClick}>
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
                    </button> :
                      <button type="submit">get reset link</button>}
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
