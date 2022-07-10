import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './userandprofiles.css';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Lock from '../../assets/Lock.png';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import { useRef } from 'react';
import LazyLoad from 'react-lazyload';
import userIcon from '../../assets/userIcon.png';

export const UserAndprofiles = () => {
  const LoggedUser = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const id = useParams().id;
  const [userId, setId] = useState(id);

  const notificationString = (userNotification) => {
    if (userNotification.notificationType === 'profileVisit')
      return `${userNotification.logedInUser[0]?.firstName} ביקר בפרופיל של ${userNotification.memoryCreatorNotification[0]?.firstName} ${userNotification.memoryCreatorNotification[0]?.lastName}`;
    else if (userNotification.notificationType === 'memoryCreation')
      return `${userNotification.logedInUser[0]?.firstName} יצר זיכרון בפרופיל של ${userNotification.memoryCreatorNotification[0]?.firstName} ${userNotification.memoryCreatorNotification[0]?.lastName}`;
    else if (userNotification.notificationType === 'profileAdmin')
      return `אתה עכשיו אדמין וחבר בפרופיל של ${userNotification.memoryCreatorNotification[0]?.firstName} ${userNotification.memoryCreatorNotification[0]?.lastName} profile`;
    else if (userNotification.notificationType === 'profileFriend')
      return `אתה עכשיו חבר של הפרופיל ${userNotification.memoryCreatorNotification[0]?.firstName} ${userNotification.memoryCreatorNotification[0]?.lastName} profile`;
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/notification/getallNotifications`
      );

      const currentLoggedUser = JSON.parse(localStorage.getItem('user'));
      setNotifications(
        res.data
          .filter(
            (notification) =>
              (notification?.memoryCreatorNotification[0]?.originalUser[0] ===
                currentLoggedUser?._id &&
                notification.notificationType !== 'profileAdmin' &&
                notification.notificationType !== 'profileFriend') ||
              (notification?.memoryCreatorNotification[0]?.originalUser[0] !==
                currentLoggedUser?._id &&
                notification?.logedInUser[0]?._id === currentLoggedUser?._id &&
                (notification.notificationType === 'profileAdmin' ||
                  notification.notificationType === 'profileFriend'))
          )
          .map((userNotification) => ({
            date: new Date(userNotification.createdAt)
              .toISOString()
              .slice(0, 10),
            time: new Date(userNotification.createdAt)
              .toISOString()
              .slice(11, 16),
            profileImg: userNotification.logedInUser[0]?.mainProfilePicture
              ? `${process.env.REACT_APP_API_URL}/picUploader/${userNotification.logedInUser[0]?.mainProfilePicture}`
              : userNotification.logedInUser[0]?.profilePicture
              ? userNotification.logedInUser[0]?.profilePicture
              : userIcon,
            action: notificationString(userNotification),
          }))
      );
    })();
  }, []);

  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${id}`
    );
    setData(res.data);
  };

  const profileImageRef = useRef(null);
  const onChangePicture = async (event) => {
    const src = URL.createObjectURL(event.target.files[0]);
    profileImageRef.current.src = src;
    const formData = new FormData();
    formData.append('mainProfilePicture', event.target.files[0]);
    formData.append('_id', LoggedUser.user?._id);
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/updateUserProfilePicture`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    LoggedUser.dispatch({ type: 'FIREBASE_LOGIN', payload: response.data });
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
                <LazyLoad>
                  <img
                    alt=""
                    src={
                      user.mainProfilePicture
                        ? user.mainProfilePicture?.startsWith('http')
                          ? user.mainProfilePicture
                          : `${process.env.REACT_APP_API_URL}/picUploader/${user.mainProfilePicture}`
                        : user.profilePicture
                        ? user.profilePicture
                        : userIcon
                    }
                    className="user-img"
                    ref={profileImageRef}
                  />
                </LazyLoad>
                <input
                  type="file"
                  name="profileImg"
                  onChange={onChangePicture}
                  className="user-img-input"
                />
                שלום {LoggedUser.user?.firstName}
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
              {user.user_type == 'organisation' &&
                (data?.find((userProfiles) => userProfiles.isMain) ? (
                  data?.map((userProfiles, i) => {
                    if (userProfiles.isMain) {
                      return (
                        <>
                          <h1>פרופיל ראשי</h1>
                          <Link
                            to={`/mainprofiledetails/${userProfiles._id}`}
                            state={{ id: userProfiles._id, userId: userId }}
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
                                {userProfiles.firstName}
                              </div>
                              <ul className="admins-list">
                                {userProfiles.admins &&
                                  userProfiles.addAdmins.map((admin) => (
                                    <li key={admin._id}>{admin}</li>
                                  ))}
                              </ul>
                            </div>
                          </Link>
                        </>
                      );
                    }
                  })
                ) : (
                  <>
                    <h1>פרופיל ראשי</h1>
                    <Link to={`/createmainprofile/${LoggedUser.user?._id}`}>
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
                  </>
                ))}
              <h1 className="profile-title">הפרופילים שלי</h1>
              <div className="profiles">
                {data &&
                  data.length > 0 &&
                  data.map((userProfiles, i) => {
                    if (userProfiles.isMain === false) {
                      return (
                        <Link
                          to={`/profiledetails/${userProfiles._id}`}
                          state={{ id: userProfiles._id }}
                          key={i}
                          style={{ cursor: 'hover' }}
                        >
                          <div className="profile-container" key={i}>
                            <div className="profile-image-div">
                              <LazyLoad>
                                <img
                                  className="profile-image"
                                  src={
                                    userProfiles.profileImg?.startsWith('http')
                                      ? userProfiles.profileImg
                                      : `${process.env.REACT_APP_API_URL}/${userProfiles.profileImg}`
                                  }
                                  alt=""
                                />
                              </LazyLoad>
                            </div>
                            <div className="profile-name">
                              {userProfiles.firstName} {userProfiles.lastName}
                            </div>
                            <ul className="admins-list">
                              {userProfiles.admins &&
                                userProfiles.addAdmins.map((admin) => (
                                  <li key={admin._id}>{admin}</li>
                                ))}
                            </ul>
                          </div>
                        </Link>
                      );
                    }
                  })}
                <Link to={`/createprofile/${LoggedUser.user?._id}`}>
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
              {/* <h1 className="profile-title">הגדרות חשבון</h1>
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
                <Link to="/plans">
                  <div className="big-button" style={{ padding: '5px' }}>
                    נהל תוכנית
                  </div>
                </Link>
              </div>
              <div>
                <h3 className="settings-subtitle">:סוג התוכנית </h3>
                <h3 className="settings-subtitle">:סיום התוכנית </h3>
              </div> */}
              <Link to="/">
                <button
                  className="logout-btn"
                  style={{ cursor: 'pointer' }}
                  onClick={LoggedUser.myFirebase.logout}
                >
                  התנתק
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="notifications-container">
          <div className="notifications-title">
            <h1 onClick={() => setShow(false)} className="notifications-back">
              חזרה
            </h1>
            <h1 className="notifications-title-text">התראות</h1>
          </div>
          <h3 style={{ fontSize: '30px', marginBottom: '20px' }}>
            התראות חדשות
          </h3>
          <div className="container">
            {notifications.map((n) => {
              return (
                <div className="row">
                  <div className="col-lg-8 col-12 mx-auto">
                    <div className="notification-line">
                      <div className="notification-text">
                        <span>{n.date}</span> | <span>{n.time}</span>{' '}
                        <span>{n.action}</span>
                      </div>
                      <LazyLoad>
                        <img
                          alt=""
                          src={n.profileImg}
                          className="notification-img"
                        />
                      </LazyLoad>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <SocialFooter backgroundColor="#DCECF4;" color="#6097BF" />
        </div>
      )}
      <Footer />
    </>
  );
};
