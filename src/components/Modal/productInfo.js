import React from 'react'
import { Modal } from "react-bootstrap"
export default function ProfileInfoModal(props) {
    return (
        <Modal show={props.show} close={props.close}>
            <button className="modal-close icofont-close" data-bs-dismiss="modal" onClick={props.close}></button>
            <div>
                <form className="modal-form">
                    <div className="form-title">
                        <h3>edit profile info</h3>
                    </div>
                    <div className="form-group">
                        <label className="form-label">profile image</label>
                        <input className="form-control" type="file" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">name</label>
                        <input className="form-control" type="text" value="Miron Mahmud" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">email</label>
                        <input className="form-control" type="text" value="mironcoder@gmail.com" />
                    </div>
                    <button className="form-btn" type="submit">save profile info</button>
                </form>
            </div>
        </Modal>

    )
}

