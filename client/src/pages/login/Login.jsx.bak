import React, { useContext, useRef, useState, useEffect } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Footer from '../../components/footer/Footer';
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
      <Topbar />
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <span className="loginDesc">התחברות</span>
          </div>
          <div></div>
          <div className="loginRight">
            <div className="loginBox">
              <form className="loginBox" onSubmit={handleClick}>
                <input
                  placeholder="מייל*"
                  type="email"
                  value={email}
                  required
                  className="login-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="סיסמא*"
                  type="password"
                  value={password}
                  required
                  minLength="6"
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  placeholder="טלפון"
                  type="phone"
                  value={phone}
                  minLength="6"
                  className="login-input"
                  onChange={(e) => setPhone(e.target.value)}
                />
                
                <button
                  className="login-button"
                  type="submit"
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <CircularProgress color="primary" size="20px" />
                  ) : (
                    'התחבר'
                  )}
                </button>
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
      <Footer />
    </>
  );
};

export default Login;
