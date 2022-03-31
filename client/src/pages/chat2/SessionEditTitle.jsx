import React, {Component} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useParams, useEffect, useMemo } from "react";
import axios from 'axios';
import './bootstrap.min.css';
import './bootstrapchatstyle.css';
import './explorerchatsessions.css';
import './fonts.css';
import * as utils from './serverold.js'; 
import cancel from './cancel.png';
import ellipses from './icons8-ellipsis-30.png';
import {TextInput} from 'react-native';

import Messages from './Messages';

import io from 'socket.io-client';
import { getAdditionalUserInfo } from 'firebase/auth';
import { textAlign } from '@mui/system';

import PropTypes from 'prop-types'
import ReactTimeAgo from 'react-time-ago'





const SessionEditTitle = (props) => {
    
    const [myTextValue, setMyTextValue] = useState("");

    const HandleKeyDown = (e) => {
        //if ((e.key === 'Enter' || e.keyCode === 13)) {
            
            //setMyTextValue(e.target.value);
        //}
    }

    const DoNothing = (e) => {

        setMyTextValue(e.target.value);
    }

    const HandleSave = async() => {
        props.saveNewTitleToRender(props.mySession._id,myTextValue)
        console.log("handlesave session: " + JSON.stringify(props.mySession))
        const res = await 
        axios.post(`${process.env.REACT_APP_API_URL}/api/profile/setChatSessionTitle/`, {
            "sessionid": props.mySession._id,
            "value": myTextValue
            
        })
        .then(function (response) {




        });

        props.closeMe();
    }

    useEffect(() => {
        
    })

    const closeMe = () => {
        props.closeMe();
    }

    return (
            <div id = "SessionEditTitle">
                
                <div id = "SessionEditTitleHeader">
                    <img id = "SessionEditTitleCancelImg" src = {cancel} onClick = {closeMe} />
                    Edit Session Title

                </div>

                <textarea onChange={DoNothing} onKeyDown = {HandleKeyDown} value = {myTextValue} id = "Session_Title_Input" rows={1} placeholder="" />
            
                <button id = "SessionTitleSaveButton" onClick = {HandleSave}>Save</button>
            </div>
    )


}

export default SessionEditTitle;