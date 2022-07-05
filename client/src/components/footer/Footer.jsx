import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
import LazyLoad from 'react-lazyload';
const Footer = () => {
  return (
    <div className="footer container overflow-hidden">
      <div className="row g-4 align-items-center">
        <div className="col-6 col-lg-4 order-2 order-lg-1">
          <div className="footer-logo-container">
            <Link to="/">
              <LazyLoad>
                <img
                  className="life-cloud-logo-img-home img-fluid"
                  src={Logo}
                  alt=""
                />
              </LazyLoad>
            </Link>
          </div>
        </div>
        <div className="col-lg-4 order-1 order-lg-2">
          <div className="footer-links">
            <Link to="/policy">
              <span>מדיניות פרטיות</span>
            </Link>
            <span className="line-seperator">|</span>
            <Link to="/">
              <span>תנאי שימוש</span>
            </Link>
            <span className="line-seperator">|</span>
            <Link to="/about">
              <span>אודות</span>
            </Link>
            <span className="line-seperator">|</span>
            <Link to="/qa">
              <span>שאלות ותשובות</span>
            </Link>
             <span className="line-seperator">|</span>
              <Link to="/contact-us">
              <span>צור קשר</span>
            </Link>
             <span className=" line-seperator">|</span>
              <Link to="/abort-purchase">
              <span>בקשה לביטול עסקה</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
