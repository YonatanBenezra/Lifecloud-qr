import React, { useRef } from 'react';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import LazyLoad from 'react-lazyload';

const ProfileMedia = () => {
  const [showFacebookInput, setShowFacebookInput] = React.useState(false);
  const [showInstagramInput, setShowInstagramInput] = React.useState(false);
  const facebookUrlRef = useRef(null);
  const instagramUrlRef = useRef(null);
  return (
    <div style={{ marginTop: '65px' }}>
      <h1 className="text-center mb-5">Add Social Media</h1>
      <div className="container media_link_container">
        <div className="row text-center gy-5">
          <div className="col-sm-6">
            <button
              className="btn heart-div social-footer-icon mb-3"
              type="button"
              onClick={() => setShowFacebookInput((prev) => !prev)}
            >
              <LazyLoad>
                <img className="heart-icon" src={facebook} alt="" />
              </LazyLoad>
            </button>
            {showFacebookInput && (
              <input
                placeholder="facebook url"
                type="text"
                className="nameInput d-block w-100"
                ref={facebookUrlRef}
              />
            )}
          </div>
          <div className="col-sm-6">
            <button
              className="btn heart-div social-footer-icon  mb-3"
              type="button"
              onClick={() => setShowInstagramInput((prev) => !prev)}
            >
              <LazyLoad>
                <img className="heart-icon" src={instagram} alt="instagram" />
              </LazyLoad>
            </button>
            {showInstagramInput && (
              <input
                placeholder="instagram url"
                type="text"
                className="nameInput d-block w-100 w-100"
                ref={instagramUrlRef}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMedia;
