import React, { useContext, useState } from 'react';
import './plans.css';
import MobileFooter from '../../components/footer/MobileFooter';
import SocialFooter from '../../components/socialFooter/MobileSocialFooter';
import MobileTopbar from '../../components/topbar/MobileTopbar';
import whiteLogo from '../../assets/whiteLogo.png';
import { AuthContext } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Arrow1 from '../../assets/Arrow1.png'
import basic1 from '../../assets/basic1.png'
import basic2 from '../../assets/basic2.png'
import standart2 from '../../assets/standart2.png'
import Premium1 from '../../assets/Premium1.png'

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
      <MobileTopbar />
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
          <span className='register-plan-type'>סוג תכניות:</span>
           {plan.name} 
        </div>
        
        <div className="register-plans">
          <span className='register-plan-type'>מחיר:</span>

          ₪{plan.price}
        </div>
        <div className="register-plans">
          <span className='register-plan-type'>מע"מ:</span>
          ₪{plan.tax}
        </div>

        <div className="register-plans">
          <span className='register-plan-type'>סכום כולל:</span>
          ₪{plan.totalPrice}
        </div>

        <div className="register-plans">
          <span className='register-plan-type'>הסבר:</span>
          {plan.description}
        </div>
        
        <div className="payment-method">
          <h3 className="payment-logo">אמצעי תשלום</h3>
        </div>
        <button className="register-plans-payment" >המשך לתשלום</button>
        <img src={Arrow1} className='arrow1-plans-payment' alt=''></img>
      </div>
      ) : ( 
          <div className="plans-section">
            <h1 className="MobilePlansTitle">תוכניות  </h1>
            <div className="plans-container">
              <div className="plan-container">
                <img src={basic2} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <div className="plan-description">
                  <h5>שנה</h5>
                  <span className="pointer plan-link" onClick={() => setPlan({ name: "חינם", price: 19, tax: 0, totalPrice: 19, description: 'תוכנית זו היא בחינם לשנה שלמה, לאחר מכן התשלום הוא 19 ש"ח לחודש' })} >לחץ לקניית התוכנית</span>
                </div>
              </div> 
            </div>
            <div className="plans-container"> 
              <div className="plan-container">
                <img src={Premium1} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <div className="plan-description">
                  <h5>ארגון</h5>
                  <Link to='/contact' className='plan-link'>+ לחץ לפרטים נוספים</Link>
                </div>
              </div>
            </div>
          </div>
      ) }
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <MobileFooter />
    </>
  );
};
export default Plans;