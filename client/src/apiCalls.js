import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
