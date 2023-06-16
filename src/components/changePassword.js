import React, { useState } from 'react'
import logo from "../image/logo.png"
import { Link } from 'react-router-dom'
import { UpdateUserPassword } from './api/api'
import useValidation from './common/useValidation'
import { toast ,ToastContainer} from 'react-toastify'
export default function ChangePassword() {
  let [loading, setLoading] = useState(false);
  // USER CHANGE PASSWORD VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    password: "",
    new_password: "",
    conf_password: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    password: [
      (value) =>
        value === "" || value.trim() === "" ? "Old password is required" : null,
    ],
    new_password: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    conf_password: [
      (value) => (value ? null : "Confirm Password is required"),
      (value) =>
        value === state.new_password
          ? null
          : "Confirm Password must be Same as Password",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, setState, setErrors, errors, validate } =
    useValidation(initialFormState, validators);

    // USER CHANGE PASSWORD SUBMIT BUTTON
    const onUserChangePassClick = async (event) => {
        event.preventDefault();
        if (validate()) {
            setLoading(true)
            let Response = await UpdateUserPassword(state)
            console.log(Response);
            if(Response.data.response === "update your password successfully"){
                toast.success("Password updated successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setLoading(false)
                setState(initialFormState)
                setErrors("")
            }
        }
    }


  return (
    <div>
      <section className="user-form-part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
              <div className="user-form-logo">
                <Link href="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2>any issue?</h2>
                  <p>Make sure your current password is strong</p>
                </div>
                <form className="user-form" onSubmit={onUserChangePassClick}>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className={
                        errors.password
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      onChange={onInputChange}
                      value={state.password}
                      placeholder="Old password"
                    />
                    {/* ERROR MSG FOR OLD PASSWORD */}
                    {errors.password && (
                      <span
                        key={errors.password}
                        className="text-danger font-size-3"
                      >
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="new_password"
                      className={
                        errors.new_password
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      onChange={onInputChange}
                      value={state.new_password}
                      placeholder="Current password"
                    />
                    {/* ERROR MSG FOR OLD PASSWORD */}
                    {errors.new_password && (
                      <span
                        key={errors.new_password}
                        className="text-danger font-size-3"
                      >
                        {errors.new_password}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="conf_password"
                      className={
                        errors.conf_password
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      onChange={onInputChange}
                      value={state.conf_password}
                      placeholder="reapet password"
                    />
                    {/* ERROR MSG FOR OLD PASSWORD */}
                    {errors.conf_password && (
                      <span
                        key={errors.conf_password}
                        className="text-danger font-size-3"
                      >
                        {errors.conf_password}
                      </span>
                    )}
                  </div>
                  <div className="form-button">
                    {loading === true ? (
                      <button type="button" disabled>
                        <span
                          className="spinner-border spinner-border-sm "
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Loading...</span>
                      </button>
                    ) : (
                      <button type="submit">change password</button>
                    )}
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
