import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import mainImage from '../../assets/Rectangle.png';
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
    const user = props.user
    const testimonialSettings = props.testimonialSettings
    const settings = props.settings
    const searchData = props.searchData
    const setSearchData = props.setSearchData
    const handleSearch = props.handleSearch
    console.log(props)
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
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="home-floating-text">
          <h2>יצירת קהילת הנצחה מותאמת אישית</h2>
          {user ? (
            <Link
            to={`/createprofile/${user._id}`}
            // onClick={() => {window.reload()}}
            >
          <div className="home-profile-creation-btn">ליצירת פרופיל ללא עלות </div>
          </Link>
          ) : (
            <Link
            to='/register'
            // onClick={() => {window.reload()}}
            >
          <div className="home-profile-creation-btn">ליצירת פרופיל ללא עלות</div>
          </Link>
          )}
        </div>
        <div className="search-container">
          <div className="searchbar-container">
            <div className="searchbar searchbar-2">
              <input
                type="text"
                placeholder="חיפוש שם \ ארגון"
                className="SearchInput"
                onChange={handleSearch}
                style={{
                  height: '93%',
                  border: 0,
                  direction: 'rtl',
                  fontSize: '20px',
                }}
              />
              <Search className="searchIcon" />
            </div>
          </div>
          <Sidebar> </Sidebar>
        </div>
        {searchData && searchData.length > 0 ? (
            <div className="home-result-box-main">
              {searchData && searchData.length > 0 ? (
                searchData.map((item) => {
                  return (
                    <Link to={`profiledetails/${item._id}`}>
                      <div className="home-result-box">
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
  
        <div className="vid-text-container">
          <div className="vid-text-title">
            <h1 className="mb-3">
              <span style={{ fontSize: '20px', marginTop: '17px', marginRight: '15px' }}>
                {' '}
                גבריאל גרסיה מרקס - {' '}
              </span>
              <strong>״החיים אינם הימים שחלפו, אלא אלה שזוכרים״</strong>
            </h1>
            <h2 style={{ fontSize: '35px' }}>
              .כל אדם הוא עולם ומלואו שראוי שסיפור חייו ייזכר ויונצח לעד
            </h2>
            <h2 style={{ color: '#ABC9DB', fontSize: '30px', marginTop: '1rem' }}>
              MOMENTS. LEGACY. COMMUNITY
            </h2>
          </div>
          <div className="text-section-container">
            <div className="top-image-container">
              <div className="top-image">
                <p className="text-container-home">
                  סיפור חייהם של יקירנו מורכב מחלקים השלובים בחייהם של בני משפחתם,
                  חברים ומכרים. כאשר הם הלכו מן העולם, הסיפורים נעלמים איתם...
                </p>
              </div>
            </div>
            <div className="bottom-image-container" style={{ marginTop: '20px' }}>
              <p
                className="text-container-home"
                style={{ color: '#ffff', fontWeight: '900', fontSize: '50px' }}
              >
                איך נוכל לחבר את <br></br>החלקים ולספר מי הם היו?{' '}
              </p>
              <Player
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                width="50%"
                height="50%"
                className="react-player"
                controls={true}
              />
              <img
                alt=""
                src={rightCloud}
                style={{ position: 'absolute', right: 0, height: '275px' }}
              ></img>
            </div>
          </div>
        </div>
  
        <div className="popups-container">
          <h1
            className="text-container-home"
            style={{
              width: '100%',
              textAlign: 'center',
              margin: '1rem',
              fontSize: '40px',
            }}
          >
            ספר החיים של לייף קלאוד מאפשר לנו
            <br></br>{' '}
            <strong style={{ fontSize: '50px' }}>
              לחבר ולשתף את הסיפורים והחוויות באמצעות
            </strong>
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
              </div>
              <h1 style={{ marginTop: '2rem', fontSize: '35px' }}>
                קישור לרשתות חברתיות
              </h1>
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
              <h1 style={{ marginTop: '2rem', fontSize: '35px' }}>
                ייחודי QR קוד
              </h1>
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
              <h1 style={{ marginTop: '2rem', fontSize: '35px' }}>
                העלאת תמונות וסרטונים
              </h1>
            </div>
            ]
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
              <h1 style={{ marginTop: '2rem', fontSize: '35px' }}>
                כתיבה ושיתוף זכרונות
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
              <h1 style={{ marginTop: '2rem', fontSize: '35px' }}>
                ניהול מועדים
              </h1>
            </div>
          </div>
          <div>
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
              <h1 style={{ marginTop: '2rem', fontSize: '35px' }}>מיקום הקבר</h1>
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
        <Link to="/userprofiles/61f8ee869ea84f278da5c2f2" className="creation-btn">
          <div className="profile-div">+ לצפייה בפרופיל לדוגמה</div>
        </Link>
        {user ? (
          <Link
          to={`/createprofile/${user._id}`} className="creation-btn">
          <div className="profile-div" style={{ backgroundColor: '#6097BF' }}>
            + לחץ כאן ליצור פרופיל
          </div>
        </Link>
          ) : (
            <Link
            to='/register'
            >
          <div className="profile-div" style={{ backgroundColor: '#6097BF' }}>+ לחץ כאן ליצור פרופיל</div>
          </Link>
          )}
        
        <Link to="/plans" className="creation-btn">
          <div className="profile-div" style={{ backgroundColor: '#46779B' }}>
            + לעמוד תוכניות ורכישה
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
          <img
            alt=""
            src={leftCloud}
            style={{ position: 'absolute', left: 0 }}
          ></img>
        </div>
        <SocialFooter />
        <Footer />
      </div>
    );
}
export default HomeDesktop