import React, { useContext } from 'react';
// import './about.css';
import Footer from '../../components/footer/Footer';
import ENSocialFooter from '../../components/socialFooter/ENSocialFooter';
import ENTopBar from '../../components/topbar/ENTopBar';
import whiteLogo from '../../assets/whiteLogo.png';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const ENPlan = () => {
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
      <ENTopBar />
      <div className="about-container">
        <button class="plan-button" type="submit" onClick={handleOnClick}>
          buy plan
        </button>
        <button class="plan-button" type="submit" onClick={handleSwitchBack}>
          Switch Back
        </button>
      </div>
      <ENSocialFooter backgroundColor="#F5FCFF" color="#6097bf" />
      <Footer />
    </>
  );
};
export default ENPlan;
