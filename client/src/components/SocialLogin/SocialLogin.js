import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import classes from './SocialLogin.module.css';
const SocialLogin = ({ user_type }) => {
  const { myFirebase } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      const { user } = await myFirebase.signInUsingGoogle();
      const [firstName, lastName] = user.displayName.split(' ');
      const loggedUser = {
        email: user.email,
        firstName,
        lastName,
        profilePicture: user.photoURL,
        user_type,
      };
      myFirebase.saveUser(loggedUser, 'PUT');
    } catch (error) {}
  };
  const handleFacebookLogin = async () => {
    try {
      const { user } = await myFirebase.signInUsingFacebook();
      const [firstName, lastName] = user.displayName.split(' ');
      const loggedUser = {
        email: user.email,
        firstName,
        lastName,
        profilePicture: user.photoURL,
        user_type,
      };
      myFirebase.saveUser(loggedUser, 'PUT');
    } catch (error) {}
  };

  return (
    <>
      {/*<div className={classes.separator}>*/}
      <div>
        {/*<b>או</b>*/}
      </div>
      <div className={classes.wrapper}>
      <div className="flex justify-center items-center">
        <div
          className={classes.button}
          style={{ marginRight: '28px' }}
          onClick={handleGoogleLogin}
        > 
          <div className={classes.icon}>
            <i className="fab fa-google"></i>
          </div>
          <span>התחבר עם גוגל</span>
        </div>
        </div>
        <div className="flex justify-center items-center">
        <div className={classes.button} onClick={handleFacebookLogin}>
          <div className={classes.icon}>
            <i className="fab fa-facebook-f"></i>
          </div>
          <span>התחבר עם פייסבוק</span>
        </div>
        </div>
      </div>
    </>
  );
};

export default SocialLogin;
