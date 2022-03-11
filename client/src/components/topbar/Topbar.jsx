import React, { useEffect, useState, useRef} from "react";
import './topbar.css';
import blueLogo from '../../assets/logo-blue.png';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import WithLanguage from '../languageButton/WithLanguage';
import LanguageButton from '../languageButton/LanguageButton';
import userIcon from '../../assets/userIcon.png';
import ChatWindow  from '../../pages/chat2/ChatWindow';





const Topbar = (props) => {

  
        const [isSticky, setSticky] = useState(false);
          const ref = useRef(null);
          const handleScroll = () => {
            if (ref.current) {
              setSticky(ref.current.getBoundingClientRect().top <= 0);
            }
          };
        
          useEffect(() => {
            window.addEventListener('scroll', handleScroll);
        
            return () => {
              window.removeEventListener('scroll', () => handleScroll);
            };
          }, []);
  



  const [showChatWindow, toggleChatWindow] = useState(false);
  const buttonHandler = () => {
    toggleChatWindow(showChatWindow => !showChatWindow);
  }


  const LoggedUser = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);
  const { user } = useContext(AuthContext);
  const handleSearch = async (e) => {
    const { value } = e.target;
    console.log(value);
    if (value.length === 0 || value.trim() === '' || value === null) {
      return false;
    } else {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profile/searchProfile/${value}`
      );
      setSearchData(res.data);
    }
  };
  return (

    <div className="topbarContainer">
      <button onClick = {buttonHandler}>Toggle Chat Window</button>
          <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
            {showChatWindow && <ChatWindow />}
      </div>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none', color: '#6097BF' }}>
          <img className="logo" src={blueLogo} alt="" />
        </Link>
        <WithLanguage>
          <LanguageButton />
        </WithLanguage>
      </div>
      <div className="topbarCenter">
          
        <div style={{ position: 'relative', textAlign: 'end' }}>
          <input
            type="text"
            placeholder="חיפוש..."
            className="SearchInput top-search"
            onChange={handleSearch}
          />
          {searchData && searchData.length > 0 ? (
            <div className="ResultBoxMain">
              {searchData && searchData.length > 0 ? (
                searchData.map((item) => {
                  return (
                    <Link to={`profiledetails/${item._id}`}>
                      <div className="ResultBox">
                        <div>
                          <span>
                            <img
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '30px',
                              }}
                              src={`${process.env.REACT_APP_API_URL}/${item.profileImg}`}
                              alt=""
                            />
                          </span>
                        </div>
                        <div>{`${item.firstName} ${item.lastName}`}</div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center' }}>No Data</div>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            {user ? (
              <div className="logged-nav">
                <Link
                  to={`/`}  
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                  onClick={LoggedUser.myFirebase.logout}
                >
                  התנתק{' '}
                </Link>

                <Link
                to={`/createprofile/${LoggedUser.user._id}`}
                  onClick={() => {window.reload()}}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                >
                  צור פרופיל{' '}
                </Link>

                <Link
                  to={`/about`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                >
                  אודות
                </Link>

                <Link
                  to={`/contact`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                >
                  צור קשר{' '}
                </Link>

                  <Link
                  to={`/plans`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                >
                  תוכניות{' '}
                </Link>

                <Link
                  style={{ marginRight: '15px' }}
                  to={`/userprofiles/${user._id}`}
                  className="topbarLink"
                >
                  <img src={
                  user.mainProfilePicture
                  ? `${process.env.REACT_APP_API_URL}/picUploader/${user.mainProfilePicture}`
                  : user.profilePicture
                  ? user.profilePicture
                  : userIcon
                  }
                  alt=""
                    className="topbarImg"
                  />
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to={`/about`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                >
                  אודות
                </Link>
                <Link
                  to={`/login`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                >
                  התחברות
                </Link>
                <Link
                  to={`/register`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className="topbarLink"
                >
                  הרשמה
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
