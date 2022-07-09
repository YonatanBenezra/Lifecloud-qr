import React, { useRef, useState } from 'react';
import './abort-purchase.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import Arrow1 from '../../assets/Arrow1.png';
import emailjs from '@emailjs/browser';
import SnackBar from '../../components/snackbar/SnackBar';
import LazyLoad from 'react-lazyload';

const AbortPurchase = () => {
  const form = useRef();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_1unhwqh',
        'template_zpo9bmp',
        form.current,
        'Vvq3N8J0fr4iu32Gs'
      )
      .then(
        (result) => {
          setMessage('נשלח בהצלחה!');
          setOpen(true);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <Topbar />
      <form className="contact-container" ref={form} onSubmit={sendEmail}>
        <div className="container">
          <div className="contact">
            <h3 className="contact-title ">בקשה לביטול עסקה</h3>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto ">
              <div className="row rtl">
                <div className="col-md-6">
                  <input
                    id="first-name"
                    className="abortPurchase-contact-inline abortPurchase-contact"
                    required
                    placeholder="* שם פרטי"
                    name="firstName"
                    type="text"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id="last-name"
                    className="abortPurchase-contact-inline abortPurchase-contact"
                    required
                    placeholder="* שם משפחה"
                    name="lastName"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <input
                className="abortPurchase-contact"
                required
                placeholder="* תעודת זהות"
                name="id"
                type="number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <input
                className="abortPurchase-contact"
                required
                placeholder="* טלפון"
                name="phone"
                type="phone"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <input
                className="abortPurchase-contact"
                required
                placeholder="* אימייל"
                name="email"
                type="email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <input
                className="abortPurchase-contact"
                required
                placeholder="* מספר הזמנה לביטול"
                name="abortNumber"
                type="abortNumber"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <textarea
                id="free-text"
                className="abortPurchase-contact abortPurchase-textarea"
                required
                name="message"
                placeholder="* סיבת הביטול"
                type="textarea"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12  text-center mb-3">
              {submitted ? (
                <button className="contact-send submitted">נשלח</button>
              ) : (
                <button className="contact-send" type="submit">
                  שליחה
                </button>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <LazyLoad>
                <img src={Arrow1} className="arrow " alt="" />
              </LazyLoad>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center contact-blue">
          <p>מספר טלפון 0523753750 | כתובת: רחוב השדה 101 כפר חיטים |
          office@lifecloud-qr.com :כתובת מייל </p>
            </div>
          </div>
        </div>
      </form>
      <SnackBar open={open} handleClose={handleClose} message={message} />
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default AbortPurchase;
