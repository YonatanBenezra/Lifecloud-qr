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

      
        <div className="policy-container">
       
    
            <div className="accordion">
            <h1 className='policy-title'>LifeCloud מדיניות פרטיות</h1>
    
            {data.map((item,i) =>(                                                
                <div className="item" key={'item-'+i}>
                    
    
                    <div className="title" onClick={()=> info(i)}>
                        
                        <h2>{item.title}</h2>
                        <span className="span2">{selected === i ? '-' : '+'}</span>
                    </div>
                    <div className={selected === i ? 'content show': 'content'}>
                        {item.sections && item.sections.map((section, i)=> (
                            <div className='answer-section' key={'section-'+i}>
                                <div className='section-title'>{section.title && section.title}</div>
                                <div>
                                    {section.paragraphs.map((p, i)=> (
                                            <div className={'answer-paragraph ' + (section.title && 'small-text')} key={'paragraph-'+i}>
                                            {p.p}
                                        </div>
                                    ))} 
                                </div>
                            </div>
                        ))}
                    </div>
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
        title: '1. כללי ',
        sections : [
            {   
                paragraphs: [
                    {
                        p: 'חברת חיים בענן בע"מ (להלן: "החברה" או "אנו") מתייחסת בכבוד לפרטיותך ומחויבת לשמור ולהגן על המידע האישי שהיא אוספת ומחזיקה אודותייך. מדיניות הפרטיות להלן מתארת את האופן בו אנו אוספים מידע, סוגי המידע הנאסף, אופן השימוש במידע וכן הדרך בה אתה, כנושא המידע, יכול לעיין בו, לעדכנו או לבקש למחקו.'
                    },
                    {
                        p: 'אנא קרא בעיון את מדיניות הפרטיות לפני שאתה משתמש באתר ו/או בשירותים המוצעים בו. מדיניות פרטיות זו הינה חלק בלתי נפרד מתנאי השימוש שלנו, בהם ניתן לעיין כאן.'
                    },
                    {
                        p: 'בעצם הרישום, הכניסה, ההתחברות, הגישה ו/או השימוש באתר או בשירותים המוצעים בו, אתה מביע את הסכמתך לתנאים המופיעים במדיניות פרטיות זו, לרבות הסכמתך לאיסוף המידע האישי (כהגדרתו להלן), לעיבודו ולשמירתו במאגרי המידע של החברה ולשיתופו עם צדדים שלישיים, כמפורט להלן. אם אינך מסכים לתנאי מדיניות הפרטיות, אינך מורשה לגשת ו/או להשתמש באתר ו/או בשירותים המוצעים בו.'
                    },
                    {
                        p: 'החלוקה במדיניות פרטיות זו לסעיפים וכותרות הסעיפים הינם לשם נוחות בלבד ולא תשמש לצרכי פרשנות. כל האמור במסמך זה בלשון זכר - אף נקבה במשמע. כל האמור במסמך זה בלשון יחיד - אף רבים במשמע.'
                    },
                    {
                        p: 'מונחים אשר אין להם משמעות במדיניות פרטיות זו, תינתן להם המשמעות הנודעת להם בתנאי השימוש של האתר או בחוק הגנת הפרטיות, התשמ"א – 1981 (להלן: "חוק הגנת הפרטיות")'
                    }
                ]                                
            },
        ]
        

    },
    {
        title: '2. איזה מידע אנו עשויים לאסוף? ',
        sections: [
            {
                paragraphs: [
                    {
                        p: 'השימוש באתר ובשירותים המוצעים בו, כולל איסוף של מידע אישי המזהה אותך או צדדים שלישיים או אשר מאפשר לנו לזהות אותך או צדדים שלישיים באופן אישי. כאשר אתה משתמש באתר, אנו עשויים לאסוף ולעבד אודותיך או אודות צדדים שלישיים אחד או יותר מסוגי המידע האישי המפורטים להלן.'
                    },
                ],
            },
            {
                title: '2.1 מידע אישי שנאסף ממך באופן ישיר',
                paragraphs: [
                    {
                        p: '2.1.1'
                    },
                    {
                        p: 'הרשמה ופתיחת חשבון: מידע אישי ייאסף מתוך הפרטים שנמסרו על ידך במסגרת פתיחת חשבון באתר, הכוללים בין היתר, שם מלא, תאריך לידה, מספר טלפון, מס׳ תעודת זהות, כתובת, מקום תושבות, סטטוס משפחתי, אמצעי תשלום, פרטי חשבון בנק וכו׳.'
                    },
                ]
            }
        ]
    },
    {
        title: '3. כיצד אנו משתמשים במידע? ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'        
    },
    {
        title: '4. שיתוף מידע עם צדדים שלישיים ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'        
    },
    {
        title: '5. דיוור שיווקי ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'        
    },
    {
        title: '6. Cookies ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'        
    },
    {
        title: '7. זכות לעיין במידע ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'        
    },
     {
        title: '8. אבטחת מידע ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'        
    },
    {
        title: '9. שינויים במדיניות הפרטיות ',
        answer : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta'        
    }


]






export default Policy