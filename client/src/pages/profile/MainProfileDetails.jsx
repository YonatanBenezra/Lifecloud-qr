import React, { useState, useEffect, useContext } from 'react';
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

export default function MainProfile(props) {
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
  const [data, setData] = useState([]);
  const [next, setnext] = useState(1);
  const { user } = useContext(AuthContext);

  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${id}`
    );
    setProfileData(res.data);
  };
  const fetchallprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${user._id}`
    );
    setData(res.data);
  };
  
  useEffect(() => {
    fetchuserprofiles();
    fetchallprofiles();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  const loggedUser = JSON.parse(localStorage.getItem('user'));
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
          <img
            src={`${process.env.REACT_APP_API_URL}/${profiledata.profileImg}`}
            alt=""
            className="profile-img"
          ></img>
          <div className="deceased-details">
            <h1>{`${profiledata.firstName}`}</h1>
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
            <span className="profile-small-btn" onClick={() => setShow('friends')}>
              רשימת חברים
            </span>
          </div>
          <div className="profile-big-btns-container">
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
        <div className='display'>
          <div className="bio-content">
            <h1 className="bio-name">{profiledata.firstName}.</h1>
            <p className="bio-bio">{profiledata.description}</p>
          </div>
          
        </div>
          <div className="gallery-container">
            <Gallery profiledata={profiledata} id={id} />
            <div onClick={() => setShow('gallery')} className="full-btn">
              {' '}
              + לכל הגלריה
            </div>
          </div>
        </div>
        <div>
          <div className='deceased-list'>
            {/* {console.log(profiles)} */}
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
          </div>
        </div>
        {console.log(data)}
        { data &&
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
                              <img
                                className="profile-image"
                                src={`${process.env.REACT_APP_API_URL}/${userProfiles.profileImg}`}
                                alt=""
                              />
                            </div>
                            <div className="profile-name">
                              {userProfiles.firstName} {userProfiles.lastName}
                            </div>
                          </div>
                        </Link>
                      );
                    }
                  })}
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
