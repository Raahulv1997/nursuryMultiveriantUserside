import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import user from "../../image/user.png"
import ProfileInfoModal from '../Modal/productInfo'
import { UserData } from '../api/api'
export default function Profilesection({setGetName ,setLoading}) {
    const [openProfileInfo, setOpenProfileInfo] = useState(false);
    const [apicall, setApicall] = useState(false);
    const [data, setData] = useState("");
    let Token = localStorage.getItem("token")
    /*Function to get user details */
    let GetUserData = async () => {
        setLoading(true)
        let response = await UserData()
        if(response.data[0]){
            localStorage.setItem("username", response.data[0].first_name);
            localStorage.setItem("image", response.data[0].image);
            setData(response.data[0])
            setGetName(true)
            setLoading(false)
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0); 
         if( Token ){
        GetUserData()}
        if(apicall === true){
            setApicall(false)
        }
        // eslint-disable-next-line
    }, [apicall])

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
                                                    <img 
                                                    width={"75px"}
                                                    height={"75px"}
                                                    src={
                                                        data.image === undefined || data.image === null || data.image === "undefined" ?
                                                     user  : data.image
                                                    } alt={data.user_log}
                                                    />
                                                    </Link>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="form-group">
                                                <label className="form-label">Name </label>
                                                <p className='text-capitalize'> {data.first_name} {data.last_name}</p>
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
                                                <p className='text-capitalize'>{data.address} , {data.city} {data.pincode}</p>
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
                    close={() => setOpenProfileInfo(false)}
                    setApicall={setApicall}
                    setLoading={setLoading} />
                : null}
        </div>
    )
}
