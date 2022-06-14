import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import mainImage from '../../assets/Rectangle.png';
import { useSearch } from '../../context/SearchContext';
import { Search } from '@material-ui/icons';
import leftCloud from '../../assets/light-blue-left-cloud.png';
import rightCloud from '../../assets/rightCloud.png';
import exampleProfileImage from '../../assets/exampleProfileImage.png';
import { Player } from 'video-react';
import Slider from 'react-slick';
import exampleProfileImage2 from '../../assets/asi.jpg';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import f12 from '../../assets/Rectangle12.png';
import f13 from '../../assets/Rectangle13.png';
import f14 from '../../assets/Rectangle14.png';
import f15 from '../../assets/Rectangle15.png';
import f16 from '../../assets/Rectangle16.png';
import f17 from '../../assets/Rectangle17.png';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import axios from 'axios';
import Topbar from '../../components/topbar/Topbar';
import FullWidthVideo from '../../components/fullWidthVideo/FullWidthVideo';
const HomeMobile = (props) => {
  const user = props.user;
  const testimonialSettings = props.testimonialSettings;
  const settings = props.settings;
  const [searchData, setSearchData] = useState([]);
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
    <div className="home-mobile-whole-page">
      <Topbar />
      <div
        className="homeContainer-mobile"
        style={{
          backgroundImage: `url(${mainImage})`,
          width: '100%',
          height: '250px',
          overflow: 'hidden',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'noRepeat',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '90px',
            position: 'absolute',
            bottom: '0px',
          }}
        >
          <div className="" style={{ textAlign: 'center' }}>
            <h2 className="MobileH2">בית חדש לחיים שאחרי</h2>
            {console.log(user)}
            {user ? (
              <Link
                to={`/createprofile/${user._id}`}
                // onClick={() => {window.reload()}}
              >
                <div className="mobile-home-profile-creation-btn">
                  ליצירת פרופיל ללא עלות
                </div>
              </Link>
            ) : (
              <Link
                to="/register"
                // onClick={() => {window.reload()}}
              >
                <div className="mobile-home-profile-creation-btn">
                  ליצירת פרופיל ללא עלות
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="search-container-home-mobile p-3">
        {/* <div className="searchbar-container-home-mobile"> */}
        <div className="flex items-center bg-white w-6/12 p-2 rounded-sm">
          <input
            type="text"
            placeholder="...חיפוש מנוח / עמותה"
            className="searchBox searchBoxTxt"
            onChange={handleSearch}
            style={{ fontSize: '16px' }}
          />
          <div className="p-2 bg-white">
            <Search />
          </div>
          {value && searchData && searchData.length > 0 && (
            <div className="home-result-box-main">
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
                        <span>{`${item?.firstName} ${
                          item?.lastName === 'placeholder' ? '' : item?.lastName
                        }`}</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
        {/* </div> */}
        <Sidebar> </Sidebar>
      </div>

      <div className="mobile-vid-text-container">
        <div className="vid-text-title">
          <h2 className="mobile-home-mobile-heading">
            אדם הוא עולם ומלואו, סיפור חייו ראוי שיוזכר ויונצח לעד.
          </h2>
          <h2 className="mobile-homeMobile-moments-legacy-community">
            MOMENTS. LEGACY. COMMUNITY.
          </h2>
        </div>
        <div className="text-section-container">
          <Player
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            className="home-mobile-video"
            controls={true}
          />
          <div className="top-image-container">
            <div className="top-image">
              <p className="mobile-text-container-home">
                סיפור חייהם של יקירנו מורכבים מחלקים השלובים בחייהם של בני
                משפחתם, חברים ומכרים. עם לכתם מן העולם, סיפורם נעלם איתם.
              </p>
            </div>
          </div>
          <div className="bottom-image-container">
            <p className="mobile-text-container-home-bottom">איך נוכל לחבר</p>
            <p className="mobile-text-container-home-bottom">
              {' '}
              את החלקים ולשמר לעד{' '}
            </p>
            <p className="mobile-text-container-home-bottom">מי שהם היו?</p>

            <img
              alt=""
              src={rightCloud}
              style={{
                position: 'relative',
                right: 0,
                height: '150px',
                width: '150px',
                top: '-48px',
              }}
            ></img>
          </div>
        </div>
      </div>

      <div className="popups-container">
        <p className="mobile-life-cloud-explaination-container-home">
          ספר החיים של Life Cloud
        </p>
        <p className="mobile-life-cloud-explaination-container-home">
          להתחבר מאפשר לנו
        </p>
        <h1 className="mobile-life-cloud-explaination-container-home">
          ולשתף את הרגעים,{' '}
        </h1>
        <h1 className="mobile-life-cloud-explaination-container-home">
          הסיפורים והמורשת
        </h1>
        <h1 className="mobile-life-cloud-explaination-container-home">
          של מי שאינו איתנו
        </h1>
      </div>

      <div className="">
        <div className="">
          <div className="gridBar">
            <div className="bx">
              <div className="life_book">
                <img src={f13} width="100%" height="150px" alt="profile" />
                <div className="life_book_overlay">
                  <p>חיבור לרשתות החברתיות של המנוח</p>
                </div>
              </div>
              <div className="gridTxt">
                <p className="gridPlus">+</p>
                <h1 className="grtidTxtP">קרא עוד</h1>
              </div>
            </div>
            <div className="bx">
              <div className="life_book">
                <img src={f14} width="100%" height="150px" alt="profile" />
                <div className="life_book_overlay">
                  <p>
                    QR ייחודי ועמיד הניתן להניח בכל מקום שתבחרו ולחבר כל
                    סמארטפון ישירות לספר LifeCloud החיים של
                  </p>
                </div>
              </div>
              <div className="gridTxt">
                <p className="gridPlus">+</p>
                <h1 className="grtidTxtP">קרא עוד </h1>
              </div>
            </div>
          </div>
          <div className="gridBar">
            <div className="bx">
              <div className="life_book">
                <img src={f15} width="100%" height="150px" alt="profile" />
                <div className="life_book_overlay">
                  <p>בדרך קלה ויעילה נקבל מיקום מדויק של בית העלמין והמצבה</p>
                </div>
              </div>
              <div className="gridTxt">
                <p className="gridPlus">+</p>
                <h1 className="grtidTxtP">קרא עוד </h1>
              </div>
            </div>
            <div className="bx">
              <div className="life_book">
                <img src={f16} width="100%" height="150px" alt="profile" />
                <div className="life_book_overlay">
                  <p>
                    ניתן להוסיף תגובות, לשתף זיכרונות ותמונות עם משפחה, חברים
                    ומכרים
                  </p>
                </div>
              </div>
              <div className="gridTxt">
                <p className="gridPlus">+</p>
                <h1 className="grtidTxtP">קרא עוד </h1>
              </div>
            </div>
          </div>
          <div className="gridBar">
            <div className="bx">
              <div className="life_book">
                <img src={f17} width="100%" height="150px" alt="profile" />
                <div className="life_book_overlay">
                  <p>
                    לוח שנה – ציון ימים חשובים, שליחת הזמנות לאירועי אזכרה
                    ומפגשים
                  </p>
                </div>
              </div>
              <div className="gridTxt">
                <p className="gridPlus">+</p>
                <h1 className="grtidTxtP">קרא עוד </h1>
              </div>
            </div>
            <div className="bx">
              <div className="life_book">
                <img src={f12} width="100%" height="150px" alt="profile" />
                <div className="life_book_overlay">
                  <p>הדלקת נר או הנחת זר וירטאלי בלחיצת כפתור</p>
                </div>
              </div>
              <div className="gridTxt">
                <p className="gridPlus">+</p>
                <h1 className="grtidTxtP">קרא עוד </h1>
              </div>
            </div>
          </div>
        </div>
        {/*<div className='openers-mobile'>
          <div>
            <div className="img-300 twelve">
              <p className="img-300-text">
                בדרך קלה, ידידותית ויעילה, ניתן להעלות סרטונים ותמונות, ליצור
                אלבומים, ולשתף חברים, משפחה וקהילה
              </p>
              <div className="read-more-home">
                <span
                  style={{
                    background: '#6097bf',
                    padding: '1rem',
                    borderRadius: '15px',
                  }}
                >
                  <p>+</p>
                  <p>קרא עוד</p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-mobile">
              העלאת תמונות וסרטונים
            </h1>
          </div>

        </div>*/}
      </div>

      {/*<div className="imgs-container-middle">
        <div className='openers-mobile'>
          <div>
            <div className="img-300 thirteen">
              <p className="img-300-text">
                חיבור עמודי המנוח ברשתות החברתיות הקיימות.
              </p>
              <div className="read-more-home">
                <span
                  style={{
                    background: '#6097bf',
                    padding: '1rem',
                    borderRadius: '15px',
                  }}
                >
                  <p>+</p>
                  <p>קרא עוד</p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-mobile" >
              קישור לרשתות חברתיות
            </h1>
          </div>
        </div>
        <div className='openers-mobile'>
          <div>
            <div className="img-300 sixteen">
              <p className="img-300-text">
                ניתן להוסיף תגובות, לשתף זיכרונות ותמונות עם משפחה, חברים
                ומכרים.{' '}
              </p>
              <div className="read-more-home">
                <span
                  style={{
                    background: '#6097bf',
                    padding: '1rem',
                    borderRadius: '15px',
                  }}
                >
                  <p>+</p>
                  <p>קרא עוד</p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-mobile">
              כתיבה ושיתוף זכרונות
            </h1>
          </div>

        </div>
      </div>*/}

      {/* <div className="imgs-container">
        <div className='openers-mobile'>
          <div>
            <div className="img-300 seventeen">
              <p className="img-300-text">
                לוח שנה –ציון ימים חשובים, שליחת הזמנות לאירועי אזכרה ומפגשים.{' '}
              </p>
              <div className="read-more-home">
                <span
                  style={{
                    background: '#6097bf',
                    padding: '1rem',
                    borderRadius: '15px',
                  }}
                >
                  <p>+</p>
                  <p>קרא עוד</p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-mobile">
              ניהול מועדים
            </h1>
          </div>
        </div>
        <div className='openers-mobile'>
          <div>
            <div className="img-300 fifteen">
              <p className="img-300-text">מיקום הקבר </p>
              <div className="read-more-home">
                <span
                  style={{
                    background: '#6097bf',
                    padding: '1rem',
                    borderRadius: '15px',
                  }}
                >
                  <p>+</p>
                  <p>קרא עוד</p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-mobile">מיקום הקבר</h1>
          </div>
        </div>
      </div>*/}

      {/*<div className="mobile-example-profile">*/}
      <div className="mobile-example-profile overflow-hidden">
        {/*<div>
        <img src={exampleProfileImage} className="mobileSlide"/>
      </div>*/}

        <Slider {...settings} style={{ width: '90%', height: '280px' }}>
          <a href="#">
            <div>
              <img
                src={exampleProfileImage}
                className="mobile-example-profile-image"
              />
            </div>
          </a>
          <a href="#">
            <div className="">
              <img
                src={exampleProfileImage2}
                className="mobile-example-profile-image"
              />
            </div>
          </a>
        </Slider>
      </div>

      <a href="/createprofile" className="creation-btn">
        <div className="profile-div">+ לצפייה בפרופיל לדוגמה</div>
      </a>

      <a href="/createprofile" className="creation-btn">
        <div className="profile-div" style={{ backgroundColor: '#6097BF' }}>
          + יצירת פרופיל חדש - ללא עלות!
        </div>
      </a>
      {/* 
      <a href="/createprofile" className="creation-btn">
        <div className="profile-div" style={{ backgroundColor: '#46779B' }}>
          + לעמוד תוכניות ורכישה
        </div>
      </a> */}

      <FullWidthVideo />
      <div className="seperation-div-home-mobile-try1"></div>
      <div className="sldrBoxx">
        <div className="MobileTestimonials">
          <Slider {...testimonialSettings}>
            <div>
              <h3 className="MobilePilKahol">
                "בזכות העלאה ושיתוף תמונות, סיפורים וסרטונים של חברים ומכרים,
                נחשפתי לצדדים חדשים ומרגשים [של אהובי]{' '}
              </h3>
              <h5>-ס״א-</h5>
            </div>
            <div>
              <h3 className="MobilePilKahol">
                "הבנתי שאם אני לא עושה לייף בוק לאמא שלי, נכדיי לא יכירו אותה"
                אידית צעירי
              </h3>
              <h5>-עידית צעירי-</h5>
            </div>
            <div>
              <h3 className="MobilePilKahol">
                "חיילי גולני הצעירים זכו לראשונה להכיר את בני צחי, בזכות ה-QR
                שעל המצבה"{' '}
              </h3>
              <h5>-שולה דאלי-</h5>
            </div>
            <div>
              <h3 className="MobilePilKahol">
                ״הלייף בוק נראה ממש כמו הפרופיל שלעולם לא היה לאמא בפייסבוק.״
              </h3>
              <h5>-אריאל-</h5>
            </div>
          </Slider>
        </div>

        <img
          alt=""
          src={leftCloud}
          style={{ height: '100px', top: '-50px', position: 'relative' }}
        ></img>
      </div>
      <SocialFooter />
      <Footer />
    </div>
  );
};

export default HomeMobile;
