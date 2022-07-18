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
import f13 from '../../assets/Rectangle13.svg';
import f14 from '../../assets/Rectangle14.svg';
import f15 from '../../assets/Rectangle15.svg';
import f16 from '../../assets/Rectangle16.svg';
import f18 from '../../assets/Rectangle18.svg';
import f17 from '../../assets/Rectangle17.svg';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import axios from 'axios';
import Topbar from '../../components/topbar/Topbar';
import FullWidthVideo from '../../components/fullWidthVideo/FullWidthVideo';
import LazyLoad from 'react-lazyload';
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
                            <LazyLoad>
                              <img
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '30px',
                                }}
                                src={
                                  item.profileImg.startsWith('http')
                                    ? item.profileImg
                                    : `${process.env.REACT_APP_API_URL}/${item.profileImg}`
                                }
                                alt=""
                              />
                            </LazyLoad>
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
            אדם הוא עולם ומלואו,
            <br /> סיפור חייו ראוי שיוזכר ויונצח לעד.
          </h2>
          <h2 className="mobile-homeMobile-moments-legacy-community">
            MOMENTS. LEGACY. COMMUNITY.
          </h2>
        </div>
        <div className="text-section-container">
          <Player
            src="https://youtu.be/GthRGhlesKY"
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

            <img alt="" src={rightCloud} className="cloud-img-section" />
          </div>
        </div>
      </div>

      <div className="popups-container">
        <p>
          <span style={{ direction: 'rtl' }}>
            <span>Life Cloud</span> ספר החיים של
          </span>
          <br /> ,להתחבר מאפשר לנו ולשתף את הרגעים <br />
          הסיפורים והמורשת של מי שאינו איתנו
        </p>
      </div>

      <div className="">
        <div className="">
          <div className="gridBar" style={{ flexDirection: 'row-reverse' }}>
            <div className="bx">
              <div className="life_book">
                <LazyLoad>
                  <img src={f17} width="100%" height="100%" alt="profile" />
                </LazyLoad>

                <div className="life_book_overlay">
                  <p>בדרך קלה ויעילה נקבל מיקום מדויק של בית העלמין והמצבה</p>
                </div>
              </div>
              <div className="gridTxt">
                <h1 className="h1-home-desktop">Lifecloud wall</h1>

                <p className="gridPlus">+</p>
                <h1 className="gridTxtP">קרא עוד </h1>
              </div>
            </div>
            <div className="bx">
              <div className="life_book">
                <LazyLoad>
                  <img src={f18} width="100%" height="100%" alt="profile" />
                </LazyLoad>

                <div className="life_book_overlay">
                  <p>
                    ניתן להוסיף תגובות, לשתף זיכרונות ותמונות עם משפחה, חברים
                    ומכרים
                  </p>
                </div>
              </div>
              <div className="gridTxt">
                <h1 className="h1-home-desktop">הדלקת נר והנחת זר וירטאלי</h1>
                <p className="gridPlus">+</p>
                <h1 className="gridTxtP">קרא עוד </h1>
              </div>
            </div>
          </div>

          <div className="gridBar">
            <div className="bx">
              <div className="life_book">
                <LazyLoad>
                  <img src={f16} width="100%" height="100%" alt="profile" />
                </LazyLoad>

                <div className="life_book_overlay">
                  <p>
                    לוח שנה – ציון ימים חשובים, שליחת הזמנות לאירועי אזכרה
                    ומפגשים
                  </p>
                </div>
              </div>
              <div className="gridTxt">
                <h1 className="h1-home-desktop">ניהול מועדים</h1>

                <p className="gridPlus">+</p>
                <h1 className="gridTxtP">קרא עוד </h1>
              </div>
            </div>
            <div className="bx">
              <div className="life_book">
                <LazyLoad>
                  <img src={f15} width="100%" height="100%" alt="profile" />
                </LazyLoad>

                <div className="life_book_overlay">
                  <p>הדלקת נר או הנחת זר וירטאלי בלחיצת כפתור</p>
                </div>
              </div>
              <div className="gridTxt">
                <h1 className="h1-home-desktop">מיקום הקבר</h1>

                <p className="gridPlus">+</p>
                <h1 className="gridTxtP">קרא עוד </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="gridBar">
          <div className="bx">
            <div className="life_book">
              <LazyLoad>
                <img src={f13} width="100%" height="100%" alt="profile" />
              </LazyLoad>

              <div className="life_book_overlay">
                <p>חיבור לרשתות החברתיות של המנוח</p>
              </div>
            </div>
            <div className="gridTxt">
              <h1 className="h1-home-desktop">קישור לרשתות חברתיות</h1>
              <p className="gridPlus">+</p>
              <h1 className="gridTxtP">קרא עוד</h1>
            </div>
          </div>
          <div className="bx">
            <div className="life_book">
              <LazyLoad>
                <img src={f14} width="100%" height="100%" alt="profile" />
              </LazyLoad>

              <div className="life_book_overlay">
                <p>
                  QR ייחודי ועמיד הניתן להניח בכל מקום שתבחרו ולחבר כל סמארטפון
                  ישירות לספר LifeCloud החיים של
                </p>
              </div>
            </div>
            <div className="gridTxt">
              <h1 className="h1-home-desktop">ייחודי QR</h1>
              <p className="gridPlus">+</p>
              <h1 className="gridTxtP">קרא עוד </h1>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="mobile-example-profile">*/}
      <div className="mobile-example-profile overflow-hidden">
        {/*<div>
        <img src={exampleProfileImage} className="mobileSlide"/>
      </div>*/}

        <Slider {...settings} style={{ width: '90%', height: '280px' }}>
          <a href="#">
            <div>
              <LazyLoad>
                <img
                  src={exampleProfileImage2}
                  className="mobile-example-profile-image"
                  alt=""
                />
              </LazyLoad>
            </div>
          </a>

          <a href="#">
            <div className="">
              <LazyLoad>
                <img
                  src={exampleProfileImage2}
                  className="mobile-example-profile-image"
                  alt=""
                />
              </LazyLoad>
            </div>
          </a>
        </Slider>
      </div>

      <Link
        to="/profiledetails/62930e650fc791cf90ac210c"
        className="creation-btn"
      >
        <div className="profile-div">+ לצפייה בפרופיל לדוגמה</div>
      </Link>

      <Link
        to={user ? `/createprofile/${user._id}` : '/register'}
        className="creation-btn"
      >
        <div className="profile-div" style={{ backgroundColor: '#6097BF' }}>
          + יצירת פרופיל חדש - ללא עלות!
        </div>
      </Link>
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
        <LazyLoad>
          <img
            alt=""
            src={leftCloud}
            style={{ height: '100px', top: '-50px', position: 'relative' }}
          />
        </LazyLoad>
      </div>
      <SocialFooter />
      <Footer />
    </div>
  );
};

export default HomeMobile;
