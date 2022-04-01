import React, { useState } from 'react';
import './topbar.css';
import blueLogo from '../../assets/logo-blue.png';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import WithLanguage from '../languageButton/WithLanguage';
import LanguageButton from '../languageButton/LanguageButton';
import userIcon from '../../assets/userIcon.png';

const Topbar = (props) => {
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

 
  const [show, toggleShow] = useState(false);
  const [sidebar, toggleSidebar] = useState(false);
      const option=()=>{ 
        console.log("SIdebar");
      document.querySelector(".sidebar").classList.toggle("-translate-x-full");
          }



  return (
    <div className="">
    {/*<div className="topbarContainer">*/}
    <div className="flex justify-between items-center p-3">
      
        <div className="md:hidden">
        <WithLanguage>
          <LanguageButton />
        </WithLanguage>
        </div>
        <div className="md:flex md:items-center">
      <div className="">
        <Link to="/">
          <img className="" src={blueLogo} alt="" className="object-cover w-36 md:w-52 "/>
        </Link>
      </div>  
        <div className="hidden md:block">
        <WithLanguage>
          <LanguageButton />
        </WithLanguage>
      </div>
      </div>
      <div className="flex items-center space-x-3 md:hidden">
         <div className="">
         <svg
           className="svg-icon search-icon h-5"
           aria-labelledby="title desc"
           role="img"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 19.9 19.7"
           onClick={() => toggleShow(!show)}>toggle: {show ? 'show' : 'hide'}
          >
           <title id="title">Search Icon</title>
           
           <desc id="desc">A magnifying glass icons.</desc>
           <g className="search-path" fill="none" stroke="#848F91">
             <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
             <circle cx={8} cy={8} r={7} />
           </g>
           </svg>
         </div>
         <div>
           <svg
            className="h-5 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => toggleSidebar(!sidebar)}>toggle:{sidebar ? 'show' : 'hide'}
          > 
         <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         </div>
      </div> 
      <div className="hidden md:block">
      <div className="flex space-x-5">
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
      </div>
      {show?
      <div className="flex h-12 bgBlue w-full justify-center items-center">
         <input type="text" placeholder="Search" className="px-2 py-1 w-9/12 rounded-xl"/>
      </div>:""
      }
    {/*Side bar*/}
    {sidebar?
   <div id="sideBar" className="h-60 w-40 py-2  blueBtn shadow-sm rounded-sm absolute z-50 top-0 right-0"> 
   <div>
   <button onClick={() => toggleSidebar(!sidebar)} className="absolute right-0 px-2 text-white">
   <svg xmlns="http://www.w3.org/2000/svg" class="font-bold" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg>
   </button>
   </div>
   {/*mobile Menu Bar*/}
   <div className="mt-4 w-full text-white"> 
   <ul>
     <li className="p-2 border-b border-white">A</li>
     <li className="p-2 border-b border-white">B</li>
     <li className="p-2 border-b border-white">C</li>
     <li className="p-2 border-b border-white">D</li>
   </ul>
   </div>
   </div>:""
      }
</div>
  );
};

export default Topbar;
