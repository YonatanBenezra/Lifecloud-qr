import React, { useRef, useState } from 'react';
import './contact.css';
import MobileFooter from '../../components/footer/MobileFooter';
import SocialFooter from '../../components/socialFooter/MobileSocialFooter';
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
      <form className="ff MobileContactContainer" ref={form} onSubmit={sendEmail}>
        <div className="ff contact">
          <h3 className="ff contact-title">צור קשר</h3>
        </div>
        <div className="ff MobileNamesContainerContact">
          <input
            id="MobileFirstName"
            className="ff MobileRegisterContactInline"
            required
            placeholder="*שם פרטי"
            name="firstName"
            type="text"
          />
          <input
            id="MobileLastName"
            className="ff MobileRegisterContactInline"
            required
            placeholder="*שם משפחה"
            name="lastName"
            type="text"
          />
        </div>
        <div className="ff MobileFrm">
        <div>
          <input
            className="ff MobileRegisterContact"
            required
            placeholder="אימייל*"
            name="email"
            type="email"
          />
        </div>
        <div>
          <input
            className="ff MobileRegisterContact"
            placeholder="שם החברה (אופציונלי)"
            name="company"
            type="text"
          />
        </div>
        <div>
          <input
            className="ff MobileRegisterContact"
            placeholder="טלפון "
            name="phone"
            type="phone"
          />
        </div>
        <div>
          <textarea
            id="free-text"
            className="ff MobileRegisterContact"
            name="message"
            required
            placeholder=" טקסט חופשי..."
          />
          </div>
        </div>
        {submitted ? (
          <button className="ff MobileSmtBtn submitted">נשלח</button>
        ) : (
          <button className="ff MobileSmtBtn" type="submit">
            שליחה
          </button>
        )}

        <img src={Arrow1} className="ff arrow" alt="" style={{padding:"10px"}}></img>
      </form>
      <SnackBar open={open} handleClose={handleClose} message={message} />
      <SocialFooter />
      <MobileFooter />
    </>
  );
};
export default Contact;
