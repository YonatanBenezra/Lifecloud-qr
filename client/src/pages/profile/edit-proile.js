import axios from 'axios';
import { useRef, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import profiles from './dummy-profiles.json';
import './profile.css';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import moment from 'moment';
import SnackBar from '../../components/snackbar/SnackBar';
import Map from './Map';
export default function ProfileEdit() {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [open, setOpen] = useState(false);
  const [profiledata, setProfileData] = useState({});
  const [hebBirthDate, sethebBirthDate] = useState('');
  const [hebDeathDate, sethebDeathDate] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState('public');
  const [image, setImage] = useState(null);
  const [graveImage, setGraveImage] = useState(null);
  const [graveData, setGraveData] = useState(null);
  const [coverData, setCoverData] = useState(null);
  const [message, setMessage] = useState('');
  const [multiFiles, setMultiFiles] = useState([]);
  const [googlePosition, setGooglePosition] = useState({});
  const [inputList, setInputList] = useState([
    { axisTitle: '', axisDate: '', axisDescription: '' },
  ]);
  const firstName = useRef();
  const lastName = useRef();
  const companyName = useRef();
  const birthDate = useRef();
  // const hebBirthDate = useRef();
  const deathDate = useRef();
  // const hebDeathDate = useRef();
  const city = useRef();
  const degree = useRef();
  const gender = selectedGender;
  // const privacy = selectedPrivacy;
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const wazeLocation = useRef();
  const googleLocation = useRef();
  const description = useRef();
  const axisDescription = useRef();
  const axisTitle = useRef();
  const axisDate = useRef();
  const history = useHistory();
  const [wallInformation, setWallInformation] = useState({
    originalUser: Object.keys(profiledata).length
      ? profiledata.originalUser[0]._id
      : '',
    profileImg: Object.keys(profiledata).length ? profiledata.profileImg : '',
    graveImg: Object.keys(profiledata).length ? profiledata.profileImage : '',
    wallImg: Object.keys(profiledata).length ? profiledata.wallImg : '',
    firstName: Object.keys(profiledata).length ? profiledata.firstName : '',
    lastName: Object.keys(profiledata).length ? profiledata.lastName : '',
    birthDate: Object.keys(profiledata).length
      ? moment(profiledata.birthDate).format('YYYY-DD-MM')
      : '',
    deathDate: Object.keys(profiledata).length
      ? moment(profiledata.deathDate).format('YYYY-DD-MM')
      : '',
    hebBirthDate: Object.keys(profiledata).length
      ? moment(profiledata.hebBirthDate).format('YYYY-DD-MM')
      : '',
    hebDeathDate: Object.keys(profiledata).length
      ? moment(profiledata.hebDeathDate).format('YYYY-DD-MM')
      : '',
    gender: Object.keys(profiledata).length ? profiledata.gender : '',
    city: Object.keys(profiledata).length ? profiledata.city : '',
    degree: Object.keys(profiledata).length ? profiledata.degree : '',
    wazeLocation: Object.keys(profiledata).length
      ? profiledata.wazeLocation
      : '',
    googleLocation: Object.keys(profiledata).length
      ? profiledata.googleLocation
      : '',
    description: Object.keys(profiledata).length ? profiledata.description : '',
    // gallery: picture,
  });

  const handleChangeValue = (e) => {
    setWallInformation({
      ...wallInformation,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${id}`
    );
    // res
    setProfileData(res.data);
    setMultiFiles(res.data.gallery);
  };
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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

  const onChangeGrave = (e) => {
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files);
      setGraveImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setGraveData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangeMultiplePicture = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => (file.imagePreview = URL.createObjectURL(file)));
    setMultiFiles((prev) => [...prev, ...files]);
  };

  const handlePrivacyChange = (e) => {
    setSelectedPrivacy(e.target.value);
  };

  const handleChange = (e) => {
    setSelectedGender(e.target.value);
  };
  useEffect(() => {
    console.log(profiledata);
    if (Object.keys(profiledata).length) {
      setGooglePosition(JSON.parse(profiledata.googleLocation));
      setWallInformation({
        originalUser: profiledata.originalUser[0]._id,
        profileImg: profiledata.profileImg,
        city: profiledata.city,
        degree: profiledata.degree,
        wallImg: profiledata.wallImg,
        firstName: profiledata.firstName,
        lastName: profiledata.lastName,
        birthDate: profiledata.birthDate,
        deathDate: profiledata.deathDate,
        gender: profiledata.gender,
        wazeLocation: profiledata.wazeLocation,
        googleLocation: profiledata.googleLocation,
        description: profiledata.description,
        lifeAxis: Object.keys(profiledata).length
          ? JSON.parse(profiledata.lifeAxis)
          : inputList,
      });
      setInputList(
        Object.keys(profiledata).length
          ? JSON.parse(profiledata.lifeAxis)
          : [{ axisTitle: '', axisDate: '', axisDescription: '' }]
      );
    }
  }, [profiledata]);
  console.log(multiFiles, 'multi');
  // handle input change
  const handleInputChange = (e, index) => {
    console.log(e.target.value, index);
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { axisTitle: '', axisDate: '', axisDescription: '' },
    ]);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append('profileImg', picture);
      formdata.append('_id', profiledata._id);
      formdata.append('id', profiledata.originalUser[0]._id);
      formdata.append('wallImg', image);
      formdata.append('firstName', wallInformation.firstName);
      formdata.append('city', wallInformation.city);
      formdata.append('degree', wallInformation.degree);
      formdata.append('originalUser', wallInformation.originalUser);
      formdata.append('lastName', wallInformation.lastName);
      formdata.append('birthDate', wallInformation.birthDate);
      formdata.append('deathDate', wallInformation.deathDate);
      formdata.append('gender', wallInformation.gender);
      formdata.append('wazeLocation', wallInformation.wazeLocation);
      formdata.append('googleLocation', JSON.stringify(googlePosition));
      formdata.append('description', wallInformation.description);
      formdata.append('lifeAxis', JSON.stringify(inputList));
      for (let i = 0; i < multiFiles.length; i++) {
        formdata.append('multiplefiles', multiFiles[i]);
      }
      // const config = {
      //   headers: {
      //     'content-type': 'multipart/form-data'
      //   }
      // }
      fetch(`${process.env.REACT_APP_API_URL}/api/profile/updateProfile`, {
        method: 'PUT',
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res) {
            setMessage('Profile updated successfully!');
            setOpen(true);
            history.goBack();
          }
        });
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
    <div className="profile-creation-container">
      <Topbar />
      <div className="profile-creation">
        <div className="">
          <div className="loginLeft" style={{ marginBottom: '3rem' }}>
            {/* <h3 className="profile-creation-title">ערוך פרופיל</h3> */}
            <div className="notifications-title">
              <h1
                onClick={() => history.goBack()}
                style={{ cursor: 'pointer', paddingRight: '115px' }}
              >
                חזרה
              </h1>
              <h1 style={{ fontSize: '60px', paddingRight: '160px' }}>
                ערוך פרופיל
              </h1>
            </div>
            {/* <div className="profile-example-btn">לחץ לפרופיל לדוגמה</div> */}
          </div>
          <div className="profile-images">
            {/* <div className="register_profile_image"></div> */}
            {/* <div className="profile-image-container">
                <img
                  className="profile-image"
                  src={
                      !imgData &&
                      'https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png'
                  }
                  alt=""
                />
              </div> */}
            <div className="profile-image-container">
              <img
                className="profile-image"
                src={
                  imgData
                    ? imgData
                    : `${process.env.REACT_APP_API_URL}/${wallInformation.profileImg}`
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
                    : `${process.env.REACT_APP_API_URL}/${wallInformation.wallImg}`
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
                  className="profile-creation-names-container"
                  style={{ marginBottom: '3rem' }}
                >
                  <input
                    placeholder="* שם פרטי"
                    value={wallInformation.firstName}
                    ref={firstName}
                    onChange={handleChangeValue}
                    name="firstName"
                    className="nameInput"
                  />
                  <input
                    placeholder="* שם משפחה"
                    value={wallInformation.lastName}
                    ref={lastName}
                    onChange={handleChangeValue}
                    name="lastName"
                    className="nameInput"
                  />
                </div>
                <div className="birth-date-container">
                  <h1>תאריך לידה</h1>
                  <h1>תאריך פטירה</h1>
                </div>
                <div className="profile-creation-names-container">
                  {wallInformation.birthDate ? (
                    <input
                      placeholder="* לועזי"
                      ref={birthDate}
                      onChange={handleChangeValue}
                      name="birthDate"
                      value={moment(wallInformation.birthDate).format(
                        'DD-MM-YYYY'
                      )}
                      className="nameInput"
                      type="text"
                    />
                  ) : (
                    <input
                      ref={birthDate}
                      placeholder="* לועזי"
                      pattern="\d{4}-\d{2}-\d{2}"
                      onChange={handleChangeValue}
                      className="nameInput"
                      type="date"
                      name="birthDate"
                    />
                  )}
                  {wallInformation.deathDate ? (
                    <input
                      placeholder="* לועזי"
                      ref={deathDate}
                      onChange={handleChangeValue}
                      name="deathDate"
                      value={moment(wallInformation.deathDate).format(
                        'DD-MM-YYYY'
                      )}
                      className="nameInput"
                    />
                  ) : (
                    <input
                      placeholder="* לועזי"
                      ref={deathDate}
                      pattern="\d{4}-\d{2}-\d{2}"
                      onChange={handleChangeValue}
                      className="nameInput"
                      type="date"
                      name="deathDate"
                    />
                  )}
                </div>
                <div
                  className="profile-creation-names-container"
                  style={{ marginTop: '3rem' }}
                >
                  <input
                    placeholder="עיר"
                    ref={city}
                    onChange={handleChangeValue}
                    value={wallInformation.city}
                    name="city"
                    className="nameInput"
                    type="text"
                  />
                  <input
                    placeholder="תואר"
                    type="text"
                    ref={degree}
                    onChange={handleChangeValue}
                    value={wallInformation.degree}
                    name="degree"
                    className="nameInput"
                  />
                </div>
                <div className="radio-container">
                  <h3>מין</h3>
                  <div
                    className={`${
                      wallInformation.gender === 'male' && 'register-active'
                    } radio-input-container-register`}
                  >
                    <input
                      type="radio"
                      value="male"
                      id="male"
                      onChange={handleChangeValue}
                      name="gender"
                      className="radio"
                    />
                    <label for="male">ז</label>
                  </div>
                  <div
                    className={`${
                      wallInformation.gender === 'female' && 'register-active'
                    } radio-input-container-register`}
                  >
                    <input
                      type="radio"
                      value="female"
                      id="female"
                      onChange={handleChangeValue}
                      name="gender"
                      className="radio"
                    />
                    <label for="female">נ</label>
                  </div>
                  <div
                    className={`${
                      wallInformation.gender === 'other' && 'register-active'
                    } radio-input-container-register`}
                  >
                    <input
                      type="radio"
                      value="other"
                      id="other"
                      onChange={handleChangeValue}
                      name="gender"
                      className="radio"
                    />
                    <label for="other">אחר</label>
                  </div>
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
                            profiledata.gallery &&
                            profiledata.gallery.length > 0
                              ? `${process.env.REACT_APP_API_URL}/${profiledata.gallery[0]}`
                              : multiFiles && multiFiles.length > 0
                              ? multiFiles[0].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            profiledata.gallery &&
                            profiledata.gallery.length > 1
                              ? `${process.env.REACT_APP_API_URL}/${profiledata.gallery[1]}`
                              : multiFiles && multiFiles.length > 1
                              ? multiFiles[1].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            profiledata.gallery &&
                            profiledata.gallery.length > 2
                              ? `${process.env.REACT_APP_API_URL}/${profiledata.gallery[2]}`
                              : multiFiles && multiFiles.length > 2
                              ? multiFiles[2].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            profiledata.gallery &&
                            profiledata.gallery.length > 3
                              ? `${process.env.REACT_APP_API_URL}/${profiledata.gallery[3]}`
                              : multiFiles && multiFiles.length > 3
                              ? multiFiles[3].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="profile-creation-gallery-img"
                          src={
                            profiledata.gallery &&
                            profiledata.gallery.length > 4
                              ? `${process.env.REACT_APP_API_URL}/${profiledata.gallery[4]}`
                              : multiFiles && multiFiles.length > 4
                              ? multiFiles[4].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                      </div>
                      {/* <div className="previewProfilePic"> */}
                      {/* <img
                            className="playerProfilePic_home_tile"
                            src={imgData}
                            alt=""
                          /> */}
                      {/* </div> */}
                    </div>
                  </div>{' '}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h1>ביוגרפיה</h1>
                  <input
                    ref={description}
                    className="profile-creation-description"
                  />
                </div>
                <div>
                  <h1 style={{ textAlign: 'center' }}>נקודות ציון בחיים</h1>
                  {inputList.map((x, i) => {
                    return (
                      <div className="box" key={i}>
                        <div className="inner-box">
                          <input
                            name="axisTitle"
                            placeholder="כותרת"
                            value={x.axisTitle}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-input"
                          />
                          <input
                            name="axisDate"
                            placeholder="תאריך"
                            value={x.axisDate}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-input"
                          />
                          <textarea
                            name="axisDescription"
                            placeholder="טקסט"
                            value={x.axisDescription}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-description"
                          />
                          <div className="btn-box">
                            {inputList.length !== 1 && (
                              <p
                                className="delete-btn"
                                onClick={() => handleRemoveClick(i)}
                              >
                                - הסר
                              </p>
                            )}
                          </div>
                        </div>
                        {inputList.length - 1 === i && (
                          <div className="add-btn" onClick={handleAddClick}>
                            <div className="inner-btn">
                              <div className="line-1"></div>
                              <div className="line-2"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="location-container"
                  style={{ marginTop: '70px' }}
                >
                  <h1>מיקום הקבר</h1>
                  <div className="location-semicontainer">
                    <div className="profile-creation-names-container">
                      <input
                        placeholder="הוספת מיקום ווייז "
                        ref={wazeLocation}
                        onChange={handleChangeValue}
                        value={wallInformation.wazeLocation}
                        name="wazeLocation"
                        className="nameInput"
                      />
                      {/* <input
                        placeholder="הוספת מיקום גוגל"
                        ref={googleLocation}
                        onChange={handleChangeValue}
                        value={wallInformation.googleLocation}
                        name="googleLocation"
                        className="nameInput"
                      /> */}
                      {wallInformation.googleLocation && (
                        <Map
                          position={googlePosition}
                          setPosition={setGooglePosition}
                        />
                      )}
                    </div>
                  </div>
                  <div className="profile-image-container">
                    <img
                      className="profile-image"
                      src={
                        graveData
                          ? graveData
                          : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                      }
                      alt=""
                    ></img>
                    <input
                      className="custom-file-grave"
                      type="file"
                      onChange={onChangeGrave}
                      name="coverImg"
                      style={{ marginRight: '38%' }}
                    />
                  </div>
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
                    <label for="private">פרטי</label>
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
                    <label for="public">פומבי</label>
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
