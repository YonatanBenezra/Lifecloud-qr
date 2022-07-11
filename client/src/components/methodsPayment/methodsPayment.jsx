import React from 'react';
import './methods-payment.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CreditCardDetails } from '../creditCardDetails/creditCardDetails';

export const MethodsPayment = (props) => {
  const { setIsPaid, setIsNext } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [style, setStyle] = useState({
    display: 'none',
  });

  useEffect(() => {
    if (props.isOpen === true || props.isOpen === false) {
      setStyleByIsOpen(props.isOpen);
    }
  }, []);

  useEffect(() => {
    setStyleByIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setStyleByIsOpen(props.isOpen);
  }, [props.isOpen]);

  const setStyleByIsOpen = (open) => {
    if (open) {
      setIsOpen(true);
      setStyle({ 'z-index': 9999999 });
    } else {
      setIsOpen(false);
      setStyle({
        display: 'none',
      });
    }
  };

  const onClickCreditCard = () => {
    setIsCreditCard(true);
    const paymentsMethodModal = document.getElementsByClassName(
      'payments-method-modal'
    );
    for (let i = 0; i < paymentsMethodModal.length; i++) {
      paymentsMethodModal[i].style.display = 'none';
    }
  };

  const backFromCreditCard = () => {
    setIsCreditCard(false);
    const paymentsMethodModal = document.getElementsByClassName(
      'payments-method-modal'
    );
    for (let i = 0; i < paymentsMethodModal.length; i++) {
      paymentsMethodModal[i].style.display = 'block';
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    if (setIsNext) {
      setIsNext(false);
    }
  };

  return (
    <div className="payments-method-container" style={{ ...style }}>
      <div className="modal-container">
        <div className="payments-method-modal">
          <button
            onClick={() => setStyleByIsOpen(!isOpen)}
            className="exit-btn"
            type="submit"
          >
            x
          </button>
          <h3 className="title">:בחר אמצעי תשלום</h3>
          <div className="icons-container-payment">
            <div className="icon-payment-method bit"></div>
            <div className="icon-payment-method apple-pay-icon"></div>
            <div className="icon-payment-method paypal-icon"></div>
            <div
              className="icon-payment-method credit-card-icon"
              onClick={() => onClickCreditCard()}
            >
              <CreditCardIcon
                style={{ marginRight: '5px', fontSize: '16px' }}
              />
              כרטיס אשראי
            </div>
          </div>
          <button
            className="exit-btn exit-btn-methods-payment"
            type="submit"
            onClick={() => closeModal()}
          >
            <ArrowRightAltIcon />
            חזרה{' '}
          </button>
        </div>
        {isCreditCard && (
          <div className="credit-card-container">
            <button
              onClick={() => setStyleByIsOpen(!isOpen)}
              className="exit-btn"
              type="submit"
            >
              x
            </button>
            <CreditCardDetails setIsOpen={setIsOpen} setIsPaid={setIsPaid} setIsNext={setIsNext} />
            <h6
              onClick={() => backFromCreditCard()}
              style={{ marginTop: '15px' }}
            >
              <ArrowRightAltIcon />
              חזרה{' '}
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

MethodsPayment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsPaid: PropTypes.func.isRequired,
  setIsNext: PropTypes.func,
};
