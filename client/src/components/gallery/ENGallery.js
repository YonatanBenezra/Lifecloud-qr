import React, { useState } from 'react';
import '../../pages/profile/profiledetails.css';
import { Link } from 'react-router-dom';
import { SRLWrapper } from 'simple-react-lightbox';

export const ENGallery = ({ profiledata, id }) => {
  return (
    <>
      <h1 className="gallery-title">Gallery</h1>
      <div className="imgs-container show-in-flex">
        <SRLWrapper>
          {profiledata.gallery.slice(0, 4).map((img, index) => {
            return (
              <>
                {index === 3 ? (
                  <Link to={`/gallery/${id}`}>
                    <div
                      className="gallery-img last-image"
                      style={{
                        backgroundImage: `${process.env.REACT_APP_API_URL}/${img}`,
                        width: '250px',
                        height: '250px',
                      }}
                    >
                      +
                    </div>
                  </Link>
                ) : (
                  <div className="gallery-img">
                    <a
                      href={`${
                        img
                          ? `${process.env.REACT_APP_API_URL}/${img}`
                          : 'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'
                      }`}
                    >
                      <img
                        className="image-gallery-section"
                        src={`${
                          img
                            ? `${process.env.REACT_APP_API_URL}/${img}`
                            : 'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg'
                        }`}
                        alt="gallery"
                      />
                    </a>
                  </div>
                )}
              </>
            );
          })}
        </SRLWrapper>
      </div>
    </>
  );
};
