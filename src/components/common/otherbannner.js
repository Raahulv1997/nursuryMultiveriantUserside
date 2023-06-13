import React from 'react'
import ProfileBanner from "../../image/profile-banner.jpg"
import { Link } from 'react-router-dom'
export default function Otherbannner(props) {
  return (
    <div>
     {/* Banner */}
                    <section className="inner-section single-banner" style={{ background: `url(${ProfileBanner}) no-repeat center` }}>
                <div className="container">
                    <h2>{props.heading}</h2>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {props.bread}</li>
                    </ol>
                </div>
            </section>
    </div>
  )
}
