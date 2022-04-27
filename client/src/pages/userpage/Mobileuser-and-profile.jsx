import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './userandprofiles.css';
import Topbar from '../../components/topbar/MobileTopbar';
import { AuthContext } from '../../context/AuthContext';
import Lock from '../../assets/Lock.png';
import Footer from '../../components/footer/MobileFooter';
import SocialFooter from '../../components/socialFooter/MobileSocialFooter';
import { useRef } from 'react';
export const MobileUserAndprofiles = () => {
  const LoggedUser = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const id = useParams().id;
  const [userId, setId] = useState(id);

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
              notification?.memoryCreatorNotification[0]?.originalUser[0] ===
              currentLoggedUser._id
          )
          .map((item) => ({
            date: new Date(item.createdAt).toISOString().slice(0, 10),
            time: new Date(item.createdAt).toISOString().slice(11, 16),
            profileImg: `${process.env.REACT_APP_API_URL}/picUploader/${item.logedInUser[0].mainProfilePicture ||
              item.logedInUser[0].profilePicture
              }`,
            action: `${item.logedInUser[0].firstName} create a memory on ${item.memoryCreatorNotification[0].firstName} ${item.memoryCreatorNotification[0].lastName}`,
          }))
      );
      // setData(res.data);
    })();
  }, []);

  useEffect(() => {
    fetchuserprofiles();
    console.log(user)
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
    formData.append('_id', LoggedUser.user._id);
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
        <div className="ff profile">
          <div className="ff profileRight">
            <div className="ff user-main" style={{ direction: 'rtl' }}>
              <h1
                className="ff user-name"
                style={{ direction: 'rtl', flexDirection: 'column' }}
              >
                 <img
                  alt=""
                  src={
                    LoggedUser.user.mainProfilePicture
                      ? `${process.env.REACT_APP_API_URL}/picUploader/${LoggedUser.user.mainProfilePicture}`
                      : LoggedUser.user.profilePicture
                  }
                  className="ff user-img"
                  ref={profileImageRef}
                />
                <input
                  type="file"
                  name="profileImg"
                  onChange={onChangePicture}
                  className="ff user-img-input"
                />
                שלום {LoggedUser.user.firstName || LoggedUser.user.companyName}
              </h1>
              <div className="ff notifications-btn" onClick={() => setShow(true)}>
                התראות
              </div>
            </div>
            <div className="ff profiles-container">
              {user.user_type == "organisation" && (
                  data?.length > 0 ? (
                  data?.map((userProfiles, i) => {
                    if (userProfiles.isMain) {
                      return (
                        <>
                        {console.log(id)}
                          <h1>פרופיל ראשי</h1>
                          <Link
                            to={`/mainprofiledetails/${userProfiles._id}`}
                            state={{ id: userProfiles._id, userId: userId}}
                            key={i}
                            style={{ cursor: 'hover' }}
                          >
                            <div className="ff profile-container" key={i}>
                              <div className="ff profile-image-div">
                                <img
                                  className="ff profile-image"
                                  src={`${process.env.REACT_APP_API_URL}/${userProfiles.profileImg}`}
                                  alt=""
                                />
                              </div>
                              <div className="ff profile-name">
                                {userProfiles.firstName}
                              </div>
                              <ul className="ff admins-list">
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
                  <Link to={`/createmainprofile/${LoggedUser.user._id}`}>
                    <div className="ff profile-container">
                      <div className="ff profile-image create-profile-container">
                        <div className="ff inner-btn">
                          <div className="ff line-1 user-line"></div>
                          <div className="ff line-2 user-line"></div>
                        </div>
                      </div>
                      <div className="ff profile-name"> צור פרופיל חדש</div>
                    </div>
                  </Link>
                  </>
                )
              )}
              <h1 className="ff profile-title">הפרופילים שלי</h1>
              <div className="ff profiles">
                {data &&
                  data.length > 0 &&
                  data.map((userProfiles, i) => {
                    // console.log(data, userProfiles);
                    if (userProfiles.isMain === false) {
                      return (
                        <Link
                          to={`/profiledetails/${userProfiles._id}`}
                          state={{ id: userProfiles._id }}
                          key={i}
                          style={{ cursor: 'hover' }}
                        >
                          <div className="ff profile-container" key={i}>
                            <div className="ff profile-image-div">
                              <img
                                className="ff profile-image"
                                src={`${process.env.REACT_APP_API_URL}/${userProfiles.profileImg}`}
                                alt=""
                              />
                            </div>
                            <div className="ff profile-name">
                              {userProfiles.firstName} {userProfiles.lastName}
                            </div>
                            <ul className="ff admins-list">
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
                <Link to={`/createprofile/${LoggedUser.user._id}`}>
                  <div className="ff profile-container">
                    <div className="ff profile-image create-profile-container">
                      <div className="ff inner-btn">
                        <div className="ff line-1 user-line"></div>
                        <div className="ff line-2 user-line"></div>
                      </div>
                    </div>
                    <div className="ff profile-name"> צור פרופיל חדש</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="ff settings-container">
              {/* <h1 className="ff profile-title">הגדרות חשבון</h1>
              <div className="ff btns-container">
                <div className="ff big-button">
                  <img
                    src={Lock}
                    alt=""
                    style={{ height: '15px', width: '15px' }}
                  ></img>
                  פרטי{' '}
                </div>
                <div className="ff big-button">תשלומים</div>
                <Link to="/plans">
                  <div className="ff big-button" style={{ padding: '5px' }}>
                    נהל תוכנית
                  </div>
                </Link>
              </div>
              <div>
                <h3 className="ff settings-subtitle">:סוג התוכנית </h3>
                <h3 className="ff settings-subtitle">:סיום התוכנית </h3>
              </div> */}
              <button
                className="ff logout-btn"
                style={{ cursor: 'pointer' }}
                onClick={LoggedUser.myFirebase.logout}
              >
                התנתק
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="ff notifications-container">
          <div className="ff notifications-title">
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
          {notifications.map((n) => {
            return (
              <div className="ff notification-line">
                <div className="ff notification-text">
                  <span>{n.date}</span> | <span>{n.time}</span>{' '}
                  <span>{n.action}</span>
                </div>
                <img
                  alt=""
                  src={n.mainProfilePicture || n.profilePicture}
                  className="ff notification-img"
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
