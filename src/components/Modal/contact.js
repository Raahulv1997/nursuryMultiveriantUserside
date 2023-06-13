import React from 'react'
import { Modal } from "react-bootstrap"
export default function ContactModal(props) {
    return (
        <Modal show={props.show} close={props.close}><button className="modal-close icofont-close" data-bs-dismiss="modal" onClick={props.close}></button>
            <div>
                <form className="modal-form">
                    <div className="form-title">
                        <h3>add new contact</h3>
                    </div>
                    <div className="form-group">
                        <label className="form-label">title</label>
                        <select className="form-select">
                            <option selected="">choose title</option>
                            <option value="primary">primary</option>
                            <option value="secondary">secondary</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">number</label>
                        <input className="form-control" type="text" placeholder="Enter your number" />
                    </div>
                    <button className="form-btn" type="submit">save contact info</button>
                </form>
            </div>
        </Modal>
    )
}

