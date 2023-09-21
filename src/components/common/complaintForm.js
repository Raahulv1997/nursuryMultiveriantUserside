import React from "react";
import useValidation from "../common/useValidation";
import { AddComplaint } from "../../components/api/api";
import { toast } from "react-toastify";

export default function ComplaintForm({
  oderList,
  setApicall,
  orderId,
  close,
  setLoading,
}) {
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  // COMPLAINT DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT

  const initialFormStateuser = {
    first_name: "",
    last_name: "",
    email: "",
    contect_no: "",
    order_id: orderId,
    description: "",
    subject: "",
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
          ? "Last name is required"
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
    contect_no: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "Mobile number is required"
          : value.length < 10
          ? "Mobile number should be of 10 digits"
          : value.length > 11
          ? "Mobile number should not be more than 11 digits"
          : "",
    ],
    description: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "description is required"
          : value.length < 5
          ? "description should have 5 or more letter"
          : null,
    ],
    order_id: [
      (value) => (value === "" || value === null ? "Order is required" : ""),
    ],
    subject: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "subject is required"
          : value.length < 5
          ? "subject should have 5 or more letter"
          : null,
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);

  /*Function to submit form */
  const OnComplaintClick = async (event) => {
    // setLoading(true);
    event.preventDefault();
    if (Token) {
      if (validate()) {
        setLoading(true);
        let response = await AddComplaint(state, headers);
        if (response.data.Message === "Complaint Added") {
          toast.success("Complaint added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setErrors("");
          setState(initialFormStateuser);
          setApicall(true);
          // close();
        }
      }
    } else {
      toast.success(
        "Please Log In, if you have queries related to your recent purchases.",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        }
      );
      setErrors("");
      setLoading(false);
      setState(initialFormStateuser);
      setApicall(true);
    }
  };
  return (
    <>
      <form className="contact-form" onSubmit={OnComplaintClick}>
        <h4>Drop Your Thoughts</h4>

        <div className="form-group">
          <div className="form-input-group">
            <input
              className={
                errors.first_name
                  ? "form-control border border-danger"
                  : "form-control"
              }
              name="first_name"
              onChange={onInputChange}
              value={"" || state.first_name}
              type="text"
              placeholder="Your Name"
            />
            <i className="icofont-user-alt-3"></i>
            {/*----ERROR MESSAGE FOR first_name----*/}
            {errors.first_name && (
              <span key={errors.first_name} className="text-danger font-size-3">
                {errors.first_name}
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-input-group">
            <input
              className={
                errors.last_name
                  ? "form-control border border-danger"
                  : "form-control"
              }
              name="last_name"
              onChange={onInputChange}
              value={"" || state.last_name}
              type="text"
              placeholder="Your Last Name"
            />
            <i className="icofont-user-alt-3"></i>
            {/*----ERROR MESSAGE FOR last_name----*/}
            {errors.last_name && (
              <span key={errors.last_name} className="text-danger font-size-3">
                {errors.last_name}
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-input-group">
            <input
              className={
                errors.contect_no
                  ? "form-control border border-danger"
                  : "form-control"
              }
              name="contect_no"
              //   onChange={onInputChange}
              onChange={(v) => {
                if (v.target.value.length <= 11) {
                  onInputChange(v);
                }
              }}
              value={"" || state.contect_no}
              type="number"
              placeholder="Your Contect no"
            />
            <i className="icofont-phone"></i>
            {/*----ERROR MESSAGE FOR email----*/}
            {errors.contect_no && (
              <span key={errors.contect_no} className="text-danger font-size-3">
                {errors.contect_no}
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-input-group">
            <input
              className={
                errors.email
                  ? "form-control border border-danger"
                  : "form-control"
              }
              name="email"
              onChange={onInputChange}
              value={"" || state.email}
              type="email"
              placeholder="Your Email"
            />
            <i className="icofont-email"></i>
            {/*----ERROR MESSAGE FOR email----*/}
            {errors.email && (
              <span key={errors.email} className="text-danger font-size-3">
                {errors.email}
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-input-group">
            <input
              className={
                errors.subject
                  ? "form-control border border-danger"
                  : "form-control"
              }
              name="subject"
              onChange={onInputChange}
              value={"" || state.subject}
              type="text"
              placeholder="Your Subject"
            />
            <i className="icofont-book-mark"></i>
            {/*----ERROR MESSAGE FOR subject----*/}
            {errors.subject && (
              <span key={errors.subject} className="text-danger font-size-3">
                {errors.subject}
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="form-input-group">
            <textarea
              className={
                errors.description
                  ? "form-control border border-danger"
                  : "form-control"
              }
              name="description"
              onChange={onInputChange}
              value={"" || state.description}
              placeholder="Your Message"
            ></textarea>
            <i className="icofont-paragraph"></i>
            {/*----ERROR MESSAGE FOR description----*/}
            {errors.description && (
              <span
                key={errors.description}
                className="text-danger font-size-3"
              >
                {errors.description}
              </span>
            )}
          </div>
        </div>
        <button type="submit" className="form-btn-group">
          <i className="fas fa-envelope"></i>
          <span>send message</span>
        </button>
      </form>
    </>
  );
}
