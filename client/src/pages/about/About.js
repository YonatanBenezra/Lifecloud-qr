import React from 'react'
import './about.css'
import Footer from '../../components/footer/Footer'
import SocialFooter from '../../components/socialFooter/socialFooter'
import Topbar from '../../components/topbar/Topbar'
import whiteLogo from '../../assets/whiteLogo.png'
import signatureGali from '../../assets/גג 1.png'

const About = () => {
    return (
        <>
            <Topbar />
            <div className='about-container'>
                <div className='top-about'>
                <div className="w-full">
                    <img src={whiteLogo} alt=''  />
                </div>    
                    <div className="">
                        <p>
                            Life cloud נוצרה מתוך הבנה שיש להבדיל בין רשתות חברתיות ועמודי הזכרון, בהם ספר החיים של life cloud.
                            Life cloud היא פלטפורמה נוחה להפעלה וידידותית למשתמש, המאפשרת לנו להעלות, לאשר, לערוך, לאצור ולשתף את אותם הרגעים עם החברים והדורות הבאים.
                        </p>
                    </div>
                    <div>
                        <p>.מי אנחנו? אני, את, אתה וכולנו</p>
                        <p>.בכל זמן נתון ומכל מקום בעולם, משפחה</p>
                    </div>
                </div>
                <div className='bottom-about'>

                    <p> "איבדתי את היקרה לי מכל.</p>
                    <p> יותר מכל רציתי לחגוג את החיים שלה ואת החיים המשותפים לנו יחד. שיהיה לי מקום מיוחד,</p>
                    <p>שבו אני יכול להיזכר ולשתף, בשביל הילדים, המשפחה, החברים, וגם בשבילי.</p>
                    <p>בכל פעם שחיפשתי באלבומים ישנים או ניסיתי</p>
                    <p>לאתר סרטון או תמונה אונליין, זה היה כמעט בלתי אפשרי.</p>
                    <p>מכאן נולד Cloud life, כי בעולם הכל כך מתקדם של היום שבו אתה</p>
                    <p>יכול להגיע לאנשים בקצה השני של העולם בנגיעה על מסך, חייבת הייתה להיות</p>
                    <p>דרך קלה ונוחה לשתף, להעלות, לשמור את החוויות שלנו ולהמשיך לחיות."</p>

                    <div className='gali-simha-img'>
                        <img id='gali-simha-img' src={signatureGali} alt=''></img>
                    </div>
                    <div className='text-center'>גלי שמחה</div>
                </div>
            </div>
            <SocialFooter backgroundColor='#F5FCFF' color='#6097bf' />
            <Footer />
        </>
    )
}
export default About