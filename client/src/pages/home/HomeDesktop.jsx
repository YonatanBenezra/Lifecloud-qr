import React, { useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import mainImage from '../../assets/Rectangle.png';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
import { Search } from '@material-ui/icons';
import leftCloud from '../../assets/light-blue-left-cloud.png';
import rightCloud from '../../assets/rightCloud.png';
import exampleProfileImage from '../../assets/exampleProfileImage.png';
import { Player } from 'video-react';
import Slider from 'react-slick';
import './home.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
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
        }}
      ></div>
      <div className="home-floating-text">
        <h2>יוצרים בית חדש לחיים שאחרי</h2>
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
                  <Link to={`/profiledetails/${item._id}`} key={index}>
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
            .כל אדם הוא עולם ומלואו שראוי שסיפור חייו ייזכר ויונצח לעד
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
                משפחתם, חברים ומכרים. אם לכתם מן העולם, סיפורם נעלם איתם.
              </p>
            </div>
          </div>
          <div className="bottom-image-container-home-desktop">
            <p className="text-container-home-desktop">
              {/* איך נוכל לחבר את <br></br>החלקים ולספר מי הם היו?{' '} */}
              איך נוכל לחבר את החלקים
              <br /> ולשמר לעד
              <br /> מי שהם היו?
            </p>
            <img alt="" src={rightCloud} className="right-cloud" />
          </div>
            <Player
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              width="60%"
              className="react-player-home-desktop"
              controls={true}
            />
        </div>
      </div>

      <div className="popups-container">
        <h1 className="text-container-home-desktop-emphasis">
          מאפשר לנו LifeCloud ספר החיים של
          <br></br> לחבר ולשתף את הסיפורים, המורשת והחוויות
        </h1>
      </div>
      <div className="imgs-container">
        <div>
          <div>
            <div className="img-300 thirteen">
              <p className="img-300-text">
                חיבור עמודי המנוח ברשתות החברתיות הקיימות.
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>+</p>
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
                קוד QR החרוט במקום ייחודי ועמיד שתבחרו, יחבר כל סמארטפון ישירות
                לספר החיים של המנוח{' '}
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>+</p>
                  <p>קרא עמודי  </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">ייחודי QR קוד</h1>
          </div>
        </div>
        <div>
          <div>
            <div className="img-300 twelve">
              <p className="img-300-text">
                בדרך קלה, ידידותית ויעילה, ניתן להעלות סרטונים ותמונות, ליצור
                אלבומים, ולשתף חברים, משפחה וקהילה
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>+</p>
                  <p>קרא עמודי  </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">העלאת תמונות וסרטונים</h1>
          </div>
        </div>
      </div>
      <div className="imgs-container">
        <div>
          <div>
            <div className="img-300 sixteen">
              <p className="img-300-text">
                ניתן להוסיף תגובות, לשתף זיכרונות ותמונות עם משפחה, חברים
                ומכרים.{' '}
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>+</p>
                  <p>קרא עמודי  </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">כתיבה </h1>
            <h1 className="h1-home-desktop" style={{ marginTop: '0' }}>
              ושיתוף זכרונות
            </h1>
          </div>
        </div>
        <div>
          <div>
            <div className="img-300 seventeen">
              <p className="img-300-text">
                לוח שנה –ציון ימים חשובים, שליחת הזמנות לאירועי אזכרה ומפגשים.{' '}
              </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>+</p>
                  <p>קרא עמודי  </p>{' '}
                </span>
              </div>
            </div>{' '}
            <h1 className="h1-home-desktop">ניהול מועדים</h1>
          </div>
        </div>
        <div>
          <div>
            <div className="img-300 fifteen">
              <p className="img-300-text">מיקום הקבר </p>
              <div className="read-more-home">
                <span className="read-more-home-desktop">
                  <p>+</p>
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
              style={{ backgroundImage: `url(${exampleProfileImage})` }}
              className="example-profile-image"
            ></div>
          </a>
          <a href="#">
            <div
              style={{ backgroundImage: `url(${exampleProfileImage})` }}
              className="example-profile-image"
            ></div>
          </a>
          <a href="#">
            <div
              style={{ backgroundImage: `url(${exampleProfileImage})` }}
              className="example-profile-image"
            ></div>
          </a>
          <a href="#">
            <div
              style={{ backgroundImage: `url(${exampleProfileImage})` }}
              className="example-profile-image"
            ></div>
          </a>
        </Slider>
      </div>
      <Link
        to="/profiledetails/626d2e23014f9cacc1158d52"
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
      <Link to="/shop" className="creation-btn">
        <div className="profile-div" style={{ backgroundColor: '#46779B' }}>
          + LifeCloud חנות
        </div>
      </Link>
      <div className="testimonials">
        <Slider {...testimonialSettings}>
          <div>
            <h3 className="pilKahol">
              "בזכות העלאה ושיתוף תמונות, סיפורים וסרטונים של חברים ומכרים,
              נחשפתי לצדדים חדשים ומרגשים [של אהובי]{' '}
            </h3>
            <h5 style={{ marginBottom: '15px' }}>-ס״א-</h5>
          </div>
          <div>
            <h3 className="pilKahol">
              "הבנתי שאם אני לא עושה לייף בוק לאמא שלי, נכדיי לא יכירו אותה"
              אידית צעירי
            </h3>
            <h5 style={{ marginBottom: '15px' }}>-עידית צעירי-</h5>
          </div>
          <div>
            <h3 className="pilKahol">
              "חיילי גולני הצעירים זכו לראשונה להכיר את בני צחי, בזכות ה-QR שעל
              המצבה"{' '}
            </h3>
            <h5 style={{ marginBottom: '15px' }}>-שולה דאלי-</h5>
          </div>
          <div>
            <h3 className="pilKahol">
              ״הלייף בוק נראה ממש כמו הפרופיל שלעולם לא היה לאמא בפייסבוק.״
            </h3>
            <h5 style={{ marginBottom: '15px' }}>-אריאל-</h5>
          </div>
        </Slider>
        <img alt="" src={leftCloud} className="testemonials-left-cloud"></img>
      </div>
      <SocialFooter />
      <Footer />
    </div>
  );
};
export default HomeDesktop;
