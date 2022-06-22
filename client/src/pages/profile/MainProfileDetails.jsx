import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import profile from './dummy-profiles.json';
import waze from '../../assets/waze.png';
import wts from '../../assets/wts.png';
import zoom from '../../assets/zoom.png';
import google from '../../assets/google.png';
import map from '../../assets/map.png';
import share from '../../assets/share.png';
import heart from '../../assets/heart.png';
import instagram from '../../assets/instagram.png';
import facebook from '../../assets/facebook.png';
import { Link } from 'react-router-dom';
import './profiledetails.css';
import TopBar from '../../components/topbar/Topbar';
import ProgressBar from '../../components/progressbar/progressBar';
import { Gallery } from '../../components/gallery/gallery';
// import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
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
import Map from './Map';
import Direction from './Direction';
import { QRCodeSVG } from 'qrcode.react';
import GraveMap from './GraveMap';
import LazyLoad from 'react-lazyload';
export default function MainProfile(props) {
  const { dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const profileId = useParams().id;
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
  const [map, setMap] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [next, setnext] = useState(1);
  const { user } = useContext(AuthContext);

  const fetchuserprofiles = useCallback(async () => {
    if (id) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${id}`
        );
        setProfileData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [id]);
  const fetchallprofiles = useCallback(async (userId) => {
    if (userId) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${userId}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchuserprofiles();
    fetchallprofiles(user._id);
  }, [fetchallprofiles, fetchuserprofiles, id, user._id]);

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };

  const loggedUser = JSON.parse(localStorage.getItem('user'));
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

  if (Object.keys(profiledata).length > 0) {
    return (
      <div className="profile-details">
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
                  href={`https://wa.me/?text=${window.location.href}`}
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
        <TopBar />
        <LazyLoad>
          <img
            src={`${process.env.REACT_APP_API_URL}/${profiledata.wallImg}`}
            alt=""
            className="profile-cover"
          />
        </LazyLoad>

        <div className="profile-details-first">
          <LazyLoad>
            <img
              src={`${process.env.REACT_APP_API_URL}/${profiledata.profileImg}`}
              alt=""
              className="profile-img"
            />
          </LazyLoad>

          <div className="deceased-details">
            <h1>{`${profiledata.firstName}`}</h1>
          </div>
        </div>
        <div className="btns-container">
          <div className="d-flex">
            {profiledata.originalUser[0]._id === loggedUser._id && (
              <Link to={`/editprofiles/${id}`} className="profile-small-btn">
                <span>ערוך פרופיל</span>
              </Link>
            )}

            {/* <div
              className={`${
                profiledata.originalUser[0]._id === loggedUser._id
                  ? 'hidden'
                  : 'profile-small-btn'
              }`}
            >
              הוסף חבר
            </div> */}
            <span
              className="profile-small-btn"
              onClick={() => setShow('friends')}
            >
              רשימת חברים
            </span>
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
          <div className="profile-big-btns-container d-flex">
            {/* <div
              type="button"
              className="profile-big-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              QR
            </div> */}
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
          <div className="display">
            <div className="bio-content">
              <h1 className="bio-name">.{profiledata.firstName}</h1>
              <pre className="bio-bio">{profiledata.description}</pre>
            </div>
          </div>
          <div className="gallery-container">
            <Gallery profiledata={profiledata} id={id} />
            <div onClick={() => setShow('gallery')} className="full-btn">
              {' '}
              + לכל הגלריה
            </div>
          </div>
          {/* Google location */}
          <div className="grave-location-container">
            <h1 className="grave-location-title">מיקום ותמונת אתר ההנצחה</h1>
            <div className="grave-imgs-container">
              <LazyLoad>
                <img
                  src={`${process.env.REACT_APP_API_URL}/${profiledata.graveImg}`}
                  alt=""
                  className="grave-img"
                />
              </LazyLoad>

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
              פתח מפה
              <LazyLoad>
                <img src={google} alt="" />
              </LazyLoad>
            </button>
          </div>
          <div className="profile-details-title">
            <h1>חללי {profiledata.firstName}</h1>
          </div>
          <div className="list-of-deceased-container">
            <div className="list-of-deceased">
              {data &&
                data.length > 0 &&
                data.map((userProfiles, i) => {
                  if (userProfiles.isMain === false) {
                    return (
                      <Link
                        to={`/profiledetails/${userProfiles._id}`}
                        key={i}
                        style={{ cursor: 'hover' }}
                      >
                        <div className="profile-container" key={i}>
                          <div className="profile-image-div">
                            <LazyLoad>
                              <img
                                className="profile-image"
                                src={`${process.env.REACT_APP_API_URL}/${userProfiles.profileImg}`}
                                alt=""
                              />
                            </LazyLoad>
                          </div>
                          <div className="profile-name">
                            {userProfiles.firstName} {userProfiles.lastName}
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
            </div>
            {/* <div onClick={() => setShow('deceased')} className="full-btn">
              {' '}
              + לעמוד החללים
            </div> */}
          </div>
        </div>
        <div
          className={`${show === 'gallery' && 'display'} full-gallery d-none`}
        >
          <div className="full-gallery-container">
            <SRLWrapper>
              {profiledata?.gallery?.map((img, index) => (
                <div className="full-gallery-img-container" key={index}>
                  {!img?.endsWith?.('mp4') ? (
                    <LazyLoad>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${img}`}
                        alt=""
                        className="full-gallery-img"
                      />
                    </LazyLoad>
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
                    <div className="heart-div">
                      <div
                        className="heart-icon"
                        style={{ backgroundImage: `url(${heart})` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </SRLWrapper>
          </div>
        </div>

        <div
          className={`${show === 'friends' && 'display'} friends-list d-none`}
        >
          {/* <FriendsList /> */}
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
        <div className={`${show === 'deceased' && 'display'} d-none`}>
          <div className="profile-details-title">
            <h1>רשימת חללים</h1>
          </div>
          <div className="list-of-deceased">
            {data &&
              data.length > 0 &&
              data.map((userProfiles, i) => {
                if (userProfiles.isMain === false) {
                  return (
                    <Link
                      to={`/profiledetails/${userProfiles._id}`}
                      key={i}
                      style={{ cursor: 'hover' }}
                    >
                      <div className="profile-container" key={i}>
                        <div className="profile-image-div">
                          <LazyLoad>
                            <img
                              className="profile-image"
                              src={`${process.env.REACT_APP_API_URL}/${userProfiles.profileImg}`}
                              alt=""
                            />
                          </LazyLoad>
                        </div>
                        <div className="profile-name">
                          {userProfiles.firstName} {userProfiles.lastName}
                        </div>
                      </div>
                    </Link>
                  );
                }
              })}
          </div>
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
