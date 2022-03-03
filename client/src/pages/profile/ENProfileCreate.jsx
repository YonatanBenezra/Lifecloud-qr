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
import useGeoLocation from '../../hooks/useGeoLocation';
import Popup from 'reactjs-popup';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import graveLocationImg from '../../assets/מיקום-הקבר.jpg'
import LifeAxisImg from '../../assets/ציר-חיים.jpg'
import ComboDatePicker from './ComboDatePicker'
export default function ProfileCreate() {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [open, setOpen] = useState(false);
  const [hebBirthDate, sethebBirthDate] = useState('');
  const [hebDeathDate, sethebDeathDate] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState('public');
  const [image, setImage] = useState(null);
  const [graveImage, setGraveImage] = useState(null);
  const [graveData, setGraveData] = useState(null);
  const [coverData, setCoverData] = useState(null);
  const [message, setMessage] = useState('');
  console.log(hebBirthDate, 'imgData');
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

  const [multiFiles, setMultiFiles] = useState([]);
  const onChangeMultiplePicture = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => (file.imagePreview = URL.createObjectURL(file)));
    setMultiFiles((prev) => [...prev, ...files]);
  };

  const [inputList, setInputList] = useState([
    { axisTitle: '', axisDate: '', axisDescription: '' },
    { axisTitle: '', axisDate: '', axisDescription: '' },
    { axisTitle: '', axisDate: '', axisDescription: '' },
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

  const handleChange = (e) => {
    setSelectedGender(e.target.value);
  };
  const handlePrivacyChange = (e) => {
    setSelectedPrivacy(e.target.value);
  };
  // console.log(hebBirthDate,'hebBirthDate')
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

  // handle click event of the Add button
  const addSingleDiv = (i) => {
    const copyArray = [...inputList];
    const prevAllData = copyArray.slice(0, i);
    const nextAllData = copyArray.slice(i);

    const newArray = [
      ...prevAllData,
      { axisTitle: '', axisDate: '', axisDescription: '' },
      ...nextAllData,
    ];

    setInputList(newArray);
  };
  const [axisImages, setAxisImages] = useState([]);

  const handleAxisImage = (event, i) => {
    const copyArray = [...inputList];
    const files = event.target.files[0];

    copyArray[i].axisImage = files;

    setInputList(copyArray);

    setAxisImages(inputList.map((list) => list.axisImage));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const wallInformation = {
      originalUser: id,
      profileImg: picture,
      graveImg: graveImage,
      wallImg: image,
      // privacy:privacy,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      birthDate: birthDate.current.value,
      hebBirthDate: hebBirthDate,
      hebDeathDate: hebDeathDate,
      // hebDeathDate: hebDeathDate.current.value,
      city: city.current.value,
      degree: degree.current.value,
      deathDate: deathDate.current.value,
      gender: selectedGender,
      // privacy: selectedPrivacy,
      wazeLocation: wazeLocation.current.value,
      // googleLocation: location.coordinates,
      description: description.current.value,
      lifeAxis: inputList,
      // gallery: picture,
    };
    try {
      const formdata = new FormData();
      formdata.append('profileImg', picture);
      formdata.append('graveImg', graveImage);
      formdata.append('wallImg', image);
      formdata.append('privacy', selectedPrivacy);
      formdata.append('firstName', wallInformation.firstName);
      formdata.append('originalUser', wallInformation.originalUser);
      formdata.append('lastName', wallInformation.lastName);
      formdata.append('birthDate', wallInformation.birthDate);
      formdata.append('hebBirthDate', wallInformation.hebBirthDate);
      formdata.append('hebDeathDate', wallInformation.hebDeathDate);
      formdata.append('city', wallInformation.city);
      formdata.append('degree', wallInformation.degree);
      formdata.append('deathDate', wallInformation.deathDate);
      formdata.append('gender', wallInformation.gender);
      formdata.append('wazeLocation', wallInformation.wazeLocation);
      formdata.append('googleLocation', JSON.stringify(location.coordinates));
      formdata.append('description', wallInformation.description);
      formdata.append('lifeAxis', JSON.stringify(wallInformation.lifeAxis));
      for (let i = 0; i < multiFiles.length; i++) {
        formdata.append('multiplefiles', multiFiles[i]);
      }
      for (let i = 0; i < axisImages.length; i++) {
        formdata.append('axisImages', axisImages[i]);
      }
      fetch(`${process.env.REACT_APP_API_URL}/api/profile/createProfile`, {
        method: 'POST',
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res,'resonse create profile');
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
  const { location, getGeoLocation } = useGeoLocation();

  console.log(location);
  return (
    <div className="profile-creation-container">
      <Topbar />
      <div className="profile-creation">
        <div className="">
          <div className="loginLeft" style={{ marginBottom: '3rem' }}>
            <h3 className="profile-creation-title">create profile</h3>
            <div className="profile-example-btn">click here for an example profile</div>
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
          
          <div className="press-explain-container">
              <Popup
                trigger={<div className="press-explain-1">+ click for explanation</div>}
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <img></img>
                  </div>
                )}
              </Popup>
              <Popup
                trigger={<div className="press-explain-2">+ click for explanation</div>}
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <img></img>
                  </div>
                )}
              </Popup>

            </div>

          <div className="loginRight">
            <div className="RegBox">
              <form className="profile-creation-box" onSubmit={handleClick}>
                <div
                  className="profile-creation-names-container"
                  style={{ marginBottom: '3rem' }}
                >
                  <input
                    placeholder="* first name"
                    ref={firstName}
                    className="nameInput"
                  />
                  <input
                    placeholder="* last name"
                    ref={lastName}
                    className="nameInput"
                  />
                </div>
                <div className="birth-date-container">
                  <h1>birth date</h1>
                  <h1>death date</h1>
                </div>
                <div className="profile-creation-names-container">
                {/* <ComboDatePicker
        className={"test"}
        months={[
          "ינואר",
          "פברואר",
          "מרץ",
          "אפריל",
          "מאי",
          "יוני",
          "יולי",
          "אוגוסט",
          "ספטמבר",
          "אוקטובר",
          "נובמבר",
          "דצמבר"
        ]}
      /> */}
                  <input
                    placeholder="* english date"
                    ref={birthDate}
                    className="nameInput"
                    type="text"
                  />
                  <input
                    placeholder="* english date"
                    type="date"
                    ref={deathDate}
                    className="nameInput"
                  />
                </div>
                <div className="profile-creation-names-container">
                  <input
                    placeholder="hebrew date"
                    type="text"
                    // ref={hebBirthDate}\
                    value={hebBirthDate}
                    onChange={(e) => sethebBirthDate(e.target.value)}
                    className="nameInput"
                  />
                  <input
                    placeholder="hebrew date"
                    type="text"
                    // ref={hebBirthDate}\
                    value={hebDeathDate}
                    onChange={(e) => sethebDeathDate(e.target.value)}
                    className="nameInput"
                  />
                </div>

                <div
                  className="profile-creation-names-container"
                  style={{ marginTop: '3rem' }}
                >
                  <input
                    placeholder="city"
                    ref={city}
                    className="nameInput"
                    type="text"
                  />
                  <input
                    placeholder="degree"
                    type="text"
                    ref={degree}
                    className="nameInput"
                  />
                </div>
                <div className="radio-container-register">
                  <h3 style={{ color: '#6097BF' }}>gender*</h3>
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
                    <label htmlFor="male">m</label>
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
                    <label htmlFor="female">f</label>
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
                    <label htmlFor="other">other</label>
                  </div>
                </div>
                <div
                  className="location-container"
                  style={{ marginTop: '70px', marginBottom: '70px' }}
                >
                  <h1>upload media</h1>
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
                  <h1>about</h1>
                  <input
                    ref={description}
                    className="profile-creation-description"
                  />
                </div>
                <div>
                  <h1 style={{ textAlign: 'center' }}>Life axis</h1>
                  <Popup
                      trigger={<div className="press-explain-4">+ click for explanation</div>}
                      modal
                      nested
                    >
                      {close => (
                        <div className="modal">
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <img src={LifeAxisImg} className="life-axis-img" alt=''></img>
                        </div>
                      )}
                    </Popup>
                  {inputList.map((x, i) => {
                    return (
                      <div className="box" key={i}>
                        {inputList.length !== 1 && (
                          <div
                            className="add-btn"
                            onClick={() => addSingleDiv(i)}
                          >
                            <div className="inner-btn">
                              <div className="line-1"></div>
                              <div className="line-2"></div>
                            </div>
                          </div>
                        )}
                        <div className="inner-box">
                          <input
                            name="axisTitle"
                            placeholder="title"
                            value={x.axisTitle}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-input"
                          />
                          <input
                            name="axisDate"
                            placeholder="date"
                            value={x.axisDate}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-input"
                          />

                          <textarea
                            name="axisDescription"
                            placeholder="text"
                            value={x.axisDescription}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-description"
                          />
                          <label class="file-label">
                            add image
                            <input
                            type="file"
                            name="axisImage"
                            placeholder="Image"
                            onChange={(e) => handleAxisImage(e, i)}
                            className="axis-input-image"
                            />
                            <span class="file-custom"></span>
                          </label>
                          <div className="btn-box">
                            {inputList.length !== 1 && (
                              <p
                                className="delete-btn"
                                onClick={() => handleRemoveClick(i)}
                              >
                                - delete
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
                  <h1>grave location</h1>
                  <Popup className='pop'
                      trigger={<div className="press-explain-3">+ click for explanation</div>}
                      modal
                      nested
                    >
                      {close => (
                        <div className="modal">
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <img src={graveLocationImg} className="grave-location-img" alt=''></img>
                        </div>
                      )}
                    </Popup>
                  <div className="location-semicontainer">
                    <div className="profile-creation-names-container">
                      <input
                        placeholder="add waze location "
                        ref={wazeLocation}
                        className="nameInput"
                      />
                      {!location.loaded && (
                        <button
                          className="nameInput"
                          onClick={getGeoLocation}
                          type="button"
                        >
                         add google location
                        </button>
                      )}
                      {location.loaded && location.error?.message && (
                        <h3>{location.error.message}</h3>
                      )}

                      {location.loaded && !location.error?.message && (
                        <h3>your location has been saved</h3>
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
                  <h3 style={{ color: '#6097BF' }}>privacy</h3>
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
                    <label htmlFor="private">private</label>
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
                    <label htmlFor="public">public</label>
                  </div>
                </div>

                <button className="create-btn" type="submit">
                  save
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
