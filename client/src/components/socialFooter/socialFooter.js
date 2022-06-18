import React from 'react';
import './social-footer.css';
import rightCloud from '../../assets/rightCloud.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import LazyLoad from 'react-lazyload';

const SocialFooter = ({ backgroundColor, color }) => {
  return (
    <div
      className="social-footer"
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      <h1>עקבו אחרינו</h1>
      <div className="icons-container social-footer-icons">
        <div className="facebook-container social-footer-facebook">
          <a
            className="heart-div social-footer-icon"
            href={'https://www.facebook.com/lifecloud.co.il/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LazyLoad>
              <img className="heart-icon" src={facebook} alt="" />
            </LazyLoad>
          </a>
        </div>
        <div className="instagram-container">
          <a
            className="heart-div social-footer-icon"
            href={'https://www.instagram.com/lifecloud.co.il/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LazyLoad>
              <img className="heart-icon" src={instagram} alt="" />
            </LazyLoad>
          </a>
        </div>
      </div>
      <LazyLoad>
        <img src={rightCloud} alt="" className="right-bottom-cloud"></img>
      </LazyLoad>
    </div>
  );
};

export default SocialFooter;
