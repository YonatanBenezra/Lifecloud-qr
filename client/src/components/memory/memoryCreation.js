import React, { useState, useEffect, useContext } from 'react';
import bluePlus from '../../assets/blue_plus.png';
import axios from 'axios';
import Topbar from '../topbar/Topbar';
import { useParams } from 'react-router';
import './memory-creation.css';
import SnackBar from '../snackbar/SnackBar';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ProgressBar from '../progressbar/progressBar';

const MemoryCreation = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [profiledata, setProfileData] = useState({});
  const id = useParams().profileid;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [multiFiles, setMultiFiles] = useState();
  const [memoryVideo, setMemoryVideo] = useState();

  if (
    profiledata?.originalUser &&
    profiledata?.originalUser?.[0]?._id !== user?._id &&
    !profiledata?.addAdmins?.find(
      (admins) => admins?.user?.[0]?._id === user?._id
    ) &&
    !profiledata?.addFriends?.find(
      (friends) => friends?.user?.[0]?._id === user?._id
    )
  ) {
    history.replace('/');
  }

  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${id}`
    );
    setProfileData(res.data);
  };
  const handleText = (e) => {
    setText(e.target.value);
  };
  const onChangeMultiplePicture = (e) => {
    setMultiFiles(e.target.files[0]);
  };
  const onVideoChange = (e) => {
    setMemoryVideo(e.target.files[0]);
  };
  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append('originalUser', id);
      formdata.append('description', text);
      formdata.append('firstName', profiledata.originalUser[0].firstName);
      formdata.append('lastName', profiledata.originalUser[0].lastName);
      formdata.append('memoryVideo', memoryVideo);
      formdata.append('memoryImges', multiFiles);

      console.log(formdata, 'formdata');
      fetch(`${process.env.REACT_APP_API_URL}/api/memory/createMemory`, {
        method: 'POST',
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          fetch(
            `${process.env.REACT_APP_API_URL}/api/notification/addnotifications`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'Application/json',
              },
              body: JSON.stringify({
                profileId: res.originalUser[0],
                loggedInId: profiledata.originalUser[0]._id,
              }),
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log('notification->', res);
            });
          console.log(res, 'memory created fuccesfully');
          if (res) {
            setLoading(false);

            history.goBack();
            setMessage('Profile updated successfully!');
            setOpen(true);
          }
        });
      // history.goBack()
      // let res = await axios.post('api/profile/createProfile', formdata);
      // console.log('res', res)
      // history.push('/login');
    } catch (err) {
      console.log(err);
      setMessage('Something went wrong!');
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };
  return (
    <React.Fragment>
      {profiledata?.originalUser ? (
        <React.Fragment>
          <Topbar />
          <div className="memory-creation-container">
            <div className="memory-creation-title">
              <h1>יצירת זיכרון</h1>
            </div>
            <div className="memory-creation-content">
              <div className="text-input-container">
                <textarea
                  className="memory-creation-input"
                  name="text"
                  onChange={handleText}
                  dir="rtl"
                  placeholder="הקלד..."
                />
              </div>
              <div className="action-container">
                <div className="btn-container">
                  <input
                    id="memoryVideo"
                    type="file"
                    name="memoryVideo"
                    // multiple
                    onChange={onVideoChange}
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                  <label
                    htmlFor="memoryVideo"
                    className="white-circle add-icon"
                    style={{ backgroundImage: `url('${bluePlus}')` }}
                  >
                    <div className="label-text">הוסף סרטון</div>
                  </label>
                </div>
                <div className="btn-container">
                  <input
                    id="profilePic"
                    type="file"
                    name="multiplefiles"
                    accept="image/*"
                    // multiple
                    onChange={onChangeMultiplePicture}
                  />
                  <label
                    htmlFor="profilePic"
                    className="white-circle add-icon"
                    style={{ backgroundImage: `url('${bluePlus}')` }}
                  >
                    <div className="label-text">הוסף תמונות</div>
                  </label>
                </div>
              </div>
            </div>
            <div className="memory-creation-bottom-actions">
              {loading ? (
                <button className="publish-btn" type="button" disabled>
                  ...יוצר זיכרון
                  <span
                    className="spinner-border spinner-border-lg"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              ) : (
                <div className="publish-btn pointer" onClick={handleClick}>
                  פרסם
                </div>
              )}
              <div className="dlt-btn pointer">מחיקה</div>
            </div>
          </div>
          <SnackBar open={open} handleClose={handleClose} message={message} />
        </React.Fragment>
      ) : (
        <h1 style={{ textAlign: 'center', paddingTop: '20%' }}>
          <ProgressBar />
        </h1>
      )}
    </React.Fragment>
  );
};

export default MemoryCreation;
