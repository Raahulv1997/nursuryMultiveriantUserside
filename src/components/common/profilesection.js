import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import user from "../../image/user.png"
import ProfileInfoModal from '../Modal/productInfo'
import { UserData } from '../api/api'
export default function Profilesection() {
    const [openProfileInfo, setOpenProfileInfo] = useState(false);
    const [data, setData] = useState("");
    /*Function to get user details */
    let GetUserData = async () => {
        let response = await UserData()
        console.log(response.data[0])
        setData(response.data[0])
    }
    useEffect(() => {
        GetUserData()
    }, [])

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
                                                    <img src={data.image ? data.image : user} alt="user"
                                                    /></Link>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label">Name </label>
                                                <p> {data.first_name}{data.last_name}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label">Email </label>
                                                <p>{data.email}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="profile-btn">
                                                <Link to="/changepassword" >change pass.</Link>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-2"></div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label">Phone Number</label>
                                                <p>{data.phone_no}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label">Address</label>
                                                <p>{data.address} , {data.city} {data.pincode}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {openProfileInfo ?
                <ProfileInfoModal
                    show={openProfileInfo}
                    close={() => setOpenProfileInfo(false)} />
                : null}
        </div>
    )
}
