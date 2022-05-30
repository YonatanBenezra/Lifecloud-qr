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

import tempMemoryImg from '../../assets/tmpMemoryImg.jpg';
import { useParams, useLocation } from 'react-router-dom';
import { async } from '@firebase/util';
import { AuthContext } from '../../context/AuthContext';
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
  const [text, setText] = useState({ comments: [{ text: '' }] });

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
        setDelComment(res);
        if (res) {
          getMemoryData();
          setCommenting(false);
          setComment(res);
          history.push(`/userprofiles/${profile.originaluser[0]?._id}`);
          setMessage('delete successfully!');
          // setOpen(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const location = useLocation();
const deleteButton = (profile?.originalUser?.[0]?._id === user?._id ||
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
  );
  return (
    <div className="memory-page">
      <div className="single-memory-content-container">
        <div className="single-memory-subcontainer">
          <h1 className="single-memory-title">
            {profile.firstName} {profile.lastName} |{' '}
            {moment(memory.createdAt).utc().format('DD-MM-YYYY')}
          </h1>{' '}
          {/* add the title prome profiledata memory with the memory index */}
          <div className="image-container">
            {memory.file ? (
              <img
                src={
                  memory.file
                    ? `${process.env.REACT_APP_API_URL}/${memory.file}`
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
                    memory?.memoryVideo &&
                    `${process.env.REACT_APP_API_URL}/${memory?.memoryVideo}`
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
                  onClick={() => handleLike(memory)}
                ></img>
                {memory.likes?.length}
              </div>
            </div>
            <div className="facebook-container icon">
              <FacebookShareButton
                url={`https://lifecloud-qr.com${location.pathname}`}
              >
                <div className="heart-div">
                  <img className="heart-icon" src={facebook} alt=""></img>
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
                  <img className="heart-icon" src={whatsapp} alt=""></img>
                </div>
              </WhatsappShareButton>
            </div>
          </div>
          <p className="single-memory-text">{memory.description || ''}</p>
          <div className="comments-container">
            <div className="subtitle-continer">
              <h2>תגובות</h2>
            </div>
            {memory.comments?.map((comment, index) => {
              return (
                <div className="comment-container">
                  <span className="comment-subcontainer">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${memory.file}`}
                      alt=""
                      className="comment-img"
                    />
                    <p>
                      {moment(comment.date).utc().format('DD-MM-YYYY-HHHH')}
                    </p>
                    |<p>{`${memory.firstName} ${memory.lastName}`}</p>|
                    {/* <p>{comment.uploaderName}:</p> */}
                    <p className="comment-text">{comment.text}</p>
                  </span>
                  {(profile?.originalUser[0]?._id === user?._id ||
                    profile?.addAdmins.find(
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

              {deleteButton}
            </div>
          </div>
          {/* <h1 onClick={close} className="close-btn">
            <img alt="" className="left-arrow" src={Arrow1} /> חזרה
          </h1> */}
        </div>
        <img alt="" src={TopRightCloud} className="top-cloud"></img>
        <img src={BottomLeftCloud} className="bottom-cloud" alt=""></img>
      </div>
    </div>
  );
};

export default Memory;
