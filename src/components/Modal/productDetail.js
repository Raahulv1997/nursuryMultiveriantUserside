import React from 'react'
import { Modal } from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductDetailsBox from '../common/productDetailsBox';
export default function ProductDetailModal(props) {   
  return (
    <Modal show={props.show} >
      <button className="modal-close icofont-close" data-bs-dismiss="modal" onClick={props.close}></button>
      <div>
        <div className="product-view">
         <ProductDetailsBox  
         id={props.id}
          var={props.var}/>
        </div>
      </div>
    </Modal>
  );
}
