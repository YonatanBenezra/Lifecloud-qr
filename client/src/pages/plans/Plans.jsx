import React, { useContext, useState } from 'react';
import './plans.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import { AuthContext } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Arrow1 from '../../assets/Arrow1.png'
import basic1 from '../../assets/basic1.png'
import basic2 from '../../assets/basic2.png'
import standart2 from '../../assets/standart2.png'
import Premium1 from '../../assets/Premium1.png'
import Product from '../../components/shop/Product'
import flowersImg from '../../assets/product_flowers.jpg'
import woodPrintImg from '../../assets/product_wood_print.jpg'
import qrImg from '../../assets/product_qr.jpg'


const Plans = () => {
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const history = useHistory();
  const { myFirebase, user } = useContext(AuthContext);
  const tempText = "םינוגריאל יגעכחיג כגחיכחג  םינוגריאל יגעכחיג כגחיכחגי כעכע  םינוגריאל יגעכחיג"

  const products = [
    {
      name: 'פרחים',
      price: 100,
      text: tempText,
      img: flowersImg,
      options: [
        {
          optName: 'opt1',
          img: flowersImg,
          subOptionsTitle: ':בחר זר',
          subOptions: [
            {
              optName: 'זר 1',
              price: 179,
              img: flowersImg
            },
            {
              optName: 'זר 2',
              price: 179,
              img: flowersImg
            },
            {
              optName: 'זר 3',
              price: 179,
              img: flowersImg
            },
          ]
        },
        {
          optName: 'opt2',
          img: flowersImg
        }
      ]
    },
    {
      name: 'תמונות על עץ',
      price: 100,
      text: tempText,
      img: woodPrintImg,
      options: [
        {
          optName: 'opt1',
          img: woodPrintImg
        },
        {
          optName: 'opt2',
          img: woodPrintImg
        }
        ,{
          optName: 'opt3',
          img: woodPrintImg
        }
      ]
    },
    {
      name: 'שרשרת qr',
      price: 100,
      text: tempText,
      img: qrImg,
      options: [
        {
          optName: 'opt1',
          img: qrImg
        },
        {
          optName: 'opt2',
          img: qrImg
        }
        ,{
          optName: 'opt3',
          img: qrImg
        }
      ]
    },
  ]



  const handleOnClick = async () => {
    await myFirebase.saveUser({ ...user, user_type: 'paid' }, 'PUT');
    history.push('/');
  };
  const handleSwitchBack = async () => {
    await myFirebase.saveUser({ ...user, user_type: 'normal' }, 'PUT');
    history.push('/');
  };

  const submit = (product) => setSelectedProduct(product)
  return (
    <>
      <Topbar />
      {selectedProduct ? (
      <div className="main-container">
        <div className="plans">
          <h3 className="plans-logo">תשלומים ותכניות</h3>
        </div>
        <div className="change-plan">
          <h3 onClick={() => setSelectedProduct()} className="pointer">
            {' '}
            +שנה תוכנית
          </h3>
        </div>

        <div className="register-plans">
          <span className='register-plan-type'>סוג תכניות:</span>
           {selectedProduct.name} 
        </div>
        
        <div className="register-plans">
          <span className='register-plan-type'>מחיר:</span>
          ₪{selectedProduct.price}
        </div>

        <div className="register-plans">
          <span className='register-plan-type'>כמות:</span>
          {selectedQuantity}
        </div>

        <div className="register-plans">
          <span className='register-plan-type'>מע"מ:</span>
          ₪{selectedProduct.tax}
        </div>

        <div className="register-plans">
          <span className='register-plan-type'>סכום כולל:</span>
          ₪{selectedProduct.totalPrice * selectedQuantity}
        </div>

        <div className="register-plans">
          <span className='register-plan-type'>הסבר:</span>
          {selectedProduct.text}
        </div>
        
        <div className="payment-method">
          <h3 className="payment-logo">אמצעי תשלום</h3>
        </div>
        <button className="register-plans-payment" >המשך לתשלום</button>
        <img src={Arrow1} className='arrow1-plans-payment' alt=''></img>
      </div>
      ) : ( 
          <div className="plans-section">
            <h1 className="plans-title">חנות</h1>                        
            {/* <div className="plans-container"> 
              <div className="plan-container">
                <img src={basic2} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <div className="plan-description">
                  <h5>שנה</h5>
                  <span className="pointer" onClick={() => setPlan({ name: "חינם", price: 19, tax: 0, totalPrice: 19, description: 'תוכנית זו היא בחינם לשנה שלמה, לאחר מכן התשלום הוא 19 ש"ח לחודש' })} >לחץ לקניית התוכנית</span>
                </div>
              </div>
              <div className="plan-container">
                <img src={Premium1} alt=""></img>
                <h1 className="plan-title">LifeBook</h1>
                <div className="plan-description">
                  <h5>ארגון</h5>
                  <Link to='/contact' >+ לחץ לפרטים נוספים</Link>
                </div>
              </div>
            </div> */}

            <div className='products-container'>
              {products.map((p, i) => (<Product {...p} key={i} submit={() => submit(p)} setSelectedQuantity={setSelectedQuantity}/>))}
            </div>


          </div>
      ) }
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Plans;
