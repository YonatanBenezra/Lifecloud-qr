
import React, { useEffect, useState, useRef} from "react";
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
import  ChatRunner  from '../../pages/chat/ChatRunner';
import  ChatWindow  from '../../pages/chat2/ChatWindow';
import { ChatEngine } from 'react-chat-engine';
const Footer = () => {

  
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
      if (ref.current) {
        setSticky(ref.current.getBoundingClientRect().top <= 0);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', () => handleScroll);
      };
    }, []);

  

  return (
    <>
    <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
      <ChatWindow />
    </div>
    <div className="footer">
      <img src={Logo} alt=""></img>
      <div className="footer-links">
        <span>Q&A</span>
        <span>|</span>
        <span>POLICY</span>
        <span>|</span>
        <Link to="/about">
          <span>ABOUT</span>
        </Link>
        <span>|</span>
        <span>CONTACT</span>
      </div>
      <span className='copyRight'>
        (C) all rights reserved to lifecloud-qr.co.il
      </span>
    </div>


    
    </>
  );
};

export default Footer;