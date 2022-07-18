import React, { useState } from 'react';
import './DesktopTopbar.css';
import blueLogo from '../../assets/logo-blue.png';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import WithLanguage from '../languageButton/WithLanguage';
import LanguageButton from '../languageButton/LanguageButton';
import userIcon from '../../assets/userIcon.png';
import { Search } from '@material-ui/icons';
import LazyLoad from 'react-lazyload';

const DesktopTopbar = (props) => {
  const LoggedUser = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);
  const { user } = useContext(AuthContext);
  const [clicked, setClicked] = useState('');
  const [value, setValue] = useState('');

  const handleSearch = async (e) => {
    const { value } = e.target;
    setValue(value);

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
      <div className="topbarLeft">
        <Link
          to="/"
          className="life-cloud-logo-image-topbar-mobile"
          style={{ textDecoration: 'none', color: '#6097BF' }}
        >
          <LazyLoad>
            <img className="logo" src={blueLogo} alt="" />
          </LazyLoad>
        </Link>
        {/* <WithLanguage>
          <LanguageButton />
        </WithLanguage> */}
      </div>
      <Search className="searchIcon-topbar-mobile" />
      <h1 className="menu-icon-topbar-mobile"> - </h1>
      <div className="topbarCenter">
        <div className="topbarCenter-search">
          <input
            type="text"
            placeholder="חיפוש..."
            className="SearchInput top-search"
            onChange={handleSearch}
          />
          {value && searchData && searchData.length > 0 && (
            <div className="result-box-main">
              {searchData &&
                searchData.length > 0 &&
                searchData.map((item, index) => {
                  return (
                    <Link
                      to={`/${
                        item.isMain ? 'mainprofiledetails' : 'profiledetails'
                      }/${item._id}`}
                      key={index}
                    >
                      <div className="result-box">
                        <div>
                          <span>
                            <LazyLoad>
                              <img
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '30px',
                                }}
                                src={
                                  item.profileImg?.startsWith('http')
                                    ? item.profileImg
                                    : `${process.env.REACT_APP_API_URL}/${item.profileImg}`
                                }
                                alt=""
                              />
                            </LazyLoad>
                          </span>
                        </div>
                        <span>{`${item.firstName} ${
                          item?.lastName === 'placeholder' ? '' : item?.lastName
                        }`}</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            {user ? (
              <div className="logged-nav">
                <Link
                  to={`/`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className={`${
                    clicked === 'logout' && 'topbar-active'
                  } topbarLink`}
                  onClick={LoggedUser.myFirebase.logout}
                >
                  התנתק{' '}
                </Link>

                <Link
                  to={`/createprofile/${LoggedUser.user?._id}`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className={`${
                    clicked === 'createprofile' && 'topbar-active'
                  } topbarLink`}
                  onClick={() => setClicked('createprofile')}
                >
                  צור פרופיל{' '}
                </Link>

                <Link
                  to={`/about`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  onClick={() => setClicked('about')}
                  className={`${
                    clicked === 'about' && 'topbar-active'
                  } topbarLink`}
                >
                  אודות
                </Link>

                <Link
                  to={`/contact-us`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className={`${
                    clicked === 'contact' && 'topbar-active'
                  } topbarLink`}
                  onClick={() => setClicked('contact')}
                >
                  צור קשר{' '}
                </Link>

                {/* <div onClick={() => setClicked('shop')}>
                  <Link
                    to={`/shop`}
                    style={{ textDecoration: 'none', color: '#6097BF' }}
                    className={`${
                      clicked === 'shop' && 'topbar-active'
                    } topbarLink`}
                  >
                    חנות{' '}
                  </Link>
                </div> */}
                <Link
                  to={`/userprofiles/${user._id}`}
                  className={`${
                    clicked === 'userprofiles' && 'topbar-active'
                  } topbarLink`}
                  onClick={() => setClicked('userprofiles')}
                >
                  <LazyLoad>
                    <img
                      src={
                        user.mainProfilePicture
                          ? user.mainProfilePicture?.startsWith('http')
                            ? user.mainProfilePicture
                            : `${process.env.REACT_APP_API_URL}/picUploader/${user.mainProfilePicture}`
                          : user.profilePicture
                          ? user.profilePicture
                          : userIcon
                      }
                      alt=""
                      className="topbarImg"
                    />
                  </LazyLoad>
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to={`/about`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className={`${
                    clicked === 'about' && 'topbar-active'
                  } topbarLink`}
                  onClick={() => setClicked('about')}
                >
                  אודות
                </Link>
                <Link
                  to={`/plans`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className={`${
                    clicked === 'plans' && 'topbar-active'
                  } topbarLink`}
                  onClick={() => setClicked('plans')}
                >
                  תוכניות
                </Link>
                <Link
                  to={`/login`}
                  style={{ textDecoration: 'none', color: '#6097BF' }}
                  className={`${
                    clicked === 'login' && 'topbar-active'
                  } topbarLink`}
                  onClick={() => setClicked('login')}
                >
                  התחברות לחשבון
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopTopbar;
