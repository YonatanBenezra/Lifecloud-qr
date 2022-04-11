import React, { useRef, useState } from 'react';
import './contact.css';
import MobileFooter from '../../components/footer/MobileFooter';
import SocialFooter from '../../components/socialFooter/socialFooter';
import MobileTopbar from '../../components/topbar/MobileTopbar';
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
      <MobileTopbar />
      <form className="MobileContactContainer" ref={form} onSubmit={sendEmail}>
        <div className="contact">
          <h3 className="contact-title">צור קשר</h3>
        </div>
        <div className="MobileNamesContainerContact">
          <input
            id="MobileFirstName"
            className="MobileRegisterContactInline"
            required
            placeholder="*שם פרטי"
            name="firstName"
            type="text"
          />
          <input
            id="MobileLastName"
            className="MobileRegisterContactInline"
            required
            placeholder="*שם משפחה"
            name="lastName"
            type="text"
          />
        </div>
        <div className="MobileFrm">
        <div>
          <input
            className="MobileRegisterContact"
            required
            placeholder="אימייל*"
            name="email"
            type="email"
          />
        </div>
        <div>
          <input
            className="MobileRegisterContact"
            placeholder="שם החברה (אופציונלי)"
            name="company"
            type="text"
          />
        </div>
        <div>
          <input
            className="MobileRegisterContact"
            placeholder="טלפון "
            name="phone"
            type="phone"
          />
        </div>
        <div>
          <textarea
            id="free-text"
            className="MobileRegisterContact"
            name="message"
            required
            placeholder=" טקסט חופשי..."
          />
          </div>
        </div>
        {submitted ? (
          <button className="MobileSmtBtn submitted">נשלח</button>
        ) : (
          <button className="MobileSmtBtn" type="submit">
            שליחה
          </button>
        )}

        <img src={Arrow1} className="arrow" alt="" style={{padding:"10px"}}></img>
      </form>
      <SnackBar open={open} handleClose={handleClose} message={message} />
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <MobileFooter />
    </>
  );
};
export default Contact;
