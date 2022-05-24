import React, { useRef, useState } from 'react';
import './contact.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import Arrow1 from '../../assets/Arrow1.png';
import emailjs from '@emailjs/browser';
import SnackBar from '../../components/snackbar/SnackBar';

const Contact = () => {
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
        'template_c5vu8up',
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
            <h3 className="contact-title ">צור קשר</h3>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto ">
              <div className="row">
                <div className="col-md-6">
                  <input
                    id="first-name"
                    className="register-contact-inline register-contact"
                    required
                    placeholder="*שם פרטי"
                    name="firstName"
                    type="text"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id="last-name"
                    className="register-contact-inline register-contact"
                    required
                    placeholder="*שם משפחה"
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
                className="register-contact"
                required
                placeholder="אימייל*"
                name="email"
                type="email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <input
                className="register-contact"
                placeholder="שם החברה (אופציונלי)"
                name="company"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <input
                className="register-contact"
                placeholder="טלפון "
                name="phone"
                type="phone"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-lg-8 col-12 mx-auto">
              <textarea
                id="free-text"
                className="register-contact"
                name="message"
                required
                placeholder=" טקסט חופשי..."
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
              <img src={Arrow1} className="arrow " alt=""></img>
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
export default Contact;
