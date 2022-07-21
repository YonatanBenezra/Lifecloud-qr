import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { toast, ToastContainer } from 'react-toastify';
import { postPayCandleFlower, postPayQr } from '../../apiCalls';
import toastCreator from '../../hooks/toastifyCreator';
import './credit-card-details.css';

export const CreditCardDetails = ({
  setIsPaid,
  dataForPay,
  setShowPaymentModal,
  handleFormSubmit,
}) => {
  const [creditCard, setCreditCard] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    myid: '',
  });
  /*  const [errorMessage, setErrorMessage] = useState(''); */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const onClickPay = async () => {
    try {
      let response;
      if (dataForPay.candle || dataForPay.flower) {
        response = await postPayCandleFlower({ ...dataForPay, creditCard });
      } else {
        response = await postPayQr({ ...dataForPay, creditCard });
      }
      console.log(response);
      if (response?.status === 'error') {
        toastCreator(response.message, 'error');
        setIsPaid(false);
      } else {
        toastCreator(response.message, 'success');
        setTimeout(() => {
          setShowPaymentModal(false);
          setIsPaid(true);
          handleFormSubmit();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
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
        />
        <input
          className="nameInput payment-form-input"
          type="number"
          name="expiry"
          placeholder="תוקף"
          onChange={(event) => handleInputChange(event)}
        />
        <input
          className="nameInput payment-form-input"
          type="text"
          name="name"
          placeholder="שם בעל הכרטיס"
          onChange={(event) => handleInputChange(event)}
        />
        <input
          className="nameInput payment-form-input"
          type="number"
          name="cvc"
          placeholder="קוד אימות כרטיס"
          onChange={(event) => handleInputChange(event)}
        />
        <input
          className="nameInput payment-form-input"
          type="number"
          name="myid"
          placeholder="תעודת זהות"
          onChange={(event) => handleInputChange(event)}
        />
      </form>
      <div className="pay-btn-container">
        <button type="button" className="pay-btn" onClick={() => onClickPay()}>
          תשלום
        </button>
      </div>
      {/* {errorMessage && <div>Error Payment: {errorMessage}</div>} */}
      <ToastContainer />
    </div>
  );
};
