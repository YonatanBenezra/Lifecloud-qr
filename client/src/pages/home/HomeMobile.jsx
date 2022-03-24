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
import fourteen from "../../assets/Rectangle14.png"
import thirteen from "../../assets/Rectangle13.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const HomeMobile = (props) => {
  const user = props.user
  const testimonialSettings = props.testimonialSettings
  const settings = props.settings
  const searchText = props.searchText
  const setSearchText = props.setSearchText
  return (
    <div className="home-mobile-whole-page">
      <Topbar />
      
      <div
        className="relative flex justify-center"
        style={{
          backgroundImage: `url(${mainImage})`,
          width: '100%',
          height: '65vh',
          overflow: 'hidden',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'noRepeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute bottom-1">
        <div className="text-2xl txtColor text-center w-full"> יצירת קהילת הנצחה </div>
        <div className="text-2xl txtColor text-center w-full"> מותאמת אישית </div>
        {/*{console.log(user)}*/}
        {user ? (
          <Link
            to={`/createprofile/${user._id}`}
          // onClick={() => {window.reload()}}
          >
           <div className="w-screen text-sm font-bold text-white flex justify-center">
            <div className="rounded-lg homeBtn w-10/12 p-2 text-center">ליצירת פרופיל ללא עלות  </div>
            </div>
          </Link>
        ) : (
          <Link
            to='/register'
          // onClick={() => {window.reload()}}
          >
            <div className="w-screen text-md font-bold text-white flex justify-center">
            <div className="rounded-lg homeBtn w-10/12 p-2 text-center hover:bg-white btnHover">ליצירת פרופיל ללא עלות  </div>
            </div>
          </Link>
        )}
      </div>
      </div>
      
      <div className="srch px-8 py-5">
        {/* <div className="searchbar-container-home-mobile"> */}
        <div className="flex bg-white justify-center items-center rounded-xl">
        <div className="">
          <input
            type="text"
            placeholder="חיפוש מנוח / עמותה..."
            className="p-2"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search className="searchIcon" />
        </div>
        </div>
        {/* </div> */}
        <Sidebar> </Sidebar>
      </div>
      <div className="vid-text-container">
        <div className="vid-text-title">
          <h1 className="home-mobile-heading-strong">
            {/* <span style={{ fontSize: '20px', marginTop: '17px', marginRight: '15px' }}>
              {' '}
              גבריאל גרסיה מרקס - {' '}
            </span> */}
            <strong>כל אדם מיוחד במינו.</strong>
          </h1>
          <h2 className="home-mobile-heading">
            כל אדם ראוי לכך שסיפור
          </h2>
          <h2 className="home-mobile-heading">
            חייו יהיה מונצח ומונגש לעד.
          </h2>
          <h2 className="homeMobile-moments-legacy-community">
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
              <p className="font-bold text-xl">
                סיפור חייו של אדם הינו פאזל
              </p>
              <p className="font-bold text-xl">
                המורכב מחלקים השלובים בחייהם
              </p>
              <p className="font-bold text-xl">
                של בני משפחה, חברים ומכרים.
              </p>
              <p className="font-bold text-xl">
                עם לכתו של אדם מהעולם,
              </p>
              <p className="font-bold text-xl">
                סיפור חייו הולך עימו.
              </p>
            </div>
          </div>
          <div className="bottom-image-container">
          <img
              alt=""
              src={rightCloud}
              style={{ position: 'absolute', right: 0,width:"120px" ,height:"190px" }}
            ></img>
            <p className="font-semibold text-3xl text-white py-2">
              האם אפשר לחבר
            </p>
            <p className="font-semibold text-3xl text-white py-2">
              את הפאזל בחזרה            </p>
            <p className="font-semibold text-3xl text-white py-2">
              או להחיות את הסיפור?
            </p>

            
          </div>
        </div>
      </div>

      <div className="popups-container">
        <h1 className="font-semibold text-3xl rtl txtColor py-2">
          ספר החיים של Life Cloud
        </h1>
        <h1 className="font-semibold text-3xl rtl txtColor py-2">
          את הפאזל מאפשר לנו
        </h1>
        <h1 className="font-semibold text-3xl rtl txtColor py-2">
          להרכיב <span className="home-mobile-text-emphasis"> באמצעות </span>
        </h1>
      </div>
      {/*Grid Bar*/}
       <div className="grid grid-cols-2 gap-4 w-full items-center p-2">
         <div className="w-full">
           <img src={thirteen} className="h-32 rounded-xl"/>
           <div className="text-center">
              <div className="text-md  font-semibold txtColor rtl">רא עוד  </div>
              <div className="text-md  font-semibold txtColor">+</div>
              <div className="text-md  font-semibold txtColor">ייחודי QR קוד </div>
           </div>
         </div>
         <div className="w-full">
           <img src={fourteen} className="h-32 rounded-xl"/>
           <div className="text-center">
              <div className="text-md  font-semibold txtColor rtl">רא עוד  </div>
              <div className="text-md  font-semibold txtColor">+</div>
              <div className="text-md  font-semibold txtColor">ייחודי QR קוד </div>
           </div>
         </div>
         <div className="w-full">
           <img src={fourteen} className="h-32 rounded-xl"/>
           <div className="text-center">
              <div className="text-md  font-semibold txtColor rtl">רא עוד  </div>
              <div className="text-md  font-semibold txtColor">+</div>
              <div className="text-md  font-semibold txtColor">ייחודי QR קוד </div>
           </div>
         </div>
         <div className="w-full">
           <img src={fourteen} className="h-32 rounded-xl"/>
           <div className="text-center">
              <div className="text-md  font-semibold txtColor rtl">רא עוד  </div>
              <div className="text-md  font-semibold txtColor">+</div>
              <div className="text-md  font-semibold txtColor">ייחודי QR קוד </div>
           </div>
         </div>
         <div className="w-full ">
           <img src={fourteen} className="h-32 rounded-xl"/>
           <div className="text-center">
              <div className="text-md  font-semibold txtColor rtl">רא עוד  </div>
              <div className="text-md  font-semibold txtColor">+</div>
              <div className="text-md  font-semibold txtColor">ייחודי QR קוד </div>
           </div>
         </div>
         <div className="w-full ">
           <img src={fourteen} className="h-32 rounded-xl"/>
           <div className="text-center">
              <div className="text-md  font-semibold txtColor rtl">רא עוד  </div>
              <div className="text-md  font-semibold txtColor">+</div>
              <div className="text-md  font-semibold txtColor">ייחודי QR קוד </div>
           </div>
         </div>
       </div>
     {/*Grid Bar END*/}
      {/*<div className="imgs-container">
        <div className='openers-mobile'>
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
            <h1 className="h1-home-mobile" >
              ייחודי QR קוד
            </h1>
          </div>
        </div>
        <div className='openers-mobile'>
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

        </div>
      </div>*/}
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

      {/*<div className="imgs-container">
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
      <div className="bgBlue py-5">
      {/*<img src={exampleProfileImage} className="py-8 px-2"/>*/}
      <Slider {...settings} style={{width:"100%"}}>
            <a href="#">
              <div
                className="w-full"
                
                 
              ><img src={exampleProfileImage} className="px-2"/></div>
            </a>
            <a href="#">
              <div
                className="w-full" 
                
              >
                <img src={exampleProfileImage} className="px-2"/>
              </div>
            </a>
            <a href="#">
              <div
                className="w-full"
                 
              >
                <img src={exampleProfileImage} className="px-2"/>
              </div>
            </a>
            <a href="#">
              <div
                className="w-full"
                
              >
                <img src={exampleProfileImage} className="px-2"/>
              </div>
            </a>
          </Slider>
        {/*<Slider {...settings} className="w-screen">
          <a href="#">
            <div
              style={{ backgroundImage: `url(${exampleProfileImage})` }}
              className=" h-32"
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
        </Slider>*/}
      </div>
      <a href="/createprofile" className="creation-btn">
        <div className="profile-div">+ לצפייה בפרופיל לדוגמה</div>
      </a>
      <a href="/createprofile" className="creation-btn">
        <div className="profile-div" style={{ backgroundColor: '#6097BF' }}>
          + לחץ כאן ליצור פרופיל
        </div>
      </a>
      <a href="/createprofile" className="creation-btn">
        <div className="profile-div" style={{ backgroundColor: '#46779B' }}>
          + לעמוד תוכניות ורכישה
        </div>
      </a>
      <div className="seperation-div-home-mobile-try1"></div>
      

      <div className="">
      {/*<Carousel>
                <div>
                    <h3 className="">
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
            </Carousel>*/}

        <Slider {...testimonialSettings} className="" style={{width:"100%"}}>
          <div className="">
            <h3 className="">
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

 
      </div>


      <SocialFooter />
      <Footer className="" />
    </div>
  );
}

export default HomeMobile;