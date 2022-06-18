import React, { useContext, useState, useEffect, useRef } from 'react';
import './shop.css';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import Topbar from '../../components/topbar/Topbar';
import whiteLogo from '../../assets/whiteLogo.png';
import { AuthContext } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Arrow1 from '../../assets/Arrow1.png';
import basic1 from '../../assets/basic1.png';
import basic2 from '../../assets/basic2.png';
import standart2 from '../../assets/standart2.png';
import Premium1 from '../../assets/Premium1.png';
import Product from '../../components/shop/Product';
import flowersImg from '../../assets/product_flowers.jpg';
import woodPrintImg from '../../assets/product_wood_print.jpg';
import qrImg from '../../assets/product_qr.jpg';
import emailjs from '@emailjs/browser';
import SnackBar from '../../components/snackbar/SnackBar';
import LazyLoad from 'react-lazyload';

const Shop = () => {
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
        'template_mmyqft9',
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

  const history = useHistory();
  const { myFirebase, user } = useContext(AuthContext);

  const [showSelected, setShowSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [submitedOption, setSubmitedOption] = useState();
  const [submitedSubOption, setSubmitedSubOption] = useState();
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    productPrice && setShowSelected(true);
  }, [productPrice]);
  useEffect(() => {
    console.log('submitedSubOption useEffect changed', submitedSubOption);
  }, [submitedSubOption]);

  useEffect(() => {
    submitedSubOption && sumbitProductPrice();
  }, [submitedSubOption]);
  useEffect(() => {
    submitedOption && sumbitProductPrice();
  }, [submitedOption]);

  const handleBack = () => {
    setShowSelected(false);
    setSelectedProduct();
    setSelectedQuantity(1);
    setSubmitedOption();
    setSubmitedSubOption();
    setProductPrice(0);
  };
  const handleOnClick = async () => {
    await myFirebase.saveUser({ ...user, user_type: 'paid' }, 'PUT');
    history.push('/');
  };
  const handleSwitchBack = async () => {
    await myFirebase.saveUser({ ...user, user_type: 'normal' }, 'PUT');
    history.push('/');
  };

  const submit = (product, selectedOption, selectedSubOption) => {
    // console.log('submitted product', product)
    // console.log('submitted selectedOption', selectedOption)
    // console.log('selectedSubOption product', selectedSubOption)
    setSelectedProduct(product);
    setSubmitedOption(selectedOption);
    selectedSubOption && setSubmitedSubOption(selectedSubOption);
  };

  const sumbitProductPrice = () => {
    console.log('sumbitProductPrice submitedSubOption ', submitedSubOption);
    setProductPrice(
      submitedSubOption
        ? submitedSubOption.price
        : submitedOption
        ? submitedOption.price
        : selectedProduct.price
    );
  };

  const tempText =
    'םינוגריאל יגעכחיג כגחיכחג  םינוגריאל יגעכחיג כגחיכחגי כעכע  םינוגריאל יגעכחיג';
  const products = [
    {
      name: 'פרחים',
      priceRange: '400 - 100',
      text: tempText,
      img: flowersImg,
      options: [
        {
          optName: 'opt2',
          img: flowersImg,
          price: 321,
        },
        {
          optName: 'opt1',
          img: flowersImg,
          subOptionsTitle: ':בחר זר',
          subOptions: [
            {
              optName: 'זר 1',
              price: 179,
              img: flowersImg,
            },
            {
              optName: 'זר 2',
              price: 222,
              img: flowersImg,
            },
            {
              optName: 'זר 3',
              price: 333,
              img: flowersImg,
            },
          ],
        },
      ],
    },
    {
      name: 'תמונות על עץ',
      priceRange: '400 - 100',
      text: tempText,
      img: woodPrintImg,
      options: [
        {
          optName: 'opt1',
          img: woodPrintImg,
          price: 111,
        },
        {
          optName: 'opt2',
          img: woodPrintImg,
          price: 222,
        },
        {
          optName: 'opt3',
          img: woodPrintImg,
          price: 333,
        },
      ],
    },
    {
      name: 'שרשרת qr',
      priceRange: '400 - 100',
      text: tempText,
      img: qrImg,
      options: [
        {
          optName: 'opt1',
          img: qrImg,
          price: 111,
        },
        {
          optName: 'opt2',
          img: qrImg,
          price: 222,
        },
        {
          optName: 'opt3',
          img: qrImg,
          price: 333,
        },
      ],
    },
  ];

  return (
    <>
      <Topbar />
      {showSelected ? (
        <div className="shop-main-container">
          <div className="shop">
            <h3 className="shop-logo">תשלומים ותכניות</h3>
          </div>
          <div className="change-shop">
            <h3 onClick={() => handleBack()} className="pointer">
              {' '}
              חזור לדף המוצרים
            </h3>
          </div>

          <div className="register-shop">
            <span className="register-shop-type">סוג תכניות: </span>
            {selectedProduct.name}
          </div>

          <div className="register-shop">
            <span className="register-shop-type">מחיר: </span>₪{productPrice}
          </div>

          <div className="register-shop">
            <span className="register-shop-type">כמות: </span>
            {selectedQuantity}
          </div>

          <div className="register-shop">
            <span className="register-shop-type">מע"מ: </span>₪
            {productPrice * 0.18 * selectedQuantity}
          </div>

          <div className="register-shop">
            <span className="register-shop-type">סכום כולל: </span>₪
            {productPrice * selectedQuantity * 1.18}
          </div>

          <div className="register-shop">
            <span className="register-shop-type">הסבר: </span>
            {selectedProduct.text}
          </div>

          <div className="payment-method">
            <h3 className="payment-logo">אמצעי תשלום</h3>
          </div>
          <button className="register-shop-payment">המשך לתשלום</button>
          <LazyLoad>
            <img src={Arrow1} className="arrow1-shop-payment" alt="" />
          </LazyLoad>
        </div>
      ) : (
        <div className="shop-section">
          <h1 className="shop-title">חנות</h1>
          {/* <div className="shop-container"> 
              <div className="shop-container">
                <img src={basic2} alt=""></img>
                <h1 className="shop-title">LifeBook</h1>
                <div className="shop-description">
                  <h5>שנה</h5>
                  <span className="pointer" onClick={() => setshop({ name: "חינם", price: 19, tax: 0, totalPrice: 19, description: 'תוכנית זו היא בחינם לשנה שלמה, לאחר מכן התשלום הוא 19 ש"ח לחודש' })} >לחץ לקניית התוכנית</span>
                </div>
              </div>
              <div className="shop-container">
                <img src={Premium1} alt=""></img>
                <h1 className="shop-title">LifeBook</h1>
                <div className="shop-description">
                  <h5>ארגון</h5>
                  <Link to='/contact' >+ לחץ לפרטים נוספים</Link>
                </div>
              </div>
            </div> */}

          <div className="products-container container">
            {products.map((p, i) => (
              <Product
                product={p}
                {...p}
                key={i}
                submit={submit}
                setSelectedQuantity={setSelectedQuantity}
              />
            ))}
          </div>
        </div>
      )}
      <SocialFooter backgroundColor="#dcecf4" color="#6097bf" />
      <Footer />
    </>
  );
};
export default Shop;
