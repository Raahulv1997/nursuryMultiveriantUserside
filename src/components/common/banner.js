import React from 'react';
import banner from "../../image/banner.jpg"
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
  return (
    <Carousel>
    <div className="banner-part slick-slide" style={{height:"100vh", background: `url(${banner}) center center no-repeat`, width: '1583px' }} data-slick-index="2" aria-hidden="true" tabIndex="-1">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-6"></div>
          <div className="col-md-8 col-lg-6">
            <div className="banner-content text-white">
              <h1 className='text-white mt-5'>get your organic food with our dairy items.</h1>
              <p>Lorem ipsum dolor consectetur adipisicing elit modi consequatur eaque expedita porro necessitatibus eveniet voluptatum quis pariatur Laboriosam molestiae architecto excepturi</p>
              <div className="banner-btn">
               <Link className="btn btn-inline me-3" to="/shop" tabIndex="-1">
                  <i className="fas fa-shopping-basket"></i>
                  <span>shop now</span>
               </Link>
               <Link className="btn btn-outline" to="" tabIndex="-1">
                  <i className="icofont-sale-discount"></i>
                  <span>get offer</span>
               </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="banner-part slick-slide" style={{height:"100vh", background: `url(${banner}) center center no-repeat`, width: '1583px' }} data-slick-index="2" aria-hidden="true" tabIndex="-1">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-6"></div>
          <div className="col-md-8 col-lg-6">
            <div className="banner-content text-white">
              <h1 className='text-white mt-5'>get your organic food with our dairy items.</h1>
              <p>Lorem ipsum dolor consectetur adipisicing elit modi consequatur eaque expedita porro necessitatibus eveniet voluptatum quis pariatur Laboriosam molestiae architecto excepturi</p>
              <div className="banner-btn">
               <Link className="btn btn-inline me-3" to="" tabIndex="-1">
                  <i className="fas fa-shopping-basket"></i>
                  <span>shop now</span>
               </Link>
               <Link className="btn btn-outline" to="" tabIndex="-1">
                  <i className="icofont-sale-discount"></i>
                  <span>get offer</span>
               </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="banner-part slick-slide" style={{height:"100vh", background: `url(${banner}) center center no-repeat`, width: '1583px' }} data-slick-index="2" aria-hidden="true" tabIndex="-1">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-6"></div>
          <div className="col-md-8 col-lg-6">
            <div className="banner-content text-white">
              <h1 className='text-white mt-5'>get your organic food with our dairy items.</h1>
              <p>Lorem ipsum dolor consectetur adipisicing elit modi consequatur eaque expedita porro necessitatibus eveniet voluptatum quis pariatur Laboriosam molestiae architecto excepturi</p>
              <div className="banner-btn">
               <Link className="btn btn-inline me-3" to="" tabIndex="-1">
                  <i className="fas fa-shopping-basket"></i>
                  <span>shop now</span>
               </Link>
               <Link className="btn btn-outline" to="" tabIndex="-1">
                  <i className="icofont-sale-discount"></i>
                  <span>get offer</span>
               </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</Carousel>
 
  );
};

export default Banner;

