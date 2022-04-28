

import React, {Component} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useParams, useEffect, useMemo, useCallback, memo} from "react";
import axios from 'axios';
import './bootstrap.min.css';
import './bootstrapchatstyle.css';
import './explorerchatsessions.css';
import './fonts.css';
import * as utils from './serverold.js'; 
import cancel from './cancel.png';
import ellipses from './icons8-ellipsis-30.png';
import {TextInput} from 'react-native';
import SessionEditTitle from './SessionEditTitle';
import Messages from './Messages';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import { getAdditionalUserInfo } from 'firebase/auth';
import { textAlign } from '@mui/system';

import PropTypes from 'prop-types'
import ReactTimeAgo from 'react-time-ago'
import magnifyingglass from './magnifying-glass.png';

const { forwardRef, useRef, useImperativeHandle } = React;


//export default React.memo(ExplorerChatSessions, forwardRef((props, nextProps) => {
const ExplorerChatSessions = forwardRef((props, ref) => {


    const [sessionsScrollTop, setSessionsScrollTop] = useState(0);
    const [bottomMostSessionID, setBottomMostSessionID] = useState("");
    const [skipCount, setSkipCount] = useState(0);
    const [oldPageYOffset, setOldPageYOffset] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const [mySessionsBackup, setMySessionsBackup] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [sessionsAjax, setSessionsAjax] = useState([]);
    const [searchResultMessagesAjax, setSearchResultMessagesAjax] = useState([]);
    const [mySelectValue,setMySelectValue] = useState({value:"In Title Only"});
    const [textValue, setTextValue] = useState("");
    const [searchSessionsValue, setSearchSessionsValue] = useState("");
    const [sessionsAjaxHasJustBeenSet, setSessionsAjaxHasJustBeenSet] = useState(false);
    var amIInsideAtBottom = false;
    var haveIDoneSkipCount = {1: false};
    const mySelectRef = useRef(null)
    const [haveILoadedArchivedSessions, setHaveILoadedArchivedSessions] = useState(false);

      async function renewMySessions(){
        //if (haveIDoneSkipCount[skipCount] == true){
        //  return;
        //}
        haveIDoneSkipCount[skipCount] = true;
        
        console.log("got into renewmysessions "+ skipCount)
        try {
          
          
          var isArchived = false;

          if (mySelectValue.value == "In Archived Sessions"){
              isArchived = true;
          }

          console.log("isArchived = " + isArchived + mySelectValue.value)
          //console.log("inside getmypeople and bottommostpersonid: " + bottomMostPersonID);
          const res = await 
          axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessions/`, {
            "userid": user._id,
            "bottomMostSessionID":bottomMostSessionID,
            "skipCount":skipCount,
            "isArchived": isArchived
            //"time": mySetMessagesNewestTime,
            //"scrollIncrementCount":scrollIncrementCount
          })
          .then(function (response) {
            //console.log("before:" + response);
            //console.log("now here: " + JSON.stringify(response.data));
            //setHasLoadedFetchedMessages(true);
            //console.log("now messages are: " + JSON.stringify(response.data));
            var newArray = [...response.data];
            //newArray = newArray.reverse();
            //const temp = response.data;
            console.log("in renew and existing sessions are " + JSON.stringify(sessions));
            console.log("in renew and new sessions are " + JSON.stringify(newArray));
            console.log("here we go renew2: " + JSON.stringify(response));
            //if(temp[0].timeofmessage){
            //  setOldestTime(temp[12].timeofmessage);
            //}
            if(newArray.length > 0 && newArray[newArray.length - 1]._id){
              setBottomMostSessionID(newArray[newArray.length - 1]._id)
            }
            setSkipCount(skipCount + 1)
            console.log("now sessions are about to be set: " + JSON.stringify(response.data))
            //setScrollIncrementCount(scrollIncrementCount + 1);
            //setMessages([...newArray,...messages]);
            setSessions((previousSessions) => [...previousSessions,...newArray]);
            //setSessions([...sessions,...newArray],{});
            //setMessages([...response.data]);
            //console.log("messages.length: " + messages.length);
            //var objDiv = document.getElementById("Messages_Container");
            //objDiv.scrollTop = objDiv.scrollHeight;
            
          })
          .catch(function (error) {
            console.log(error);
          });
          
      //}
      //fetchAllChatMessages();
      
    
    } catch (err) {
      console.log(JSON.stringify(err));
      //setMessage('Something went wrong!');
      //setOpen(true);
    }
    }

    const getSessions = () => {
        return sessions;
    }

    const [isOnFirstRender, setIsOnFirstRender] = useState(true);
    const [hasRenderedEverything, setHasRenderedEverything] = useState(false);
    const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
    

    const editTitle = (session) => {
        
        //return function () {
            // you code 
            console.log("inside edit title");
            props.setSessionToEditTitle(session);

            
         //}
    }

    

    const archiveSession = (session) => {
        
      //return function () {
          // you code 
          console.log("inside archive session");
/*
          setSessions(sessions.filter(function(oneSession) { 
            return oneSession._id !== session._id 
            }));
*/
            const res = 
            axios.post(`${process.env.REACT_APP_API_URL}/api/profile/archiveSession/`, {
                "sessionID": session._id,
                "userID": user._id
                
                //"time": mySetMessagesNewestTime,
                //"scrollIncrementCount":scrollIncrementCount
            })
            .then(function (response) {
              //loadMyChatSessions();

              console.log("my Chat Sessions:" + JSON.stringify(response.data));
              //console.log("People " + JSON.stringify(response.data[0].firstName));
              
              //const stringified = JSON.stringify(response.data);
              const newArray = [...response.data];
              //setPeople([...JSON.stringify(response.data[0])]);
              //console.log("MY NEW ARRAY: " + JSON.stringify(newArray))
              console.log("about to call setSessions line 315 " + JSON.stringify(newArray))
              setSessions(newArray,{});
              if (newArray.length){
                  props.onChangeChatWindow(newArray[0]);
              }

              
              //console.log("chatSessions.length: " + chatSessions.length);
              var objDiv = document.getElementById("SessionsInnerContainer");
              objDiv.scrollTop = 0;
            })
            .catch(function (error) {
                console.log(error);
            });



          
          /*const tempSessions = sessions;
          for (const i in tempSessions){
              if (tempSessions[i]._id == session._id){
                  const myArray = tempSessions[i].archiveUserIDList;
                  
                  myArray.push(user._id);
                  tempSessions[i].archiveUserIDList = myArray;
                  setSessions(tempSessions,{});
                  break;
              }
          }


          console.log("tempSessions: " + JSON.stringify(tempSessions, null, 2))
          //setSessions(tempSessions,{});
          /*(setSessions((sessions) => {
            //console.log(state); // "React is awesome!"
            
            return [...tempSessions];
          });*/
          console.log("now sessions = " + JSON.stringify(sessions, null, 2));
       //}
  }
    
  const unArchiveSession = (session) => {
        
    //return function () {
        // you code 
        console.log("inside unarchive session");
/*
        setSessions(sessions.filter(function(oneSession) { 
          return oneSession._id !== session._id 
          }));
*/
          const res = 
          axios.post(`${process.env.REACT_APP_API_URL}/api/profile/unarchiveSession/`, {
              "sessionID": session._id,
              "userID": user._id
              
              //"time": mySetMessagesNewestTime,
              //"scrollIncrementCount":scrollIncrementCount
          })
          .then(function (response) {
            //loadArchivedSessions();
            console.log("my Chat Sessions:" + JSON.stringify(response.data));
                            //console.log("People " + JSON.stringify(response.data[0].firstName));
                            
                            //const stringified = JSON.stringify(response.data);
                            const newArray = [...response.data];
                            //setPeople([...JSON.stringify(response.data[0])]);
                            //console.log("MY NEW ARRAY: " + JSON.stringify(newArray))
                            console.log("about to call setSessions line 315 " + JSON.stringify(newArray))
                            setSessions(newArray,{});
                            if (newArray.length){
                                props.onChangeChatWindow(newArray[0]);
                            }

                            
                            //console.log("chatSessions.length: " + chatSessions.length);
                            var objDiv = document.getElementById("SessionsInnerContainer");
                            objDiv.scrollTop = 0;
          })
          .catch(function (error) {
              console.log(error);
          });



        
        /*const tempSessions = sessions;
        for (const i in tempSessions){
            if (tempSessions[i]._id == session._id){
                const myArray = tempSessions[i].archiveUserIDList;
                
                myArray.push(user._id);
                tempSessions[i].archiveUserIDList = myArray;
                setSessions(tempSessions,{});
                break;
            }
        }


        console.log("tempSessions: " + JSON.stringify(tempSessions, null, 2))
        //setSessions(tempSessions,{});
        /*(setSessions((sessions) => {
          //console.log(state); // "React is awesome!"
          
          return [...tempSessions];
        });*/
        console.log("now sessions = " + JSON.stringify(sessions, null, 2));
     //}
}
    const editParticipants = (session) => {
        console.log("is inside editing participants " + session._id);
    }

    const deleteChatSession = (session) => {
        console.log("is inside delete chat session " + session._id);
    }

    const useHover = () => {
        const [hovered, setHovered] = useState();
        
        
        const eventHandlers = useMemo(() => ({
          onMouseOver() { setHovered(true);},
          onMouseLeave() { setHovered(false);}
           
          
        }), []);

     
        
        return [hovered, eventHandlers];
      }

      useEffect(() => {
/*
        if (atBottom(mySelectRef.current)){
                      try {
                        
                        console.log("in useEffect at bottom");
                        var isArchived = false;

                        if (mySelectValue == "In Archived Sessions"){
                            isArchived = true;
                            
                        }

                        console.log("isArchived = " + isArchived + mySelectValue)
                        //console.log("inside getmypeople and bottommostpersonid: " + bottomMostPersonID);
                        
                        const res = axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessions/`, {
                          "userid": user._id,
                          "bottomMostSessionID":bottomMostSessionID,
                          "skipCount":skipCount,
                          "isArchived": isArchived
                          //"time": mySetMessagesNewestTime,
                          //"scrollIncrementCount":scrollIncrementCount
                        })
                        .then(function (response) {
                          //console.log("before:" + response);
                          //console.log("now here: " + JSON.stringify(response.data));
                          //setHasLoadedFetchedMessages(true);
                          //console.log("now messages are: " + JSON.stringify(response.data));
                          var newArray = [...response.data];
                          //newArray = newArray.reverse();
                          //const temp = response.data;
                          console.log("in renew and existing sessions are " + JSON.stringify(sessions));
                          console.log("in renew and new sessions are " + JSON.stringify(newArray));
                          console.log("here we go renew2: " + JSON.stringify(response));
                          //if(temp[0].timeofmessage){
                          //  setOldestTime(temp[12].timeofmessage);
                          //}
                          if(newArray.length > 0 && newArray[newArray.length - 1]._id){
                            setBottomMostSessionID(newArray[newArray.length - 1]._id)
                          }
                          setSkipCount(skipCount + 1)
                          console.log("now sessions are about to be set: " + JSON.stringify(response.data))
                          //setScrollIncrementCount(scrollIncrementCount + 1);
                          //setMessages([...newArray,...messages]);
                          setSessions((previousSessions) => [...previousSessions,...newArray]);
                          //setSessions([...sessions,...newArray],{});
                          //setMessages([...response.data]);
                          //console.log("messages.length: " + messages.length);
                          //var objDiv = document.getElementById("Messages_Container");
                          //objDiv.scrollTop = objDiv.scrollHeight;
                          
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                      }
                        catch {
                          
                        }
          }




*/








        console.log("in useEffect and sessions are: " + JSON.stringify(sessions, null, 2));
        if (sessionsAjaxHasJustBeenSet){
          
                if (textValue != ""){
                          
                          var message = textValue;
                          //if (e.target.value.length == 0){
                          //  message = e.target.value + e.;
                          //}
                          //else {
                        //   message = "";
                          //}
                          //message += e.key;//String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode);
                          console.log("message to query is:" + message + ":");
                          //console.log("got into if");
                          //console.log("user" + JSON.stringify(user));

                                if (mySelectValue.value == "In Title Only"){
                                        const res = 
                                        axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAjaxSearchSessionsTitle/`, {
                                            "title": message,
                                            "userid": user._id
                                            
                                            //"time": mySetMessagesNewestTime,
                                            //"scrollIncrementCount":scrollIncrementCount
                                        })
                                        .then(function (response) {
                                            //console.log("before:" + response);
                                            //console.log("now here: " + JSON.stringify(response.data));
                                            //setHasLoadedFetchedMessages(true);
                                            //console.log("now messages are: " + JSON.stringify(response.data));
                                            console.log("ajax response: " + JSON.stringify(response.data));
                                            setSessionsAjax([...response.data]);
                                            //if(temp[0].timeofmessage){
                                            //  setOldestTime(temp[12].timeofmessage);
                                            //}
                                          
                                            //setMessages([...response.data]);
                                            //console.log("messages.length: " + messages.length);
                                            //var objDiv = document.getElementById("Messages_Container");
                                            //objDiv.scrollTop = objDiv.scrollHeight;
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                              }
                              else if (mySelectValue.value == "In Chat Body"){
                                        const res = 
                                        axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAjaxSearchSessionsChatBody/`, {
                                            "text": message,
                                            "userid": user._id
                                            
                                            //"time": mySetMessagesNewestTime,
                                            //"scrollIncrementCount":scrollIncrementCount
                                        })
                                        .then(function (response) {
                                            //console.log("before:" + response);
                                            //console.log("now here: " + JSON.stringify(response.data));
                                            //setHasLoadedFetchedMessages(true);
                                            //console.log("now messages are: " + JSON.stringify(response.data));
                                            console.log("ajax response: " + JSON.stringify(response.data));
                                            setSearchResultMessagesAjax([...response.data]);
                                            //if(temp[0].timeofmessage){
                                            //  setOldestTime(temp[12].timeofmessage);
                                            //}
                                          
                                            //setMessages([...response.data]);
                                            //console.log("messages.length: " + messages.length);
                                            //var objDiv = document.getElementById("Messages_Container");
                                            //objDiv.scrollTop = objDiv.scrollHeight;
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                              }
                              else if (mySelectValue.value == "In Archived Sessions"){
                                        const res = 
                                        axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAjaxSearchSessionsChatBody/`, {
                                            "text": message,
                                            "userid": user._id
                                            
                                            //"time": mySetMessagesNewestTime,
                                            //"scrollIncrementCount":scrollIncrementCount
                                        })
                                        .then(function (response) {
                                            //console.log("before:" + response);
                                            //console.log("now here: " + JSON.stringify(response.data));
                                            //setHasLoadedFetchedMessages(true);
                                            //console.log("now messages are: " + JSON.stringify(response.data));
                                            console.log("ajax response: " + JSON.stringify(response.data));
                                            setSearchResultMessagesAjax([...response.data]);
                                            //if(temp[0].timeofmessage){
                                            //  setOldestTime(temp[12].timeofmessage);
                                            //}
                                          
                                            //setMessages([...response.data]);
                                            //console.log("messages.length: " + messages.length);
                                            //var objDiv = document.getElementById("Messages_Container");
                                            //objDiv.scrollTop = objDiv.scrollHeight;
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });





                              }

                        }
                        else {
                          setSessionsAjax([]);
                          setSearchResultMessagesAjax([]);
                        }

              setSessionsAjaxHasJustBeenSet(false);

        }






        //document.getElementById("SessionsContainer").addEventListener('scroll', e => sessionsOnScroll(e));
        window.addEventListener('scroll', sessionsOnScroll, true);


        setHasMounted(true);

        const elem = document.querySelector('#SessionsContainer');
        //const elem = ReactDOM.findDOMNode(mySessionsScrollRef.current)
        //window.addEventListener('scroll', sessionsOnScroll, true);


        if (hasRenderedEverything){
            props.setIsLoading(false);
            
            /*
            if(isOnFirstRender){
                setIsOnFirstRender(false)
                console.log("first render and session is " + JSON.stringify(sessions[0]));
                props.onChangeChatWindow(sessions[0])
            }*/
            
        }
        console.log("useEffect sessions are: " + JSON.stringify(sessions));
        
        return () => {
            // Unbind the event listener on clean up
            //document.getElementById("SessionsContainer").removeEventListener('scroll', e => sessionsOnScroll(e));
            window.removeEventListener('scroll', sessionsOnScroll, true);
          };
        }, [setHasMounted, hasMounted, textValue]);
      

        const EllipsesHoverContainer = ({children, session}) => {
            const [hovered, eventHandlers] = useHover();
            const [hovered2, eventHandlers2] = useHover();
            const [hovered3, eventHandlers3] = useHover();
            const [hovered4, eventHandlers4] = useHover();
            const myColor = "";
            //console.log("props are: " + _id);
            return (
                <>
    
                           <div className = "EllipsesWrapper" style = {{/*background: hovered ? '#99D6FF' : {myColor}}*/}} {...eventHandlers}>
                            {children}



                                    
                                    <div className = "MyElippsesHoverContainer" style = {{display: hovered ? 'block' : 'none'}} >
                                        <div className = "EllipsesContainer" onMouseDown = {() => editTitle(session)} style = {{background: hovered2 ? '#99D6FF' : 'white'}} {...eventHandlers2}>
                                                Edit Title
                                        </div>
                                         
                                        {!haveILoadedArchivedSessions &&
                                        <div className = "EllipsesContainer" onMouseDown = {() => archiveSession(session)} style = {{background: hovered3 ? '#99D6FF' : 'white'}} {...eventHandlers3}>
                                                Archive
                                        </div>}

                                        {haveILoadedArchivedSessions &&
                                        <div className = "EllipsesContainer" onMouseDown = {() => unArchiveSession(session)} style = {{background: hovered4 ? '#99D6FF' : 'white'}} {...eventHandlers4}>
                                                Unarchive
                                        </div>}

                                       {/*
                                        <div className = "EllipsesContainer" onClick = {() => {editParticipants(session)}} style = {{background: hovered3 ? '#99D6FF' : 'white'}} {...eventHandlers3}>
                                                Edit Participants
                                        </div>
                                        <div className = "EllipsesContainer" onClick = {() => {deleteChatSession(session)}} style = {{background: hovered4 ? '#99D6FF' : 'white'}} {...eventHandlers4}>
                                                Delete Chat Session
                                        </div>
                                        */}

                                        {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
                                    </div>
                            {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
                            </div>
                </>
            );
          };



    const SessionHoverContainer = ({children }) => {
        const [hovered, eventHandlers] = useHover();
        const [hovered2, eventHandlers2] = useHover();
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

    

    const { user } = useContext(AuthContext);

    const setHasRendered = () => {
        console.log("entered has rendered")
        setHasRenderedEverything(true);
    }

    const handleOnClick = (session, index) => {
        setSelectedSessionIndex(index);
        setHasBeenClicked(session._id);
        props.onChangeChatWindow(session);
        console.log("just clicked on session: " + JSON.stringify(session));
    }

    const setHasBeenClicked = async (id) => {
        console.log("got into setHasBeenClicked");
        const res = await 
        axios.post(`${process.env.REACT_APP_API_URL}/api/profile/setSessionHasBeenClicked/`, {
          "sessionID": id
        })
        .then(function (response) {
            console.log("setSessionHasBeenClicked response " + JSON.stringify(response));
            const tempSessions = sessions;
            for (const i in tempSessions){
                if (tempSessions[i]._id == id){
                    tempSessions[i].hasNotBeenRead = false;
                    return;
                }
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useImperativeHandle(ref, () => ({


                saveNewTitleToRender(sessionid, newtitle) {

                    console.log("got into saveNewTitleToRender and " + sessionid + newtitle);
                    const tempSessions = sessions;
                        for (const i in tempSessions) {
                            if (tempSessions[i]._id == sessionid){
                                tempSessions[i].title = newtitle;
                                setSessions(tempSessions,{});
                                break;
                            }
                        }
                },


                async loadMyChatSessions()  {
                  setHaveILoadedArchivedSessions(false);
                  setSkipCount(1);
                    console.log("got into load my chat sessions" + user._id)
                    try {
                        
                            const res = await 
                            axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessions/`, {
                                "userid": user._id,
                                bottomMostSessionID: "",
                                skipCount: 0,
                                isArchived: false
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
                            console.log("about to call setSessions line 315 " + JSON.stringify(newArray))
                            setSessions(newArray,{});
                            if (newArray.length){
                                props.onChangeChatWindow(newArray[0]);
                            }

                            
                            //console.log("chatSessions.length: " + chatSessions.length);
                            var objDiv = document.getElementById("SessionsInnerContainer");
                            objDiv.scrollTop = 0;

                            return newArray[0];
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

      async function loadMyChatSessions()  {
        setHaveILoadedArchivedSessions(false);
        setSkipCount(1);
          console.log("got into load my chat sessions" + user._id)
          try {
              
                  const res = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessions/`, {
                      "userid": user._id,
                      bottomMostSessionID: "",
                      skipCount: 0,
                      isArchived: false
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
                  console.log("about to call setSessions line 315 " + JSON.stringify(newArray))
                  setSessions(newArray,{});
                  if (newArray.length){
                      props.onChangeChatWindow(newArray[0]);
                  }

                  
                  //console.log("chatSessions.length: " + chatSessions.length);
                  var objDiv = document.getElementById("SessionsInnerContainer");
                  objDiv.scrollTop = 0;

                  return newArray[0];
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



      async function loadArchivedSessions()  {
        //setHaveILoadedArchivedSessions(true);
        setHaveILoadedArchivedSessions({haveILoadedArchivedSessions}, () => {
          return true;
        });
        setSkipCount(1);
          console.log("got into load my archivedchat sessions" + user._id)
          try {
              
                  const res = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessions/`, {
                      "userid": user._id,
                      bottomMostSessionID: "",
                      skipCount: 0,
                      isArchived: true
                  })
              
                  .then(function (response) {
                      //var myUrl = makeTextFile(JSON.stringify(response.data));
                      //setMyUrl(myUrl);
                      
                  console.log("my archived chat Chat Sessions:" + JSON.stringify(response.data));
                  //console.log("People " + JSON.stringify(response.data[0].firstName));
                  
                  //const stringified = JSON.stringify(response.data);
                  const newArray = [...response.data];
                  //setPeople([...JSON.stringify(response.data[0])]);
                  //console.log("MY NEW ARRAY: " + JSON.stringify(newArray))
                  console.log("about to call setSessions line 315 " + JSON.stringify(newArray))
                  setSessions(newArray,{});
                  if (newArray.length){
                      props.onChangeChatWindow(newArray[0]);
                  }
                  
                  
                  //console.log("chatSessions.length: " + chatSessions.length);
                  var objDiv = document.getElementById("SessionsInnerContainer");
                  objDiv.scrollTop = 0;

                  return newArray[0];
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


  function atBottom(ele) {
    var sh = ele.scrollHeight;
    var st = ele.scrollTop;
    var ht = ele.offsetHeight;
    console.log(sh + ", " + st + "," + ht + ",")
    if(ht==0) {
        return true;
    }
    if(st >= sh - ht -5)
        {return true;} 
    else 
        {return false;}
}

const sessionsOnScroll = (e) => {
  //alert("got into scroll");
  //e.stopPropagation();
  console.log("my scroll function id: " + e.target.id)
  if (e.target.id == "SessionsInnerContainer") {
    //setIsVisible(false);
    //console.log("variables: " + e.target.scrollHeight + "," + e.target.scrollY + "," + e.target.scrollTop + "," + mySessionsScrollRef.current.scrollTop + ", " + mySessionsScrollRef.current.scrollTop)

    if (atBottom(e.target) && !amIInsideAtBottom) {
      //alert("at bottom");
      amIInsideAtBottom = true;

      console.log("renewing sessions")
      renewMySessions();

      //setTimeout(() => {  console.log("World!"); }, 3000);
      amIInsideAtBottom = false;
    }
  }

/*
  const elem = document.querySelector('#SessionsContainer');
        console.log("in onScroll and elem.scrollY: " + elem.scrollHeight)
      if (elem.scrollY == 0){
        renewMySessions();
      }



    const scrollY = elem.scrollY //Don't get confused by what's scrolling - It's not the window
    const scrollTop = mySessionsScrollRef.current.scrollTop;
    console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`)
    setSessionsScrollTop(scrollTop);*/
  }


function doSomething (e) {
  alert("did this")
  if (hasMounted==true){
      console.log("my style.top: " + document.querySelector('#SessionsInnerContainer').style.top);

      /*if (document.querySelector('#SessionsContainer').style.top >= (scrollTop+30) + 'px')
      {
        //oldPageYOffset = document.querySelector('#SessionsContainer').offsetTop;
        console.log("at bottom of page");
      }*/
  }
};
const save = memo(({ mySessionsBackup })=>{setMySessionsBackup(sessions)})

const DoNothing = (e) => {
 
    //setSearchSessionsValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
  
}

const SearchSessionsHandleKeyDown = async (e) => {
  //if (e.keyCode >= 96 && e.keyCode <= 105){
    //setTextValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
    //if (e.which !== 0 &&
      //!e.ctrlKey && !e.metaKey && !e.altKey && e.shiftKey){
    /*
        setTextValue({value: e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode)}, function () {
          console.log("new textValue:" + textValue + ":");
        })
        */

    //}
              console.log("got into keydown: " + e.target.value + "key and keycode:" + e.key + ":" + e.keyCode);
              console.log(e);
              //if ((e.key === 'Enter' || e.keyCode === 13)) {
                
                    console.log("e.target.value:" + e.target.value + ":")
                    console.log("fromCharCode:" + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode) + ":")
                    
                    /*setTextValue((state) => {
                      //console.log(state); // "React is awesome!"
                      const newState = e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode);
                      return newState;
                    });*/
          //var objDiv = document.getElementById("Messages_Container");
      //objDiv.scrollTop = objDiv.scrollHeight;
      //setTextValue("");
        //}
    //}
    //else {
      //setSearchTextValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
    //}
  }

  function handleChange(event) {
      
      setTextValue(event.target.value);
      setSessionsAjaxHasJustBeenSet(true);
    
  }

  const AjaxSearchResult = ({session, children }) => {
    const [hovered, eventHandlers] = useHover();
    const [hovered2, eventHandlers2] = useHover();
    const [hovered3, eventHandlers3] = useHover();
    //console.log("props are: " + _id);
    {console.log("in ajaxsearchresult ")}
    return (
        <>
      <div class = "OneSessionAjax" {...eventHandlers} style={{background: hovered ? '#1aa3ff' : 'white'}}
      onClick = {() => loadChatFromSessionID(session)}>
                    
                    {session.title}
                    {children}
                    
        </div>
                    
                    {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
        </>

    )
  }

  const AjaxSearchResultMessages = ({message, children }) => {
    const [hovered, eventHandlers] = useHover();
    const [hovered2, eventHandlers2] = useHover();
    const [hovered3, eventHandlers3] = useHover();
    //console.log("props are: " + _id);
    {console.log("on entry in ajaxsearchresult messages: " + JSON.stringify(message))}
    return (
        <>
      <div class = "OneSessionAjax" {...eventHandlers} style={{background: hovered ? '#1aa3ff' : 'white'}}
      onClick = {() => loadChatFromChatMessage(message)}>
                    
                    Sent by {message.sender_firstName + " " + message.sender_lastName}
                    {children}
                    
        </div>
                    
                    {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
        </>

    )
  }

  function loadChatFromSessionID(session)  {
    console.log("in loadChatFromSessionID function and sessionID is " + session._id)

    props.onChangeChatWindow(session)
          
}

function loadChatFromChatMessage(message) {
  props.onChangeChatWindowFromMessageAjax(message)
}


  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //alert("You clicked outside of me!");
          setSessionsAjax(false);
          setSearchResultMessagesAjax(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  /**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
  
    return <div ref={wrapperRef}>{props.children}</div>;
  }

const onSelectChange = (e) => {
    //setMySelectValue(e.target.value);
    console.log("e.target.value: " + e.target.value);
    /*setMySelectValue(e.target.value,() => {
      console.log("in callback for setState");
      //return {value:e.target.value};
    })
*/
    var stateObject = mySelectValue;

    //Make any necessary changes to the object:
    
    stateObject.value = e.target.value;
    
    //and then set the state like this:
    
    setMySelectValue(stateObject);




    /*setMySelectValue({mySelectValue}, () => {
      return e.target.value;
    });*/
    if (e.target.value == "In Archived Sessions"){
        loadArchivedSessions();
    }
    else {
        loadMyChatSessions();
    }
}



return (
  
    <div id = "SessionsContainer">{() => save}
        <div id = "SessionsHeader">
            Chat Sessions
            <div id = "SearchSessionsContainer">
                  
                  <div id = "SearchSessionsInfoContainer">
                        <img id = "SearchSessionsMagnifyingGlass" src = {magnifyingglass} />
                        <textarea id = "SearchSessionsInput" value = {textValue} onChange = {handleChange} onKeyDown = {(e) => SearchSessionsHandleKeyDown(e)}  rows={1} placeholder="" /> {/*onChange={DoNothing} value = {searchSessionsValue}*/}
                        <select id = "SearchSessionsSelect" onChange={onSelectChange} value={mySelectValue.value} ref = {mySelectRef}> 
                            <option selected value="In Title Only">In Title Only</option>
                            <option value="In Chat Body">In Chat Body</option>
                            <option value="In Archived Sessions">In Archived Sessions</option>
                        </select>
                  </div>
                  <OutsideAlerter>
                                {
                                    sessionsAjax && [...Object.values(sessionsAjax)] //makes mappable
                                    //.sort((a, b) => a.time - b.time)
                                    .map((oneSessionAjax, index) => (
                                        <>
                                        {console.log("oneSessionAjax: " + JSON.stringify(oneSessionAjax))}
                                            <AjaxSearchResult session = {oneSessionAjax} />
                                             
                                    
                                        </>
                                    ))}

                                {
                                    searchResultMessagesAjax && [...Object.values(searchResultMessagesAjax)] //makes mappable
                                    //.sort((a, b) => a.time - b.time)
                                    .map((oneMessageAjax, index) => (
                                        <>


                                    <AjaxSearchResultMessages message = {oneMessageAjax} />

                                    </>
                                    ))  

                                }
                  </OutsideAlerter>
            
            
            
            </div>
        </div>
        <div id = "SessionsInnerContainer"  style = {{overflow:"scroll"}} >
            {[...Object.values(sessions)] //makes mappable
                              //.sort((a, b) => a.time - b.time)
                              .map((session, index) => (
                                    ((!session.archiveUserIDList.includes(user._id) && !haveILoadedArchivedSessions) 
                                    ||(session.archiveUserIDList.includes(user._id) && haveILoadedArchivedSessions)) &&
                                            <SessionHoverContainer>
                                            <div className = "OneSession" onClick = {() => handleOnClick(session,index)} style = {{background: index == selectedSessionIndex ? "#ffccb3":""}}>
                                                  <div className = "ImgDiv"><img class = "ImgClass" onLoad={setHasRendered} src = {session.userInfo[0].id == user._id? session.userInfo[1].profilePicture : session.userInfo[0].profilePicture} /></div>
                                                  <div className = "HeaderText">

                                                          {session.title == "" ? [...Object.values(session.userInfo)].map((OneUser, index) =>
                                                                  (<>{OneUser.id != user._id? OneUser.firstName + " " + OneUser.lastName: ""} {index == session.userInfo.length - 1? "" : ","}
                                                                    {console.log("one user : " + OneUser.firstName + OneUser.lastName)}</>
                                                                  )
                                                                  
                                                                  
                                                                  
                                                          
                                                          ): session.title}
                                                  </div>
                                                  <span className = "LastMessage">
                                                          {session.lastmessage}
                                                  </span>
                                                  <span className = "LastMessageTime">
                                                  <ReactTimeAgo date={session.lastupdated} locale="en-US"/>
                                                  </span>
                                                  {session.hasNotBeenRead == true && <div className = "BlueDot"></div>}
                                                  <EllipsesHoverContainer session = {session}>
                                                          <img src = {ellipses} className = "MyEllipses"/>
                                                  </EllipsesHoverContainer>
                                            
                                            </div>
                                            </SessionHoverContainer>
            ))}
          </div>
        
    </div>

   

)

});

export default ExplorerChatSessions;

