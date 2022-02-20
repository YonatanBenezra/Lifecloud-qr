import React from 'react'
import './contact.css'
import Footer from '../../components/footer/Footer'
import SocialFooter from '../../components/socialFooter/socialFooter'
import Topbar from '../../components/topbar/Topbar'
import whiteLogo from '../../assets/whiteLogo.png'
import Arrow1 from '../../assets/Arrow1.png'

const Contact = () => {
    return (
        <>
            <Topbar />
            <div className="about-container">
                <div className="plans">
                    <h3 className="plans-logo">צור קשר</h3>
                </div>

                <div>
                    <h3 id="first-name" className="register-contact-inline">*שם משפחה </h3>
                    <h3 id="last-name" className="register-contact-inline">*שם פרטי </h3>
                </div>
                <div>
                    <h3 className="register-contact">*שם החברה (אופציונלי) </h3>
                </div>
                <div>
                    <h3 className="register-contact">*טלפון </h3>
                </div>
                <div>
                    <h3 className="register-contact">*מייל </h3>
                </div>
                <div>
                    <h3 id="free-text" className="register-contact">טקסט חופשי... </h3>
                </div>


                <button className="contact-send" >שליחה</button>
                <img src={Arrow1} className='arrow' alt=''></img>
            </div>

            <SocialFooter backgroundColor='#dcecf4' color='#6097bf' />
            <Footer />
        </>
    )
}
export default Contact