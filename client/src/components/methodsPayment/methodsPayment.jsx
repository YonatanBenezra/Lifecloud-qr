import React from 'react';
import './methods-payment.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CreditCardDetails } from '../creditCardDetails/creditCardDetails';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export const MethodsPayment = (props) => {
  const { setIsPaid, setIsNext, dataForPay, type } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [isPaypal, setIsPaypal] = useState(false);
  const [purchaseUnits, setPurchaseUnits] = useState([]);
  const [style, setStyle] = useState({
    display: 'none',
  });

  useEffect(() => {
    if (props.isOpen === true || props.isOpen === false) {
      setStyleByIsOpen(props.isOpen);
    }
  }, []);
  useEffect(() => {
    if (type === 'qr') {
      setPurchaseUnits([
        {
          amount: {
            value: 100,
          },
        },
      ]);
    } else if (type === 'candalOrFlower') {
      setPurchaseUnits([
        {
          amount: {
            value: dataForPay.candal * 5 + dataForPay.flower * 5,
          },
        },
      ]);
    }
  }, [isPaypal === true]);

  useEffect(() => {
    setStyleByIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setStyleByIsOpen(props.isOpen);
  }, [props.isOpen]);

  const setStyleByIsOpen = (open) => {
    if (open) {
      setIsOpen(true);
      setStyle({ zIndex: 9999999 });
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

            <div
              className="icon-payment-method"
              onClick={() => setIsPaypal(true)}
            >
              <PayPalScriptProvider
                deferLoading={false}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [...purchaseUnits],
                  });
                }}
                options={{ 'client-id': 'test' }}
              >
                <PayPalButtons style={{ layout: 'horizontal' }} />
              </PayPalScriptProvider>
            </div>
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
            <CreditCardDetails
              setIsOpen={setIsOpen}
              setIsPaid={setIsPaid}
              setIsNext={setIsNext}
              dataForPay={dataForPay}
            />
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
  type: PropTypes.string.isRequired,
};
