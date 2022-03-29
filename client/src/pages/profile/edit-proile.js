import axios from 'axios';
import { useRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
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
import graveLocationImg from '../../assets/מיקום-הקבר.jpg'
import LifeAxisImg from '../../assets/ציר-חיים.jpg'
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
  useEffect(() => { });
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
  const handleBirthDateBlur = async () => {
    const birth = new Date(birthDate.current.value);

    const date = birth.getDate();
    const year = birth.getFullYear();
    const month = birth.getMonth();

    const response = await fetch(
      `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month+1}&gd=${date}&g2h=1`
    );
    const data=await response.json()
    sethebBirthDate(data.hebrew);
  };
  const handleDeathDateBlur = async () => {
    const death = new Date(deathDate.current.value);

    const date = death.getDate();
    const year = death.getFullYear();
    const month = death.getMonth();

    const response = await fetch(
      `https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month+1}&gd=${date}&g2h=1`
    )
    const data=await response.json()
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
  const [axisImages, setAxisImages] = useState([]);

  const handleAxisImage = (event, i) => {
    const copyArray = [...inputList];
    const files = event.target.files[0];

    copyArray[i].axisImage = files;

    setInputList(copyArray);

    setAxisImages(inputList.map((list) => list.axisImage));
  };

  return (
    <div className="profile-creation-container">
      <Topbar />
      <div className="profile-creation">
        <div className="p-2 w-full md:w-6/12">
          <div className="loginLeft" style={{ marginBottom: '3rem' }}>
            <h3 className="profile-creation-title">צור פרופיל</h3>
            <div className="profile-example-btn">לחץ לפרופיל לדוגמה</div>
          </div>
          <div className="flex   w-full justify-center items-center mx-auto space-x-10">
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
            <div className="w-6/12   flex-col justify-center items-center ">
            <div className="flex justify-center items-center">
              <img
                className="rounded-full md:w-32"
                src={
                  imgData
                    ? imgData
                    : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                }
                alt=""
              ></img>
              </div>
               <div className="flex justify-center items-center">
              <label for="inp" className="text-lg md:text-xl font-bold">וסף תמונת קאבר +</label>
              <input
                id="inp"
                className="w-full"
                type="file"
                name="profileImg"
                onChange={onChangePicture}
                hidden
              />
            </div>
            </div>

            <div className="w-6/12 flex-col justify-center items-center">
              <div className="flex justify-center items-center">
              <img
                className="rounded-full md:w-32"
                src={
                  coverData
                    ? coverData
                    : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                }
                alt=""
              ></img>
              </div>
              <div className="flex justify-center items-center">
              <label for="inp" className="text-lg md:text-xl font-bold">וסף תמונת פרופיל +</label>
              <input
                id="inp"
                className="w-full"
                type="file"
                onChange={onChangeCover}
                name="coverImg"
                hidden
              />

              </div>
            </div>

          </div>
          <div className="">
            <div className="">
              <form className="" onSubmit={handleClick}>
                <div
                  className="flex justify-center items-center text-center w-full pt-2" 
                >
                <div className="w-6/12 p-1">
                  <input
                    placeholder="* שם פרטי"
                    ref={firstName}
                    className="w-full rounded-lg p-1"
                  />
                  </div>
                  <div className="w-6/12 p-1">
                  <input
                    placeholder="* שם משפחה"
                    ref={lastName}
                    className="w-full rounded-lg p-1"
                  />
                  </div>
                </div>
              {/*#########*/}
              
              {/*#######*/}
               <div className="flex w-full justify-center items-center pt-2">
               <div className="w-6/12 p-1">
                  <input
                    placeholder="* לועזי"
                    pattern="\d{4}-\d{2}-\d{2}"
                    ref={birthDate}
                    className="w-full rounded-lg p-1"
                    type="date"
                    onBlur={handleBirthDateBlur}
                  />
                  </div>
                  <div className="w-6/12 p-1">
                  <input
                    placeholder="* לועזי"
                    type="date"
                    ref={deathDate}
                    className="w-full rounded-lg p-1"
                    onBlur={handleDeathDateBlur}
                  />
                </div>
                </div>
              {/*##########*/}
              <div
                  className="profile-creation-names-container"
                  style={{ marginTop: '3rem' }}
                >
                  <input
                    placeholder="עיר"
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
              {/*########*/}


                <div className="radio-container-register">
                  <h3 style={{ color: '#6097BF' }}>מין *</h3>
                  <div
                    className={`${selectedGender === 'male' && 'register-active'
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
                    className={`${selectedGender === 'female' && 'register-active'
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
                    className={`${selectedGender === 'other' && 'register-active'
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
              {/*######*/}


                <div
                  className="location-container"
                  style={{ marginTop: '70px', marginBottom: '70px' }}
                >
                  <h1>העלאת מדיה </h1>
                  <div>
                    <div
                      className="mx-auto w-full md:w-4/12"
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
                      <div className="">
                        <img
                          className="p-2 items-center rounded-xl"
                          src={
                            multiFiles && multiFiles.length > 0
                              ? multiFiles[0].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="p-2 items-center rounded-xl"
                          src={
                            multiFiles && multiFiles.length > 1
                              ? multiFiles[1].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="p-2 items-center rounded-xl"
                          src={
                            multiFiles && multiFiles.length > 2
                              ? multiFiles[2].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="p-2 items-center rounded-xl"
                          src={
                            multiFiles && multiFiles.length > 3
                              ? multiFiles[3].imagePreview
                              : `https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg`
                          }
                          alt=""
                        ></img>
                        <img
                          className="p-2 items-center rounded-xl"
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
              {/*######*/}


                <div style={{ textAlign: 'center' }}>
                  <h1>על הנפטר </h1>
                  <input
                    ref={description}
                    className="profile-creation-description"
                  />
                </div>

              {/*###########*/}
              <div className="">
              <div className="flex justify-center items-center">
              <h1 style={{ textAlign: 'center' }} className="p-2">נקודות ציון בחיים</h1>
              </div>
                  <Popup
                    trigger={<div className=" pointer text-center w-full p-2">+ לחץ להסבר</div>}
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
 
                         <div className="flex w-full bg-blue justify-between items-center">
                          <div className="w-4/12 p-2 space-x-1">
                          <input
                            name="axisTitle"
                            placeholder="כותרת"
                            value={x.axisTitle}
                            onChange={(e) => handleInputChange(e, i)}
                            className="w-5/12 rounded-lg p-2"
                          />
                         
                          <input
                            name="axisDate"
                            placeholder="תאריך"
                            value={x.axisDate}
                            onChange={(e) => handleInputChange(e, i)}
                            className="w-5/12 rounded-lg p-2"
                          /></div>
                          <div className="w-4/12 p-2">
                          <textarea
                            name="axisDescription pas"
                            placeholder="טקסט"
                            value={x.axisDescription}
                            onChange={(e) => handleInputChange(e, i)}
                            className="w-full h-24 rounded-lg p-2"
                          />
                          </div>
                          <div className="flex w-4/12 space-x-1 p-2">
                          <label class="rounded-lg p-2">
                            הוסף תמונה
                            <input
                              type="file"
                              name="axisImage"
                              placeholder="Image"
                              onChange={(e) => handleAxisImage(e, i)}
                              className="axis-input-image w-5/12"
                            />
                            <span class="file-custom"></span>
                          </label>
                          <div className="w-5/12 rounded-lg p-2">
                            {inputList.length !== 1 && (
                              <p
                                className="w-full"
                                onClick={() => handleRemoveClick(i)}
                              >
                                - הסר
                              </p>
                            )}
                          </div> 
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
                {/*#########*/}
                <div className="text-center">
                     <div
                  className="location-container"
                  style={{ marginTop: '70px' }}
                >
                  <h1 className="p-2">מיקום הקבר</h1>
                  <Popup className='pop'
                    trigger={<div className="press-explain-3 pointer p-2">+ לחץ להסבר</div>}
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
                  <div className="flex justify-center items-center space-x-2">
                    
                      <input
                        placeholder="הוספת מיקום ווייז "
                        ref={wazeLocation}
                        className="p-2 rounded-lg"
                      />
                      {/* <input
                        placeholder="הוספת מיקום גוגל"
                        ref={googleLocation}
                        className="nameInput"
                      /> */}
                      <button
                        className="py-2 px-1 border border-white rounded-lg"
                        onClick={() => setMap(!map)}
                        type="button"
                      >
                        הוספת מיקום גוגל
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                  {map && <Map position={position} setPosition={setPosition} />}
                  <div className="">
                  <div className="flex items-center justify-center p-5">
                    <img
                      className="profile-image"
                      src={
                        graveData
                          ? graveData
                          : `https://res.cloudinary.com/social-media-appwe/image/upload/v1633782265/social/assets/person/noAvatar_f5amkd.png`
                      }
                      alt=""
                    ></img>
                    </div>
                    <input
                      className="custom-file-grave"
                      type="file"
                      onChange={onChangeGrave}
                      name="coverImg" 
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
                    className={`${selectedPrivacy === 'private' && 'register-active'
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
                    className={`${selectedPrivacy === 'public' && 'register-active'
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
                   
                </div>
                </div>

                <div className="flex items-center justify-center">
                <button className="create-btn" type="submit">
                  שמור
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <SnackBar open={open} handleClose={handleClose} message={message} />
      </div>
    </div>
  );
}
