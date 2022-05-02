

import React, {Component, useReducer} from 'react';
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
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

      async function renewMySessions(){
        if (haveIDoneSkipCount[skipCount] == true){
          return;
        }
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
           
            var newArray = [...response.data];
            
            console.log("in renew and existing sessions are " + JSON.stringify(sessions));
            console.log("in renew and new sessions are " + JSON.stringify(newArray));
            console.log("here we go renew2: " + JSON.stringify(response));
            
            if(newArray.length > 0 && newArray[newArray.length - 1]._id){
              setBottomMostSessionID(newArray[newArray.length - 1]._id)
            }
            setSkipCount(skipCount + 1)
            console.log("now sessions are about to be set: " + JSON.stringify(response.data))
            
            setSessions((previousSessions) => [...previousSessions,...newArray]);
          
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
        
     
          console.log("inside archive session");

            const res = 
            axios.post(`${process.env.REACT_APP_API_URL}/api/profile/archiveSession/`, {
                "sessionID": session._id,
                "userID": user._id
                
            })
            .then(function (response) {
              //loadMyChatSessions();

              console.log("my Chat Sessions:" + JSON.stringify(response.data));
              
              const newArray = [...response.data];
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
    
        console.log("inside unarchive session");

          const res = 
          axios.post(`${process.env.REACT_APP_API_URL}/api/profile/unarchiveSession/`, {
              "sessionID": session._id,
              "userID": user._id
              
          })
          .then(function (response) {
            //loadArchivedSessions();
            console.log("my Chat Sessions:" + JSON.stringify(response.data));
                            //console.log("People " + JSON.stringify(response.data[0].firstName));
                            
                            //const stringified = JSON.stringify(response.data);
                            const newArray = [...response.data];
                    
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


        console.log("in useEffect and sessions are: " + JSON.stringify(sessions, null, 2));
        if (sessionsAjaxHasJustBeenSet){
          
                if (textValue != ""){
                          
                          var message = textValue;
                          
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
                                           
                                            console.log("ajax response messagesajax: " + JSON.stringify(response.data, null, 2));
                                            setSearchResultMessagesAjax([...response.data]);
                                           
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
                                          
                                            console.log("ajax response: " + JSON.stringify(response.data));
                                            setSearchResultMessagesAjax([...response.data]);
                                           
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
            
           
        }
        console.log("useEffect sessions are: " + JSON.stringify(sessions));
        
        return () => {
            // Unbind the event listener on clean up
            //document.getElementById("SessionsContainer").removeEventListener('scroll', e => sessionsOnScroll(e));
            window.removeEventListener('scroll', sessionsOnScroll, true);
          };
        }, [setHasMounted, hasMounted, textValue]);
      

        const EllipsesHoverContainer = ({children, isLastElement, session}) => {
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



                                    
                                    <div className = {isLastElement? "LastMyElippsesHoverContainer":"MyElippsesHoverContainer"} style = {{display: hovered ? 'block' : 'none'}} >
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

                async setLoadedPrivateSession(session) {


                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/profile/setChatSessionLastUpdatedToNow/`, {
                    "chatsessionid": session._id,
                    
                })
            
                .then(function (response) {
                    //var myUrl = makeTextFile(JSON.stringify(response.data));
                 

                })
                .catch(function (error) {
                console.log(error);
                });





                  console.log("got inside setLoadedPrivateSession " + session._id)
                  session.lastupdated = Date.now();
                    const tempSessions = [...sessions];
                    const haveIUpdated = false;
                    setSelectedSessionIndex(0);
                    for (const i in tempSessions) {
                        if (tempSessions[i]._id == session._id){
                            tempSessions[i].lastupdated = Date.now();//do in db
                            /*const myData = tempSessions.sort(function(a, b) {
                              return (a.lastupdated > b.lastupdated) ? 1 : ((a.lastupdated < b.lastupdated) ? -1 : 0);
                            });*/
                            //[].concat(tempSessions)
                            //.sort((a, b) => a.lastupdated > b.lastupdated ? 1 : -1)
                            const forTopOfArray = tempSessions[i];
                            tempSessions.splice(i, 1);// 2nd parameter means remove one item only
                            //array.splice(i, 1); // 2nd parameter means remove one item only
                            setSessions([forTopOfArray,...tempSessions]);
                            //setSessions(myData);
                            haveIUpdated = true;
                            break;
                        }
                    }
                    if (!haveIUpdated){
                      const tempSessions = [...sessions];
                      const tempArray = [session,...tempSessions];
                      
                      setSessions(tempArray);
                    }
                      
                      {forceUpdate()}



                      



                },

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
                                
                            console.log("my Chat Sessions:" + JSON.stringify(response.data, null, 2));
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


  }


function doSomething (e) {
  alert("did this")
  if (hasMounted==true){
      console.log("my style.top: " + document.querySelector('#SessionsInnerContainer').style.top);

     
  }
};
const save = memo(({ mySessionsBackup })=>{setMySessionsBackup(sessions)})

const DoNothing = (e) => {
 
    //setSearchSessionsValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
  
}

const SearchSessionsHandleKeyDown = async (e) => {
 

    //}
              console.log("got into keydown: " + e.target.value + "key and keycode:" + e.key + ":" + e.keyCode);
              console.log(e);
              //if ((e.key === 'Enter' || e.keyCode === 13)) {
                
                    console.log("e.target.value:" + e.target.value + ":")
                    console.log("fromCharCode:" + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode) + ":")
                    
                    
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
        <div id = "SessionsPaddingContainer">
                <div id = "SessionsInnerContainer"  style = {{overflow:"scroll"}} >
                    {[...Object.values(sessions)] //makes mappable
                                      //.sort((a, b) => a.time - b.time)
                                      .map((session, index, sessions) => (
                                            ((!session.archiveUserIDList.includes(user._id) && !haveILoadedArchivedSessions) 
                                            ||(session.archiveUserIDList.includes(user._id) && haveILoadedArchivedSessions)) &&
                                                    <SessionHoverContainer>
                                                    <div className = "OneSession" onMouseDown = {() => handleOnClick(session,index)} style = {{background: index == selectedSessionIndex ? "#ffccb3":""}}>
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
                                                          <EllipsesHoverContainer isLastElement = {index + 1 == sessions.length ? true : false} session = {session}>
                                                                  <img src = {ellipses} className = "MyEllipses"/>
                                                          </EllipsesHoverContainer>
                                                         
                                                    </div>
                                                    </SessionHoverContainer>
                    ))}
                  </div>
          </div>
    </div>

   

)

});

export default ExplorerChatSessions;

