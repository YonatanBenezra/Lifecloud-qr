import axios from 'axios';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post((`${process.env.REACT_APP_API_URL}/api/auth/login`), userCredential);
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