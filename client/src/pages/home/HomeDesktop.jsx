import React, { useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import mainImage from '../../assets/Rectangle.png';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
import { Search } from '@material-ui/icons';
import leftCloud from '../../assets/light-blue-left-cloud.png';
import rightCloud from '../../assets/rightCloud.png';
import exampleProfileImage from '../../assets/exampleProfileImage.png';
import exampleProfileImage2 from '../../assets/asi.jpg';
import { Player } from 'video-react';
import Slider from 'react-slick';
import './home.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import FullWidthVideo from '../../components/fullWidthVideo/FullWidthVideo';
import LazyLoad from 'react-lazyload';

const HomeDesktop = (props) => {
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
    <div>
      <Topbar />
      <div
        className="homeContainer"
        style={{
          backgroundImage: `url(${mainImage})`,
          width: '100%',
          height: '65vh',
          overflow: 'hidden',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'noRepeat',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="home-floating-text">
        <h2 className="slogan">בית חדש לחיים שאחרי</h2>
        <Link to={user ? `/createprofile/${user._id}` : '/register'}>
          <div className="home-profile-creation-btn">יצירת פרופיל ללא עלות</div>
        </Link>
      </div>
      <div className="search-container-home-desktop">
        <div className="searchbar-container-home-desktop">
          {/* <div className="searchbar-container-home-desktop"> */}
          <input
            type="text"
            placeholder="חיפוש מנוח/עמותה..."
            className="searchInput-home-desktop"
            onChange={handleSearch}
          />
          <Search className="searchIcon" />
          {/* </div> */}
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
                                item.profileImg?.startsWith('http')
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

      <div className="vid-text-container">
        <div className="vid-text-title">
          {/* <h1 className="mb-3">
            <strong>״החיים אינם הימים שחלפו, אלא אלה שזוכרים״</strong>
            <span style={{ fontSize: '20px', marginTop: '17px', marginRight: '15px' }}>
              {' '}
              - גבריאל גרסיה מרקס{' '}
            </span>
          </h1> */}
          <h2 style={{ fontSize: '35px' }}>
            .אדם הוא עולם ומלואו, סיפור חייו ראוי שיוזכר ויונצח לעד
          </h2>
          <h2 style={{ color: '#ABC9DB', fontSize: '30px', marginTop: '1rem' }}>
            MOMENTS. COMMUNITY. LEGACY
          </h2>
        </div>
        <div className="text-section-container-desktop-home">
          <div className="top-image-container-desktop-home">
            <div className="top-image">
              <p className="text-home-desktop">
                סיפור חייהם של יקירנו מורכבים מחלקים השלובים בחייהם של בני
                משפחתם, חברים ומכרים. עם לכתם מן העולם, סיפורם נעלם איתם.
              </p>
            </div>
          </div>
          <div className="bottom-image-container-home-desktop">
            <p className="text-container-home-desktop">
              {/* איך נוכל לחבר את <br></br>החלקים ולספר מי הם היו?{' '} */}
              איך נוכל לחבר את החלקים
              <br /> ולשמר לעד מי שהם היו?
            </p>
            <Player
              src="https://res.cloudinary.com/lifecloud-qr/video/upload/v1658269642/LIFECLOUD_FIX_SUBS_1_1_askdfkjasbhdffn_f_glhqbq.mp4"
              width="60%"
              height="60%"
              fluid={false}
              className="react-player-home-desktop"
              controls={true}
            />
            <LazyLoad>
              <img alt="" src={rightCloud} className="right-cloud" />
            </LazyLoad>
          </div>
        </div>
      </div>

      <div className="popups-container">
        <h1 className="text-container-home-desktop-emphasis">
          מאפשר לנו LifeCloud ספר החיים של
          <br></br> להתחבר ולשתף את הרגעים, הסיפורים והמורשת של מי שאינו איתנו
        </h1>
      </div>
      <div className="imgs-container">
        <div>
          <div>
            <div className="img-300 thirteen">
              <p className="img-300-text">חיבור לרשתות החברתיות של המנוח</p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>קרא עוד</p>{' '}
                </span>
              </div>
            </div>
            <h1 className="h1-home-desktop">קישור לרשתות חברתיות</h1>
          </div>
        </div>
        <div>
          <div>
            <div className="img-300 fourteen">
              <p className="img-300-text">
                ייחודי ועמיד הניתן QR להניח בכל מקום שתבחרו ולחבר כל סמארטפון
                ישירות לספר LifeCloud החיים של{' '}
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>קרא עוד </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">ייחודי QR</h1>
          </div>
        </div>
        <div>
          <div>
            <div className="img-300 sixteen">
              <p className="img-300-text">
                ניתן להוסיף תגובות, לשתף זיכרונות ותמונות עם משפחה, חברים ומכרים{' '}
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>קרא עוד </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">Lifecloud wall </h1>
          </div>
        </div>
      </div>
      <div className="imgs-container">
        <div>
          <div>
            <div className="img-300 twelve">
              <p className="img-300-text">
                הדלקת נר או הנחת זר וירטאלי בלחיצת כפתור
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>קרא עוד </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">הדלקת נר והנחת זר וירטאלי</h1>
          </div>
        </div>
        <div>
          <div>
            <div className="img-300 seventeen">
              <p className="img-300-text">
                לוח שנה – ציון ימים חשובים, שליחת הזמנות לאירועי אזכרה ומפגשים{' '}
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>קרא עוד </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">ניהול מועדים</h1>
          </div>
        </div>
        <div>
          <div>
            <div className="img-300 fifteen">
              <p className="img-300-text">
                {' '}
                בדרך קלה ויעילה נקבל מיקום מדויק של בית העלמין והמצבה{' '}
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>קרא עוד</p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">מיקום הקבר</h1>
          </div>
        </div>
      </div>

      <div className="example-profile">
        <Slider {...settings}>
          <a href="#">
            <div
              style={{ backgroundImage: `url(${exampleProfileImage2})` }}
              className="example-profile-image"
            ></div>
          </a>
          <Link href="/profiledetails/62930e650fc791cf90ac210c">
            <div
              style={{ backgroundImage: `url(${exampleProfileImage2})` }}
              className="example-profile-image"
            ></div>
          </Link>
        </Slider>
      </div>
      <Link
        to="/profiledetails/62930e650fc791cf90ac210c"
        className="creation-btn"
      >
        <div className="profile-div">+ צפייה בעמוד לדוגמה</div>
      </Link>
      <Link
        to={user ? `/createprofile/${user._id}` : '/register'}
        className="creation-btn"
      >
        <div className="profile-div" style={{ backgroundColor: '#6097BF' }}>
          + יצירת פרופיל חדש - ללא עלות!
        </div>
      </Link>
      {/* <Link to="#" className="creation-btn">
        <div className="profile-div" style={{ backgroundColor: '#46779B' }}>
          + להדלקת נר או הנחת זר וירטאלי
        </div>
      </Link> */}
      {/* <Link to="/shop" className="creation-btn">
        <div className="profile-div" style={{ backgroundColor: '#46779B' }}>
          + LifeCloud חנות
        </div>
      </Link> */}
      <FullWidthVideo />
      <div className="testimonials">
        <Slider {...testimonialSettings}>
          <div>
            <h3 className="pilKahol">
              "בזכות העלאה ושיתוף תמונות, סיפורים וסרטונים של חברים ומכרים,
              נחשפתי לצדדים חדשים ומרגשים [של אבי]{' '}
            </h3>
            <h5 style={{ marginBottom: '15px' }}>-סיגל אהרונוביץ-</h5>
          </div>
          <div>
            <h3 className="pilKahol">
              "הבנתי שאם אני לא עושה לאמא שלי, נכדיי לא יכירו אותה Lifebook"
              עידית צעירי
            </h3>
            <h5 style={{ marginBottom: '15px' }}>-עידית צעירי-</h5>
          </div>
          <div>
            <h3 className="pilKahol">
              נראה ממש כמו הפרופיל שלעולם לא היה לאמא בפייסבוק.״-Lifebook"
            </h3>
            <h5 style={{ marginBottom: '15px' }}>-אריאל-</h5>
          </div>
        </Slider>
        <LazyLoad>
          <img alt="" src={leftCloud} className="testemonials-left-cloud"></img>
        </LazyLoad>
      </div>
      <SocialFooter />
      <Footer />
    </div>
  );
};
export default HomeDesktop;
