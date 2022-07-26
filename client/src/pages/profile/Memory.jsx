import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
} from 'react-share';
import './memory-page.css';
import BottomLeftCloud from '../../assets/bottom-left-cloud.png';
import TopRightCloud from '../../assets/top-right-cloud.png';
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import whatsapp from '../../assets/wts.png';
import Arrow1 from '../../assets/Arrow1.png';
import moment from 'moment';
import axios from 'axios';
import { useHistory } from 'react-router';
import defaultVideoImg from '../../assets/video.jpg';
import tempMemoryImg from '../../assets/tmpMemoryImg.jpg';
import { useParams, useLocation } from 'react-router-dom';
import { async } from '@firebase/util';
import { AuthContext } from '../../context/AuthContext';
import LazyLoad from 'react-lazyload';
import ReactPlayer from 'react-player';

// ${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/:id
// ${process.env.REACT_APP_API_URL}/api/memory/getSingleMemory/:id
const Memory = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [memory, setMemory] = useState({});
  const [likeMessage, setLikeMessage] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [DellComment, setDelComment] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState();
  const [text, setText] = useState({
    comments: [{ text: '', userPicture: '', userName: '' }],
  });

  const { profileId, memoryId } = useParams();
  const history = useHistory();
  useEffect(() => {
    async function getProfileData() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${profileId}`
      );
      setProfile(response.data);
    }

    getProfileData();
  }, [profileId]);
  const getMemoryData = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/memory/getSingleMemory/${memoryId}`
    );
    setMemory(response.data);
  }, [memoryId]);
  useEffect(() => {
    getMemoryData();
  }, [getMemoryData, memoryId]);
  const handleLike = (e) => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/api/memory/like/${e._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem('user'))._id,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);

          if (res) {
            getMemoryData();
            setLikeMessage(res);
            // setMessage('like added successfully!')
            // setOpen(true)
          }
        });
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong!');
      setOpen(true);
    }
  };
  const handleDelete = (e, id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/memory/commentdell/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ comment: e }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setDelComment(res);
        if (res) {
          getMemoryData();
          setCommenting(false);
          setComment(res);
          // setMessage('like added successfully!')
          // setOpen(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onhandleChangeComment = (e) => {
    setText({
      comments: [
        {
          text: e.target.value,
          userPicture: user.mainProfilePicture
            ? user.mainProfilePicture
            : user.profilePicture
            ? user.profilePicture
            : 'avatar.png',
          username: user.firstName + ' ' + user.lastName,
        },
      ],
    });
  };
  const handleComment = (e) => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/api/memory/comment/${e._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(text),
      })
        .then((res) => {
          fetch(
            `${process.env.REACT_APP_API_URL}/api/notification/addnotifications`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'Application/json',
              },
              body: JSON.stringify({
                profileId: profileId,
                loggedInId: user._id,
              }),
            }
          );
          return res.json();
        })
        .then((res) => {
          if (res) {
            getMemoryData();
            setCommenting(false);
            setComment(res);
            // setMessage('like added successfully!')
            // setOpen(true)
          }
        });
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong!');
      setOpen(true);
    }
  };
  const handleDellMemory = (e) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/memory/commentdellOBJ/${e._id}`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setDelComment(res);
        if (res) {
          getMemoryData();
          setCommenting(false);
          setComment(res);
          history.replace(`/profiledetails/${profileId}`);
          setMessage('delete successfully!');
          // setOpen(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const location = useLocation();
  return (
    <div className="memory-page">
      <div className="single-memory-content-container">
        <div className="single-memory-subcontainer">
          <div className="d-flex justify-content-center my-4">
            <h1 onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
              חזרה
            </h1>
            <h1 className="single-memory-title mx-5">
              {profile.firstName} {profile.lastName} |{' '}
              {moment(memory.createdAt).utc().format('DD-MM-YYYY')}
            </h1>
          </div>
          {/* add the title prome profiledata memory with the memory index */}
          <div className="image-container">
            {memory?.file ? (
              <LazyLoad>
                <img
                  src={
                    memory?.file
                      ? memory?.file?.startsWith?.('http')
                        ? memory?.file
                        : `${process.env.REACT_APP_API_URL}/${memory?.file}`
                      : `${tempMemoryImg}`
                  }
                  alt=""
                  className="ratio ratio-16x memory_media"
                />
              </LazyLoad>
            ) : (
              memory?.memoryVideo && (
                // <video
                //   width="100%"
                //   height="100%"
                //   poster={defaultVideoImg}
                //   srl_video_thumbnail={defaultVideoImg}
                //   srl_video_caption="Memory Video"
                //   controls
                //   className="ratio ratio-16x memory_media"
                // >
                //   <source
                //     src={`${process.env.REACT_APP_API_URL}/${memory?.memoryVideo}`}
                //     type="video/mp4"
                //   />
                //   Your browser does not support the video tag.
                // </video>
                <ReactPlayer
                  url={
                    memory?.memoryVideo.startsWith('http')
                      ? memory?.memoryVideo
                      : `${process.env.REACT_APP_API_URL}/${memory?.memoryVideo}`
                  }
                  width="60vw"
                  height="60vh"
                  controls
                  className="mx-auto overflow-hidden"
                  style={{ borderRadius: '15px' }}
                />
              )
            )}
          </div>
          <div className="memory-icons-container">
            <div className="memory-heart-container">
              <div className="heart-div icon">
                <LazyLoad>
                  <img
                    style={{ cursor: 'pointer' }}
                    className="heart-icon"
                    src={heart}
                    alt=""
                    onClick={() => handleLike(memory)}
                  />
                </LazyLoad>

                {memory.likes?.length}
              </div>
            </div>
            <div className="facebook-container icon">
              <FacebookShareButton
                url={`https://lifecloud-qr.com${location.pathname}`}
              >
                <div className="heart-div">
                  <LazyLoad>
                    <img className="heart-icon" src={facebook} alt="" />
                  </LazyLoad>
                </div>
              </FacebookShareButton>
            </div>
            {/* <div className="instagram-container icon">
              <div className="heart-div">
                <img className="heart-icon" src={instagram} alt="" />
              </div>
            </div> */}
            <div className="facebook-container icon">
              <WhatsappShareButton
                url={`https://lifecloud-qr.com${location.pathname}`}
              >
                <div className="heart-div">
                  <LazyLoad>
                    <img className="heart-icon" src={whatsapp} alt="" />
                  </LazyLoad>
                </div>
              </WhatsappShareButton>
            </div>
          </div>
          <p className="single-memory-text">{memory.description || ''}</p>
          <div className="comments-container">
            <div className="subtitle-continer">
              <h2>תגובות</h2>
            </div>
            {memory?.comments?.map((comment, index) => {
              const userPic = comment?.userPicture?.startsWith('http')
                ? comment?.userPicture
                : `${process.env.REACT_APP_API_URL}/picUploader/${comment?.userPicture}`;
              return (
                <div className="comment-container">
                  <span className="comment-subcontainer">
                    <LazyLoad>
                      <img src={userPic} alt="" className="comment-img" />
                    </LazyLoad>
                    <p>{moment(comment.date).utc().format('DD-MM-YYYY')}</p>|
                    <p>{`${comment.username ? comment.username : ''}`}</p>|
                    {/* <p>{comment.uploaderName}:</p> */}
                    <p className="comment-text">{comment.text}</p>
                  </span>
                  {(profile?.originalUser?.[0]?._id === user?._id ||
                    profile?.addAdmins?.find(
                      (admins) => admins?.user?.[0]?._id === user?._id
                    )) && (
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(comment, memory._id)}
                    >
                      - מחק
                    </span>
                  )}
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
                  onClick={() => handleComment(memory)}
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

              {(profile?.originalUser?.[0]?._id === user?._id ||
                profile?.addAdmins?.find(
                  (admins) => admins?.user?.[0]?._id === user?._id
                )) && (
                <div
                  className={`${'dlt-comment-btn memory-btn-hover'}`}
                  onClick={() => handleDellMemory(memory)}
                  style={{ cursor: 'pointer' }}
                >
                  מחק זיכרון
                </div>
              )}
            </div>
          </div>
          {/* <h1 onClick={close} className="close-btn">
            <img alt="" className="left-arrow" src={Arrow1} /> חזרה
          </h1> */}
        </div>
        <LazyLoad>
          <img alt="" src={TopRightCloud} className="top-cloud" />
        </LazyLoad>
        <LazyLoad>
          <img src={BottomLeftCloud} className="bottom-cloud" alt="" />
        </LazyLoad>
      </div>
    </div>
  );
};

export default Memory;
