import { useContext, useRef, useState } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Footer from '../../components/footer/Footer';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
export default function Login() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };

  // const responseGoogle = (response) => {
  //   console.log(response);
  //   setName(response.profileObj.name);
  //   setEmail(response.profileObj.email);
  //   setUrl(response.profileObj.imageUrl);
  //   setLoginStatus(true);
  // };
  // const logout = () => {
  //   console.log('logout');
  //   setLoginStatus(false);
  // };
  return (
    <>
      <Topbar />
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <span className="loginDesc">התחברות</span>
          </div>
          <div>
            {/* <GoogleLogin
              clientId="671348139606-906f7lcl8vk6l26hivc1ka0hk2teuvb1.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            /> */}
            {/* <GoogleLogout
              clientId="671348139606-906f7lcl8vk6l26hivc1ka0hk2teuvb1.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
            /> */}
          </div>
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
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    'התחבר'
                  )}
                </button>
                <span className="loginForgot"></span>
              </form>
              <div className="loginRegisterContainer">
                <p className="login-register-button">
                  {isFetching ? (
                    <CircularProgress color="white" size="15px" />
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
                    <CircularProgress color="white" size="15px" />
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
      <SocialFooter backgroundColor="#abc9db" color="#fff" />
      <Footer />
    </>
  );
}
