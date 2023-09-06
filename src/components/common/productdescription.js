import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { /*AddReview,*/ ReviewList } from "../api/api";
import moment from "moment/moment";
import ProductRating from "../common/productRating";
import ProductImage from "./product_image";

export default function Productdescription(props) {
  const [activeTab, setActiveTab] = useState("tab-spec");
  const [reviewListData, setReviewListData] = useState([]);

  /*Function to change the tab */
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  /*Function to get Review List */
  const GetReviewList = async () => {
    let response = await ReviewList(props.id);
    if (reviewListData.length === 0) {
      setReviewListData(response.data);
    }
  };

  /*Render method to get review list */
  useEffect(() => {
    GetReviewList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // console.log("des image--" + JSON.stringify(props.data.cover_image));
  return (
    <div>
      <section className="inner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-tabs">
                <li>
                  <Link
                    className={`tab-link ${
                      activeTab === "tab-spec" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab-spec")}
                  >
                    Specifications
                  </Link>
                </li>
                {reviewListData.length === 0 ? null : (
                  <li>
                    <Link
                      className={`tab-link ${
                        activeTab === "tab-reve" ? "active" : ""
                      }`}
                      onClick={() => handleTabClick("tab-reve")}
                    >
                      reviews ({reviewListData.length})
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div
            className={`tab-pane fade ${
              activeTab === "tab-spec" ? "show active" : ""
            }`}
            id="tab-spec"
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="product-details-frame">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row">Care and Instructions</th>
                        <td>{props.data.care_and_Instructions}</td>
                      </tr>
                      <tr>
                        <th scope="row">Benefits</th>
                        <td>{props.data.benefits}</td>
                      </tr>
                      {/* <tr>
                        <th scope="row">Styles</th>
                        <td>@Girly</td>
                      </tr>
                      <tr>
                        <th scope="row">Properties</th>
                        <td>Short Dress</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "tab-reve" ? "show active" : ""
            }`}
            id="tab-reve"
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="product-details-frame">
                  <ul className="review-list">
                    {(reviewListData || []).map((item, index) => {
                      return (
                        <li className="review-item" key={index}>
                          <div className="row">
                            <div className="review-media col">
                              <Link className="review-avatar">
                                {/* <img src={user4} alt="review" /> */}
                                <ProductImage />
                              </Link>
                              <h5 className="review-meta">
                                <Link>{item.user_name}</Link>
                                <span>
                                  {moment(item.review_date).format(
                                    "YYYY-MM-DD"
                                  )}
                                </span>
                              </h5>
                            </div>
                            <ul className="review-rating d-flex col">
                              <ProductRating rating={item.review_rating} />
                            </ul>
                          </div>
                          {/* <h5> {item.product_name}</h5> */}
                          <p className="review-desc">{item.comment}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* <div className="product-details-frame">
                  <h3 className="frame-title">add your review</h3>
                  <form className="review-form">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="star-rating">
                          <input type="radio" name="rating" id="star-1" />
                          <label htmlFor="star-1"></label>
                          <input type="radio" name="rating" id="star-2" />
                          <label htmlFor="star-2"></label>
                          <input type="radio" name="rating" id="star-3" />
                          <label htmlFor="star-3"></label>
                          <input type="radio" name="rating" id="star-4" />
                          <label htmlFor="star-4"></label>
                          <input type="radio" name="rating" id="star-5" />
                          <label htmlFor="star-5"></label>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Describe"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button className="btn btn-inline">
                          <i className="icofont-water-drop"></i>
                          <span>drop your review</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
