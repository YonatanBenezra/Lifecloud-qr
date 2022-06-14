import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import waze from '../../assets/waze.png';
import zoom from '../../assets/zoom.png';
import google from '../../assets/google.png';
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import leftCloud from '../../assets/left-bottom-white-cloud.png';
import arrowRightLong from '../../assets/Arrow_right_long.png';
import { Link } from 'react-router-dom';
import './profiledetails.css';
import TopBar from '../../components/topbar/Topbar';
import ProgressBar from '../../components/progressbar/progressBar';
import { Gallery } from '../../components/gallery/gallery';
import { useParams, useLocation } from 'react-router';
import Memory from '../../components/memory/Memory';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router';
import SnackBar from '../../components/snackbar/SnackBar';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import FriendsList from '../../components/friendsList/friendsList';
// import { useParams } from 'react-router-dom';
import { SRLWrapper } from 'simple-react-lightbox';
import useGeoLocation from '../../hooks/useGeoLocation';
import GraveMap from './GraveMap';
import { QRCodeSVG } from 'qrcode.react';
import moment from 'moment';

import Map from './Map';
import Direction from './Direction';
import ProfileFooter from './ProfileFooter';
import defaultVideoImg from '../../assets/video.jpg';
import CandleFlower from './CandleFlower';

export default function Profile() {
  const { user, myFirebase } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      myFirebase.setRedirectPath(location.pathname);
      history.replace('/login');
    } else {
      myFirebase.setRedirectPath(null);
    }
  }, [history, location.pathname, myFirebase]);

  const [profiledata, setProfileData] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const [memoryData, setmemoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState({ comments: [{ text: '' }] });
  const [show, setShow] = useState('wall');
  const [likeMessage, setLikeMessage] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState();
  const [DellComment, setDelComment] = useState('');
  const [friendFlagReq, setrfriendReq] = useState([]);
  const [adminFlagReq, setAdminres] = useState([]);
  const profileId = useParams().id;
  const [memoryCount, setMemoryCount] = useState(3);
  const [users, setUsers] = useState([]);
  const [hebMemorialDate, setHebMemorialDate] = useState('');
  const [yPos, setYPos] = useState(50);

  const sendNotification = useCallback(
    (notificationType) => {
      if (profiledata?.originalUser?.[0]?._id === user?._id) {
        return;
      }
      if (!profiledata?.originalUser?.[0]?._id || !user?._id) {
        return;
      }
      fetch(
        `${process.env.REACT_APP_API_URL}/api/notification/addnotifications`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify({
            profileId: profiledata._id,
            loggedInId: user?._id,
            notificationType,
          }),
        }
      );
    },
    [profiledata._id, profiledata.originalUser, user?._id]
  );
  const handleAddFriendRequest = (e) => {
    // setuserid(e)

    fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/addFriendRequests/${profiledata._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          isFriend: false,
          userId: user?._id,
          // profileImg: user.mainProfilePicture,
          // firstName: profiledata.firstName,
          // lastName: profiledata.lastName,

          // userId: e._id,
          // user: e.user[0]?._id,
          user: user?._id,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/notification/sendNotificationEmail`,
          {
            profileName: `${profiledata.firstName} ${profiledata.lastName}`,
            email: profiledata.originalUser[0].email,
            userName: `${user.firstName} ${user.lastName}`,
          }
        );
        setrfriendReq(res);
      })
      .catch((err) => {
        console.log(err);
      });
    sendNotification('friendRequest');
  };

  const handleShowMoreMemories = () => {
    setMemoryCount(memoryCount + 3);
  };
  const fetchuserprofiles = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${profileId}`
      );
      if (res.data.googleLocation) {
        res.data.googleLocation = JSON.parse(res.data.googleLocation);
      }

      const death = new Date(profiledata?.deathDate);
      const date = death.getDate();
      const year = new Date().getFullYear();
      const month = death.getMonth();
      const response = await fetch(
        `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${
          month + 1
        }&gd=${date}&g2h=1`
      );
      const data = await response.json();

      setHebMemorialDate(data.hebrew);
      setYPos(res.data.objectYPos);
      setProfileData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [profileId, profiledata?.deathDate]);
  const fetchmemories = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/memory/getallmemory/${profileId}`
    );
    setmemoryData(res.data);
  }, [profileId]);
  useEffect(() => {
    setCommenting('');
    setComment('');
    setLikeMessage('');
  }, [likeMessage, comment, DellComment, friendFlagReq, adminFlagReq]);
  useEffect(() => {
    fetchuserprofiles();
  }, [friendFlagReq, adminFlagReq, fetchuserprofiles]);
  useEffect(() => {
    fetchmemories();
  }, [comment, fetchmemories, likeMessage]);

  const fetchUsers = async () => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/all/every`);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/getSingleUser/${profiledata.originaluser[0]?._id}`
    );
    setUsers(res.data);
  };
  useEffect(() => {
    fetchmemories();
  }, [comment, fetchmemories, likeMessage]);
  let parseAxios = Object.keys(profiledata).length
    ? profiledata.lifeAxis && JSON.parse(profiledata.lifeAxis)
    : '';
  profiledata?.axisImages?.forEach((element, i) => {
    if (parseAxios[i]) {
      parseAxios[i].axisImage = element;
    }
  });
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

  //
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

  //

  const onhandleChangeComment = (e) => {
    setText({
      comments: [
        {
          text: e.target.value,
        },
      ],
    });
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
          setCommenting(false);
          setComment(res);
          history.push(`/userprofiles/${profiledata.originaluser[0]?._id}`);
          setMessage('delete successfully!');
          // setOpen(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  var options = {
    weekday: 'long', //to display the full name of the day, you can use short to indicate an abbreviation of the day
    day: 'numeric',
    month: 'long', //to display the full name of the month
    year: 'numeric',
  };

  const [map, setMap] = useState(false);
  // const { location, getGeoLocation } = useGeoLocation();
  // useEffect(() => {
  //   getGeoLocation();
  // }, [getGeoLocation]);
  // console.log(profiledata);

  useEffect(() => {
    sendNotification('profileVisit');
  }, [sendNotification]);

  const handleObjectPos = (what) => {
    if (yPos <= 90 && what === 'up') {
      setYPos(yPos + 10);
    } else if (yPos >= 10 && what === 'down') {
      setYPos(yPos - 10);
    }
    axios.patch(
      `${process.env.REACT_APP_API_URL}/api/profile/updateObjectYPos/${profileId}`,
      {
        objectYPos: yPos,
      }
    );
  };
  const handleDeleteFriend = (userId) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/removeFriend/${profileId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ userId }),
      }
    )
      .then(fetchuserprofiles)
      .catch(console.log);
  };
  const handleRemoveFriendRequest = (userId) => {
    handleDeleteFriend(userId);
    fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/removeFriendRequest/${profileId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ userId }),
      }
    )
      .then(fetchuserprofiles)
      .catch(console.log);
  };

  if (Object.keys(profiledata).length > 0) {
    return (
      <div className="profile-details">
        <TopBar />
        <div
          className="modal fade qr-modal"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  QRסרוק את ה
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body text-center">
                <QRCodeSVG value={window.location.href} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  סגור
                </button>
                <a
                  href={`https://api.whatsapp.com/send/?text=https://lifecloud-qr.com${location.pathname}`}
                  type="button"
                  className="btn btn-success"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  שתף בוואטסאפ
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${profiledata.wallImg}`}
            alt=""
            className="profile-cover"
            style={{ objectPosition: `0 ${yPos}%` }}
          ></img>
          {user &&
            (profiledata?.originalUser[0]?._id === user?._id ||
              profiledata?.addAdmins.find(
                (admins) => admins?.user[0]?._id === user?._id
              )) && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <button
                  onClick={() => handleObjectPos('up')}
                  className="navigation-btn up_down_btn"
                >
                  ➕
                </button>
                <button
                  onClick={() => handleObjectPos('down')}
                  className="navigation-btn up_down_btn"
                >
                  ➖
                </button>
              </div>
            )}
          <CandleFlower profileId={profiledata._id} userId={user._id} />
        </div>
        <div className="profile-details-first">
          <img
            src={`${process.env.REACT_APP_API_URL}/${profiledata.profileImg}`}
            alt=""
            className="profile-img"
          ></img>
          <div className="deceased-details">
            <h1 className="profile-h1">{`${profiledata?.degree} ${profiledata?.firstName} ${profiledata?.lastName}`}</h1>
            <div>
              <p>
                {profiledata?.deathDate &&
                  moment(profiledata?.deathDate).format('DD-MM-YYYY')}{' '}
                -{' '}
                {profiledata?.birthDate &&
                  moment(profiledata?.birthDate).format('DD-MM-YYYY')}
              </p>
              <p>{profiledata?.city}</p>
            </div>
          </div>
          <img src={leftCloud} alt="" className="left-cloud" />
        </div>
        <div className="btns-container">
          <div className="small-btns-container">
            <Link
              className={`${
                profiledata?.originalUser[0]?._id === user?._id ||
                profiledata?.addAdmins.indexOf()
                  ? 'small-btns-container'
                  : 'hidden'
              }`}
              to={`/editprofiles/${profileId}`}
            >
              {user &&
                (profiledata?.originalUser?.[0]?._id === user?._id ||
                  profiledata.addAdmins.find(
                    (admins) => admins.user[0]?._id === user?._id
                  )) && <div className="profile-small-btn">ערוך פרופיל</div>}
            </Link>
            <div
              className="profile-small-btn"
              onClick={() => setShow('friends')}
            >
              רשימת חברים
            </div>

            {profiledata?.originalUser[0]?._id !== user?._id &&
              !profiledata?.addAdmins.find(
                (admins) => admins?.user[0]?._id === user?._id
              ) &&
              (profiledata?.addFriends.find(
                (friends) => friends?.user[0]?._id === user?._id
              ) ? (
                <div
                  className={`${'profile-small-btn'}`}
                  onClick={() => handleRemoveFriendRequest(user?._id)}
                  style={{ cursor: 'pointer' }}
                >
                  הסר חברות
                </div>
              ) : profiledata?.friendRequests.find(
                  (friendRequest) => friendRequest.user[0]?._id === user?._id
                ) ? (
                <div
                  className={`${'profile-small-btn'}`}
                  style={{ cursor: 'pointer' }}
                >
                  בקשת חברות נשלחה
                </div>
              ) : (
                <div
                  className={`${'profile-small-btn'}`}
                  onClick={() => handleAddFriendRequest()}
                  style={{ cursor: 'pointer' }}
                >
                  בקשת חברות
                </div>
              ))}
          </div>
          <div className="big-btns-container">
            <div
              type="button"
              className="profile-big-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              שתף פרופיל
            </div>
            <div
              onClick={() => setShow('bio')}
              className={`profile-big-btn ${show === 'bio' && 'active'}`}
            >
              סיפור חיים
            </div>
            <div
              onClick={() => setShow('wall')}
              className={`${show === 'wall' && 'active'} profile-big-btn`}
            >
              Wall
              {profiledata.privacy === 'private' &&
                !(
                  profiledata?.originalUser[0]?._id === user?._id ||
                  profiledata?.addAdmins.find(
                    (admins) => admins?.user[0]?._id === user?._id
                  ) ||
                  profiledata?.addFriends.find(
                    (friends) => friends?.user[0]?._id === user?._id
                  )
                ) && <i className="fa-solid fa-lock ms-2"></i>}
            </div>
          </div>
        </div>
        <div
          className={`${
            show === 'wall' ? 'd-block' : 'd-none'
          } memorial-container`}
        >
          <div className="profile-details-title ">
            <h1 className="profile_details_section_title">תאריך האזכרה</h1>
          </div>

          <div className="details-and-icons">
            <div className="memorial-details">
              {/* {console.log(profiledata)} */}
              <h3>
                <span className="separator">| </span>
                <span className="dash">- </span>
                {profiledata?.deathDate &&
                  moment(profiledata?.deathDate)
                    .format('DD-MM-YYYY')
                    .replace(
                      new Date(profiledata?.deathDate).getFullYear(),
                      new Date().getFullYear()
                    )}
              </h3>
              <h3>
                <span className="separator">| </span>
                <span className="dash">- </span>
                {profiledata.hebDeathDate}
              </h3>
              <h3>
                <span className="separator">| </span>
                <span className="dash">- </span>
                {profiledata.wazeLocation}
              </h3>
            </div>
            <div className="profile-icons-container">
              <img
                src={zoom}
                alt=""
                className={`${!profiledata.zoomLink && 'disabled'} icon-btn`}
              />
              <a href={`https://www.waze.com/ul?q=${profiledata.wazeLocation}`}>
                <img src={waze} alt="" className="icon-btn"></img>
              </a>
            </div>
          </div>
        </div>

        {((profiledata.privacy === 'private' &&
          (profiledata?.originalUser?.[0]?._id === user?._id ||
            profiledata.addAdmins.find(
              (admins) => admins.user[0]?._id === user?._id
            ) ||
            profiledata.addFriends.find(
              (friends) => friends.user[0]?._id === user?._id
            ))) ||
          profiledata.privacy !== 'private') && (
          <>
            <div
              className={`${
                show === 'wall' && 'display'
              } d-none wall-main-container`}
            >
              <div className="gallery-container">
                <Gallery
                  profiledata={profiledata}
                  id={profileId}
                  userId={user?._id}
                />
                <div onClick={() => setShow('gallery')} className="full-btn">
                  {' '}
                  לכל הגלריה +
                </div>
              </div>
              <div className="grave-location-container">
                <h1 className="grave-location-title profile_details_section_title">
                  מיקום ותמונת הקבר
                </h1>
                <div className="grave-imgs-container">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${profiledata.graveImg}`}
                    alt=""
                    className="grave-img"
                  ></img>

                  {map && (
                    <React.Fragment>
                      <div className="map_container">
                        {/* <Direction
                    destination={profiledata.googleLocation}
                    origin={location.coordinates}
                  /> */}
                        <GraveMap graveLocation={profiledata.googleLocation} />
                        <div className="text-center mt-3">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${profiledata.googleLocation.lat}%2C${profiledata.googleLocation.lng}`}
                            className="profile-example-btn"
                            target="_blank"
                            rel="noreferrer"
                          >
                            נווט לקבר
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <button
                  className="navigation-btn"
                  onClick={() => setMap((prevState) => !prevState)}
                >
                  פתח מפה <img src={google} alt=""></img>
                </button>
              </div>
              <div className="memories-div">
                <h1 className="memories-title profile_details_section_title">
                  זכרונות
                </h1>
                <div className="memories-container">
                  {memoryData.length > 0 ? (
                    memoryData.map((imgData, index, _id) => {
                      return (
                        index < memoryCount && (
                          <div
                            className="memory-container"
                            key={index}
                            onClick={() =>
                              history.push(
                                `/profile/${profiledata._id}/memory/${imgData._id}`
                              )
                            }
                          >
                            {imgData.file ? (
                              <img
                                src={`${process.env.REACT_APP_API_URL}/${imgData.file}`}
                                alt="memory"
                                className="memory-img"
                              ></img>
                            ) : (
                              <React.Fragment>
                                <video
                                  width="100%"
                                  height="100%"
                                  poster={defaultVideoImg}
                                  srl_video_thumbnail={defaultVideoImg}
                                  srl_video_caption="Memory Video"
                                  className="memory-img d-none d-sm-block"
                                  controls
                                  muted
                                >
                                  <source
                                    src={`${process.env.REACT_APP_API_URL}/${imgData.memoryVideo}`}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                                <video
                                  width="100%"
                                  height="100%"
                                  poster={defaultVideoImg}
                                  srl_video_thumbnail={defaultVideoImg}
                                  srl_video_caption="A video with a rabbit"
                                  className="memory-img d-block d-sm-none"
                                  controls={false}
                                  muted
                                >
                                  <source
                                    src={`${process.env.REACT_APP_API_URL}/${imgData.memoryVideo}`}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              </React.Fragment>
                            )}
                            {/* {imgData.file.map(item => {
                          return <img
                            src={`${process.env.REACT_APP_API_URL}/${item}`}
                            alt=""
                            className="memory-img"
                          ></img>
                        })} */}

                            <div className="icons-container">
                              <div className="memory-heart-container">
                                <div className="heart-div">
                                  <img
                                    style={{ cursor: 'pointer' }}
                                    className="heart-icon"
                                    src={heart}
                                    alt=""
                                  ></img>
                                  <span>{imgData.likes.length}</span>
                                </div>
                              </div>
                              <div className="facebook-container">
                                <div className="heart-div">
                                  <img
                                    className="heart-icon"
                                    src={facebook}
                                    alt=""
                                  ></img>
                                </div>
                              </div>
                              <div className="instagram-container">
                                <div className="heart-div">
                                  <img
                                    className="heart-icon"
                                    src={instagram}
                                    alt=""
                                  ></img>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })
                  ) : (
                    <p style={{ marginBottom: '40px' }}>
                      {' '}
                      {profiledata.firstName} כאן יהיו הזכרונות שלנו מ
                    </p>
                  )}

                  {/* })} */}
                </div>
                <div className="memory-actions">
                  <div
                    className={
                      memoryCount > memoryData.length
                        ? ' hideBtn '
                        : ` full-memory-btn`
                    }
                    onClick={handleShowMoreMemories}
                  >
                    + עוד זכרונות
                  </div>
                  {(profiledata?.originalUser[0]?._id === user?._id ||
                    profiledata?.addAdmins.find(
                      (admins) => admins?.user[0]?._id === user?._id
                    ) ||
                    profiledata?.addFriends.find(
                      (friends) => friends?.user[0]?._id === user?._id
                    )) && (
                    <Link to={`/memorycreation/${profileId}`}>
                      <div className="full-memory-btn">+ הוסף זיכרון</div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className={`${show === 'bio' && 'display'} d-none`}>
              <div className="bio-content">
                <h1 className="bio-name">.{profiledata.firstName}</h1>
                <pre className="bio-bio">{profiledata.description}</pre>
              </div>
              <div className="life-axis">
                <h1 className="axis-name">ציר חיים</h1>
                {/* <p className="axis-desc">{profiledata.description}</p> */}
              </div>
              <div>
                {parseAxios?.map((axis, index) => (
                  <div>
                    <div className="axis-container" key={index}>
                      <div className="axis-sub-container">
                        <h1 className="axis-title">{axis.axisTitle}</h1>
                        <p className="axis-description2">
                          {axis.axisDescription}
                        </p>
                      </div>
                      <div
                        className="axis-bubble"
                        style={{
                          backgroundImage: `url('${process.env.REACT_APP_API_URL}/picUploader/${axis?.axisImage}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <span>{axis.axisDate}</span>
                      </div>
                    </div>
                    <div className="dotted-seperator">- - - -</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`${
                show === 'gallery' && 'display'
              } full-gallery d-none`}
            >
              <div className="full-gallery-container">
                <div className="profile-details-title profile_details_section_title">
                  <h1>גלריה</h1>
                </div>
                <SRLWrapper>
                  {profiledata?.gallery?.map((img, index) => (
                    <div className="full-gallery-img-container" key={index}>
                      <div className="full-gallery-img-inner-container">
                        {!img?.endsWith?.('mp4') ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${img}`}
                            alt=""
                            className="full-gallery-img"
                          ></img>
                        ) : (
                          <video
                            width="100%"
                            height="100%"
                            poster={defaultVideoImg}
                            srl_video_thumbnail={defaultVideoImg}
                            srl_video_caption="Profile Video"
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
                        <div className="heart-container">
                          <div
                            className="heart-icon"
                            style={{ backgroundImage: `url(${heart})` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </SRLWrapper>
                {/* {profiledata?.gallery?.map(
              (img) =>
                img.endsWith('mp4') && (
                  <video width="400" controls>
                    <source
                      src={`${process.env.REACT_APP_API_URL}/${img}`}
                      type="video/mp4"
                    />
                    Your browser does not support HTML video.
                  </video>
                )
            )} */}
                <div
                  onClick={() => setShow('wall')}
                  className="full-btn back-btn"
                >
                  {' '}
                  חזרה <img src={`${arrowRightLong}`} />
                </div>
              </div>
            </div>
            <div
              className={`${
                show === 'friends' && 'display'
              } friends-list d-none`}
            >
              {/* <FriendsList
            setrfriendReq={setrfriendReq}
            setAdminres={setAdminres}
          /> */}
              <FriendsList
                proid={profileId}
                profiledata={profiledata}
                setAdminres={setAdminres}
                setrfriendReq={setrfriendReq}
                users={users}
                userId={user?._id}
                fetchuserprofiles={fetchuserprofiles}
              />
            </div>
            <SnackBar open={open} handleClose={handleClose} message={message} />
          </>
        )}
        {(profiledata.facebookUrl || profiledata.instagramUrl) && (
          <ProfileFooter
            facebookUrl={profiledata.facebookUrl}
            instagramUrl={profiledata.instagramUrl}
          />
        )}
        <Footer />
      </div>
    );
  } else {
    return (
      <h1 style={{ textAlign: 'center', paddingTop: '20%' }}>
        <ProgressBar />
      </h1>
    );
  }
}
