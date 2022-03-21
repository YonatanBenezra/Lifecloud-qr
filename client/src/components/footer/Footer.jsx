import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
const Footer = () => {
  return (
    <div className="footer">
      <img className="life-cloud-logo-img-home" src={Logo} alt=""></img>
      <div className="footer-links">
        <span>Q&A</span>
        <span className="line-seperator">|</span>
        <span>POLICY</span>
        <span className="line-seperator">|</span>
        <Link to="/about">
          <span>ABOUT</span>
        </Link>
        <span className="line-seperator">|</span>
        <span>CONTACT</span>
      </div>
      <span className="c-rights-reserved" >
        (C) all rights reserved to lifecloud-qr.co.il
      </span>
    </div>
  );
}
export default Footer;
