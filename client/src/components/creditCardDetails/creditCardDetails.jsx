import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import './credit-card-details.css';

export const CreditCardDetails = () => {
  const [creditCard, setCreditCard] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const handleInputFocus = (e) => {
    console.log(e);
    if (e.target) {
      setCreditCard({ ...creditCard, focus: e.target.name });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCreditCard({ ...creditCard, [name]: value });
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
      </form>
      <button className="pay-btn">תשלום</button>
    </div>
  );
};
