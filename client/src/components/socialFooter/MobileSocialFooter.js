import React from 'react';
import './social-footer.css';
import rightCloud from '../../assets/rightCloud.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';

const SocialFooter = ({ links, backgroundColor, color }) => {
  return (
    <div
      className="MobileSocial-footer" 
    >
      <h1 className="SocialFooterTxt">עקבו אחרינו</h1>
      <div className="MobileSocial-footer-icons">
        <div className="">
          <a
            className=""
            href="https://www.facebook.com/lifecloud.co.il/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="MobileHeart-icon" src={facebook} alt=""/>
          </a>
        </div>
        <div className="instagram-container">
          <a
            className=""
            href="https://www.instagram.com/lifecloud.co.il/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="MobileHeart-icon" src={instagram} alt="" />
          </a>
        </div>

      </div>
      <div style={{position:"absolute",width:"100%"}}>
        
      <img src={rightCloud} alt="" className="MobileRight-bottom-cloud"></img>
      </div>
    </div>
  );
};

export default SocialFooter;
