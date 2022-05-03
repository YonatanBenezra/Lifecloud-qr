import React, { useState, useEffect, useContext } from 'react';
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

export default function Profile() {
  const { dispatch } = useContext(AuthContext);
  const [profiledata, setProfileData] = useState([]);
  const [memoryData, setmemoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState({ comments: [{ text: '' }] });
  const [show, setShow] = useState('wall');
  const history = useHistory();
  const [likeMessage, setLikeMessage] = useState('');
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState();
  const [DellComment, setDelComment] = useState('');
  const [friendFlagReq, setrfriendReq] = useState([]);
  const [adminFlagReq, setAdminres] = useState([]);
  const id = useParams().id;
  const [next, setnext] = useState(5);
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [hebMemorialDate, setHebMemorialDate] = useState('');
  const location = useLocation();
  const [yPos, setYPos] = useState(50);
  
  const death =  new Date(profiledata?.deathDate);
  
  const date =  death.getDate();
  const year =  new Date().getFullYear();
  const month =  death.getMonth();
  setTimeout(() => {
    handleDeathDateBlur();
  }, 0);
    const handleDeathDateBlur = async () => {
      try {
        const response = await fetch(
          `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${
            month + 1
          }&gd=${date}&g2h=1`
          ) 
          const data = await response.json();
          setHebMemorialDate(data.hebrew);
        } catch (error) {
          console.log(error);
        }
      }
      
  

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
          userId: user._id,
          // profileImg: user.mainProfilePicture,
          // firstName: profiledata.firstName,
          // lastName: profiledata.lastName,

          // userId: e._id,
          // user: e.user[0]._id,
          user: user._id,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setrfriendReq(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowMoreMemories = () => {
    setnext(next + 1);
  };
  useEffect(() => {
    setCommenting('');
    setComment('');
    setLikeMessage('');
  }, [likeMessage, comment, DellComment, friendFlagReq, adminFlagReq]);
  useEffect(() => {
    fetchuserprofiles();
  }, [friendFlagReq, adminFlagReq]);
  useEffect(() => {
    fetchmemories();
  }, [comment, likeMessage]);

  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${id}`
    );
    if (res.data.googleLocation) {
      res.data.googleLocation = JSON.parse(res.data.googleLocation);
    }
    setYPos(res.data.objectYPos);
    setProfileData(res.data);
  };

  const fetchmemories = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/memory/getallmemory/${id}`
    );
    setmemoryData(res.data);
  };
  const fetchUsers = async () => {
    // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/all/every`);
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/getSingleUser/${profiledata.originalUser[0]._id}`
    );
    setUsers(res.data);
  };
  useEffect(() => {
    fetchmemories();
  }, [comment, likeMessage]);
  let parseAxios = Object.keys(profiledata).length
    ? profiledata.lifeAxis && JSON.parse(profiledata.lifeAxis)
    : '';
  profiledata?.axisImages?.forEach((element, i) => {
    parseAxios[i].axisImage = element;
  });
  const handleLike = (e) => {
    try {
      const formdata = new FormData();
      let data = {
        userId: profiledata.originalUser[0]._id,
      };
      fetch(`${process.env.REACT_APP_API_URL}/api/memory/like/${e._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(data),
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
          history.push(`/userprofiles/${profiledata.originalUser[0]._id}`);
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
          loggedInId: user._id,
          notificationType: 'profileVisit',
        }),
      }
    );
  }, [user._id, profiledata._id, profiledata.originalUser]);

  const handleObjectPos = (what) => {
    if (what === 'up') {
      setYPos(yPos + 10);
    } else if (what === 'down') {
      setYPos(yPos - 10);
    }
    axios.patch(
      `${process.env.REACT_APP_API_URL}/api/profile/updateObjectYPos/${id}`,
      {
        objectYPos: yPos,
      }
    );
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
          <div
            className={`${
              profiledata?.originalUser[0]?._id === user?._id ?
              // (profiledata.addAdmins.length &&
              //   profiledata.addAdmins.indexOf(user.id)) !== -1 ?
                'profile-details-cover-btns' :
                'hidden' 
            }`}
          >
            <button
              onClick={() => handleObjectPos('up')}
              className="navigation-btn"
            >
              ➕
            </button>
            <button
              onClick={() => handleObjectPos('down')}
              className="navigation-btn"
            >
              ➖
            </button>
          </div>
        </div>
        <div className="profile-details-first">
          <img
            src={`${process.env.REACT_APP_API_URL}/${profiledata.profileImg}`}
            alt=""
            className="profile-img"
          ></img>
          <div className="deceased-details">
            <h1 className="profile-h1">{`${profiledata?.degree} ${profiledata?.firstName} ${profiledata?.lastName}`}</h1>
            <p>
              {moment(profiledata?.deathDate).utc().format('DD-MM-YYYY')} - {' '}
              {moment(profiledata?.birthDate).utc().format('DD-MM-YYYY')}
            </p>
            <p>{profiledata?.city}</p>
          </div>
          <img src={leftCloud} alt="" className="left-cloud" />
        </div>
        <div className="btns-container">
          <div className="small-btns-container">
            <Link
              className={`${
                profiledata?.originalUser[0]?._id === user?._id
                // (profiledata.addAdmins.length &&
                //   profiledata.addAdmins.indexOf(user._id))
                  ? 'small-btns-container'
                  : 'hidden'
              }`}
              to={`/editprofiles/${id}`}
            >
              <div className="profile-small-btn">ערוך פרופיל</div>
            </Link>
            <div
              className="profile-small-btn"
              onClick={() => setShow('friends')}
            >
              רשימת חברים
            </div>
            <div
              className={`${
                profiledata?.originalUser[0]?._id === user?._id 
                // (profiledata.addAdmins.length &&
                //   profiledata.addAdmins.indexOf(user._id)) ||
                //   (profiledata.addFriends.length &&
                //     profiledata.addFriends.indexOf(user._id))
                  ? 'hidden'
                  : 'profile-small-btn'
              }`}
              onClick={() => handleAddFriendRequest()}
              style={{ cursor: 'pointer' }}
            >
              הוסף פרופיל כחבר{' '}
            </div>
          </div>
          <div className="big-btns-container">
            <div
              type="button"
              className="profile-big-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              QR
            </div>
            <div
              onClick={() => setShow('bio')}
              className={`profile-big-btn ${show === 'bio' && 'active'}`}
            >
              ביוגרפיה
            </div>
            <div
              onClick={() => setShow('wall')}
              className={`${show === 'wall' && 'active'} profile-big-btn`}
            >
              קיר
            </div>
          </div>
        </div>
        <div
          className={`${
            show === 'wall' && 'display'
          } d-none wall-main-container`}
        >
          <div className="memorial-container">
            <div className="profile-details-title">
              <h1>תאריך האזכרה</h1>
            </div>

            <div className="details-and-icons">
              <div className="memorial-details">
                <h3>
                  <span className="separator">| </span>
                  <span className="dash">- </span>
                  {moment(profiledata?.deathDate).utc().format('DD-MM-YYYY')}
                </h3>
                <h3>
                  <span className="separator">| </span>
                  <span className="dash">- </span>
                  {hebMemorialDate}
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
                <a
                  href={`https://www.waze.com/ul?q=${profiledata.wazeLocation}`}
                >
                  <img src={waze} alt="" className="icon-btn"></img>
                </a>
              </div>
            </div>
          </div>
          <div className="gallery-container">
            <Gallery profiledata={profiledata} id={id} userId={user._id} />
            <div onClick={() => setShow('gallery')} className="full-btn">
              {' '}
              לכל הגלריה +
            </div>
          </div>
          <div className="grave-location-container">
            <h1 className="grave-location-title">מיקום ותמונת הקבר</h1>
            <div className="grave-imgs-container">
              <img
                src={`${process.env.REACT_APP_API_URL}/${profiledata.graveImg}`}
                alt=""
                className="grave-img"
              ></img>

              {map && (
                <React.Fragment>
                  <div>
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
            <h1 className="memories-title">זכרונות</h1>
            <div className="memories-container">
              {memoryData.length > 0 ? (
                memoryData.map(
                  (
                    imgData,
                    index //change to memories
                  ) => (
                    <Popup
                      trigger={
                        <div className="memory-container" key={index}>
                          {imgData.file ? (
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${imgData.file}`}
                              alt=""
                              className="memory-img"
                            ></img>
                          ) : (
                            <video
                              width="100%"
                              height="100%"
                              srl_video_thumbnail="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                              srl_video_caption="A video with a rabbit"
                              srl_video_muted="true"
                              controls
                              className="memory-img"
                            >
                              <source
                                src={`${process.env.REACT_APP_API_URL}/${imgData.memoryVideo}`}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
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
                      }
                      modal
                      nested
                    >
                      {(close, item) => (
                        <Memory
                          close={close}
                          data={imgData}
                          profiledata={profiledata}
                          index={index}
                          handleLike={handleLike}
                          onhandleChangeComment={onhandleChangeComment}
                          handleComment={handleComment}
                          setCommenting={setCommenting}
                          commenting={commenting}
                          handleDelete={handleDelete}
                          handleDellMemory={handleDellMemory}
                          profile={profiledata}
                          user={user}
                        /> //change to memories
                      )}
                    </Popup>
                  )
                )
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
                  next > memoryData.length ? ' hideBtn ' : ` full-memory-btn`
                }
                onClick={handleShowMoreMemories}
              >
                + עוד זכרונות
              </div>
              <Link to={`/memorycreation/${id}`}>
                <div className="full-memory-btn">+ הוסף זיכרון</div>
              </Link>
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
                    <p className="axis-description2">{axis.axisDescription}</p>
                  </div>
                  <div
                    className="axis-bubble"
                    style={{
                      backgroundImage: `url('${process.env.REACT_APP_API_URL}/picUploader/${axis.axisImage}')`,
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
          className={`${show === 'gallery' && 'display'} full-gallery d-none`}
        >
          <div className="full-gallery-container">
            <div className="profile-details-title">
              <h1>גלריה</h1>
            </div>
            <SRLWrapper>
              {profiledata?.gallery?.map((img, index) => (
                <div className="full-gallery-img-container" key={index}>
                  <div className="full-gallery-img-inner-container">
                    {!img.endsWith('mp4') ? (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${img}`}
                        alt=""
                        className="full-gallery-img"
                      ></img>
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
            <div onClick={() => setShow('wall')} className="back-btn">
              {' '}
              חזרה <img src={`${arrowRightLong}`} />
            </div>
          </div>
        </div>
        <div
          className={`${show === 'friends' && 'display'} friends-list d-none`}
        >
          {/* <FriendsList
            setrfriendReq={setrfriendReq}
            setAdminres={setAdminres}
          /> */}
          <FriendsList
            proid={id}
            profiledata={profiledata}
            setAdminres={setAdminres}
            setrfriendReq={setrfriendReq}
            users={users}
            userId={user._id}
            fetchuserprofiles={fetchuserprofiles}
          />
        </div>
        <SnackBar open={open} handleClose={handleClose} message={message} />
        <SocialFooter />
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
