import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
const Footer = () => {
  return (
    <div className="footer container overflow-hidden">
      <div className="row g-4 align-items-center">
        <div className="col-6 col-lg-4 order-2 order-lg-1">
          <div className="footer-logo-container">
            <Link to="/">
              <img
                className="life-cloud-logo-img-home img-fluid"
                src={Logo}
                alt=""
              ></img>
            </Link>
          </div>
        </div>
        <div className="col-lg-4 order-1 order-lg-2">
          <div className="footer-links">
            <Link to="/qa">
              <span>Q&A</span>
            </Link>
            <span className="line-seperator">|</span>
            <Link to="/policy">
              <span>POLICY</span>
            </Link>
            <span className="line-seperator">|</span>
            <Link to="/about">
              <span>ABOUT</span>
            </Link>
            <span className="line-seperator">|</span>
            <Link to="/contact">
              <span>CONTACT</span>
            </Link>
          </div>
        </div>
        <div className="col-6 col-lg-4 order-2 order-lg-3">
          <p className="c-rights-reserved">
            (C) all rights reserved to lifecloud-qr.co.il
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
