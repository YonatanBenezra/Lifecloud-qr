import React from 'react';
import './about.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import signatureGali from '../../assets/גג 1.png';
import LazyLoad from 'react-lazyload';

const About = () => {
  return (
    <>
      <Topbar />
      <div className="about-container">
        <div className="top-about ">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <LazyLoad>
                  <img src={whiteLogo} alt="" style={{ height: '12rem' }} />
                </LazyLoad>

                <div>
                  <p>
                    מיזם LifeCloud הוקם על ידי קבוצת חברים שהגיעו כל אחד מתחומו
                    – אמנות, צבא ובטחון, עסקים ותקשורת. עם מטרה אחת – לאפשר
                    לכולם לחלוק, לשתף ולחגוג את החיים שהיו ליקרים לנו מכל
                    ושאינם.
                  </p>
                </div>
                <div>
                  <p>
                    כולנו חווינו אובדן, אם של הורים שנפטרו בשיבה טובה, או חלילה
                    חברים ובני משפחה שנפטרו בנסיבות מצערות. אבל אחרי הצער והאבל
                    הבנו שיש חיים שלמים של זכרונות, חוויות משותפות ורצון בלתי
                    נגמר לחלוק אותו עם האהובים שלנו.
                  </p>
                  <br />
                  <p>
                    בעולם המתקדם של רשתות חברתיות, מדיה דיגיטאלית ואין סוף
                    אפשרויות, מצאנו שצריך לתת מקום מכבד ונפרד לחברים ומשפחה שכבר
                    לא איתנו. לכן, במהלך תקופה ארוכה ניסינו להבין יותר, לחקור,
                    לשאול ולמצוא את הנוסחה הנכונה – וכך בעצם הקמנו את LifeCloud
                    ,על מנת ליצור בית חם לחיים שאחרי
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-about">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>
                  אנחנו מגישים בפניכם את המיזם שלנו, שנולד כולו מתוך שליחות
                  אמיתית, לכן טבעי שנרצה להציע אותו לכולם ובגלל זה הוא פתוח
                  בפניכם ללא תשלום. כדי שכל אחד יוכל לשתף ולספר על האמא, האח,
                  החבר מהצבא או כל מי שאנחנו מתגעגעים אליהם כל כך.{' '}
                </p>
                <br />
                <p>
                  עוד יהיו שיפורים ושינויים, ואנחנו שמחים לקבל כל פידבק כדי
                  להמשיך ולעצב לכם את המקום הכי נכון עבור היקרים לכם ומקווים
                  שתאהבו את מה שבנינו כאן, עבורכם.
                </p>
                <div className="gali-simha-text">שלכם, צוות LifeCloud </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SocialFooter backgroundColor="#F5FCFF" color="#6097bf" />
      <Footer />
    </>
  );
};
export default About;
