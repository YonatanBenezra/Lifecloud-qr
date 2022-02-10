import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from './userProfile.module.css';
import './userandprofiles.css';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Lock from '../../assets/Lock.png';
import facebook from '../../assets/facebook.png';
import ProgressBar from '../../components/progressbar/progressBar';
import instagram from '../../assets/instagram.png';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import userImg from '../../assets/PlayerImage.png';
import { useRef } from 'react';
export const UserAndprofiles = () => {
  const LoggedUser = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const id = useParams().id;
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${id}`
    );
    setData(res.data);
  };
  const Notifications = [
    {
      date: '12.12.21',
      time: '10:02',
      action: 'הגיב לך על הזיכרון',
      profileImg: 'https://picsum.photos/200/300',
    },
    {
      date: '12.12.21',
      time: '10:02',
      action: 'סרק את קוד הQR של שלמה יהב',
      profileImg: 'https://picsum.photos/200/300',
    },
    {
      date: '12.12.21',
      time: '10:02',
      action: 'הוסיף זיכרון לפרופיל שלך',
      profileImg: 'https://picsum.photos/200/300',
    },
    {
      date: '12.12.21',
      time: '10:02',
      action: 'הוסיף את הפרופיל שלמה יהב כחבר',
      profileImg: 'https://picsum.photos/200/300',
    },
  ];
  const profileImageRef = useRef(null);
  const onChangePicture = async (event) => {
    const src = URL.createObjectURL(event.target.files[0]);
    profileImageRef.current.src = src;
    const formData = new FormData();
    formData.append('mainProfilePicture', event.target.files[0]);
    formData.append('_id', LoggedUser.user._id);
    await axios.patch('/updateUserProfilePicture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // LoggedUser.dispatch({ type: 'FIREBASE_LOGIN', payload: loggedUser });
  };

  return (
    <>
      <Topbar />
      
      {!show ? (
        <div className="profile">
          <div className="profileRight">
            <div className="user-main" style={{ direction: 'rtl' }}>
              <h1
                className="user-name"
                style={{ direction: 'rtl', flexDirection: 'column' }}
              >
                <img
                  alt=""
                  src={
                    LoggedUser.user.mainProfilePicture
                      ? `http://localhost:8800/picUploader/${LoggedUser.user.mainProfilePicture}`
                      : LoggedUser.user.profilePicture
                  }
                  className="user-img"
                  ref={profileImageRef}
                />
                <input
                  type="file"
                  name="profileImg"
                  onChange={onChangePicture}
                />
                שלום {LoggedUser.user.firstName}!
              </h1>
              <div className="notifications-btn" onClick={() => setShow(true)}>
                התראות
              </div>
              {/* <p className='user-description'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,{' '}
            </p> */}
            </div>
            <div className="profiles-container">
              <h1 className="profile-title">הפרופילים שלי</h1>
              <div className="profiles">
                {data &&
                  data.length > 0 &&
                  data.map((userProfiles, i) => {
                    return (
                      <Link
                        to={`/profiledetails/${userProfiles._id}`}
                        state={{ id: userProfiles._id }}
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
                          <ul className="admins-list">
                            {userProfiles.admins &&
                              userProfiles.admins.map((admin) => (
                                <li key={admin._id}>{admin}</li>
                              ))}
                          </ul>
                        </div>
                      </Link>
                    );
                  })}
                <Link to={`/createprofile/${LoggedUser.user._id}`}>
                  <div className="profile-container">
                    <div className="profile-image create-profile-container">
                      <div className="inner-btn">
                        <div className="line-1 user-line"></div>
                        <div className="line-2 user-line"></div>
                      </div>
                    </div>
                    <div className="profile-name"> צור פרופיל חדש</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="settings-container">
              <h1 className="profile-title">הגדרות חשבון</h1>
              <div className="btns-container">
                <div className="big-button">
                  <img
                    src={Lock}
                    alt=""
                    style={{ height: '15px', width: '15px' }}
                  ></img>
                  פרטי{' '}
                </div>
                <div className="big-button">תשלומים</div>
                <div className="big-button">נהל תוכנית</div>
              </div>
              <div>
                <h3 className="settings-subtitle">:סוג התוכנית </h3>
                <h3 className="settings-subtitle">:סיום התוכנית </h3>
              </div>
              <Link to="/">
                <div className="logout-btn">התנתק</div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="notifications-container">
          <div className="notifications-title">
            <h1
              onClick={() => setShow(false)}
              style={{ cursor: 'pointer', paddingRight: '115px' }}
            >
              חזרה
            </h1>
            <h1 style={{ fontSize: '60px', paddingRight: '160px' }}>התראות</h1>
          </div>
          <h3 style={{ fontSize: '30px', marginBottom: '20px' }}>
            התראות חדשות
          </h3>
          {Notifications.map((n) => {
            return (
              <div className="notification-line">
                <div className="notification-text">
                  <span>{n.date}</span> | <span>{n.time}</span>{' '}
                  <span>{n.action}</span>
                </div>
                <img
                  alt=""
                  src={n.profileImg}
                  className="notification-img"
                ></img>
              </div>
            );
          })}
          <SocialFooter backgroundColor="#DCECF4;" color="#6097BF" />
        </div>
      )}
      <Footer />
    </>
  );
};
