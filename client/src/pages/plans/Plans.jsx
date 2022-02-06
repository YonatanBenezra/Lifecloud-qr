import React, { useContext } from 'react';
import './plans.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Plans = () => {
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
      <div className="about-container">
        <button class="plan-button" type="submit" onClick={handleOnClick}>
          קנה תוכנית
        </button>
        <button class="plan-button" type="submit" onClick={handleSwitchBack}>
          בטל תוכנית
        </button>
      </div>
      <SocialFooter backgroundColor="#F5FCFF" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Plans;
