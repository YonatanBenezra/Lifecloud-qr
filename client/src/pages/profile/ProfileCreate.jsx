import axios from 'axios';
import { useRef, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import profiles from './dummy-profiles.json';
import './profile.css';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import SnackBar from '../../components/snackbar/SnackBar';
import ENTopbar from '../../components/topbar/ENTopBar';
import { Gallery } from '../../components/gallery/gallery';

export default function ENProfileCreate() {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [profiledata, setProfileData] = useState({});
  const [flag, setFlag] = useState(false);
  console.log(imgData, 'imgData');
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
  useEffect(() => {
    fetchuserprofiles();
  }, []);
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `https://api.lifecloud-qr.com/api/profile/getSingleProfileDetails/${id}`
    );
    setProfileData(res.data);
    if (res) {
      setFlag((e) => !e);
    }
  };
  const [image, setImage] = useState(null);
  const [coverData, setCoverData] = useState(null);
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
  const [graveImage, setGraveImage] = useState(null);
  const [graveData, setGraveData] = useState(null);
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
  const [multiFiles, setMultiFiles] = useState();
  const onChangeMultiplePicture = (e) => {
    setMultiFiles(e.target.files);
  };
  const [inputList, setInputList] = useState([
    { axisTitle: '', axisDate: '', axisDescription: '' },
  ]);
  console.log(multiFiles, 'multiFiles');
  console.log(picture, 'pic');
  console.log(imgData,'imgData');
  console.log(image, 'image');
  const [selectedGender, setSelectedGender] = useState('');
  const firstName = useRef();
  const lastName = useRef();
  const companyName = useRef();
  const birthDate = useRef();
  const deathDate = useRef();
  const hebDeathDate = useRef();
  const city = useRef();
  const degree = useRef();
  const gender = selectedGender;
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
  const handleChange = (e) => {
    setSelectedGender(e.target.value);
  };

  // handle input change
  const handleInputChange = (e, index) => {
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
    console.log(id, 'id');
    e.preventDefault();
    const wallInformation = {
      originalUser: id,
      profileImg: picture,
      graveImg: graveImage,
      wallImg: image,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      birthDate: birthDate.current.value,
      // hebDeathDate: hebDeathDate.current.value,
      city: city.current.value,
      degree: degree.current.value,
      deathDate: deathDate.current.value,
      gender: selectedGender,
      wazeLocation: wazeLocation.current.value,
      googleLocation: googleLocation.current.value,
      description: description.current.value,
      lifeAxis: inputList,
      // gallery: picture,
    };

    try {
      const formdata = new FormData();
      formdata.append('profileImg', picture);
      formdata.append('graveImg', graveImage);
      formdata.append('wallImg', image);
      formdata.append('firstName', wallInformation.firstName);
      formdata.append('originalUser', wallInformation.originalUser);
      formdata.append('lastName', wallInformation.lastName);
      formdata.append('birthDate', wallInformation.birthDate);
      formdata.append('hebDeathDate', wallInformation.hebDeathDate);
      formdata.append('city', wallInformation.city);
      formdata.append('degree', wallInformation.degree);
      formdata.append('deathDate', wallInformation.deathDate);
      formdata.append('gender', wallInformation.gender);
      formdata.append('wazeLocation', wallInformation.wazeLocation);
      formdata.append('googleLocation', wallInformation.googleLocation);
      formdata.append('description', wallInformation.description);
      formdata.append('lifeAxis', JSON.stringify(wallInformation.lifeAxis));
      for (let i = 0; i < multiFiles.length; i++) {
        formdata.append('multiplefiles', multiFiles[i]);
      }

      fetch('https://api.lifecloud-qr.com/api/profile/createProfile', {
        method: 'POST',
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res) {
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
  return (
    <div className="profile-creation-container">
      <ENTopbar />
      <div className="profile-creation">
        <div className="loginWrapper">
          <div className="loginLeft" style={{ marginBottom: '3rem' }}>
            <h3 className="profile-creation-title">צור פרופיל</h3>
            <div className="profile-example-btn">לחץ לצפייה בפרופיל לדוגמה</div>
          </div>
          <div className="profile-images">
            <div className="register_profile_image"></div>
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
                <div className="names-container">
                  <input
                    placeholder="* שם פרטי"
                    required
                    ref={firstName}
                    className="nameInput"
                  />
                  <input
                    placeholder="* שם משפחה"
                    required
                    ref={lastName}
                    className="nameInput"
                  />
                </div>
                <div className="birth-date-container">
                  <h1>תאריך לידה</h1>
                  <h1>תאריך פטירה</h1>
                </div>
                <div className="names-container">
                  <input
                    placeholder="* לועזי"
                    required
                    ref={birthDate}
                    className="nameInput"
                    type="text"
                  />
                  <input
                    placeholder="* לועזי"
                    required
                    type="date"
                    ref={deathDate}
                    className="nameInput"
                  />
                </div>
                <input
                  placeholder="תאריך פטירה עברי"
                  type="text"
                  ref={hebDeathDate}
                  className="nameInput"
                  style={{padding: 0, width: '99.5%'}}
                />
                <div className="names-container" style={{ marginTop: '3rem' }}>
                  <input
                    placeholder="* עיר"
                    required
                    ref={city}
                    className="nameInput"
                    type="text"
                  />
                  <input
                    placeholder="תואר"
                    type="text"
                    ref={degree}
                    className="nameInput"
                  />
                </div>
                <div className="radio-container-register">
                  <h3 style={{ color: '#6097BF' }}>* מגדר</h3>
                  <div
                    className={`${
                      selectedGender === 'male' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedGender('male')}
                  >
                    <input
                      type="radio"
                      value="male"
                      id="male"
                      onChange={handleChange}
                      name="gender"
                      checked={user.gender === 'male'}
                      className="radio"
                    />
                    <label for="male">ז</label>
                  </div>
                  <div
                    className={`${
                      selectedGender === 'female' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedGender('female')}
                  >
                    <input
                      type="radio"
                      value="female"
                      id="female"
                      onChange={handleChange}
                      checked={user.gender === 'female'}
                      name="gender"
                      className="radio"
                    />
                    <label for="female">נ</label>
                  </div>
                  <div
                    className={`${
                      selectedGender === 'other' && 'register-active'
                    } radio-input-container-register`}
                    onClick={() => setSelectedGender('other')}
                  >
                    <input
                      type="radio"
                      value="other"
                      id="other"
                      onChange={handleChange}
                      checked={user.gender === 'other'}
                      name="gender"
                      className="radio"
                    />
                    <label for="other">א</label>
                  </div>
                </div>
                <div
                  className="location-container"
                  style={{ marginTop: '2rem' }}
                >
                  <h1>* מיקום הקבר</h1>
                  <div className="location-semicontainer">
                    <div className="names-container">
                      <input
                        placeholder="*הוספת מיקום ווייז "
                        required
                        ref={wazeLocation}
                        className="nameInput"
                      />
                      <input
                        placeholder="* הוספת מיקום גוגל"
                        ref={googleLocation}
                        className="nameInput"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="location-container"
                  style={{ marginTop: '2rem' }}
                >
                  <h1>העלאת מדיה</h1>
                  <div>
                    <div className="names-container">
                      <div className="form-group multi-preview"></div>
                      <div className="register_profile_image">
                        <input
                          id="profilePic"
                          type="file"
                          name="multiplefiles"
                          multiple
                          onChange={onChangeMultiplePicture}
                        />
                      </div>
                      <div className="previewProfilePic">
                        {/* <img
                          className="playerProfilePic_home_tile"
                          src={imgData}
                          alt=""
                        /> */}
                      </div>
                    </div>
                  </div>{' '}
                </div>
                <input
                  placeholder="+ על הנפטר"
                  required
                  ref={description}
                  className="profile-creation-description"
                />
                <div style={{ marginTop: '2rem' }}>
                  <h1 style={{ textAlign: 'center' }}>ציר זמן</h1>
                  {inputList.map((x, i) => {
                    return (
                      <div className="box" key={i}>
                        <div className="inner-box">
                          <input
                            name="axisTitle"
                            placeholder="* כותרת"
                            value={x.axisTitle}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-input"
                          />
                          <input
                            name="axisDate"
                            placeholder="* תאריך"
                            value={x.axisDate}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-input"
                          />
                          <input
                            name="axisDescription"
                            placeholder="* טקסט"
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
                <div className="location-container" style={{ marginTop: '2rem' }}>
            <h1>* Graves location</h1>
            <div className="location-semicontainer">
              <div className="names-container">
                <input
                  placeholder="*הוספת מיקום ווייז "
                  required
                  ref={wazeLocation}
                  className="nameInput"
                />
                <input
                  placeholder="* הוספת מיקום גוגל"
                  required
                  ref={googleLocation}
                  className="nameInput"
                />
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
              />
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
