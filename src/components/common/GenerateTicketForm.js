import React from "react";
import useValidation from "../common/useValidation";
import { AddComplaintFromOrder } from "../../components/api/api";
import { toast } from "react-toastify";

export default function GenerateTicketForm({
  oderList,
  setApicall,
  orderId,
  close,
  setLoading,
  from,
}) {
  let Token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    user_token: `${Token}`,
  };
  // COMPLAINT DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT
  console.log(from);
  const initialFormStateuser = {
    order_id: orderId,
    description: "",
    subject: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    description: [
      (value) =>
        value === "" || value === null || value.trim() === ""
          ? "description is required"
          : value.length < 5
          ? "description should have 5 or more letter"
          : null,
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
        let response = await AddComplaintFromOrder(state, headers);
        if (response.data.Message === "Complaint Added") {
          toast.success("Complaint added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setErrors("");
          setState(initialFormStateuser);
          setApicall(true);
          close();
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
              className={"form-control"}
              onChange={onInputChange}
              value={orderId}
              disabled
              type="text"
              placeholder="Order No."
            />
            <i className="icofont-book-mark"></i>
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
