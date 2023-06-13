import React from 'react'
import { Modal } from "react-bootstrap"
export default function CardModal(props) {
    return (
        <Modal show={props.show} close={props.close}>
            <button className="modal-close" onClick={props.close}>
                <i className="icofont-close">
                </i>
            </button>
            <form className="modal-form">
                <div className="form-title">
                    <h3>add new payment</h3>
                </div>
                <div className="form-group">
                    <label className="form-label">card number</label>
                    <input className="form-control" type="text" placeholder="Enter your card number" />
                </div>
                <button className="form-btn" type="submit">save card info</button>
            </form>
        </Modal>
    )
}
