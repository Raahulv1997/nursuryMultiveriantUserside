import React, { useState } from 'react'
import user1 from "../../image/avatar/01.jpg"
import user2 from "../../image/avatar/02.jpg"
import user3 from "../../image/avatar/03.jpg"
import user4 from "../../image/avatar/04.jpg"
import videoimg from '../../image/video.jpg'
import { Link } from 'react-router-dom'
import { AddReview } from '../api/api'
export default function Productdescription() {
    const [activeTab, setActiveTab] = useState('tab-desc');

    /*Function to change the tab */
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    return (
        <div>
            <section className="inner-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="nav nav-tabs">
                                <li>
                                    <Link className={`tab-link ${activeTab === 'tab-desc' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('tab-desc')}>descriptions
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`tab-link ${activeTab === 'tab-spec' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('tab-spec')}>Specifications
                                    </Link>
                                </li>
                                <li>
                                    <Link className={`tab-link ${activeTab === 'tab-reve' ? 'active' : ''}`}
                                        onClick={() => handleTabClick('tab-reve')}>reviews (2)
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 'tab-desc' ? 'show active' : ''}`} id="tab-desc">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-details-frame">
                                    <div className="tab-descrip">
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae delectus natus quasi aperiam. Nulla perspiciatis ullam ipsa, magni animi eligendi quis mollitia dolor omnis alias ut aspernatur est voluptatem illo totam iste consequatur vitae laborum ipsam facilis! Ipsa, voluptatum neque dolor facere autem maiores pariatur, eveniet veritatis vero iure obcaecati
                                        </p>
                                        <ul>
                                            <li>Lorem ipsum dolor sit amet consectetur adipisicing.
                                            </li>
                                            <li>labore possimus architecto, saepe nobis ex mollitia
                                            </li>
                                            <li>mollitia soluta magni placeat. Eaque sit praesentium
                                            </li>
                                            <li>distinctio ab a exercitationem officiis labore possimus
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product-details-frame">
                                    <div className="tab-descrip">
                                        <img src={videoimg} alt="video" />
                                        <Link title="Product Video" className="venobox fas fa-play vbox-item" data-autoplay="true" data-vbtype="video">
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 'tab-spec' ? 'show active' : ''}`} id="tab-spec">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product-details-frame">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Product code
                                                </th>
                                                <td>SKU: 101783
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Weight
                                                </th>
                                                <td>1kg, 2kg
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Styles
                                                </th>
                                                <td>@Girly
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Properties
                                                </th>
                                                <td>Short Dress
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 'tab-reve' ? 'show active' : ''}`} id="tab-reve" >
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product-details-frame">
                                    <ul className="review-list">
                                        <li className="review-item">
                                            <div className="review-media">
                                                <Link className="review-avatar" >
                                                    <img src={user1} alt="review" />
                                                </Link>
                                                <h5 className="review-meta">
                                                    <Link >miron mahmud
                                                    </Link>
                                                    <span>June 02, 2020
                                                    </span>
                                                </h5>
                                            </div>
                                            <ul className="review-rating">
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rate-blank">
                                                </li>
                                            </ul>
                                            <p className="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!
                                            </p>
                                            <form className="review-reply">
                                                <input type="text" placeholder="reply your thoughts" />
                                                <button>
                                                    <i className="icofont-reply">
                                                    </i>reply
                                                </button>
                                            </form>
                                            <ul className="review-reply-list">
                                                <li className="review-reply-item">
                                                    <div className="review-media">
                                                        <Link className="review-avatar" >
                                                            <img src={user2} alt="review" />
                                                        </Link>
                                                        <h5 className="review-meta">
                                                            <Link >labonno khan
                                                            </Link>
                                                            <span>
                                                                <b>author -
                                                                </b>June 02, 2020
                                                            </span>
                                                        </h5>
                                                    </div>
                                                    <p className="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!
                                                    </p>
                                                    <form className="review-reply">
                                                        <input type="text" placeholder="reply your thoughts" />
                                                        <button>
                                                            <i className="icofont-reply">
                                                            </i>reply
                                                        </button>
                                                    </form>
                                                </li>
                                                <li className="review-reply-item">
                                                    <div className="review-media">
                                                        <Link className="review-avatar" >
                                                            <img src={user3} alt="review" />
                                                        </Link>
                                                        <h5 className="review-meta">
                                                            <Link >tahmina bonny
                                                            </Link>
                                                            <span>June 02, 2020
                                                            </span>
                                                        </h5>
                                                    </div>
                                                    <p className="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!
                                                    </p>
                                                    <form className="review-reply">
                                                        <input type="text" placeholder="reply your thoughts" />
                                                        <button>
                                                            <i className="icofont-reply">
                                                            </i>reply
                                                        </button>
                                                    </form>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="review-item">
                                            <div className="review-media">
                                                <Link className="review-avatar" >
                                                    <img src={user4} alt="review" />
                                                </Link>
                                                <h5 className="review-meta">
                                                    <Link >shipu shikdar
                                                    </Link>
                                                    <span>June 02, 2020
                                                    </span>
                                                </h5>
                                            </div>
                                            <ul className="review-rating">
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rating">
                                                </li>
                                                <li className="icofont-ui-rate-blank">
                                                </li>
                                            </ul>
                                            <p className="review-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus hic amet qui velit, molestiae suscipit perferendis, autem doloremque blanditiis dolores nulla excepturi ea nobis!
                                            </p>
                                            <form className="review-reply">
                                                <input type="text" placeholder="reply your thoughts" />
                                                <button>
                                                    <i className="icofont-reply">
                                                    </i>reply
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product-details-frame">
                                    <h3 className="frame-title">add your review
                                    </h3>
                                    <form className="review-form">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="star-rating">
                                                    <input type="radio" name="rating" id="star-1" />
                                                    <label for="star-1">
                                                    </label>
                                                    <input type="radio" name="rating" id="star-2" />
                                                    <label for="star-2">
                                                    </label>
                                                    <input type="radio" name="rating" id="star-3" />
                                                    <label for="star-3">
                                                    </label>
                                                    <input type="radio" name="rating" id="star-4" />
                                                    <label for="star-4">
                                                    </label>
                                                    <input type="radio" name="rating" id="star-5" />
                                                    <label for="star-5">
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <textarea className="form-control" placeholder="Describe">
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <button className="btn btn-inline">
                                                    <i className="icofont-water-drop">
                                                    </i>
                                                    <span>drop your review
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


