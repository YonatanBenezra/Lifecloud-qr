import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from './userProfile.module.css'
import './userandprofiles.css';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Lock from '../../assets/Lock.png';
import facebook from '../../assets/facebook.png';
import ProgressBar from '../../components/progressbar/progressBar'
import instagram from '../../assets/instagram.png';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
export const UserAndprofiles = () => {
  const LoggedUser = useContext(AuthContext);
  const [data, setData] = useState([]);
  const id = useParams().id;
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(`https://api.lifecloud-qr.com/api/profile/getallprofileofSingleUser/${id}`);
    setData(res.data);
  
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="user-main">
            <h1 className="user-name">שלום, {LoggedUser.user.firstName}!</h1>
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
                data.length > 0 ?
                data.map((userProfiles, i) => {
                  return (
                    <Link
                      to={`/profiledetails/${userProfiles._id}`}
                      state={{ id: userProfiles._id }}
                      key={i}
                      style={{ cursor: 'hover' }}
                    >
                      <div className="profile-container" key={i}>
                        <img
                          className="profile-image"
                          src={
                            `https://api.lifecloud-qr.com/${userProfiles.profileImg}`
                          }
                          alt=""
                        />
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
                }) : <div style={{
                  paddingTop: '8%',
                  paddingLeft: '29%',
                }}> <ProgressBar /></div>}
              <Link to={`/createprofile/${LoggedUser.user._id}`}>
                <div className="profile-container">
                  <div className="profile-image create-profile-container">
                    +
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
      <SocialFooter backgroundColor='#fff' color='#6097BF'/>
      <Footer />
    </>
  );
};
