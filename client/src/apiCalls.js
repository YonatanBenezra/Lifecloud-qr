import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  console.log(process.env.REACT_APP_API_URL)
  try {
    const res = await axios.post((`${process.env.REACT_APP_API_URL}/api/auth/login`), userCredential);
    console.log(res, 'res')
    let username = `${res.data.firstName} ${res.data.lastName}`
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};


export const fetchuserprofiles = async (id, dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${id}`);
    dispatch({ type: 'USER-PROFILES', payload: res.data });
  } catch (err) {
    console.log(err)
  }
};