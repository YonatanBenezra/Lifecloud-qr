import React, { useContext, useState } from 'react';
import './plans.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Arrow1 from '../../assets/Arrow1.png'
import basic1 from '../../assets/basic1.png'
import basic2 from '../../assets/basic2.png'
import standart2 from '../../assets/standart2.png'
import Premium1 from '../../assets/Premium1.png'

const Plans = () => {
  // const [plan, setPlan] = useState();
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
      {/* {plan ? ( */}
      <div className="about-container">
        <div className="plans">
          <h3 className="plans-logo">תשלומים ותכניות</h3>
        </div>
        <div className="change-plan">
          <h3>
            {' '}
            +שנה תוכנית
          </h3>
        </div>

        <input
          placeholder={`סוג תכניות: lifeBook`} className="register-plans"
        />
        <input
          placeholder="מחיר: 799₪" className="register-plans"
        />
        <input
          placeholder='מע"מ: 0₪' className="register-plans"
        />
        <input
          placeholder="סכום כולל: 799₪" className="register-plans"
        />
        <div className="payment-method">
          <h3 className="payment-logo">אמצעי תשלום</h3>
        </div>
        <button className="register-plans-payment" >המשך לתשלום</button>
        <img src={Arrow1} className='arrow1-plans-payment' alt=''></img>
      </div>
      {/* ) : ( */}
      {/* <div>
          <div onClick={() => setPlan({ name: "חינם" })}>free</div>
          <div className="plans-section">
            <h1 className="plans-title">Plans and options for purchase</h1>
            <div className="plans-container">
              <div className="plan-container">
                <img src={basic1} alt=""></img>
                <h1 className="plan-title">LifePage</h1>
                <div className="plan-description">
                  <h5>חינם</h5>
                  <a>+ לחץ לפרטים נוספים</a>
                </div>
              </div>
              <div className="plan-container">
                <img src={basic2} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <div className="plan-description">
                  <h5>שנה</h5>
                  <a>+ לחץ לפרטים נוספים</a>
                </div>
              </div>
              <div className="plan-container">
                <img src={standart2} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <div className="plan-description">
                  <h5>5 שנים</h5>
                  <a>+ לחץ לפרטים נוספים</a>
                </div>
              </div>
              <div className="plan-container">
                <img src={Premium1} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <div className="plan-description">
                  <h5>Organisation</h5>
                  <a>+ לחץ לפרטים נוספים</a>
                </div>
              </div>
            </div>
            <div className="link-plans">+ To the plans and purchase page</div>
          </div>
        </div>
      ) */}
      {/* } */}
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Plans;
