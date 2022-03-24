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
import GoogleAuth from '../../assets/googleAuth.png';
import facebookAuth from '../../assets/facebookAuth.png';
import Arrow2 from '../../assets/Arrow2.png'

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
        <div className="">
          <div className="loginLeft">
            <span className="text-6xl">התחברות </span>
          </div>
          <div className="flex justify-center items-center text-xl p-2">
            תועצמאב םשרה
          </div>

          <div className="w-full flex justify-center items-center p-2">
            
            <SocialLogin />
          </div> 
          <div className="loginRight">
            <div className="w-screen p-4 md:w-full">
            <div className="">
              <form className="" onSubmit={handleClick}>
              <div className=" ">
                <input
                  placeholder="מייל*"
                  type="email"
                  value={email}
                  required
                  className="w-full p-3  rounded-lg my-2 text-center"
                  onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <input
                  placeholder="סיסמא*"
                  type="password"
                  value={password}
                  required
                  minLength="6"
                  className="w-full p-3  rounded-lg my-2 text-center"
                  onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div>
                <input
                  placeholder="טלפון"
                  type="phone"
                  value={phone}
                  minLength="6"
                  className="w-full p-3  rounded-lg my-2 text-center"
                  onChange={(e) => setPhone(e.target.value)}
                />
                </div>
                <div className="flex  justify-center items-center space-x-2">
                <div className="text-lg font-semibold">יתוא רוכז* </div>
                <div className="-mt-1">
               <label className="contain">
                 <input type="checkbox"/>
                 <span className="checkmark"></span>
               </label>                 
               </div>
               </div>
                <div className="w-full">
                <button
                  className="w-full border-2 border-white p-2 text-2xl font-bold rounded-lg my-5"
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
              </div>
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
            
          </div>
        </div>
      </div>
      <SocialFooter backgroundColor="#6097bf" color="#fff" />
      <Footer />
    </>
  );
};

export default Login;
