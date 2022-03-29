

import React, {Component, useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './bootstrap.min.css';
import './bootstrapchatstyle.css';
import './chatstyle.css';
import './fonts.css';
//import * as utils from './serverold.js'; 
import cancel from './cancel.png';
import ChatWindow from './ChatWindow';
//import {TextInput} from 'react-native';

import Messages from './Messages';

import io from 'socket.io-client';
import { getAdditionalUserInfo } from 'firebase/auth';
import { textAlign } from '@mui/system';

//require('console-polyfill')


const SmallChatWindow = (props) => {
  const { user } = useContext(AuthContext);

  const [hasLoaded, setHasLoaded] = useState(false);

  const myChatWindow =  useRef();

  function getFriendID(){
    if (user._id == "622b541ffa9ae732dcd40bb5"){
      return "622b54c2fa9ae732dcd40bc4";
    }
    else {
      return "622b541ffa9ae732dcd40bb5";
    }

  }

  useEffect(() => {
      if (!hasLoaded){
          setHasLoaded(true);
          myChatWindow.current.loadChatFromUserID(getFriendID(), "Abraham", "Lincoln", null);

      }
  }, []);


      return (

        <ChatWindow ref={myChatWindow}/>
      )
        
  }

export default SmallChatWindow;
