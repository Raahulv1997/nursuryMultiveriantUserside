import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import user from "../../image/user.png"
import paypal from "../../image/payment/png/01.png"
import visa from "../../image/payment/png/02.png"
import debit from "../../image/payment/png/03.png"
import ProfileInfoModal from '../Modal/productInfo'
import ContactModal from '../Modal/contact'
import AddressModal from '../Modal/address'
import CardModal from '../Modal/card'
export default function Profilesection() {
    const [openProfileInfo, setOpenProfileInfo] = useState(false);
    const [openContactInfo, setOpenContactInfo] = useState(false);
    const [openAddress, setOpenAddress] = useState(false);
    const [openCard, setOpenCard] = useState(false);

    return (
        <div>
            <section className='inner-section profile-part'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>Your Profile</h4>
                                    <button onClick={() => setOpenProfileInfo(true)}>edit profile</button>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <div className="profile-image">
                                                <Link to="" onClick={() => setOpenProfileInfo(true)}>
                                                    <img src={user} alt="user"
                                                    /></Link>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label">name</label>
                                                <input className="form-control" type="text" value="" placeholder='user name' />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label">Email</label>
                                                <input className="form-control" type="email" value="" placeholder='email address' />
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="profile-btn">
                                                <Link to="/changepassword" >change pass.</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>contact number</h4>
                                    <button onClick={() => setOpenContactInfo(true)}>add contact</button></div><div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 alert fade show"><div className="profile-card contact active">
                                            <h6>primary</h6>
                                            <p>+8801838288389</p>
                                            <ul
                                            ><li>
                                                    <button className="edit icofont-edit" title="Edit This" onClick={() => setOpenContactInfo(true)}></button>
                                                </li><li><button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert"></button>
                                                </li>
                                            </ul>
                                        </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card contact"><h6>secondary</h6 ><p>+8801941101915</p>
                                                <ul>
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" onClick={() => setOpenContactInfo(true)}>
                                                        </button>
                                                    </li><li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show"><div className="profile-card contact">
                                            <h6>secondary</h6>
                                            <p>+8801747875727</p>
                                            <ul><li>
                                                <button className="edit icofont-edit" title="Edit This" onClick={() => setOpenContactInfo(true)}>
                                                </button></li>
                                                <li><button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert"></button>
                                                </li></ul>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card">
                                <div className="account-title">
                                    <h4>delivery address</h4>
                                    <button data-bs-toggle="modal" onClick={() => setOpenAddress(true)}>add address</button>
                                </div>
                                <div className="account-content">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card address active">
                                                <h6>Home</h6>
                                                <p>jalkuri, fatullah, narayanganj-1420. word no-09, road no-17/A</p>
                                                <ul className="user-action">
                                                    <li>
                                                        <button className="edit icofont-edit" title="Edit This" onClick={() => setOpenAddress(true)}>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show"><div className="profile-card address">
                                            <h6>Office</h6>
                                            <p>east tejturi bazar, dhaka-1200. word no-04, road no-13/c, house no-4/b</p>
                                            <ul className="user-action"><li>
                                                <button className="edit icofont-edit" title="Edit This" onClick={() => setOpenAddress(true)}>

                                                </button>
                                            </li>
                                                <li>
                                                    <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                    </button></li>
                                            </ul>
                                        </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4 alert fade show">
                                            <div className="profile-card address"><h6>Bussiness</h6>
                                                <p>kawran bazar, dhaka-1100. word no-02, road no-13/d, house no-7/m</p><ul className="user-action"><li><button className="edit icofont-edit" title="Edit This" onClick={() => setOpenAddress(true)}>
                                                </button></li><li>
                                                        <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                                        </button></li></ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="account-card mb-0">
                                <div className="account-title"><h4>payment option</h4>
                                    <button onClick={() => setOpenCard(true)}>add card</button>
                                </div>
                                <div className="account-content"><div className="row">
                                    <div className="col-md-6 col-lg-4 alert fade show">
                                        <div className="payment-card payment active">
                                            <img src={paypal} alt="payment" />
                                            <h4>card number</h4><p>
                                                <span>****</span>
                                                <span>****</span>
                                                <span>****</span>
                                                <sup>1876</sup></p><h5>miron mahmud</h5>
                                            <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert"></button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 alert fade show">
                                        <div className="payment-card payment">
                                            <img src={visa} alt="payment" />
                                            <h4>card number</h4>
                                            <p>
                                                <span>****</span><span>****</span><span>****</span>
                                                <sup>1876</sup></p><h5>miron mahmud</h5>
                                            <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">

                                            </button>
                                        </div>
                                    </div><div className="col-md-6 col-lg-4 alert fade show">
                                        <div className="payment-card payment"
                                        ><img src={debit} alt="payment" /><h4>card number</h4>
                                            <p><span>****</span>
                                                <span>****</span>
                                                <span>****</span><sup>1876</sup>
                                            </p><h5>miron mahmud</h5>
                                            <button className="trash icofont-ui-delete" title="Remove This" data-bs-dismiss="alert">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {openContactInfo ?
                <ContactModal
                    show={openContactInfo}
                    close={() => setOpenContactInfo(false)} />
                : null}
            {openProfileInfo ?
                <ProfileInfoModal
                    show={openProfileInfo}
                    close={() => setOpenProfileInfo(false)} />
                : null}
            {openAddress ?
                <AddressModal
                    show={openAddress}
                    close={() => setOpenAddress(false)} />
                : null}
            {openCard ?
                <CardModal
                    show={openCard}
                    close={() => setOpenCard(false)} />
                : null}
        </div>
    )
}
