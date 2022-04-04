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
  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_a5sxqbr',
        'template_is3zage',
        form.current,
        'user_n6k8WK1Ql3fToMiGcyIRm'
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
        <div className="contact">
          <h3 className="contact-title">צור קשר</h3>
        </div>
        <div>
          <input
            id="first-name"
            className="register-contact-inline"
            required
            placeholder="*שם משפחה"
            name="firstName"
            type="text"
          />
          <input
            id="last-name"
            className="register-contact-inline"
            required
            placeholder="*שם פרטי"
            name="lastName"
            type="text"
          />
        </div>
        <div>
          <input
            className="register-contact"
            required
            placeholder="אימייל*"
            name="email"
            type="email"
          />
        </div>
        <div>
          <input
            className="register-contact"
            placeholder="שם החברה (אופציונלי)"
            name="company"
            type="text"
          />
        </div>
        <div>
          <input
            className="register-contact"
            placeholder="טלפון "
            name="phone"
            type="phone"
          />
        </div>
        <div>
          <textarea
            id="free-text"
            className="register-contact"
            name="message"
            required
            placeholder=" טקסט חופשי..."
          />
        </div>

        <button className="contact-send" type="submit">
          שליחה
        </button>
        <img src={Arrow1} className="arrow" alt=""></img>
      </form>
      <SnackBar open={open} handleClose={handleClose} message={message} />
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Contact;
