import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../image/logo.png"
import useValidation from '../components/common/useValidation'
import { UserLogin } from './api/api'
import { toast } from "react-toastify";

export default function Login() {
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()
    /*----USER LOGIN VALIDATION----*/
    const initialFormState = {
        email: "",
        password: "",
        creadintial:""
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
            setLoading(true)
            let response = await UserLogin(state)
            if (response.response === "successfully login") {
                localStorage.setItem("token", response.token);
                localStorage.setItem("userType", "user");
                toast.success("Logged In Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                })
                setLoading(false)
                setErrors("")
                navigate("/")
            }
            if (response.response === "creadintial not match") {
                setLoading(false)
                setErrors({ errors, creadintial: ["Incorrect username or password"] })
            }
        }
    }
    return (
        <div>
            <section className="user-form-part">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-12 col-lg-12 col-xl-10">
                            <div className="user-form-logo"><Link to="/">
                                <img src={logo} alt="logo" />
                            </Link>
                            </div><div className="user-form-card">
                                <div className="user-form-title"><h2>welcome!</h2>
                                    <p>Use your credentials to access</p>
                                </div>
                                <div className="user-form-group">
                                    <ul className="user-form-social">
                                        <li><Link className="facebook">
                                            <i className="fab fa-facebook-f">
                                            </i>login with facebook</Link>
                                        </li><li><Link className="twitter">
                                            <i className="fab fa-twitter">
                                            </i>login with twitter</Link>
                                        </li>
                                        <li>
                                            <Link className="google">
                                                <i className="fab fa-google">
                                                </i>login with google</Link>
                                        </li>
                                        <li>
                                            <Link className="instagram">
                                                <i className="fab fa-instagram">
                                                </i>login with instagram</Link>
                                        </li>
                                    </ul>
                                    <div className="user-form-divider"><p>or</p></div>
                                    <form className="user-form" onSubmit={onUserLoginClick}>
                                        <div className="form-group">
                                            <input type="email"
                                                value={state.email}
                                                className={
                                                    errors.email
                                                        ? "form-control border border-danger"
                                                        : "form-control"
                                                }
                                                onChange={onInputChange}
                                                placeholder="Enter your email"
                                                name="email" />
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
                                            <input type="password"
                                                value={state.password}
                                                className={
                                                    errors.password
                                                        ? "form-control border border-danger"
                                                        : "form-control"
                                                }
                                                name="password"
                                                onChange={onInputChange}
                                                placeholder="Enter your password" />
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
                                        <small className='text-danger'>{errors.creadintial}</small>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" value="" id="check" />
                                            <label className="form-check-label" htmlFor="check">Remember Me</label>
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
                                                <button type="submit">login</button>}
                                            <p>Forgot your password?<Link to="/reset">reset here</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div></div>
                            <div className="user-form-remind"><p>Don't have any account?<Link to={"/singin"}>register here</Link>
                            </p>
                            </div>
                            <div className="user-form-footer"><p>Greeny | © Copyright by <Link >Mironcoder</Link>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

