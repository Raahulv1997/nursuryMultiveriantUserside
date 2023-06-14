import React from "react";
import SliderImg from "../../image/profile-banner.jpg";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    //     <Carousel>
    //     <div className="banner-part slick-slide" style={{height:"100vh", background: `url(${banner}) center center no-repeat`, width: '1583px' }} data-slick-index="2" aria-hidden="true" tabIndex="-1">
    //       <div className="container">
    //         <div className="row">
    //           <div className="col-md-4 col-lg-6"></div>
    //           <div className="col-md-8 col-lg-6">
    //             <div className="banner-content text-white">
    //               <h1 className='text-white mt-5'>get your organic food with our dairy items.</h1>
    //               <p>Lorem ipsum dolor consectetur adipisicing elit modi consequatur eaque expedita porro necessitatibus eveniet voluptatum quis pariatur Laboriosam molestiae architecto excepturi</p>
    //               <div className="banner-btn">
    //                <Link className="btn btn-inline me-3" to="/shop" tabIndex="-1">
    //                   <i className="fas fa-shopping-basket"></i>
    //                   <span>shop now</span>
    //                </Link>
    //                <Link className="btn btn-outline" to="" tabIndex="-1">
    //                   <i className="icofont-sale-discount"></i>
    //                   <span>get offer</span>
    //                </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="banner-part slick-slide" style={{height:"100vh", background: `url(${banner}) center center no-repeat`, width: '1583px' }} data-slick-index="2" aria-hidden="true" tabIndex="-1">
    //       <div className="container">
    //         <div className="row">
    //           <div className="col-md-4 col-lg-6"></div>
    //           <div className="col-md-8 col-lg-6">
    //             <div className="banner-content text-white">
    //               <h1 className='text-white mt-5'>get your organic food with our dairy items.</h1>
    //               <p>Lorem ipsum dolor consectetur adipisicing elit modi consequatur eaque expedita porro necessitatibus eveniet voluptatum quis pariatur Laboriosam molestiae architecto excepturi</p>
    //               <div className="banner-btn">
    //                <Link className="btn btn-inline me-3" to="" tabIndex="-1">
    //                   <i className="fas fa-shopping-basket"></i>
    //                   <span>shop now</span>
    //                </Link>
    //                <Link className="btn btn-outline" to="" tabIndex="-1">
    //                   <i className="icofont-sale-discount"></i>
    //                   <span>get offer</span>
    //                </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="banner-part slick-slide" style={{height:"100vh", background: `url(${banner}) center center no-repeat`, width: '1583px' }} data-slick-index="2" aria-hidden="true" tabIndex="-1">
    //       <div className="container">
    //         <div className="row">
    //           <div className="col-md-4 col-lg-6"></div>
    //           <div className="col-md-8 col-lg-6">
    //             <div className="banner-content text-white">
    //               <h1 className='text-white mt-5'>get your organic food with our dairy items.</h1>
    //               <p>Lorem ipsum dolor consectetur adipisicing elit modi consequatur eaque expedita porro necessitatibus eveniet voluptatum quis pariatur Laboriosam molestiae architecto excepturi</p>
    //               <div className="banner-btn">
    //                <Link className="btn btn-inline me-3" to="" tabIndex="-1">
    //                   <i className="fas fa-shopping-basket"></i>
    //                   <span>shop now</span>
    //                </Link>
    //                <Link className="btn btn-outline" to="" tabIndex="-1">
    //                   <i className="icofont-sale-discount"></i>
    //                   <span>get offer</span>
    //                </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    // </Carousel>
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={SliderImg} alt="First slide" />
        <Carousel.Caption>
          <h3>First get your organic food with our dairy items</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <Link className="btn btn-inline me-3" to="" tabIndex="-1">
            <i className="fas fa-shopping-basket"></i>
            <span>shop now</span>
          </Link>
          <Link className="btn btn-outline" to="" tabIndex="-1">
            <i className="icofont-sale-discount"></i>
            <span>get offer</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={SliderImg} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second get your organic food with our dairy items</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Link className="btn btn-inline me-3" to="" tabIndex="-1">
            <i className="fas fa-shopping-basket"></i>
            <span>shop now</span>
          </Link>
          <Link className="btn btn-outline" to="" tabIndex="-1">
            <i className="icofont-sale-discount"></i>
            <span>get offer</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={SliderImg} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third get your organic food with our dairy items</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <Link className="btn btn-inline me-3" to="" tabIndex="-1">
            <i className="fas fa-shopping-basket"></i>
            <span>shop now</span>
          </Link>
          <Link className="btn btn-outline" to="" tabIndex="-1">
            <i className="icofont-sale-discount"></i>
            <span>get offer</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
