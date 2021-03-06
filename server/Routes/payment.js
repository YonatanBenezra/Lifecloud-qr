const Router = require('express');
const PaymentRouter = Router();
const { get } = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const supplier = process.env.PAYMENT_SUPPLIER;
const tranzilaPW = process.env.PAYMENT_TRANZILA_PW;

PaymentRouter.post('/pay-qr', async (req, res) => {
  try {
    const { creditCard, userId } = req.body;
    const qrPrice = 100;
    if (
      !Object.keys(creditCard).length ||
      !userId.length ||
      !tranzilaPW.length
    ) {
      throw 'missing param';
    }
    Object.keys(creditCard).map((key) => {
      if (!creditCard[key].length) {
        throw 'credit card details missing';
      }
    });
    const responsePayment = await get(
      `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?supplier=${supplier}&tranmode=A&ccno=${creditCard.number}&expdate=${creditCard.expiry}&sum=${qrPrice}&currency=1&cred_type=1&myid=${creditCard.myid}&mycvv=${creditCard.cvc}&TranzilaPW=${tranzilaPW}`
    );
    const resp = await responseChecker(responsePayment).catch((err) => {
      throw err;
    });
    res.send({ ...resp });
  } catch (error) {
    res.json({ error });
  }
});

PaymentRouter.post('/pay', async (req, res) => {
  try {
    const { creditCard, flower, candle, profile, user } = req.body;
    if (
      !Object.keys(creditCard).length ||
      !Number.isInteger(flower) ||
      !Number.isInteger(candle) ||
      !profile.length ||
      !user.length ||
      !tranzilaPW.length
    ) {
      throw 'missing param';
    }
    const calcSum = () => {
      return flower * 5 + candle * 5;
    };
    Object.keys(creditCard).map((key) => {
      if (!creditCard[key].length) {
        throw 'credit card details missing';
      }
    });
    const responsePayment = await get(
      `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?supplier=${supplier}&tranmode=A&ccno=${
        creditCard.number
      }&expdate=${
        creditCard.expiry
      }&sum=${calcSum()}&currency=1&cred_type=1&myid=${creditCard.myid}&mycvv=${
        creditCard.cvc
      }&TranzilaPW=${tranzilaPW}`
    );
    const resp = await responseChecker(responsePayment).catch((err) => {
      throw err;
    });
    res.send({ ...resp });
  } catch (err) {
    res.json({ err });
  }
});

const responseChecker = async (responsePayment) => {
  try {
    if (responsePayment.data) {
      const params = new URLSearchParams(responsePayment.data);
      const result = {};
      let isPaid = false;
      for (const [key, value] of params) {
        result[key] = value;
      }
      if (
        result.Response &&
        (result.Response === 000 || result.Response === '000')
      ) {
        isPaid = true;
      } else {
        throw { message: 'Unable to pay', statusCode: result.Response };
      }
      return { isPaid: isPaid, Response: result.Response, sum: result.sum };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { PaymentRouter };
