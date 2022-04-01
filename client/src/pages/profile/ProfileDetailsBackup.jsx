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
  const [next, setnext] = useState(1);

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
  }, []);

  useEffect(() => {
    fetchmemories();
  }, [comment, likeMessage]);

  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${id}`
    );
    res.data.googleLocation = JSON.parse(res.data.googleLocation);
    setProfileData(res.data);
  };

  const fetchmemories = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/memory/getallmemory/${id}`
    );
    setmemoryData(res.data);
  };

  useEffect(() => {
    fetchmemories();
  }, [comment, likeMessage]);

  let parseAxios = Object.keys(profiledata).length
    ? JSON.parse(profiledata.lifeAxis)
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
    console.log(e);
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
    console.log(e, id);
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
      });
  };
  const handleDellMemory = (e) => {
    console.log(e, 'e');
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

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const [map, setMap] = useState(false);
  const { location, getGeoLocation } = useGeoLocation();
  useEffect(() => {
    getGeoLocation();
  }, [getGeoLocation]);

  if (Object.keys(profiledata).length > 0) {
    return (
      <div>
        <TopBar />
        <img
          src={`${process.env.REACT_APP_API_URL}/${profiledata.wallImg}`}
          alt=""
          className="profile-cover"
        ></img>
        <div className="profile-details">
          <img src={leftCloud} alt="" className="leftcloud-profile"></img>
          <img
            src={`${process.env.REACT_APP_API_URL}/${profiledata.profileImg}`}
            alt=""
            className="profile-img"
          ></img>
          <div className="deceased-details">
            <h1 className="profile-h1">{`${profiledata?.degree} ${profiledata?.firstName} ${profiledata?.lastName}`}</h1>
            <p>
              {profiledata?.birthDate?.split('T')[0]} -{' '}
              {profiledata?.deathDate?.split('T')[0]}
            </p>
            <p>{profiledata?.city}</p>
          </div>
        </div>
        <div className="btns-container">
          <div>
            {(profiledata.originalUser[0]._id === loggedUser._id ||
              profiledata.addAdmins.indexOf()) && (
              <Link to={`/editprofiles/${id}`}>
                <span className="profile-small-btn">ערוך פרופיל</span>
              </Link>
            )}

            <span
              className={`${
                profiledata.originalUser[0]._id === loggedUser._id ||
                profiledata.addAdmins.indexOf()
                  ? 'dissapear'
                  : 'profile-small-btn'
              }`}
            >
              הוסף חבר
            </span>
            <span
              className="profile-small-btn"
              onClick={() => setShow('friends')}
            >
              רשימת חברים
            </span>
          </div>
          <div className="big-btns-container">
            <div
              onClick={() => setShow('bio')}
              className={`${show === 'bio' && 'active'} profile-big-btn`}
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
            <h1 className="memorial-title">תאריך האזכרה</h1>
            <div className="details-and-icons">
              <div className="memorial-details">
                {console.log(profiledata)}
                <h3>| {profiledata?.birthDate?.split('T')[0]}</h3>
                <h3>| {profiledata?.hebDeathDate}</h3>
                <h3>| {profiledata.wazeLocation}</h3>
              </div>
              <div className="profile-icons-container">
                <a
                  href={`https://www.waze.com/ul?q=${profiledata.wazeLocation}`}
                >
                  <img src={waze} alt="" className="icon"></img>
                </a>
                <img
                  src={zoom}
                  alt=""
                  className={`${!profiledata.zoomLink && 'no-link-icon'} icon`}
                ></img>
              </div>
            </div>
          </div>
          <div className="gallery-container">
            <Gallery profiledata={profiledata} id={id} />
            <div onClick={() => setShow('gallery')} className="full-btn">
              {' '}
              + לכל הגלריה
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
              {map && !location.loaded && <h2>Loading...</h2>}
              {map && location.error && location.loaded && (
                <h2>{location.error.message}</h2>
              )}
              {map && !location.error && location.loaded && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Direction
                    destination={profiledata.googleLocation}
                    origin={location.coordinates}
                  />
                </div>
              )}
            </div>

            <button
              className="navigation-btn"
              onClick={() => setMap((prevState) => !prevState)}
            >
              לחץ כאן כדי לנווט לקבר <img src={google} alt=""></img>
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
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${imgData.file}`}
                            alt=""
                            className="memory-img"
                          ></img>
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
                          index={index}
                          handleLike={handleLike}
                          onhandleChangeComment={onhandleChangeComment}
                          handleComment={handleComment}
                          setCommenting={setCommenting}
                          commenting={commenting}
                          handleDelete={handleDelete}
                          handleDellMemory={handleDellMemory}
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
            <h1 className="bio-name">{profiledata.firstName}.</h1>
            <p className="bio-bio">{profiledata.description}</p>
          </div>
          <div className="life-axis">
            <h1 className="axis-name">ביוגרפיה וציר חיים</h1>
            {/* <p className="axis-desc">{profiledata.description}</p> */}
          </div>
          <div>
            {parseAxios?.map((axis, index) => (
              <div className="axis-container" key={index}>
                <div className="axis-sub-container">
                  <h1 className="axis-title">{axis.axisTitle}</h1>
                  <p className="axis-description2">{axis.axisDescription}</p>
                  <span>{axis.axisDate}</span>
                </div>
                <div
                  className="axis-bubble"
                  style={{
                    backgroundImage: `url('${process.env.REACT_APP_API_URL}/picUploader/${axis.axisImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${show === 'gallery' && 'display'} full-gallery d-none`}
        >
          <div className="full-gallery-container">
            <SRLWrapper>
              {profiledata?.gallery?.map((img, index) => (
                <div className="full-gallery-img-container" key={index}>
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
          </div>
        </div>
        <div
          className={`${show === 'friends' && 'display'} friends-list d-none`}
        >
          <FriendsList />
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
