import { useContext, useRef, useState , useEffect} from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import ENSocialFooter from '../../components/socialFooter/ENSocialFooter';
import Footer from '../../components/footer/Footer';
import ENTopbar from '../../components/topbar/ENTopBar';
import FacebookLogin from 'react-facebook-login'; 
import { authentication } from '../../config/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, getAuth } from 'firebase/auth';

export default function ENLogin() {
  // const email = useRef("Janesss@gamil.com");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email, password: password }, dispatch);
  };
  const responseGoogle = () => {
    let provider = new GoogleAuthProvider()
    signInWithPopup(authentication, provider).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }
  const componentClicked = (data) => {
    //you can use this func to make some operation on your side 
    console.warn(data)
  }
  const responseFacebook = (response) => {
    //user information retrieval
    console.log(response);
  }
  useEffect(() => {
    checkIfUserLoggedWithGoogle()
  }, [])


  const checkIfUserLoggedWithGoogle = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
  return (
    <>
      <ENTopbar />
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <span className="loginDesc">Login</span>
          </div>
          <div className="loginRight">
            <div className="loginBox">
              <form className="loginBox" onSubmit={handleClick}>
                <input
                  placeholder="Email*"
                  type="email"
                  value={email}
                  required
                  className="login-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Password*"
                  type="password"
                  value={password}
                  required
                  minLength="6"
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  placeholder="Phone"
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
                    'Login'
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
                      Register
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
                      Forgot password
                    </Link>
                  )}
                </p>
              </div>
            </div>
            <div className='socialLoginContainer'>
              <div>
                <FacebookLogin
                  appId="2999264697053915"
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={componentClicked}
                  callback={responseFacebook} />
              </div>

              
              <div className='google-Login'>
                <button onClick={responseGoogle}>
                  Sign in with  google
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <ENSocialFooter backgroundColor='#abc9db' color='#fff' />
      <Footer />
    </>
  );
}
