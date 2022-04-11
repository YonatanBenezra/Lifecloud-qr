import React, { useContext, useRef, useState, useEffect } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MobileTopbar from '../../components/topbar/MobileTopbar';
import SocialFooter from '../../components/socialFooter/socialFooter';
import MobileFooter from '../../components/footer/MobileFooter';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');


  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };
  const componentClicked = (data) => {
    console.warn(data);
  };
  useEffect(() => {
  }, []);


  return (
    <>
      <MobileTopbar />
      <div className="Mobilelogin">
        <div className="MobileloginWrapper">
          <div className="loginLeft">
            <span className="loginDesc">התחברות</span>
          </div>
          <div></div>
          <div className="">
            <div className="loginBox" >
              <form className="MobileloginBox" onSubmit={handleClick}>
                <div>
                <input
                  placeholder="מייל*"
                  type="email"
                  value={email}
                  required
                  className="MobileLoginInput"
                  onChange={(e) => setEmail(e.target.value)}
                /></div>
                <div>
                <input
                  placeholder="סיסמא*"
                  type="password"
                  value={password}
                  required
                  minLength="6"
                  className="MobileLoginInput"
                  onChange={(e) => setPassword(e.target.value)}
                /></div>
                <div>
                <input
                  placeholder="טלפון"
                  type="phone"
                  value={phone}
                  minLength="6"
                  className="MobileLoginInput"
                  onChange={(e) => setPhone(e.target.value)}
                />
                </div>
                <div>
                <button
                  className="MobileLoginInputBtn"
                  type="submit"
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <CircularProgress color="primary" size="20px" />
                  ) : (
                    'התחבר'
                  )}
                </button>
                </div>
                <span className="loginForgot"></span>
              </form>
              <div className="loginRegisterContainer">
                <p className="login-register-button">
                  {isFetching ? (
                    <CircularProgress color="primary" size="15px" />
                  ) : (
                    <Link
                      to="/register"
                      style={{ textDecoration: 'none' }}
                      className="login-register-button"
                    >
                      הרשמה
                    </Link>
                  )}
                </p>
                |
                <p className="login-register-button">
                  {isFetching ? (
                    <CircularProgress color="primary" size="15px" />
                  ) : (
                    <Link
                      to="/register"
                      style={{ textDecoration: 'none' }}
                      className="login-register-button"
                    >
                      שכחתי סיסמה
                    </Link>
                  )}
                </p>
              </div>
            </div>
            <SocialLogin />
          </div>
        </div>
      </div>
      <SocialFooter backgroundColor="#6097bf" color="#fff" />
      <MobileFooter />
    </>
  );
};

export default Login;
