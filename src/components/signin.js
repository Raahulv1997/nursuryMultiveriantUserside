import React, { useState } from "react";
import logo from "../image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserSingin, SendOtp } from "./api/api";
import useValidation from "./common/useValidation";
import { toast, ToastContainer } from "react-toastify";
export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState(false);
  const [termEWr, setTermErr] = useState(false);
  let [otpBox, setOtpBox] = useState(false);
  let navigate = useNavigate();
  /*----USER SINGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    otp: "",
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    name: [
      (value) =>
        value === null || value.trim() === "" ? "Name is required" : "",
    ],
    email: [
      (value) =>
        value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    password: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    confirm_password: [
      (value) => (value ? null : "Confirm Password is required"),
      (value) =>
        value === state.password
          ? null || ""
          : "Confirm Password must be Same as Password",
    ],
  };
  /*----SININ ONCHANGE FUNCTION----*/
  const { state, onInputChange, setErrors, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  console.log(state);

  /*Function to singin user */
  const onUserSinginClick = async (event) => {
    event.preventDefault();
    if (validate() && state.otp) {
      if (term === true) {
        setLoading(true);
        /*Api to singin */
        let response = await UserSingin(state);
        console.log(
          response,
          "fgkdhftguhdr",
          response.response === "not matched, credential issue"
        );
        if (response.response === "successfully created your account") {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userType", "user");
          localStorage.setItem("user_id", response.user_id);
          toast.success("Singin In Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setErrors("");
          navigate("/");
        } else if (response.response === "not matched, credential issue") {
          setErrors({ ...errors, otp: ["Invalid Otp"] });
          setLoading(false);
          setTermErr("");
        }
      } else {
        setTermErr("Accept terms and conditions");
      }
    } else if (otpBox === false && validate()) {
      /*Api to send otp */
      setLoading(true);
      let response = await SendOtp(state);
      if (response.response === "send otp on your mail") {
        toast.success("Otp sent Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setOtpBox(true);
        setLoading(false);
      } else if (
        response.response === "email already exists, please use logIn way"
      ) {
        setLoading(false);
        setTermErr("Email already exists");
      }
    }
  };
  return (
    <div>
      <section className="user-form-part">
        <div className="container">
          <ToastContainer />
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
              <div className="user-form-logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2>Join Now!</h2>
                  <p>Setup A New Account In A Minute</p>
                </div>
                <div className="user-form-group">
                  <ul className="user-form-social">
                    <li>
                      <Link className="facebook">
                        <i className="fab fa-facebook-f"></i>Join with facebook
                      </Link>
                    </li>
                    <li>
                      <Link className="twitter">
                        <i className="fab fa-twitter"></i>Join with twitter
                      </Link>
                    </li>
                    <li>
                      <Link className="google">
                        <i className="fab fa-google"></i>Join with google
                      </Link>
                    </li>
                    <li>
                      <Link className="instagram">
                        <i className="fab fa-instagram"></i>Join with instagram
                      </Link>
                    </li>
                  </ul>
                  <div className="user-form-divider">
                    <p>or</p>
                  </div>
                  <form className="user-form" onSubmit={onUserSinginClick}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={
                          errors.name
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="Enter your name"
                        onChange={onInputChange}
                        name="name"
                        value={state.name}
                      />
                      {/*----ERROR MESSAGE FOR NAME----*/}
                      {errors.name && (
                        <span>
                          {errors.name.map((error) => (
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
                    <div className="form-group">
                      <input
                        type="email"
                        className={
                          errors.email
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="Enter your email"
                        onChange={onInputChange}
                        name="email"
                        value={state.email}
                      />
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
                    <div className="form-group">
                      <input
                        type="password"
                        className={
                          errors.password
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="Enter your password"
                        onChange={onInputChange}
                        name="password"
                        value={state.password}
                      />
                      {/*----ERROR MESSAGE FOR PASSWORD----*/}
                      {errors.password && (
                        <span>
                          {errors.password.map((error) => (
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
                    <div className="form-group">
                      <input
                        type="password"
                        className={
                          errors.confirm_password
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="Enter repeat password"
                        onChange={onInputChange}
                        name="confirm_password"
                        value={state.confirm_password}
                      />
                      {/*----ERROR MESSAGE FOR PASSWORD----*/}
                      {errors.confirm_password && (
                        <span>
                          {errors.confirm_password.map((error) => (
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
                    {otpBox ? (
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
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="check"
                        name="term"
                        value={state.term}
                        onChange={(event) => {
                          setTerm(event.target.checked);
                        }}
                      />
                      <label className="form-check-label" htmlFor="check">
                        Accept all the <Link>Terms &amp; Conditions</Link>
                      </label>
                    </div>
                    {/*----ERROR MESSAGE FOR TERM----*/}

                    <span key={termEWr} className="text-danger font-size-3">
                      {termEWr}
                    </span>
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
                      ) : otpBox ? (
                        <button type="submit">register</button>
                      ) : (
                        <button type="submit">Send otp</button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <div className="user-form-remind">
                <p>
                  Already Have An Account?<Link to="/login">login here</Link>
                </p>
              </div>
              <div className="user-form-footer">
                <p>
                  Greeny | © Copyright by <Link>WE2CODE</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
