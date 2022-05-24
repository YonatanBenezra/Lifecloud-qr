import React, { useContext, useState } from 'react';
import './plans.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Arrow1 from '../../assets/Arrow1.png';
import basic1 from '../../assets/basic1.png';

const Plans = () => {
  const [plan, setPlan] = useState();
  const history = useHistory();
  const { myFirebase, user } = useContext(AuthContext);
  const handleOnClick = async () => {
    await myFirebase.saveUser({ ...user, user_type: 'paid' }, 'PUT');
    history.push('/');
  };
  const handleSwitchBack = async () => {
    await myFirebase.saveUser({ ...user, user_type: 'normal' }, 'PUT');
    history.push('/');
  };
  return (
    <>
      <Topbar />
      {plan ? (
        <div className="plans-page-container">
          <div className="plans">
            <h3 className="plans-logo">תשלומים ותכניות</h3>
          </div>
          <div className="change-plan">
            <h3 onClick={() => setPlan()} className="pointer">
              {' '}
              +שנה תוכנית
            </h3>
          </div>

          <div className="register-plans">
            <span className="register-plan-type">סוג תכניות:</span>
            {plan.name}
          </div>

          <div className="register-plans">
            <span className="register-plan-type">מחיר:</span>₪{plan.price}
          </div>
          <div className="register-plans">
            <span className="register-plan-type">מע"מ:</span>₪{plan.tax}
          </div>

          <div className="register-plans">
            <span className="register-plan-type">סכום כולל:</span>₪
            {plan.totalPrice}
          </div>

          <div className="register-plans">
            <span className="register-plan-type">הסבר:</span>
            {plan.description}
          </div>

          <div className="payment-method">
            <h3 className="payment-logo">אמצעי תשלום</h3>
          </div>
          <button className="register-plans-payment">המשך לתשלום</button>
          <img src={Arrow1} className="arrow1-plans-payment" alt=""></img>
        </div>
      ) : (
        <div className="plans-section">
          <div className="container">
            <h1 className="plans-title">תוכניות</h1>
            <div className="plans-container">
              <div className="plan-container">
                <img src={basic1} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <h3 className="plan-subtitle">לאירגונים</h3>
                <span className="plans-details">
                  פרטים אישיים -
                  <br />
                  תמונה -
                  <br />
                  מיקום הקבר -
                  <br />
                  ציטוט על המנוח -
                  <br />
                  עץ המשפחה -
                  <br />
                  גלריית תמונות ווידאו -
                  <br />
                  העלאת זכרונות ותגובות -
                  <br />
                  תזכורות לאזכרה ואירועים מיוחדים -
                  <br />
                  אפשרות לשידור חי ואירועים -
                  <br />
                  הוספת עוקבים -
                  <br />
                  הגדרת פרטיות -
                </span>
                <h1 className="plan-subdescription">
                  מותאם LifeBook
                  <br />
                  לכל ארגון לפי
                  <br />
                  צרכיו ומאפייניו
                </h1>
                <div className="plan-contact-container">
                  <Link to="/contact" className="plan-link plan-contact">
                    צור קשר
                  </Link>
                </div>
              </div>
              <div className="plan-container">
                <img src={basic1} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <h3 className="plan-subtitle">עמוד המנוח</h3>
                <span className="plans-details">
                  פרטים אישיים -
                  <br />
                  תמונה -
                  <br />
                  מיקום הקבר -
                  <br />
                  ציטוט על המנוח -
                  <br />
                  עץ המשפחה -
                  <br />
                  גלריית תמונות ווידאו -
                  <br />
                  העלאת זכרונות ותגובות -
                  <br />
                  תזכורות לאזכרה ואירועים מיוחדים -
                  <br />
                  אפשרות לשידור חי ואירועים -
                  <br />
                  הוספת עוקבים -
                  <br />
                  הגדרת פרטיות -
                </span>
                <br />

                <div className="plans-details important-details">
                  GB אחסון 1.5 -
                  <br />
                  ליווי ותמיכה -
                  <br />
                  אישי QR -
                </div>
                <div className="">חנות מתנות מעוצבות לאירועים מיוחדים +</div>
                <div
                  className="pointer plan-description"
                  onClick={() =>
                    setPlan({
                      name: 'חינם',
                      price: 19,
                      tax: 0,
                      totalPrice: 19,
                      description:
                        'תוכנית זו היא בחינם לשנה שלמה, לאחר מכן התשלום הוא 19 ש"ח לחודש',
                    })
                  }
                >
                  <span className="plan-link">חינם לשנה</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Plans;
