import React from 'react'
import axios from 'axios';
import { useRef, useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Footer from '../../components/footer/Footer';

export default function OrganisationRegister() {
  const companyName = useRef();
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [error, setErro] = useState('');
  const [user, setUser] = useState({
    user_type: 'organisation',
    companyName: '',
    email: '',
    password: '',
    passwordAgain: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setErro('');
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (user.password !== user.passwordAgain) {
      setErro("Passwords don't match!");
    } else {
      setErro('');
      try {
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            history.push('/login');
            console.log(res, 'res');
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(user, 'user');
  return (
    <>
      <Topbar />
      <div className="register">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="register-logo">רישום ארגון</h3>
          </div>
          <div className="loginRight">
            <div className="RegBox">
              <form className="loginBox" onSubmit={handleClick}>
                <input
                  placeholder="שם"
                  required
                  onChange={handleChange}
                  ref={companyName}
                  value={user.companyName}
                  name="companyName"
                  className="register-input"
                  type="companyName"
                />
                <input
                  placeholder="*Phone"
                  value={user.phone}
                  name="phone"
                  ref={phone}
                  onChange={handleChange}
                  className="register-input"
                  type="phone"
                />
                <input
                  placeholder="*אימייל"
                  required
                  value={user.email}
                  name="email"
                  ref={email}
                  onChange={handleChange}
                  className="register-input"
                  type="email"
                />
                <input
                  placeholder="סיסמה*"
                  required
                  value={user.password}
                  name="password"
                  ref={password}
                  className="register-input"
                  onChange={handleChange}
                  type="password"
                  minLength="6"
                />
                <input
                  placeholder="הכנס סיסמה שנית*"
                  required
                  value={user.passwordAgain}
                  name="passwordAgain"
                  ref={passwordAgain}
                  onChange={handleChange}
                  className="register-input"
                  type="password"
                />
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {error.length ? error : ''}
                </p>
                {/* <div className="register-actions">
                  <div>
                    <Link
                      to="/login"
                      style={{ textDecoration: 'none' }}
                      className=""
                    >
                      {' '}
                      <span className="">התחבר </span>
                    </Link>
                    |
                    <Link
                      to="/lostPassword"
                      style={{ textDecoration: 'none' }}
                      className=""
                    >
                      {' '}
                      <span className="">Lost password </span>
                    </Link>
                  </div>
                  <span>I agree to terms and conditions</span>
                </div> */}
                <button className="register-button" type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SocialFooter />
      <Footer />
    </>
  );
}
