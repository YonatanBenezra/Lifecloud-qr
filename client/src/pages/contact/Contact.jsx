import React, { useRef } from 'react';
import './contact.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import Arrow1 from '../../assets/Arrow1.png';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const form = useRef();

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
      <form className="about-container" ref={form} onSubmit={sendEmail}>
        <div className="plans">
          <h3 className="plans-logo">צור קשר</h3>
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
            placeholder="Email"
            name="email"
            type="email"
          />
        </div>
        <div>
          <input
            className="register-contact"
            required
            placeholder="*שם החברה (אופציונלי)"
            name="company"
            type="text"
          />
        </div>
        <div>
          <input
            className="register-contact"
            required
            placeholder="*טלפון "
            name="phone"
            type="phone"
          />
        </div>
        <div>
          <input
            className="register-contact"
            required
            placeholder="*מייל "
            name="miles"
            type="number"
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
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Contact;
