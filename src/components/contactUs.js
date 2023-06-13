import React from 'react'
import Header from './common/header'
import Footer from './common/footer'
import Otherbannner from './common/otherbannner'
import { Link } from 'react-router-dom'
import branch01 from "../image/branch/01.jpg" 
import branch02 from "../image/branch/02.jpg" 
import branch03 from "../image/branch/03.jpg" 
import branch04 from "../image/branch/04.jpg" 
export default function ContactUs() {
    return (
        <div>
            {/* header */}
            <Header />
            {/* Banner */}
            <Otherbannner heading={"Contact us"} bread={"contact"} />
            {/* Main Section */}
            <section className="inner-section contact-part">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="contact-card"><i className="icofont-location-pin"></i>
                                <h4>head office</h4>
                                <p>1Hd- 50, 010 Avenue, NY 90001 United States</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="contact-card active"><i className="icofont-phone"></i>
                                <h4>phone number</h4>
                                <p><Link to="" >009-215-5596 <span>(toll free)</span></Link><Link to="" >009-215-5595</Link></p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="contact-card"><i className="icofont-email"></i>
                                <h4>Support mail</h4>
                                <p><Link to="" >contact@example.com</Link><Link to="" >info@example.com</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="contact-map"><iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.3406974350205!2d90.48469931445422!3d23.663771197998262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b0d5983f048d%3A0x754f30c82bcad3cd!2sJalkuri%20Bus%20Stop!5e0!3m2!1sen!2sbd!4v1605354966349!5m2!1sen!2sbd" aria-hidden="false" tabindex="0"></iframe></div>
                        </div>
                        <div className="col-lg-6">
                            <form className="contact-form">
                                <h4>Drop Your Thoughts</h4>
                                <div className="form-group">
                                    <div className="form-input-group"><input className="form-control" type="text" placeholder="Your Name" /><i className="icofont-user-alt-3"></i></div>
                                </div>
                                <div className="form-group">
                                    <div className="form-input-group"><input className="form-control" type="text" placeholder="Your Email" /><i className="icofont-email"></i></div>
                                </div>
                                <div className="form-group">
                                    <div className="form-input-group"><input className="form-control" type="text" placeholder="Your Subject" /><i className="icofont-book-mark"></i></div>
                                </div>
                                <div className="form-group">
                                    <div className="form-input-group"><textarea className="form-control" placeholder="Your Message"></textarea><i className="icofont-paragraph"></i></div>
                                </div><button type="submit" className="form-btn-group"><i className="fas fa-envelope"></i><span>send
                                    message</span></button>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="branch-card"><img src={branch01} alt="branch" />
                                <div className="branch-overlay">
                                    <h3>dhaka</h3>
                                    <p>kawran bazar, 1100 east tejgaon, dhaka.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="branch-card"><img src={branch02} alt="branch" />
                                <div className="branch-overlay">
                                    <h3>Narayanganj</h3>
                                    <p>west jalkuri, 1420 shiddirganj, narayanganj.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="branch-card"><img src={branch03} alt="branch" />
                                <div className="branch-overlay">
                                    <h3>chandpur</h3>
                                    <p>east lautuli, 2344 faridganj, chandpur.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3">
                            <div className="branch-card"><img src={branch04} alt="branch" />
                                <div className="branch-overlay">
                                    <h3>noakhli</h3>
                                    <p>begumganj, 3737 shonaimuri, noakhli.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    )
}

