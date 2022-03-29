

import React, {Component} from 'react';
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
      return (

        <ChatWindow />
      )
        
  }

export default SmallChatWindow;
