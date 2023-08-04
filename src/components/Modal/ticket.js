import React from 'react'
import { Modal } from 'react-bootstrap'
import ComplaintForm from '../common/complaintForm'
export default function TicketModal(props) {

    return (
        <Modal className='generate_ticket' show={props.show}>
            <div className="modal-content">
                <button className="modal-close" onClick={props.close}>
                    <i className="icofont-close"></i>
                </button>
                <ComplaintForm
                    orderId={props.order_id}
                    setApicall={props.setApicall}
                    close={props.close}
                    setLoading={props.setLoading} />
            </div>
        </Modal>)
}
