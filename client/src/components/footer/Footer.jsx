import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
const Footer = () => {
  return (
    <div>
    <div className="hidden md:block footer md:flex">
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
    <div className="md:hidden ">
      <div className="flex justify-center items-center space-x-2 txtColor p-2">
         <span>Q&A</span>
        <span className="">|</span>
        <span>POLICY</span>
        <span className="">|</span>
        <Link to="/about">
          <span>ABOUT</span>
        </Link>
        <span className="">|</span>
        <span>CONTACT</span>
      </div>

      <div className="flex items-center">
      <div className="w-32 h-10">
        <img src={Logo} className="w-full object-cover p-2"/>
        </div>
        <div className="text-sm txtColor">(C) all rights reserved to lifecloud-qr.co.il</div>
      </div>
    </div>
    </div>
  );
}
export default Footer;
