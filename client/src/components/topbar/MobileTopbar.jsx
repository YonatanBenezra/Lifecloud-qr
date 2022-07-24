import React, { useState } from 'react';
import './MobileTopbar.css';
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

const MobileTopbar = (props) => {
  const LoggedUser = useContext(AuthContext);
  const [value, setValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const { user } = useContext(AuthContext);
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

  const [show, toggleShow] = useState(false);
  const [sidebar, toggleSidebar] = useState(false);
  const option = () => {
    document.querySelector('.sidebar').classList.toggle('-translate-x-full');
  };

  return (
    <div>
      <div className="topbarContainer">
        <div className="headerFlex">
          {/* <div className="languageBox">
            <WithLanguage>
              <LanguageButton />
            </WithLanguage>
          </div> */}
          <div className="logoBox">
            <Link
              to="/"
              className=""
              style={{ textDecoration: 'none', color: '#6097BF' }}
            >
              <LazyLoad>
                <img className="logoImg" src={blueLogo} alt="" />
              </LazyLoad>
            </Link>
          </div>
          <div className="menuBox">
            {/*<Search className="srchIco" />*/}
            <div className="srchIco">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                onClick={() => toggleShow(!show)}
              >
                toggle: {show ? 'show' : 'hide'}
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="10" cy="10" r="7"></circle>
                <line x1="21" y1="21" x2="15" y2="15"></line>
              </svg>
            </div>

            <h1 className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                onClick={() => toggleSidebar(!sidebar)}
              >
                toggle:{sidebar ? 'show' : 'hide'}
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            </h1>
          </div>
        </div>
        <div className="topbarCenter">
          <div className="topbarCenter-search">
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
                      <Link
                        to={`/${
                          item.isMain ? 'mainprofiledetails' : 'profiledetails'
                        }/${item._id}`}
                      >
                        <div className="ResultBox">
                          <div>
                            <span>
                              <LazyLoad>
                                <img
                                  style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '30px',
                                  }}
                                  src={`${process.env.REACT_APP_API_URL}/${item.profileImg}`}
                                  alt=""
                                />
                              </LazyLoad>
                            </span>
                          </div>
                          <div>{`${item.firstName} ${item.lastName}`}</div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div style={{ textAlign: 'center' }}>אין מידע</div>
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
                    to={`/contact-us`}
                    style={{ textDecoration: 'none', color: '#6097BF' }}
                    className="topbarLink"
                  >
                    צור קשר{' '}
                  </Link>

                  <Link
                    to={`/shop`}
                    style={{ textDecoration: 'none', color: '#6097BF' }}
                    className="topbarLink"
                  >
                    חנות{' '}
                  </Link>

                  <Link
                    style={{ marginRight: '15px' }}
                    to={`/userprofiles/${user._id}`}
                    className="topbarLink"
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

        {/*Sidebar*/}
        {sidebar && (
          <div id="sideBar" className="sidebarMenu">
            <div className="blueBg">
              <button
                onClick={() => toggleSidebar(!sidebar)}
                className="closeBtn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="font-bold"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
            {/*mobile Menu Bar*/}
            <div className="mt-4 w-full text-white blueBg">
              <ul className="menuList">
                {user ? (
                  <React.Fragment>
                    <li className="p-2 border-white">
                      <Link
                        to={`/`}
                        className="text-white"
                        onClick={LoggedUser.myFirebase.logout}
                      >
                        התנתק
                      </Link>
                    </li>
                    <li className="p-2 border-white">
                      <Link
                        to={`/createprofile/${LoggedUser.user?._id}`}
                        className="text-white"
                      >
                        צור פרופיל
                      </Link>
                    </li>
                    <li className="p-2 border-white">
                      <Link to={`/about`} className="text-white">
                        אודות
                      </Link>
                    </li>

                    <li className="p-2 border-white">
                      <Link to="/contact-us" className="text-white">
                        צור קשר
                      </Link>
                    </li>
                    <li className="p-2 border-white">
                      <Link
                        to={`/userprofiles/${user._id}`}
                        className="text-white"
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
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li className="p-2 border-b border-white">
                      <Link to={`/about`} className="text-white">
                        אודות
                      </Link>
                    </li>

                    {/* <li className="p-2 border-b border-white">
                      <Link to="/plans" className="text-white">
                        תוכניות
                      </Link>
                    </li> */}

                    <li className="p-2 border-b border-white">
                      <Link to="/login" className="text-white">
                        התחברות לחשבון
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/*Search Box*/}
      {show && (
        <div className="srchBox d-flex">
          <input
            type="text"
            placeholder="...שפח"
            className="topBarSearchBox"
            onChange={handleSearch}
          />

          {value && searchData && searchData.length > 0 && (
            <div className="result-box-main mobile_result_box">
              {searchData?.map((item) => {
                return (
                  <Link
                    to={`/${
                      item.isMain ? 'mainprofiledetails' : 'profiledetails'
                    }/${item._id}`}
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
                      <div>{`${item.firstName} ${item.lastName}`}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileTopbar;
