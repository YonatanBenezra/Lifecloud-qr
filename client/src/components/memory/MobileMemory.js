import React from 'react';
import './memory-page.css';
import BottomLeftCloud from '../../assets/bottom-left-cloud.png';
import TopRightCloud from '../../assets/top-right-cloud.png';
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import Arrow1 from '../../assets/Arrow1.png';
import moment from 'moment';
import MobileTopBar from '../../components/topbar/MobileTopbar';

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
}) => {
  const isUserAdmin = true;
  console.log(data)
  return (
    <div className="memory-page">
    <MobileTopBar/>
      <div className="single-memory-content-container">
        <div className="single-memory-subcontainer">
          <h1 className="single-memory-title ff txt">{profile.firstName} {profile.lastName} | {moment(data.createdAt).utc().format('YYYY-DD-MM')}</h1>{' '}
          {/* add the title prome profiledata memory with the memory index */}
          <div className='image-container'>
          <div style={{width:"100%",padding:"10px"}}>
            <img
              src={data.file ? `${process.env.REACT_APP_API_URL}/${data.file}` : `${tempMemoryImg}`}
              alt=""
              className="Mobilesingle-memory-img"
            ></img>
            </div>
            <div className="icons-container">
              <div className="memory-heart-container">
                <div className="heart-div">
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
              <div className="facebook-container">
                <div className="heart-div">
                  <img className="heart-icon" src={facebook} alt=""></img>
                </div>
              </div>
              <div className="instagram-container">
                <div className="heart-div">
                  <img className="heart-icon" src={instagram} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="comments-container" style={{marginTop:"40px"}}>
            <div className='subtitle-continer'>

          <p className="" style={{fontSize:"22px",fontFamily:"Alef"}}>{data.description || ''}</p>
              <h2 style={{fontSize:"35px"}}>תגובות</h2>
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
                    <p className="mobileCmtBtn">{moment(comment.date).utc().format('YYYY-DD-MM-HHHH')}</p>|
                    <p className="mobileCmtBtn">{`${data.firstName} ${data.lastName}`}</p>|
                    {/* <p>{comment.uploaderName}:</p> */}
                    <p className='comment-text mobileCmtBtn'>{comment.text}</p>
                  </span>
                  <span
                    className="mobileCmtBtn"
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
                className={!commenting && 'comment-btn memory-btn-hover mobileCmtBtn'}
              >
                {' '}
                ...הגב  {' '}
              </div>
              {commenting ? (
                <input
                  onChange={onhandleChangeComment}
                  placeholder="write comment"
                  style={{
                    direction: 'rtl'
                  }}
                  className='comment-input'
                />
              ) : (
                ''
              )}

              <div className="action-btns">
                <div
                  className="action-btn memory-btn-hover mobileCmtBtn"
                  onClick={() => handleComment(data)}
                  style={{ cursor: 'pointer' }}
                >
                  פרסם
                </div>
                <div
                  className="action-btn memory-btn-hover mobileCmtBtn"
                  onClick={() => setCommenting(!commenting)}
                  style={{ cursor: 'pointer' }}
                >
                  ביטול
                </div>
              </div>
              {isUserAdmin && (
                <div
                  className="dlt-comment-btn memory-btn-hover mobileCmtBtn"
                  onClick={() => handleDellMemory(data)}
                  style={{ cursor: 'pointer' }}
                >
                  מחק זיכרון
                </div>
              )}
            </div>
          </div>
        
        <h1 onClick={close} className="close-btn">
          <img alt="" className="left-arrow" src={Arrow1}/> חזרה
        </h1>
      </div>
      <img alt="" src={TopRightCloud} className="top-cloud"></img>
      <img src={BottomLeftCloud} className="bottom-cloud" alt=""></img>
    </div>
    </div>
  );
};

export default Memory;
