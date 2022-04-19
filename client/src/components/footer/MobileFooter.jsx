import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
const Footer = () => {
  return (
    <div className="">
    <div className="footerLink">
        <Link to="/qa">
          <span className="linePadding">Q&A</span>
        </Link>
        <span className="line-seperator">|</span>
        <Link to="/policy">
          <span className="linePadding">POLICY</span>
        </Link>
        <span className="line-seperator">|</span>
        <Link to="/about">
          <span className="linePadding">ABOUT</span>
        </Link>
        <span className="line-seperator">|</span>
        <Link to="/contact">
          <span className="linePadding">CONTACT</span>
        </Link>
      </div>
      <div className="footerBottom">
      <Link to="/">
        <img className="footerBottomImg" src={Logo} alt=""></img>
      </Link>
      
      <span className="c-rights-reserved txtColor">
        (C) all rights reserved to lifecloud-qr.co.il
      </span>
      </div>
    </div>
  );
};
export default Footer;
