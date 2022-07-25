import React from 'react';
import './methods-payment.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useState } from 'react';
import { CreditCardDetails } from '../creditCardDetails/creditCardDetails';
import { payWithBitReq } from '../../apiCalls';

export const MethodsPayment = (props) => {
  const { setIsPaid, dataForPay, setShowPaymentModal, handleFormSubmit } =
    props;
  const [showCreditCardDetails, setShowCreditCardDetails] = useState(false);

  const payWithBit = async () => {
    const cart = [];
    console.log('paymentType  :', paymentType);
    console.log('dataForPay   :', dataForPay);
    if (
      paymentType === 'flowerOrCandle' &&
      Object.keys(dataForPay).length > 0
    ) {
      if (dataForPay.flower > 0) {
        cart.push([
          {
            name: 'פרח וירטואלי',
            unit_price: 5,
            price_type: 'G',
            vat_percent: 17,
            units_number: dataForPay.flower,
          },
        ]);
      }
      if (dataForPay.candle > 0) {
        cart.push([
          {
            name: 'נר וירטואלי',
            unit_price: 5,
            price_type: 'G',
            vat_percent: 17,
            units_number: dataForPay.candle,
          },
        ]);
      }
    } else if (paymentType === 'qr' && Object.keys(dataForPay).length > 0) {
      cart.push([
        {
          name: 'qr',
          unit_price: 50,
          price_type: 'G',
          vat_percent: 17,
          units_number: 1,
        },
      ]);
    }
    console.log('cart  : ', cart);
    await payWithBitReq({ ...dataForPay, cart });
  };

  return (
    <div className="payments-method-container">
      <div className="modal-container">

        {!showCreditCardDetails ? (
          <div className="payments-method-modal">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="exit-btn"
              type="button"

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
                onClick={() => setShowCreditCardDetails(true)}
              >
                <CreditCardIcon
                  style={{ marginRight: '5px', fontSize: '16px' }}
                />
                כרטיס אשראי
              </div>
            </div>
            <button
              className="exit-btn exit-btn-methods-payment"
              type="button"
              onClick={() => setShowPaymentModal(false)}
            >
              <ArrowRightAltIcon />
              חזרה
            </button>
          </div>
        ) : (
          <div className="credit-card-container">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="exit-btn"
              type="button"
            >
              x
            </button>
            <CreditCardDetails

              setIsPaid={setIsPaid}
              dataForPay={dataForPay}
              setShowPaymentModal={setShowPaymentModal}
              handleFormSubmit={handleFormSubmit}
            />
            <h6
              onClick={() => setShowCreditCardDetails(false)}
              style={{ marginTop: '15px' }}
            >
              <ArrowRightAltIcon />
              חזרה
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

/* MethodsPayment.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsPaid: PropTypes.func.isRequired,
  setIsNext: PropTypes.func,
  paymentType: PropTypes.string.isRequired,
};
 */
