import React from 'react';
import '../../components/socialFooter/social-footer.css';
import rightCloud from '../../assets/rightCloud.png';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';

const ProfileFooter = ({
  instagramUrl,
  facebookUrl,
  backgroundColor,
  color,
}) => {
  return (
    <div className="social-footer" style={{ backgroundColor, color }}>
      <h1>עקבו אחרינו</h1>
      <div className="icons-container social-footer-icons">
        {facebookUrl && (
          <div className="facebook-container social-footer-facebook">
            <a
              className="heart-div social-footer-icon"
              href={`${facebookUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="heart-icon" src={facebook} alt="facebook"></img>
            </a>
          </div>
        )}
        {instagramUrl && (
          <div className="instagram-container">
            <a
              className="heart-div social-footer-icon"
              href={`${instagramUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="heart-icon" src={instagram} alt="instagram" />
            </a>
          </div>
        )}
      </div>
      <img src={rightCloud} alt="" className="right-bottom-cloud"></img>
    </div>
  );
};

export default ProfileFooter;
