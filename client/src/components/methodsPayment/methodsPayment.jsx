import React from 'react';
import './methods-payment.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const MethodsPayment = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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
      setStyle({});
    } else {
      setIsOpen(false);
      setStyle({
        display: 'none',
      });
    }
  };

  return (
    <div className="payments-method-container" style={{ ...style }}>
      <div className="payments-method-modal">
        <h3 className="title">:בחר אמצעי תשלום</h3>
        <div className="icons-container-payment">
          <div className="icon-payment-method bit"></div>
          <div className="icon-payment-method apple-pay-icon"></div>
          <div className="icon-payment-method paypal-icon"></div>
          <div className="icon-payment-method credit-card-icon">
            <CreditCardIcon style={{ marginRight: '5px', fontSize: '16px' }} />
            כרטיס אשראי
          </div>
        </div>
        <h6 onClick={() => setStyleByIsOpen(!isOpen)}>
          חזרה <ArrowRightAltIcon />
        </h6>
      </div>
    </div>
  );
};

MethodsPayment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
