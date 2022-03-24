import React from 'react'
import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import SocialFooter from '../../components/socialFooter/socialFooter'
import Topbar from '../../components/topbar/Topbar'
import './policy.css'

function Policy() {
    

    
  const [selected, setSelected] = useState(0)
    const info =(i) =>{
        console.log(selected)
        if (selected === i){
            return setSelected(null)
        }
        setSelected (i)
    }
    return (
        <>
       
       <Topbar />

      
        <div className="md:container md:mx-auto bgBlue">
       
    
            <div className="">
            <h1 className='text-4xl txtColor text-center pt-5'>LifeCloud תויטרפ תוינידמ</h1>
    
            {data.map((item,i) =>(
                
                
                
                <div className="item">
                    
    
                    <div className="title font-bold" onClick={()=> info(i)}>
                        
                        <h2>{item.question}</h2>
                        <span className="span2 font-bold">{selected === i ? '-' : '+'}</span>
                    </div>
                    <div className={selected === i ? 'content show': 'content'}> {item.answer}</div>
                </div>

            ))}

           
            </div>

        </div>

        <SocialFooter backgroundColor='#F5FCFF' color='#6097bf' />
        <Footer/>
        </>
                              
    )
  }

  
  

 const data = [
    {
        question: ' יללכ .1',
        answer : 'חברת חיים בענן בע"מ )להלן: "החברה" או "אנו"( מתייחסת בכבוד לפרטיותך ומחויבת לשמור ולהגן על המידע האישי שהיא אוספת ומחזיקה אודותייך. מדיניות הפרטיות להלן מתארת את האופן בו אנו אוספים מידע, סוגי המידע הנאסף, אופן השימוש במידע וכן הדרך בה אתה, כנושא המידע, יכול לעיין בו, לעדכנו או לבקש למחקו.אנא קרא בעיון את מדיניות הפרטיות לפני שאתה משתמש באתר ו/או בשירותים המוצעים בו. מדיניות פרטיות זו הינה חלק בלתי נפרד מתנאי השימוש שלנו, בהם ניתן לעיין כאן.בעצם הרישום, הכניסה, ההתחברות, הגישה ו/או השימוש באתר או בשירותים המוצעים בו, אתה מביע את הסכמתך לתנאים המופיעים במדיניות פרטיות זו, לרבות הסכמתך לאיסוף המידע האישי (כהגדרתו להלן), לעיבודו ולשמירתו במאגרי המידע של החברה ולשיתופו עם צדדים שלישיים, כמפורט להלן. אם אינך מסכים לתנאי מדיניות הפרטיות, אינך מורשה לגשת ו/או להשתמש באתר ו/או בשירותים המוצעים בו.החלוקה במדיניות פרטיות זו לסעיפים וכותרות הסעיפים הינם לשם נוחות בלבד ולא תשמש לצרכי פרשנות. כל האמור במסמך זה בלשון זכר - אף נקבה במשמע. כל האמור במסמך זה בלשון יחיד - אף רבים במשמע.מונחים אשר אין להם משמעות במדיניות פרטיות זו, תינתן להם המשמעות הנודעת להם בתנאי השימוש של האתר או בחוק הגנת הפרטיות, התשמ"א – 1981 (להלן: "חוק הגנת הפרטיות")'
        
        
    },

    {
        question: '.2 איזה מידע אנו עשויים לאסוף? ',
        answer : '2.1 מידע אישי שנאסף ממך באופן ישיר השימוש באתר ובשירותים המוצעים בו, כולל איסוף של מידע אישי המזהה אותך או צדדים שלישיים או אשר מאפשר לנו לזהות אותך או צדדים שלישיים באופן אישי. כאשר אתה משתמש באתר, אנו עשויים לאסוף ולעבד אודותיך או אודות צדדים שלישיים אחד או יותר מסוגי המידע האישי המפורטים להלן.'
        

        
    },
    {
        question: '.3 כיצד אנו משתמשים במידע? ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'

        
    },
    {
        question: '.4 שיתוף מידע עם צדדים שלישיים ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'

        
    },
    {
        question: '.5 דיוור שיווקי ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'

        
    },
    {
        question: ' .6 Cookies ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'

        
    },
    {
        question: '.7 זכות לעיין במידע ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'

        
    },
     {
        question: '.8 אבטחת מידע ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'

        
    },
    {
        question: '.9 שינויים במדיניות הפרטיות ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'

        
    }


]






export default Policy