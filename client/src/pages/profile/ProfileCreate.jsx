import axios from 'axios';
import { useRef, useState, useContext, useEffect } from 'react';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import { useHistory, Prompt } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import './profile.css';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import SnackBar from '../../components/snackbar/SnackBar';
import ENTopbar from '../../components/topbar/ENTopBar';
import Map from './Map';
import Popup from 'reactjs-popup';
import useGeoLocation from '../../hooks/useGeoLocation';
import Footer from '../../components/footer/Footer';
import SocialFooter from '../../components/socialFooter/socialFooter';
import graveLocationImg from '../../assets/מיקום-הקבר.jpg';
import LifeAxisImg from '../../assets/ציר-חיים.jpg';
import LazyLoad from 'react-lazyload';
import { MethodsPayment } from '../../components/methodsPayment/methodsPayment';
export default function ProfileCreate() {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const [qr, setQr] = useState(null);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [hebBirthDate, sethebBirthDate] = useState('');
  const [hebDeathDate, sethebDeathDate] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState('public');
  const [image, setImage] = useState(null);
  const [graveImage, setGraveImage] = useState(null);
  const [graveData, setGraveData] = useState(null);
  const [coverData, setCoverData] = useState(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFacebookInput, setShowFacebookInput] = useState(false);
  const [showInstagramInput, setShowInstagramInput] = useState(false);
  const facebookUrlRef = useRef(null);
  const instagramUrlRef = useRef(null);

  useEffect(() => {});
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
  const handleBirthDateBlur = async () => {
    const birth = new Date(birthDate.current.value);

    const date = birth.getDate();
    const year = birth.getFullYear();
    const month = birth.getMonth();

    const response = await fetch(
      `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${
        month + 1
      }&gd=${date}&g2h=1`
    );
    const data = await response.json();
    sethebBirthDate(data.hebrew);
  };
  /*   const handleDeathDateBlur = async () => {
    const death = new Date(deathDate.current.value);

    const date = death.getDate();
    const year = death.getFullYear();
    const month = death.getMonth();

    const response = await fetch(
      `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${
        month + 1
      }&gd=${date}&g2h=1`
    );
    const data = await response.json();
    sethebDeathDate(data.hebrew);
  }; */
  const readImage = (e, num) => {
    const reader = new FileReader();
    return reader.readAsDataURL(e[num]);
  };
  const onChangeCover = (e) => {
    if (e.target.files[0]) {
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
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setUploaded(index);
  };
  useEffect(() => {
    fetchuserData();
  }, []);
  const fetchuserData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/${id}`
    );
    setUserData(res.data);
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
    setLoading(true);

    e.preventDefault();

    if (
      facebookUrlRef.current?.value &&
      !/^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/.test(
        facebookUrlRef.current?.value
      )
    ) {
      setLoading(false);
      return alert('Facebook url is not valid!');
    }
    if (
      instagramUrlRef.current?.value &&
      !/(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)/.test(
        instagramUrlRef.current?.value
      )
    ) {
      setLoading(false);
      return alert('Instagram url is not valid!');
    }

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
      facebookUrl: facebookUrlRef.current?.value || '',
      instagramUrl: instagramUrlRef.current?.value || '',
      // privacy: selectedPrivacy,
      wazeLocation: wazeLocation.current.value,
      googleLocation: JSON.stringify(position),
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
      formdata.append('hebMemorialDate', wallInformation.hebMemorialDate);
      formdata.append('city', wallInformation.city);
      formdata.append('degree', wallInformation.degree);
      formdata.append('deathDate', wallInformation.deathDate);
      formdata.append('gender', wallInformation.gender);
      formdata.append('wazeLocation', wallInformation.wazeLocation);
      formdata.append('googleLocation', wallInformation.googleLocation);
      formdata.append('description', wallInformation.description);
      formdata.append('facebookUrl', wallInformation.facebookUrl);
      formdata.append('instagramUrl', wallInformation.instagramUrl);
      formdata.append('lifeAxis', JSON.stringify(wallInformation.lifeAxis));
      formdata.append('isMain', false);
      for (let i = 0; i < multiFiles.length; i++) {
        formdata.append('multiplefiles', multiFiles[i]);
      }
      for (let i = 0; i < axisImages.length; i++) {
        formdata.append('axisImages', axisImages[i]);
      }

      if (qr) {
        formdata.append('email', user.email);
      } else {
        // window.location.assign(
        //   `https://direct.tranzila.com/icloud/iframenew.php?sum=${100}`
        // );
      }

      fetch(`${process.env.REACT_APP_API_URL}/api/profile/createProfile`, {
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
                loggedInId: userData._id,
              }),
            }
          )
            .then((res2) => {
              return res2.json();
            })
            .then((res3) => {
              console.log('notification->', res3);
              history.push(`/profiledetails/${res._id}`);
            });
          if (res) {
            // history.goBack();
            setMessage('Profile made successfully');
            setOpen(true);
            setLoading(false);
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
  const [axisImages, setAxisImages] = useState([]);
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
  const handleAxisImage = (event, i) => {
    const copyArray = [...inputList];
    const files = event.target.files[0];

    copyArray[i].axisImage = files;

    setInputList(copyArray);

    setAxisImages(inputList.map((list) => list.axisImage));
    // event.target.closest('label').style.backgroundColor = '#5ca08e';
    // event.target.closest('label').textContent = 'תמונה הועלתה';
  };

  return (
    <div className="profile-creation-container overflow-hidden">
      <Topbar />
      <Prompt
        when={loading}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <div className="profile-creation regular_profile_creation">
        <div className="">
          <div className="loginLeft" style={{ marginBottom: '3rem' }}>
            <h3 className="profile-creation-title">צור פרופיל</h3>
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
              <LazyLoad>
                <img
                  className="profile-image"
                  src={
                    imgData
                      ? imgData
                      : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                  }
                  alt=""
                />
              </LazyLoad>

              <input
                className="custom-file-input"
                type="file"
                name="profileImg"
                onChange={onChangePicture}
              />
            </div>
            <div className="profile-image-container">
              <LazyLoad>
                <img
                  className="profile-image"
                  src={
                    coverData
                      ? coverData
                      : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                  }
                  alt=""
                />
              </LazyLoad>

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
                    ref={firstName}
                    required
                    className="nameInput"
                  />
                  <input
                    placeholder="* שם משפחה"
                    ref={lastName}
                    required
                    className="nameInput"
                  />
                </div>
                <div className="birth-date-container">
                  <h1>תאריך לידה</h1>
                  <h1>תאריך פטירה</h1>
                </div>
                <div className="profile-creation-names-container">
                  <input
                    placeholder="* לועזי"
                    pattern="\d{4}-\d{2}-\d{2}"
                    ref={birthDate}
                    className="nameInput"
                    type="date"
                    onBlur={handleBirthDateBlur}
                  />
                  <input
                    placeholder="* לועזי"
                    type="date"
                    ref={deathDate}
                    className="nameInput"
                    /* onBlur={handleDeathDateBlur} */
                  />
                </div>

                <div
                  className="profile-creation-names-container"
                  style={{ marginTop: '2rem' }}
                >
                  <input
                    placeholder="עברי"
                    type="text"
                    value={hebDeathDate}
                    onChange={(e) => sethebDeathDate(e.target.value)}
                    className="nameInput"
                  />
                </div>
                {/* <div className="profile-creation-names-container">
                  <input
                    placeholder="עברי"
                    type="text"
                    // ref={hebBirthDate}\
                    value={hebBirthDate}
                    onChange={(e) => sethebBirthDate(e.target.value)}
                    className="nameInput"
                  />
                  <input
                    placeholder="עברי"
                    type="text"
                    // ref={hebBirthDate}\
                    value={hebDeathDate}
                    onChange={(e) => sethebDeathDate(e.target.value)}
                    className="nameInput"
                  />
                </div> */}
                <div
                  className="profile-creation-names-container"
                  style={{ marginTop: '2rem' }}
                >
                  <input
                    placeholder="עיר"
                    ref={city}
                    className="nameInput"
                    type="text"
                  />
                  <input
                    placeholder="תואר (דוקטור, חתן פרס נובל...)"
                    type="text"
                    ref={degree}
                    className="nameInput"
                  />
                </div>
                <div className="radio-container-register">
                  <h3 style={{ color: '#6097BF' }}>מין *</h3>
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
                    <label htmlFor="male">ז</label>
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
                    <label htmlFor="female">נ</label>
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
                    <label htmlFor="other">אחר</label>
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
                          className="media-upload-button with-text"
                        />
                      </div>
                      <div className="d-flex flex-wrap justify-content-center">
                        <LazyLoad>
                          <img
                            className="profile-creation-gallery-img mb-3"
                            src={
                              multiFiles && multiFiles.length > 0
                                ? multiFiles[0].imagePreview
                                : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                            }
                            alt=""
                          />
                        </LazyLoad>

                        <LazyLoad>
                          <img
                            className="profile-creation-gallery-img mb-3"
                            src={
                              multiFiles && multiFiles.length > 1
                                ? multiFiles[1].imagePreview
                                : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                            }
                            alt=""
                          />
                        </LazyLoad>

                        <LazyLoad>
                          <img
                            className="profile-creation-gallery-img mb-3"
                            src={
                              multiFiles && multiFiles.length > 2
                                ? multiFiles[2].imagePreview
                                : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                            }
                            alt=""
                          />
                        </LazyLoad>

                        <LazyLoad>
                          <img
                            className="profile-creation-gallery-img mb-3"
                            src={
                              multiFiles && multiFiles.length > 3
                                ? multiFiles[3].imagePreview
                                : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                            }
                            alt=""
                          />
                        </LazyLoad>

                        <LazyLoad>
                          <img
                            className="profile-creation-gallery-img mb-3"
                            src={
                              multiFiles && multiFiles.length > 4
                                ? multiFiles[4].imagePreview
                                : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                            }
                            alt=""
                          />
                        </LazyLoad>
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
                  <h1>סיפור חיים</h1>
                  <textarea
                    ref={description}
                    className="profile-creation-description"
                  />
                </div>
                <div>
                  <h1 style={{ textAlign: 'center', paddingBottom: '70px' }}>
                    נקודות ציון
                  </h1>
                  <Popup
                    trigger={
                      <div className="press-explain-4 pointer">+ לחץ להסבר</div>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="popup-modal">
                        <button
                          className="close position-absolute btn btn-close"
                          onClick={close}
                        ></button>
                        <LazyLoad>
                          <img
                            src={LifeAxisImg}
                            className="life-axis-img"
                            alt=""
                          />
                        </LazyLoad>
                      </div>
                    )}
                  </Popup>
                  {inputList.map((x, i) => {
                    return (
                      <div className="box" key={i}>
                        {inputList.length !== 1 && (
                          <div
                            className="middle-axis-btn"
                            onClick={() => addSingleDiv(i)}
                          >
                            <div className="inner-btn">
                              <div className="line-1"></div>
                              <div className="line-2"></div>
                            </div>
                          </div>
                        )}

                        <div className="inner-box mx-4 mx-sm-0">
                          <textarea
                            name="axisTitle"
                            placeholder="כותרת"
                            value={x.axisTitle}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-description"
                          >
                            כותרת
                          </textarea>

                          <textarea
                            name="axisDate"
                            placeholder="תאריך"
                            value={x.axisDate}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-description mx-3"
                          />
                          <textarea
                            name="axisDescription"
                            placeholder="טקסט"
                            value={x.axisDescription}
                            onChange={(e) => handleInputChange(e, i)}
                            className="axis-description"
                          />
                          <label
                            className={`${
                              inputList[i]?.axisImage && 'bg-success'
                            } file-label`}
                          >
                            {inputList[i]?.axisImage
                              ? 'Uploaded'
                              : 'הוסף תמונה'}
                            <input
                              type="file"
                              name="axisImage"
                              placeholder="Image"
                              onChange={(e) => handleAxisImage(e, i)}
                              className="axis-input-image"
                            />
                          </label>
                          <div className="btn-box">
                            {inputList.length !== 1 && (
                              <p
                                className="delete-btn axis-delete-button"
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
                <div style={{ marginTop: '65px' }}>
                  <h1 className="text-center mb-5">
                    הוספת קישורים לרשתות החברתיות
                  </h1>
                  <div className="container media_link_container">
                    <div className="row text-center gy-5 justify-content-center">
                      <div className="col-sm-6 col-lg-3 ">
                        <button
                          className="btn heart-div social-footer-icon mb-3"
                          type="button"
                          onClick={() => setShowFacebookInput((prev) => !prev)}
                        >
                          <LazyLoad>
                            <img className="heart-icon" src={facebook} alt="" />
                          </LazyLoad>
                        </button>
                        {showFacebookInput && (
                          <input
                            placeholder="לינק לפייסבוק"
                            type="text"
                            className="nameInput d-block w-100"
                            ref={facebookUrlRef}
                          />
                        )}
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <button
                          className="btn heart-div social-footer-icon  mb-3"
                          type="button"
                          onClick={() => setShowInstagramInput((prev) => !prev)}
                        >
                          <LazyLoad>
                            <img
                              className="heart-icon"
                              src={instagram}
                              alt="instagram"
                            />
                          </LazyLoad>
                        </button>
                        {showInstagramInput && (
                          <input
                            placeholder="לינק לאינסטגרם"
                            type="text"
                            className="nameInput d-block w-100 w-100"
                            ref={instagramUrlRef}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="location-container"
                  style={{ marginTop: '70px' }}
                >
                  <h1>מיקום הקבר</h1>
                  <Popup
                    className="pop"
                    trigger={
                      <div className="press-explain-3 pointer">+ לחץ להסבר</div>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="popup-modal">
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <LazyLoad>
                          <img
                            src={graveLocationImg}
                            className="grave-location-img"
                            alt=""
                          />
                        </LazyLoad>
                      </div>
                    )}
                  </Popup>
                  <div className="location-semicontainer">
                    <div className="profile-creation-names-container">
                      <input
                        placeholder="הוספת מיקום בית העלמין
                        ב-Waze"
                        ref={wazeLocation}
                        className="nameInput"
                      />
                      {/* <input
                        placeholder="הוספת מיקום גוגל"
                        ref={googleLocation}
                        className="nameInput"
                      /> */}
                      <button
                        className="nameInput"
                        onClick={() => setMap(!map)}
                        type="button"
                      >
                        הוספת מיקום מדויק{' '}
                      </button>
                    </div>
                  </div>
                  {map && <Map position={position} setPosition={setPosition} />}
                  <div className="profile-image-container">
                    <LazyLoad>
                      <img
                        className="profile-image"
                        src={
                          graveData
                            ? graveData
                            : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                        }
                        alt=""
                      />
                    </LazyLoad>

                    <input
                      className="custom-file-grave"
                      type="file"
                      onChange={onChangeGrave}
                      name="coverImg"
                      style={{ width: '300px' }}
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
                {loading ? (
                  <button className="create-btn" type="button" disabled>
                    ...טוען
                    <span
                      className="spinner-border spinner-border-lg"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </button>
                ) : (
                  <button
                    className="create-btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#profileCreateModal"
                  >
                    שמור
                  </button>
                )}
                <div
                  className="modal fade qr-modal"
                  id="profileCreateModal"
                  tabIndex="-1"
                  aria-labelledby="profileCreateModalLabel"
                  aria-hidden="true"
                  style={{ direction: 'initial' }}
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="profileCreateModalLabel"
                        >
                          יצירת הפרופיל וקבלת הקוד
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="modal-footer">
                        <button
                          onClick={() => setQr(true)}
                          className="logout-btn mt-0"
                          type="button"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          למייל QR לקבלת
                        </button>
                        <button
                          onClick={() => setQr(false)}
                          className="logout-btn mt-0"
                          type="button"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          לרכישת QR ייחודי
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {qr === false && <MethodsPayment isOpen={true} />}
              </form>
            </div>
          </div>
        </div>
        <SnackBar open={open} handleClose={handleClose} message={message} />
      </div>
    </div>
  );
}
