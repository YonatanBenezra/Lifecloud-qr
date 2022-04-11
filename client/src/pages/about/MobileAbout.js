import React from 'react';
import './about.css';
import MobileFooter from '../../components/footer/MobileFooter';
import SocialFooter from '../../components/socialFooter/socialFooter';
import MobileTopbar from '../../components/topbar/MobileTopbar';
import whiteLogo from '../../assets/whiteLogo.png';
import signatureGali from '../../assets/גג 1.png';

const About = () => {
  return (
    <>
      <MobileTopbar />
      <div className="about-container">
        <div className="top-about">
          <img src={whiteLogo} alt="" style={{ height: '12rem' }} />
          <div>
            <p style={{width:"90%"}}>
              Life Cloud הינה פלטפורמה וידידותית למשתמש, נוחה להפעלה המאפשרת לנו
              להעלות, לאשר, לערוך,לאצור ולשתף את אותם רגעים עם חברים והדורות
              הבאים
            </p>
          </div>
          <div>
            <p style={{width:"90%"}}>.מי אנחנו? אני, את, אתה וכולנו</p>
            <p style={{width:"90%"}}>בכל זמן נתון ומכל מקום בעולם יוצרים בית לחיים שאחרי</p>
          </div>
        </div>
        <div className="bottom-about">
            <p style={{width:"90%"}}>אסי שלי נפטרה בשנת 2009.</p>
          <p style={{width:"90%"}}>
             איבדתי את היקרה לי מכל! ואז בכל פעם שחיפשתי
            באלבומים ישנים או ניסיתי לאתר סרטון או תמונה, Life Cloud זה היה כמעט
            בלתי אפשרי. מכאן נולד. כי בעולם הכל כך מתקדם של היום, שבו אתה יכול
            להגיע לאנשים בקצה השני של העולם בנגיעה על מסך, חייבת הייתה להיות דרך
            קלה ונוחה לשתף, להעלות ולשמור את החוויות שלנו ולהמשיך לחיות."
          </p>

          <div className="gali-simha-img">
            <img id="gali-simha-img" src={signatureGali} alt=""></img>
          </div>
          <div className="gali-simha-text">גלי שמחה</div>
        </div>
      </div>
      <SocialFooter backgroundColor="#F5FCFF" color="#6097bf" />
      <MobileFooter />
    </>
  );
};
export default About;
