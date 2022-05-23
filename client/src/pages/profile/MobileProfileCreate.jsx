import axios from 'axios';
import { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Topbar from '../../components/topbar/MobileTopbar';
import './profile.css';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import SnackBar from '../../components/snackbar/SnackBar';
import ENTopbar from '../../components/topbar/ENTopBar';
import Map from './MobileMap';
import Popup from 'reactjs-popup';
import useGeoLocation from '../../hooks/useGeoLocation';
import Footer from '../../components/footer/MobileFooter';
import SocialFooter from '../../components/socialFooter/MobileSocialFooter';
import graveLocationImg from '../../assets/מיקום-הקבר.jpg';
import LifeAxisImg from '../../assets/ציר-חיים.jpg';
export default function ProfileCreate() {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
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
  useEffect(() => {});
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
  const handleDeathDateBlur = async () => {
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
  // console.log(hebBirthDate,'hebBirthDate')
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  useEffect(() => {
    fetchuserData();
  }, []);
  console.log(id, 'id');
  const fetchuserData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/${id}`
    );
    setUserData(res.data);
    console.log(res, 'res usrDaata');
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
  // console.log(hebBirthDate.current.value)
  const handleClick = async (e) => {
    console.log(id, 'id');
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
      formdata.append('city', wallInformation.city);
      formdata.append('degree', wallInformation.degree);
      formdata.append('deathDate', wallInformation.deathDate);
      formdata.append('gender', wallInformation.gender);
      formdata.append('wazeLocation', wallInformation.wazeLocation);
      formdata.append('googleLocation', wallInformation.googleLocation);
      formdata.append('description', wallInformation.description);
      formdata.append('lifeAxis', JSON.stringify(wallInformation.lifeAxis));
      formdata.append('isMain', false);
      for (let i = 0; i < multiFiles.length; i++) {
        formdata.append('multiplefiles', multiFiles[i]);
      }
      for (let i = 0; i < axisImages.length; i++) {
        formdata.append('axisImages', axisImages[i]);
      }
      console.log(formdata, 'formdata');
      fetch(`${process.env.REACT_APP_API_URL}/api/profile/createProfile`, {
        method: 'POST',
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res, 'create profile res');
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
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log('notification->', res);
            });
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
  const [axisImages, setAxisImages] = useState([]);

  const handleAxisImage = (event, i) => {
    const copyArray = [...inputList];
    const files = event.target.files[0];

    copyArray[i].axisImage = files;

    setInputList(copyArray);

    setAxisImages(inputList.map((list) => list.axisImage));
  };

  return (
    <div className="ff ">
      <Topbar />
      <div className="ff " style={{backgroundColor:"#DCECF4"}}>
        <div className="ff ">
          <div className="ff loginLeft" style={{ marginBottom: '3rem' }}>
            <h3 className="ff ttlTxt">צור פרופיל</h3>
            <div className="ff profile-example-btn">לחץ לפרופיל לדוגמה</div>
          </div>
          <div className="ff MobilepProfileImages">
            {/* <div className="ff register_profile_image"></div> */}
            {/* <div className="ff profile-image-container">
              <img
                className="ff profile-image"
                src={
                    !imgData &&
                    'https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png'
                }
                alt=""
              />
            </div> */}
            <div className="ff MobileProfileImageContainer">
              <img
                className="ff mobileImg"
                src={
                  imgData
                    ? imgData
                    : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                }
                alt=""
              ></img>
              <label for="prfPic" className="ff prfPicTxt">וסף תמונת פרופיל +</label>
              
              <input
                className="ff custom-file-input"
                type="file"
                name="profileImg"
                onChange={onChangePicture}
                hidden
              />
            </div>
            <div className="ff MobileProfileImageContainer">
              <img
                className="ff mobileImg"
                src={
                  coverData
                    ? coverData
                    : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                }
                alt=""
              ></img>
               <label for="cvrPic" className="ff cvrPicTxt" >וסף תמונה של הקבר +</label>
               <input
                className="ff custom-file-input-cover"
                type="file"
                onChange={onChangeCover}
                name="coverImg"
                hidden
              />
            </div>
          </div>
          <div className="ff loginRight">
            <div className="ff RegBox">
              <form className="ff MobileProfileCreationBox" onSubmit={handleClick}>
                <div
                  className="ff profile-creation-names-container"
                  style={{ marginBottom: '3rem' }}
                >
                  <input
                    placeholder="* שם פרטי"
                    ref={firstName}
                    className="ff nameInput"
                    style={{fontSize:"18px"}}
                  />
                  <input
                    placeholder="* שם משפחה"
                    ref={lastName}
                    className="ff nameInput"
                    style={{fontSize:"18px"}}
                  />
                </div>
                <div className="ff birth-date-container">
                  <h1 style={{color:"#6097bf",fontFamily:"Alef"}}>תאריך לידה</h1>
                  <h1 style={{color:"#6097bf",fontFamily:"Alef"}}>תאריך פטירה</h1>
                </div>
                <div className="ff profile-creation-names-container">
                  <input
                    placeholder="* לועזי"
                    pattern="\d{4}-\d{2}-\d{2}"
                    ref={birthDate}
                    
                    className="ff nameInput"
                    type="date"
                    onBlur={handleBirthDateBlur}
                    style={{padding:"0px 8px",fontSize:"18px"}}
                  />
                  <input
                    placeholder="* לועזי"
                    type="date"
                    ref={deathDate}
                    
                    style={{padding:"0px 8px",fontSize:"18px"}}
                    className="ff nameInput"
                    onBlur={handleDeathDateBlur}
                  />
                </div>
                {/* <div className="ff profile-creation-names-container">
                  <input
                    placeholder="עברי"
                    type="text"
                    // ref={hebBirthDate}\
                    value={hebBirthDate}
                    onChange={(e) => sethebBirthDate(e.target.value)}
                    className="ff nameInput"
                  />
                  <input
                    placeholder="עברי"
                    type="text"
                    // ref={hebBirthDate}\
                    value={hebDeathDate}
                    onChange={(e) => sethebDeathDate(e.target.value)}
                    className="ff nameInput"
                  />
                </div> */}

                <div
                  className="ff profile-creation-names-container"
                  style={{ marginTop: '3rem' }}
                >
                  <input
                    placeholder="עיר"
                    ref={city}
                    className="ff nameInput"
                    type="text"
                    style={{fontSize:"18px",padding:"0px 5px"}}
                  />
                  <input
                    placeholder="תואר"
                    type="text"
                    ref={degree}
                    className="ff nameInput"
                    style={{fontSize:"18px",padding:"0px 5px"}}
                  />
                </div>
                <div className="ff radio-container-register">
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
                      className="ff radio"
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
                      className="ff radio"
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
                      className="ff radio"
                    />
                    <label htmlFor="other" style={{fontSize:"24px",padding:"10px"}}>אחר</label>
                  </div>
                </div>





                <div
                  className="ff location-container"
                  style={{ marginTop: '70px', marginBottom: '70px' }}
                >
                  <h1 style={{fontSize:"32px",padding:"10px",color:"#6097bf",fontFamily:"Alef"}}>העלאת מדיה</h1>
                  <div style={{padding:"10px"}}>
                    <div
                      className="ff profile-creation-names-container"
                      style={{ flexDirection: 'column' }}
                    >
                      <div className="ff form-group multi-preview"></div>
                      <div className="ff media-upload-button-container">
                        <input
                          id="profilePic"
                          type="file"
                          name="multiplefiles"
                          multiple
                          onChange={onChangeMultiplePicture}
                          className="ff media-upload-button with-text"
                        />
                      </div>
                      <div>
                        <img
                          className="ff MobileCreationGalleryImg"
                          src={
                            multiFiles && multiFiles.length > 0
                              ? multiFiles[0].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="ff MobileCreationGalleryImg"
                          src={
                            multiFiles && multiFiles.length > 1
                              ? multiFiles[1].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="ff MobileCreationGalleryImg"
                          src={
                            multiFiles && multiFiles.length > 2
                              ? multiFiles[2].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="ff MobileCreationGalleryImg"
                          src={
                            multiFiles && multiFiles.length > 3
                              ? multiFiles[3].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="ff MobileCreationGalleryImg"
                          src={
                            multiFiles && multiFiles.length > 4
                              ? multiFiles[4].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                      </div>
                      {/* <div className="ff previewProfilePic"> */}
                      {/* <img
                          className="ff playerProfilePic_home_tile"
                          src={imgData}
                          alt=""
                        /> */}
                      {/* </div> */}
                    </div>
                  </div>{' '}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h1 style={{fontSize:"24px",padding:"10px",color:"#6097bf",fontFamily:"Alef"}}>על הנפטר </h1>
                  <textarea
                    ref={description}
                    className="ff profile-creation-description"
                  />
                </div>



                <div style={{padding:"5px"}}>
                  <h1 style={{fontSize:"24px",padding:"10px",textAlign:"center",color:"#6097bf"}}>נקודות ציון בחיים</h1>
                  <Popup
                    trigger={
                      <div className="ff " style={{fontSize:"24px",padding:"10px",textAlign:"center",color:"#6097bf"}}>+ לחץ להסבר</div>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="ff modal">
                        <button className="ff close" onClick={close}>
                          &times;
                        </button>
                        <img
                          src={LifeAxisImg}
                          className="ff life-axis-img"
                          alt=""
                        ></img>
                      </div>
                    )}
                  </Popup>
                  {inputList.map((x, i) => {
                    return (
                      <div className="ff box" key={i}>
                        {inputList.length !== 1 && (
                          <div
                            className="ff add-btn"
                            onClick={() => addSingleDiv(i)}
                          >
                            <div className="ff inner-btn">
                              <div className="ff line-1"></div>
                              <div className="ff line-2"></div>
                            </div>
                          </div>
                        )}

                        <div className="ff inner-box">
                          <input
                            name="axisTitle"
                            placeholder="כותרת"
                            value={x.axisTitle}
                            onChange={(e) => handleInputChange(e, i)}
                            className="ff Mobileaxis-input"
                          />
                          <input
                            name="axisDate"
                            placeholder="תאריך"
                            value={x.axisDate}
                            onChange={(e) => handleInputChange(e, i)}
                            className="ff Mobileaxis-input"
                          />

                          <textarea
                            name="axisDescription"
                            placeholder="טקסט"
                            value={x.axisDescription}
                            onChange={(e) => handleInputChange(e, i)}
                            className="ff descBox"
                          />
                          <label class="">
                           <label for="imgBox" className="ff imgBx">וסף תמונה   </label>
                            <input
                              type="file"
                              id="imgBox"
                              name="axisImage"
                              placeholder="Image"
                              onChange={(e) => handleAxisImage(e, i)}
                               
                              hidden
                            />
                            <span class="file-custom"></span>
                          </label>
                          <div className="ff btn-box">
                            {inputList.length !== 1 && (
                              <p
                                className="ff Mobiledelete-btn"
                                onClick={() => handleRemoveClick(i)}
                              >
                                - הסר
                              </p>
                            )}
                          </div>
                        </div>
                        {inputList.length - 1 === i && (
                          <div className="ff add-btn" onClick={handleAddClick}>
                            <div className="ff inner-btn">
                              <div className="ff line-1"></div>
                              <div className="ff line-2"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div
                  className="ff location-container"
                  style={{ marginTop: '70px' }}
                >
                  <h1 className="ff" style={{fontSize:"24px",padding:"10px"}}>מיקום הקבר</h1>
                  <Popup
                    className="ff pop"
                    trigger={
                      <div className="ff press-explain-3 pointer" style={{fontSize:"24px",padding:"10px"}}>+ לחץ להסבר</div>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="ff modal">
                        <button className="ff close" onClick={close}>
                          &times;
                        </button>
                        <img
                          src={graveLocationImg}
                          className="ff grave-location-img"
                          alt=""
                        ></img>
                      </div>
                    )}
                  </Popup>
                  <div className="ff location-semicontainer">
                    <div className="ff profile-creation-names-container">
                      <input
                        placeholder="הוספת מיקום ווייז "
                        ref={wazeLocation}
                        className="ff nameInput"
                      />
                      {/* <input
                        placeholder="הוספת מיקום גוגל"
                        ref={googleLocation}
                        className="ff nameInput"
                      /> */}
                      <button
                        className="ff mpBtn"
                        onClick={() => setMap(!map)}
                        type="button"
                      >
                        הוספת מיקום גוגל
                      </button>
                    </div>
                  </div>
                  <div style={{padding:"10px"}}>
                  {map && <Map position={position} setPosition={setPosition} />}
                  <div className="ff profile-image-container">
                    <img
                      className="ff profile-image"
                      src={
                        graveData
                          ? graveData
                          : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                      }
                      alt=""
                    ></img>
                    <input
                      className="ff custom-file-grave"
                      type="file"
                      onChange={onChangeGrave}
                      name="coverImg"
                      style={{ width: '300px' }}
                    />
                  </div>
                  </div>
                </div>

                <div className="ff radio-container-register">
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
                      className="ff radio"
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
                      className="ff radio"
                    />
                    <label htmlFor="public">פומבי</label>
                  </div>
                </div>
                {submitted ? (
                  <button className="ff create-btn submitted">נשמר</button>
                ) : (
                  <button
                    className="ff create-btn"
                    type="submit"
                    onClick={setSubmitted(true)}
                  >
                    שמור
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <SnackBar open={open} handleClose={handleClose} message={message} />
      </div>
    </div>
  );
}
