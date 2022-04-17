import React from 'react';
import './memory-page.css';
import BottomLeftCloud from '../../assets/bottom-left-cloud.png';
import TopRightCloud from '../../assets/top-right-cloud.png';
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import Arrow1 from '../../assets/Arrow1.png';
import moment from 'moment';

import tempMemoryImg from '../../assets/tmpMemoryImg.jpg';

const Memory = ({
  data,
  profiledata,
  close,
  handleLike,
  onhandleChangeComment,
  handleComment,
  commenting,
  setCommenting,
  handleDelete,
  handleDellMemory,
  profile,
  user
}) => {
  const isUserAdmin = true;
  console.log(data);
  return (
    <div className="memory-page">
      <div className="single-memory-content-container">
        <div className="single-memory-subcontainer">
          <h1 className="single-memory-title">
            {profile.firstName} {profile.lastName} |{' '}
            {moment(data.createdAt).utc().format('DD-MM-YYYY')}
          </h1>{' '}
          {/* add the title prome profiledata memory with the memory index */}
          <div className="image-container">
            {data.file ? (
              <img
                src={
                  data.file
                    ? `${process.env.REACT_APP_API_URL}/${data.file}`
                    : `${tempMemoryImg}`
                }
                alt=""
                className="single-memory-img"
              ></img>
            ) : (
              <video
                width="100%"
                height="100%"
                srl_video_thumbnail="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                srl_video_caption="A video with a rabbit"
                srl_video_muted="true"
                controls
                className="single-memory-img"
              >
                <source
                  src={
                    data?.memoryVideo &&
                    `${process.env.REACT_APP_API_URL}/${data?.memoryVideo}`
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          <div className="memory-icons-container">
            <div className="memory-heart-container">
              <div className="heart-div icon">
                <img
                  style={{ cursor: 'pointer' }}
                  className="heart-icon"
                  src={heart}
                  alt=""
                  onClick={() => handleLike(data)}
                ></img>
                {data.likes.length}
              </div>
            </div>
            <div className="facebook-container icon">
              <div className="heart-div">
                <img className="heart-icon" src={facebook} alt=""></img>
              </div>
            </div>
            <div className="instagram-container icon">
              <div className="heart-div">
                <img className="heart-icon" src={instagram} alt="" />
              </div>
            </div>
          </div>
          <p className="single-memory-text">{data.description || ''}</p>
          <div className="comments-container">
            <div className="subtitle-continer">
              <h2>תגובות</h2>
            </div>
            {data.comments.map((comment, index) => {
              return (
                <div className="comment-container">
                  <span className="comment-subcontainer">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${data.file}`}
                      alt=""
                      className="comment-img"
                    />
                    <p>
                      {moment(comment.date).utc().format('DD-MM-YYYY-HHHH')}
                    </p>
                    |<p>{`${data.firstName} ${data.lastName}`}</p>|
                    {/* <p>{comment.uploaderName}:</p> */}
                    <p className="comment-text">{comment.text}</p>
                  </span>
                  <span
                    className={`${
                      profiledata.originalUser[0]._id === user._id ||
                      profiledata.addAdmins.indexOf()
                      ? ''
                      : 'hidden'
                    }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(comment, data._id)}
                  >
                    - מחק
                  </span>
                </div>
              );
            })}
            <div className="action-btns-container">
              <div
                onClick={() => setCommenting(!commenting)}
                style={{ cursor: 'pointer' }}
                className={!commenting && 'comment-btn memory-btn-hover'}
              >
                {' '}
                ...הגב{' '}
              </div>
              {commenting ? (
                <input
                  onChange={onhandleChangeComment}
                  placeholder="write comment"
                  style={{
                    direction: 'rtl',
                  }}
                  className="comment-input"
                />
              ) : (
                ''
              )}

              <div className="action-btns">
                <div
                  className="action-btn memory-btn-hover"
                  onClick={() => handleComment(data)}
                  style={{ cursor: 'pointer' }}
                >
                  פרסם
                </div>
                <div
                  className="action-btn memory-btn-hover"
                  onClick={() => setCommenting(!commenting)}
                  style={{ cursor: 'pointer' }}
                >
                  ביטול
                </div>
              </div>
              <div
                className={`${
                  profiledata.originalUser[0]._id === user._id ||
                  profiledata.addAdmins.indexOf()
                  ? 'dlt-comment-btn memory-btn-hover'
                  : 'hidden'
                }`}
                onClick={() => handleDellMemory(data)}
                style={{ cursor: 'pointer' }}
              >
                מחק זיכרון
              </div>
            </div>
          </div>
          <h1 onClick={close} className="close-btn">
            <img alt="" className="left-arrow" src={Arrow1} /> חזרה
          </h1>
        </div>
        <img alt="" src={TopRightCloud} className="top-cloud"></img>
        <img src={BottomLeftCloud} className="bottom-cloud" alt=""></img>
      </div>
    </div>
  );
};

export default Memory;
