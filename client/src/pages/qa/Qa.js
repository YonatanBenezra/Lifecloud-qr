import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import './qa.css';

function Qa() {
  const [selected, setSelected] = useState(0);
  const info = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <>
      <Topbar />

      <div className="policy-container">
        <div className="accordion">
          <h1 className="policy-title">שאלות ותשובות נפוצות</h1>

          {data.map((item, i) => (
            <div className="item" key={'item-' + i}>
              <div className="title" onClick={() => info(i)}>
                <h2>{item.title}</h2>
                <span className="span2">{selected === i ? '-' : '+'}</span>
              </div>
              <div className={selected === i ? 'content show' : 'content'}>
                {item.sections &&
                  item.sections.map((section, i) => (
                    <div className="answer-section" key={'section-' + i}>
                      <div className="section-title">
                        {section.subTitle && section.subTitle}
                      </div>
                      <div>
                        {section.paragraphs &&
                          section.paragraphs.map((p, i) => (
                            <div
                              className={
                                'answer-paragraph ' +
                                (section.subTitle ? 'small-text ' : '') +
                                (p.noMargin ? 'no-margin' : '') +
                                (p.bold ? ' bold' : '')
                              }
                              key={'paragraph-' + i}
                            >
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

      <SocialFooter backgroundColor="#F5FCFF" color="#6097bf" />
      <Footer />
    </>
  );
}

const data = [
  {
    title: '⦁ מה מכיל "ספר הדיגיטלי"?',
    sections: [
      {
        paragraphs: [
          {
            p: 'ספר החיים משמש בעצם כאנדרטה דיגיטלית, אשר מנציחה את חיי המנוח/ה – ',
          },
          {
            p: 'פרטים אישיים, תאריך לידה ותאריך קבורה, מיקום הקבר, סיפור חיים ואבני דרך, תמונות וקבצי מדיה, הוספת עוקבים, שיתוף זיכרונות ועוד.',
          },
          {
            p: 'הספר מנגיש את סיפור החיים על פלטפורמה מוכרת כרשת חברתית.',
          },
        ],
      },
    ],
  },
  {
    title: '⦁ מה הצורך ב"ספר חיים"?',
    sections: [
      {
        paragraphs: [
          {
            p: 'כשיקירנו או יקירתנו הולכים לעולמם הם משאירים אחריהם בעיקר זכרונות – חלקם מתועדים (תמונות, סרטונים, חומר כתוב) וחלקם לא. ',
          },
          {
            p: '"ספר החיים" עוזר לך לשמור את הזכרונות האלו לעולמים ולהנגיש אותם לקרובים לך ולמנוח/ה.',
          },
        ],
      },
    ],
  },
  {
    title: '⦁ מה ההבדל בין Lifetime Book לאתר שאקים בעצמי?',
    sections: [
      {
        paragraphs: [
          {
            p: 'ראשית, כל אדם שמקים אתר עבור יקיר או יקירה שנפטר, הרי זה מבורך.',
          },
          {
            p: 'אנו מציעים פלטפורמה נוחה ונגישה שחוסכת זמן ועלויות, ומבטיחה שימור של המידע לאורך זמן.',
          },
        ],
      },
    ],
  },

  {
    title: '⦁ מי יכול ליצור "ספר חיים"?',
    sections: [
      {
        paragraphs: [
          {
            p: 'כל אדם. פשוט נרשמים ועוקבים אחרי ההנחיות באתר.',
          },
        ],
      },
    ],
  },
  {
    title: '⦁ כמה זה עולה?',
    sections: [
      {
        paragraphs: [
          {
            p: 'יצירת עמוד בסיסי עבור אדם הינה בחינם. ',
          },
          {
            p: `העלויות ליצירת ספר חיים מפורט יותר כרוכה בעלות. את פירוט העלויות ראה בעמוד התוכניות`,
          },
        ],
      },
    ],
  },
  {
    title: '⦁ האם יש מתחרים בשוק?',
    sections: [
      {
        paragraphs: [
          {
            p: 'כן, יש מתחרים בארץ ובחו"ל ואנו מברכים על התחרות. ',
          },
          {
            p: 'אנחנו ב- Lifetime Book מאמינים שאנו מספקים את השירות הנוח והידידותי והחם ביותר ',
          },
          {
            p: 'לאנשים שאיבדו את יקיריהם ומעוניינים להנציח את זכרם בדרך המכובדת והמפרגנת ביותר.',
          },
        ],
      },
    ],
  },
  {
    title: '⦁ איך משתפים עוקבים?',
    sections: [
      {
        paragraphs: [
          {
            p: 'ישנן מספר דרכים לשיתוף עוקבים.',
          },
          {
            p: 'ניתן לשלוח קישור לעמוד באמצעות מייל, וואטסאפ או SMS.',
          },
          {
            p: '. בנוסף העוקב יכול לסרוק את קוד ה- QR בנייד אם הוא נמצא ליד לוחית הברקוד (החלקת הקבר למשל), או אם קיבל אליו תמונה שלו',
          },
          {
            p: 'בכל מקרה – העוקב יגיע לדף הרשמה, ורישומו מותנה באישור של בעל הספר / חוברת.',
          },
        ],
      },
    ],
  },
  {
    title: '⦁ מי יכול לכתוב ב- Lifetime Book או לערוך אותו?',
    sections: [
      {
        paragraphs: [
          {
            p: ': כל מי שמוגדרת כמנהל (Admin) בספר מסוים, יכול לבצע בו עדכונים ועריכה, ובאפשרותו להוסיף בו תכנים ותגובות.',
          },
          {
            p: `עוקב שאושר ע"י ה- admin יכול להגיב לתכנים שהועלו, כאשר כל תוכן אחר שהוא רוצה להעלות (שיתוף זיכרון, הוספת מדיה וכו') הינו באישור ה- admin.`,
          },
        ],
      },
    ],
  },
  {
    title: '⦁ האם ישנן קטגוריות שונות בהגדרות הפרטיות של כל Lifetime Book?',
    sections: [
      {
        paragraphs: [
          {
            p: 'כן. כל מנהל Lifetime Book קובע בתחילת התהליך את הגדרת הפרטיות של האתר שלו. ישנן 3 קטגוריות:',
          },
          {
            p: '1. ספר פתוח – שבו כל מי שנמצא באתר יכול לראות את כל תכולתו. אם הוא רוצה להוסיף תכנים עליו להירשם כעוקב.',
          },
          {
            p: '2. ספר חצי פתוח – שבו כל מי שנכנס לאתר, יכול לראות את עמוד הפרטים האישיים הראשון, ורק לאחר אישורו כעוקב הוא יכול לצפות בספר כולו.',
          },
          {
            p: '3. ספר סגור – שאותו יכולים לראות רק מי שנרשמו ואושרו כעוקבים.',
          },
        ],
      },
    ],
  },
  {
    title: '⦁ לכמה זמן נשמר המידע בספר החיים?',
    sections: [
      {
        paragraphs: [
          {
            p: 'המידע נשמר ללא הגבלת זמן. ',
          },
          {
            p: '1עבור לקוח פעיל, אנו מתחייבים לתמוך את מאגר המידע באופן שוטף. לקוח שהיה פעיל ובחר להפסיק את השתתפותו – המידע שלו נשמר ולא נמחק, אך הוא אינו זכאי לתמיכה שוטפת.',
          },
        ],
      },
    ],
  },
  {
    title: '⦁ האם אתם מלכ"ר או חברה עסקית?',
    sections: [
      {
        paragraphs: [
          {
            p: 'מאחורי הרעיון להקמת הפלטפורמה עומד סיפור אישי של היזמים, אולם Lifetime Book הינה חברה עסקית למטרות רווח, אשר מקפידה על שקיפות והגינות כלפי לקוחותיה ובכלל.',
          },
        ],
      },
    ],
  },
];

export default Qa;
