import React, { useRef, useState } from 'react';
import './contact.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import Arrow1 from '../../assets/Arrow1.png';
import emailjs from '@emailjs/browser';
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
      <form className="bgBlue px-3 py-2" ref={form} onSubmit={sendEmail}>
        <div className="plans">
        <div className="flex justify-center items-center">
          <h3 className="plans-logo">צור קשר</h3>
        </div>
        </div>
        <div className="flex p-2 space-x-4">
          <input
            id=""
            className="w-6/12 p-2"
            required
            placeholder="*שם משפחה"
            name="firstName"
            type="text"
          />
          <input
            id=""
            className="w-6/12 p-2"
            required
            placeholder="*שם פרטי"
            name="lastName"
            type="text"
          />
        </div>
        <div className="px-2 py-1">
        <div className="py-2">
          <input
            className="w-full p-2"
            required
            placeholder="אימייל*"
            name="email"
            type="email"
          />
        </div>
        <div className="py-2">
          <input
            className="w-full p-2"
            required
            placeholder="*שם החברה (אופציונלי)"
            name="company"
            type="text"
          />
        </div>
        <div className="py-2">
          <input
            className="w-full p-2"
            required
            placeholder="*טלפון "
            name="phone"
            type="phone"
          />
        </div>
        <div className="py-2">
          <textarea
            id="free-text"
            className="w-full p-2"
            name="message"
            required
            placeholder=" טקסט חופשי..."
          />
        </div>
        </div>
        <div className="w-full p-2">
        <button className="blueBtn w-full rounded-sm p-2 text-white" type="submit">
          שליחה
        </button> 
        </div>
      </form>
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Contact;
