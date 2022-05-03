import React, { useState } from 'react';
import '../../pages/profile/profiledetails.css';
import { Link } from 'react-router-dom';
import { SRLWrapper } from 'simple-react-lightbox';

export const Gallery = ({ profiledata, id, userId }) => {
  return (
    <div className="gallery">
      <div className="profile-details-title">
        <h1>גלריה</h1>
      </div>

      <div className="imgs-container show-in-flex flex-wrap">
        <SRLWrapper>
          {profiledata.gallery &&
            profiledata.gallery.slice(0, 4).map((img, index) => {
              // console.log('profiledata.gallery index, img ', index, img)
              return (
                <div key={index}>
                  {index === 3 && profiledata?.originalUser[0]?._id === userId ? (
                    <Link to={`/editprofiles/${profiledata._id}`}>
                      <div className="gallery-img last-image">+</div>
                    </Link>
                  ) : (
                    <div className="gallery-img">
                      {!img.endsWith('mp4') ? (
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
                            alt=""
                          />
                        </a>
                      ) : (
                        <video
                          width="100%"
                          height="100%"
                          srl_video_thumbnail="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                          srl_video_caption="A video with a rabbit"
                          srl_video_muted="true"
                          controls
                          className="full-gallery-img"
                        >
                          <source
                            src={`${process.env.REACT_APP_API_URL}/${img}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </SRLWrapper>
      </div>
    </div>
  );
};
