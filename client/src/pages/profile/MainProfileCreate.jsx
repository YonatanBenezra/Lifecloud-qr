import axios from 'axios';
import { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import './profile.css';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import SnackBar from '../../components/snackbar/SnackBar';
import './main-profile-create.css';
export default function MainProfileCreate() {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPrivacy, setSelectedPrivacy] = useState('public');
  const [image, setImage] = useState(null);
  const [coverData, setCoverData] = useState(null);
  const [message, setMessage] = useState('');
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const readImage = (e, num) => {
    const reader = new FileReader();
    return reader.readAsDataURL(e[num]);
  };
  console.log(selectedPrivacy, 'selectedPrivacy');
  const onChangeCover = (e) => {
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files);
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setCoverData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [multiFiles, setMultiFiles] = useState([]);
  const onChangeMultiplePicture = (e) => {
    const files = [...e.target.files];
    if (e.target.files[0].type.startsWith('video')) {
      files.forEach(
        (file) =>
          (file.imagePreview =
            'https://www.geirangerfjord.no/upload/images/2018_general/film-and-vid.jpg')
      );
    } else {
      files.forEach((file) => (file.imagePreview = URL.createObjectURL(file)));
    }
    setMultiFiles((prev) => [...prev, ...files]);
  };

  const firstName = useRef();
  const description = useRef();
  const history = useHistory();

  const handlePrivacyChange = (e) => {
    setSelectedPrivacy(e.target.value);
  };


  // console.log(hebBirthDate.current.value)
  const handleClick = async (e) => {
    console.log(id, 'id');
    e.preventDefault();
    const wallInformation = {
      originalUser: id,
      profileImg: picture,
      wallImg: image,
      firstName: firstName.current.value,
      description: description.current.value,
    };

    try {
      const formdata = new FormData();
      formdata.append('profileImg', picture);
      formdata.append('wallImg', image);
      formdata.append('privacy', selectedPrivacy);
      formdata.append('firstName', wallInformation.firstName);
      formdata.append('originalUser', wallInformation.originalUser);
      formdata.append('lastName', 'placeholder');
      formdata.append('description', wallInformation.description);
      formdata.append('isMain', true);
      for (let i = 0; i < multiFiles.length; i++) {
        formdata.append('multiplefiles', multiFiles[i]);
      }
      fetch(`${process.env.REACT_APP_API_URL}/api/profile/createProfile`, {
        method: 'POST',
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res) {
            history.goBack();
            setMessage('Profile made successfully');
            setOpen(true);
          }
        });
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
  const [map, setMap] = useState(false);
  const [position, setPosition] = useState({
    lat: 30.928370265478026,
    lng: 34.81864101562498,
  });

  return (
    <div className="profile-creation-container">
      <Topbar />
      <div className="profile-creation">
        <div className="">
          <div className="loginLeft" style={{ marginBottom: '3rem' }}>
            <h3 className="profile-creation-title">צור פרופיל ראשי</h3>
          </div>
          <div className="profile-images">
            <div className="profile-image-container">
              <img
                className="profile-image"
                src={
                  imgData
                    ? imgData
                    : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                }
                alt=""
              ></img>
              <input
                className="custom-file-input"
                type="file"
                name="profileImg"
                onChange={onChangePicture}
              />
            </div>
            <div className="profile-image-container">
              <img
                className="profile-image"
                src={
                  coverData
                    ? coverData
                    : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                }
                alt=""
              ></img>
              <input
                className="custom-file-input-cover"
                type="file"
                onChange={onChangeCover}
                name="coverImg"
              />
            </div>
          </div>
          <div className="loginRight">
            <div className="RegBox">
              <form className="profile-creation-box" onSubmit={handleClick}>
                <div
                  className="profile-creation-names-container organisation-name"
                >
                  <input
                    placeholder="*שם"
                    ref={firstName}
                    className="fullname-input"
                  />
                </div>
                <div
                  className="location-container"
                  style={{ marginTop: '70px', marginBottom: '70px' }}
                >
                  <h1>העלאת מדיה</h1>
                  <div>
                    <div
                      className="profile-creation-names-container"
                      style={{ flexDirection: 'column' }}
                    >
                      <div className="form-group multi-preview"></div>
                      <div className="media-upload-button-container">
                        <input
                          id="profilePic"
                          type="file"
                          name="multiplefiles"
                          multiple
                          onChange={onChangeMultiplePicture}
                          className="media-upload-button"
                        />
                      </div>
                      <div>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            multiFiles && multiFiles.length > 0
                              ? multiFiles[0].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            multiFiles && multiFiles.length > 1
                              ? multiFiles[1].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            multiFiles && multiFiles.length > 2
                              ? multiFiles[2].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            multiFiles && multiFiles.length > 3
                              ? multiFiles[3].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            multiFiles && multiFiles.length > 4
                              ? multiFiles[4].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                      </div>
                    </div>
                  </div>{' '}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h1>על העמותה</h1>
                  <input
                    ref={description}
                    className="profile-creation-description"
                  />
                </div>

                <div className="radio-container-register">
                  <h3 style={{ color: '#6097BF' }}>פרטיות</h3>
                  <div
                    style={{
                      width: 'unset',
                      paddingRight: '10px',
                      paddingLeft: '10px',
                    }}
                    className={`${
                      selectedPrivacy === 'private' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedPrivacy('private')}
                  >
                    <input
                      type="radio"
                      value="private"
                      id="private"
                      onChange={handlePrivacyChange}
                      checked={user.privacy === 'private'}
                      name="privacy"
                      className="radio"
                    />
                    <label htmlFor="private">פרטי</label>
                  </div>
                  <div
                    style={{
                      width: 'unset',
                      paddingRight: '10px',
                      paddingLeft: '10px',
                    }}
                    className={`${
                      selectedPrivacy === 'public' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedPrivacy('public')}
                  >
                    <input
                      type="radio"
                      value="public"
                      id="public"
                      onChange={handlePrivacyChange}
                      checked={user.privacy === 'public'}
                      name="privacy"
                      className="radio"
                    />
                    <label htmlFor="public">פומבי</label>
                  </div>
                </div>

                <button className="create-btn" type="submit">
                  שמור
                </button>
              </form>
            </div>
          </div>
        </div>
        <SnackBar open={open} handleClose={handleClose} message={message} />
      </div>
    </div>
  );
}
