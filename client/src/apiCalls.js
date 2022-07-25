import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
const tranzilaPublicKey = process.env.REACT_APP_TRANZILA_PUBLIC_KEY;
const tranzilaPrivetKey = process.env.REACT_APP_TRANZILA_PRIVET_KEY;
const terminalName = process.env.REACT_APP_TERMINAL_NAME;
const urlRedirect = process.env.REACT_APP_URL_REDIRECT;
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      userCredential
    );
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    toast.error(
      `${err.response.data.message || 'Invalid email or password'}!`,
      {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};

export const fetchuserprofiles = async (id, dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${id}`
    );
    dispatch({ type: 'USER-PROFILES', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const postPay = async (data) => {
  try {
    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/payment/pay`, data)
      .catch((err) => {
        throw err;
      });
    if (res.data && res.data.isPaid) {
      return res.data.isPaid;
    } else if (res.data && res.data.error) {
      throw res.data.error;
    }
  } catch (err) {
    return err;
  }
};
export const postPayQr = async (data) => {
  try {
    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/payment/pay-qr`, data)
      .catch((err) => {
        throw err;
      });
    if (res.data && res.data.isPaid) {
      return res.data.isPaid;
    } else if (res.data && res.data.error) {
      throw res.data.error;
    }
  } catch (err) {
    return err;
  }
};

export const payWithBitReq = async (data) => {
  try {
    const body = {
      terminal_name: terminalName,
      success_url: `${urlRedirect}/process/success`,
      failure_url: `${urlRedirect}/process/fail`,
      txn_currency_code: 'ILS',
      txn_type: 'debit',
      items: [...data.cart],
      client: {
        id: data.user,
      },
    };

    const time = Math.round(new Date().getTime() / 1000);
    const nonce = makeId(80);
    const hash = CryptoJS.HmacSHA256(
      tranzilaPublicKey,
      tranzilaPrivetKey + time + nonce
    ).toString(CryptoJS.enc.Hex);
    const headers = {
      'X-tranzila-api-app-key': tranzilaPublicKey,
      'X-tranzila-api-request-time': time,
      'X-tranzila-api-nonce': nonce,
      'X-tranzila-api-access-token': hash,
    };
    console.log('body    :  ', body);
    console.log('headers  : ', headers);
    const res = await axios
      .post(`https://api.tranzila.com/v1/transaction/bit/init`, body, {
        headers: headers,
      })
      .catch((err) => {
        throw err;
      });
    console.log('res : ', res);
    // if (res) {
    //   if (res.error_code === 0) {
    //     throw new Error('payment failed');
    //   }
    // }
  } catch (err) {
    console.log('err:', err);
    return err;
  }
};

const makeId = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
