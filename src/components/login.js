import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../image/logo.png";
import useValidation from "../components/common/useValidation";
import { UserLogin } from "./api/api";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let [facebook, setFacebook] = useState(false);
  /*Function to show hide password */
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const history = useLocation();
  const renderIcon = () => {
    if (state.password.length > 0) {
      return showPassword ? (
        <i className="fa fa-eye-slash"></i>
      ) : (
        <i className="fa fa-eye"></i>
      );
    }
    return null;
  };
  const navigate = useNavigate();
  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    password: "",
    creadintial: "",
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    email: [
      (value) =>
        value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    password: [(value) => (value === "" ? "Password is required" : null)],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, onInputChange, setErrors, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onUserLoginClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      let response = await UserLogin(state);
      if (response.response === "successfully login") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userType", "user");
        localStorage.setItem("temp", "no");
        localStorage.setItem("username", response.user_detaile.first_name);
        localStorage.setItem("image", response.user_detaile.image);
        localStorage.setItem("email", response.user_detaile.email);
        toast.success("Logged In Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setLoading(false);
        setErrors("");
        navigate("/", { replace: true });
        // navigate.replace("/");
        // history.replace("/");
        // navigate("/");
        //window.location.reload();
      }
      if (response.response === "creadintial not match") {
        setLoading(false);
        setErrors({ errors, creadintial: ["Incorrect username or password"] });
      }
      if (response.message === "Password is incorrect") {
        setLoading(false);
        setErrors({ errors, creadintial: ["Incorrect password"] });
      }
      if (response.response === "email not exists") {
        setLoading(false);
        setErrors({ errors, creadintial: ["Email not exists"] });
      }
    }
  };
  /*Function to login with google */
  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let data = await axios(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        //  if(data.data.email_verified === true){
        //   let res = await SocialLogin(data.data.sub,data.data.email,data.data.name,data.data.picture,"Google");
        //   console.log(res,);
        //   localStorage.setItem("token", res.token);
        //   localStorage.setItem("userType", "user");
        //   localStorage.setItem("employee_id", res.employee_id);
        //   localStorage.setItem("profile_photo", res.profile_photo);
        //   toast.success("Logged In Successfully", {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose: 1000,
        //   });
        //   props.close();
        //   navigate("/");
        //   window.location.reload();
        // }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  });
  /*Functiom to login with facebook */
  const responseFacebook = async (response) => {
    // if(response.graphDomain === "facebook"){
    //   let data = await SocialLogin(response.userID,response.email,response.name,response.picture.data.url,"Facebook");
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("userType", "user");
    //     localStorage.setItem("employee_id", data.employee_id);
    //     localStorage.setItem("profile_photo", data.profile_photo);
    //     toast.success("Logged In Successfully", {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 1000,
    //     });
    //     props.close();
    //     navigate("/");
    //     window.location.reload();
    //   }
  };
  return (
    <div>
      <section className="user-form-part">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
              <div className="user-form-logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="user-form-card">
                <div className="user-form-title">
                  <h2>welcome!</h2>
                  <p>Use your credentials to access</p>
                </div>
                <div className="user-form-group">
                  <ul className="user-form-social">
                    <li>
                      <Link
                        className="facebook"
                        onClick={() => setFacebook(true)}
                      >
                        <i className="fab fa-facebook-f"></i>login with Facebook
                      </Link>
                      {facebook ? (
                        <FacebookLogin
                          appId="276709614913655"
                          autoLoad
                          callback={responseFacebook}
                          fields="name,email,picture"
                          scope="public_profile,user_friends,email,user_actions.books"
                          className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                          render={(renderProps) => (
                            <button
                              onClick={renderProps.onClick}
                              className="d-none"
                            ></button>
                          )}
                        />
                      ) : null}
                    </li>

                    <li>
                      <Link className="twitter">
                        <i className="fab fa-twitter"></i>login with twitter
                      </Link>
                    </li>
                    <li>
                      <Link className="google" onClick={GoogleLogin}>
                        <i className="fab fa-google"></i>login with google
                      </Link>
                    </li>
                    <li>
                      <Link className="instagram">
                        <i className="fab fa-instagram"></i>login with instagram
                      </Link>
                    </li>
                  </ul>
                  <div className="user-form-divider">
                    <p>or</p>
                  </div>
                  <form className="user-form" onSubmit={onUserLoginClick}>
                    <div className="form-group">
                      <input
                        type="email"
                        value={state.email}
                        className={
                          errors.email
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        onChange={onInputChange}
                        placeholder="Enter your email"
                        name="email"
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
                      <div className="position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={state.password}
                          className={
                            errors.password
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          name="password"
                          onChange={onInputChange}
                          placeholder="Enter your password"
                        />
                        <span
                          className="password-icon"
                          onClick={toggleShowPassword}
                        >
                          {renderIcon()}
                        </span>
                      </div>
                      {/*----ERROR MESSAGE FOR EMAIL----*/}
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
                    <small className="text-danger">{errors.creadintial}</small>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="check"
                      />
                      <label className="form-check-label" htmlFor="check">
                        Remember Me
                      </label>
                    </div>
                    <div className="form-button">
                      {loading ? (
                        <button type="button" disabled>
                          <span
                            className="spinner-border spinner-border-sm "
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="sr-only">Loading...</span>
                        </button>
                      ) : (
                        <button type="submit">login</button>
                      )}
                      <p>
                        Forgot your password?<Link to="/reset">reset here</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <div className="user-form-remind">
                <p>
                  Don't have any account?
                  <Link to={"/singin"}>register here</Link>
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
