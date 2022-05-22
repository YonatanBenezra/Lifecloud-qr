import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-logo-container'>
      <Link to="/">
        <img className="life-cloud-logo-img-home" src={Logo} alt=""></img>
      </Link>
      </div>
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
      <span className="c-rights-reserved">
        (C) all rights reserved to lifecloud-qr.co.il
      </span>
    </div>
  );
};
export default Footer;
