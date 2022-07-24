import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { postPay, postPayQr } from '../../apiCalls';
import './credit-card-details.css';

export const CreditCardDetails = ({
  setIsOpen,
  setIsPaid,
  setIsNext,
  dataForPay,
  paymentType,
}) => {
  const [creditCard, setCreditCard] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    myid: '',
  });
  const [errorPayment, setErrorPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputFocus = (e) => {
    if (e.target) {
      setCreditCard({ ...creditCard, focus: e.target.name });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCreditCard({ ...creditCard, [name]: value });
  };
  const onClickPay = async () => {
    try {
      let res = null;
      if (paymentType === 'qr') {
        res = await postPayQr({ ...dataForPay, creditCard }).catch((err) =>
          setErrorMessage(err)
        );
      } else if (paymentType === 'flowerOrCandle') {
        res = await postPay({ ...dataForPay, creditCard }).catch((err) =>
          setErrorMessage(err)
        );
      }
      if (res) {
        setIsOpen(false);
        if (setIsNext) {
          setIsNext(false);
        }
        if (res === true) {
          setIsPaid(true);
        } else {
          setIsPaid(false);
          setErrorMessage(res);
          setErrorPayment(true);
        }
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div id="PaymentForm">
      <Cards
        cvc={creditCard.cvc}
        expiry={creditCard.expiry}
        focused={creditCard.focus}
        name={creditCard.name}
        number={creditCard.number}
      />
      <form className="payment-form-container">
        <input
          className="nameInput payment-form-input"
          type="tel"
          name="number"
          placeholder="מספר כרטיס"
          onChange={(event) => handleInputChange(event)}
          onFocus={(event) => handleInputFocus(event)}
        />
        <input
          className="nameInput payment-form-input"
          type="number"
          name="expiry"
          placeholder="תוקף"
          onChange={(event) => handleInputChange(event)}
          onFocus={(event) => handleInputFocus(event)}
        />
        <input
          className="nameInput payment-form-input"
          type="text"
          name="name"
          placeholder="שם בעל הכרטיס"
          onChange={(event) => handleInputChange(event)}
          onFocus={(event) => handleInputFocus(event)}
        />
        <input
          className="nameInput payment-form-input"
          type="number"
          name="cvc"
          placeholder="קוד אימות כרטיס"
          onChange={(event) => handleInputChange(event)}
          onFocus={(event) => handleInputFocus(event)}
        />
        <input
          className="nameInput payment-form-input"
          type="number"
          name="myid"
          placeholder="תעודת זהות"
          onChange={(event) => handleInputChange(event)}
          onFocus={(event) => handleInputFocus(event)}
        />
      </form>
      <div className="pay-btn-container">
        <button type="button" className="pay-btn" onClick={() => onClickPay()}>
          תשלום
        </button>
      </div>
      {errorMessage.length > 0 && <div>Error Payment: {errorMessage}</div>}
    </div>
  );
};
