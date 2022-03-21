

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

import {TextInput} from 'react-native';

import Messages from './Messages';

import io from 'socket.io-client';
import { getAdditionalUserInfo } from 'firebase/auth';
import { textAlign } from '@mui/system';

import PropTypes from 'prop-types'
import ReactTimeAgo from 'react-time-ago'


const { forwardRef, useRef, useImperativeHandle } = React;


//export default React.memo(ExplorerChatSessions, forwardRef((props, nextProps) => {
const ExplorerChatSessions = forwardRef((props, ref) => {
    const [hasRenderedEverything, setHasRenderedEverything] = useState(false);

    const useHover = () => {
        const [hovered, setHovered] = useState();
        
        
        const eventHandlers = useMemo(() => ({
          onMouseOver() { setHovered(true);},
          onMouseLeave() { setHovered(false);}
           
          
        }), []);

     
        
        return [hovered, eventHandlers];
      }

      useEffect(() => {
        if (hasRenderedEverything){
            props.setIsLoading(false);
        }
        }, []);
      
    const SessionHoverContainer = ({children }) => {
        const [hovered, eventHandlers] = useHover();
        //console.log("props are: " + _id);
        return (
            <>

                       <div style = {{background: hovered ? '#ffccb3' : 'rgb(241,239,241)'}} {...eventHandlers}>
                        {children}
                       
                        {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
                        </div>
            </>
        );
      };

    const [sessions, setSessions] = useState([]);

    const { user } = useContext(AuthContext);

    const setHasRendered = () => {
        console.log("entered has rendered")
        setHasRenderedEverything(true);
    }

    useImperativeHandle(ref, () => ({
                async loadMyChatSessions()  {
                    console.log("got into load my chat sessions" + user._id)
                    try {
                        
                            const res = await 
                            axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessions/`, {
                                "userid": user._id
                            })
                        
                            .then(function (response) {
                                //var myUrl = makeTextFile(JSON.stringify(response.data));
                                //setMyUrl(myUrl);
                
                            console.log("my Chat Sessions:" + JSON.stringify(response.data));
                            //console.log("People " + JSON.stringify(response.data[0].firstName));
                            
                            //const stringified = JSON.stringify(response.data);
                            const newArray = [...response.data];
                            //setPeople([...JSON.stringify(response.data[0])]);
                            //console.log("MY NEW ARRAY: " + JSON.stringify(newArray))
                            setSessions(newArray);
                            if (newArray.length){
                                props.onChangeChatWindow(newArray[0]);
                            }
                            //console.log("chatSessions.length: " + chatSessions.length);
                            var objDiv = document.getElementById("SessionsContainer");
                            objDiv.scrollTop = 0;
                            })
                            .catch(function (error) {
                            console.log(error);
                            });
                            
                        
                        
                
                    } catch (err) {
                        console.log(JSON.stringify(err));
                        //setMessage('Something went wrong!');
                        //setOpen(true);
                    }
                
                }
        
    
      }));





return (

    <div id = "SessionsContainer">
        
            {[...Object.values(sessions)] //makes mappable
                              //.sort((a, b) => a.time - b.time)
                              .map((session, index) => (
                                  <SessionHoverContainer>
                                  <div className = "OneSession" onClick = {() => props.onChangeChatWindow(session)}>
                                        <div className = "ImgDiv"><img class = "ImgClass" onLoad={setHasRendered} src = {session.userInfo[0].id == user._id? session.userInfo[1].profilePicture : session.userInfo[0].profilePicture} /></div>
                                        <div className = "HeaderText">

                                                {session.title == "" && [...Object.values(session.userInfo)].map((OneUser, index) =>
                                                        (<>{OneUser.id != user._id? OneUser.firstName + " " + OneUser.lastName: ""} {index == session.userInfo.length - 1? "" : ","}
                                                           {console.log("one user : " + OneUser.firstName + OneUser.lastName)}</>
                                                        )
                                                
                                                )}
                                        </div>
                                        <span className = "LastMessage">
                                                {session.lastmessage}
                                        </span>
                                        <span className = "LastMessageTime">
                                        <ReactTimeAgo date={session.lastupdated} locale="en-US"/>
                                        </span>
                                        <div className = "BlueDotComponent"></div>
                                  </div>
                                  </SessionHoverContainer>
            ))}
    
    </div>



)

});

export default ExplorerChatSessions;

