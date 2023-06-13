import React from 'react'
import { Modal } from "react-bootstrap"
export default function AddressModal(props) {
    return (
        <Modal show={props.show} close={props.close}>
            <div>
                    <button className="modal-close" onClick={props.close}>
                        <i className="icofont-close">
                        </i>
                    </button>
                    <form className="modal-form">
                        <div className="form-title">
                            <h3>add new address</h3>
                        </div>
                        <div className="form-group">
                            <label className="form-label">title</label>
                            <select className="form-select">
                                <option value="">choose title</option>
                                <option value="home">home</option>
                                <option value="office">office</option>
                                <option value="Bussiness">Bussiness</option>
                                <option value="academy">academy</option>
                                <option value="others">others</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">address</label>
                            <textarea className="form-control" placeholder="Enter your address">
                            </textarea>
                        </div>
                        <button className="form-btn" type="submit">save address info</button>
                    </form>
                </div>
        </Modal>
    )
}
