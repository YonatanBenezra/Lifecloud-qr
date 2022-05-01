

import React, {Component, useReducer} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useParams, useEffect } from "react";
import axios from 'axios';
import './bootstrap.min.css';
import './bootstrapchatstyle.css';
import './explorerchatwindow.css';
import './fonts.css';
import * as utils from './serverold.js'; 
import cancel from './cancel.png';

import {TextInput} from 'react-native';

//import Messages from './Messages';
import {socket} from "./socket.js";
import io from 'socket.io-client';
import { getAdditionalUserInfo } from 'firebase/auth';
import { textAlign } from '@mui/system';
//import TimeAgo from './TimeAgo';
import ReactTimeAgo from 'react-time-ago'

require('console-polyfill')

const { forwardRef, useRef, useImperativeHandle } = React;

const ChatWindow = forwardRef((props, ref) => {
const [connected, setConnected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSocketed, setIsSocketed] = useState(false);
  const [myOldestIDSoFar, setMyOldestIDSoFar] = useState("");
  const [myNewestIDSoFar, setMyNewestIDSoFar] = useState("");
  const [haveDoneAlready, setHaveDoneAlready] = useState(false);
  const myFormerTopElementRef = useRef(null)
  const [lastChatMessageScrambled, setLastChatMessageScrambled] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [doWeHaveAListenerYet, setDoWeHaveAListenerYet] = useState(true);
  //const [socket, setSocket] = useState(null);
  const [userAdded, setUserAdded] = useState(false);
  const [recipientFirstNames, setRecipientFirstNames] = useState(false);
  const [recipientLastNames, setRecipientLastNames] = useState(false);
  const [haveWeJustAddedOldMessages, setHaveWeJustAddedOldMessages] = useState(false);
  const [haveWeJustAddedNewMessages, setHaveWeJustAddedNewMessages] = useState(false);
  const [hasLoadedFetchedMessages, setHasLoadedFetchedMessages] = useState(false);
  //const [fetchedMessages, setFetchedMessages] = useState("");
  const [mySessionHasLoaded, setMySessionHasLoaded] = useState(false);
  const [number, setNumber] = useState(1);
  const [mySetMessagesNewestTime, setMySetMessagesNewestTime] = useState(Date.now());
  const [mySocket, setMySocket] = useState(null);
  const [scrollTopIncrementCount, setScrollTopIncrementCount] = useState(0);
  const [scrollBottomIncrementCount, setScrollBottomIncrementCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [messageCounter, setMessageCounter] = useState(0);

  const fetch = require('node-fetch');

  const [sessionID, setSessionID] = useState("");

  const [recipientIDs, setRecipientIDs] = useState([]);

  const { user } = useContext(AuthContext);
  
  const [myUserArray, setMyUserArray] = useState(props.userarray);

  const [myUsersInfo, setMyUsersInfo] = useState([]);

  const [mySession, setMySession] = useState([]);

  const [oldestTime, setOldestTime] = useState([]);

  const [needToLoadChatMessages, setNeedToLoadChatMessages] = useState(false);

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);


  function getExistingMessages() {
    return messages;
  }


  useImperativeHandle(ref, () => ({

        

        async addRecipientID(id, firstName, lastName, profilePicture){
          console.log("entered addRecipientID")
          const res = await 
          axios.post(`${process.env.REACT_APP_API_URL}/api/profile/addUserToChatSession/`, {
              "userid": id,
              "chatsessionid": mySession._id,
              "firstName": firstName,
              "lastName": lastName,
              "profilePicture": profilePicture
          })

          

          

          .then(function (response) {
            console.log("entered add response")
            const thisSession = mySession;
            const existing = thisSession.users;
            const newArray = [...existing, id];
            //setRecipientIDs(newArray);
            thisSession.users = newArray;
            const existingInfo = thisSession.userInfo;
            const newElement = {
              id: id,
              firstName: firstName,
              lastName: lastName,
              profilePicture: profilePicture
            }
            const newArray2 = [...existingInfo, newElement];
            thisSession.userInfo = newArray2;
            setMySession(thisSession);

            console.log ("just set new session in add recipient id");
            props.refreshSessionWindow();

            {forceUpdate()}
            
            /*const res2 = axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getChatSessionWithID/`, {
            
              "chatsessionid": mySession[0]._id
              
            }).then(function (response) {
              
            });*/
          });


          
        },


        async loadChatFromAjaxMessage(session, message) {
            console.log("got into loadChatFromAjaxMessage" + JSON.stringify(message) + JSON.stringify(session))
          
            //setMessages([]);
          
            setMessages({messages}, () => {
              const a = [];
              return a;
            });


            setMySetMessagesNewestTime(0);
          
          
          //console.log("in loadChatFromSessionID " + session._id)
          //console.log("session setting: " + JSON.stringify(session))
          //console.log("messages now are: " + JSON.stringify(messages));
          //setMessages([]);
          
          //var array = session.users;
          //var index = array.indexOf(user._id); // Let's say it's Bob.
          //delete array[index];

          //setRecipientIDs([...array]);
          setMySession(session);
          setDoWeHaveAListenerYet(false);
          //console.log("in load chat from session id and session:" + JSON.stringify(session));
          ///maybe this!!! setNeedToLoadChatMessages(true);
          getChatMessagesFromCustomMessageFromSessionID(session, message);
          //setScrollTopIncrementCount(1);
        },

        async loadChatFromSessionID(session){
          
          setMySetMessagesNewestTime(0);
          console.log("in loadChatFromSessionID " + session._id)
          console.log("session setting: " + JSON.stringify(session))
          //console.log("messages now are: " + JSON.stringify(messages));
          //setMessages([]);
          
          //var array = session.users;
          //var index = array.indexOf(user._id); // Let's say it's Bob.
          //delete array[index];

          //setRecipientIDs([...array]);
          setMySession(session);
          setDoWeHaveAListenerYet(false);
          //console.log("in load chat from session id and session:" + JSON.stringify(session));
          setNeedToLoadChatMessages(true);
          getChatMessagesFromSessionID(session);
          setScrollTopIncrementCount(1);
        },
      
        async loadChatFromUserID(userID, firstName, lastName, profilePicture){
          setScrollTopIncrementCount(1);
          console.log("messages now are: " + JSON.stringify(messages));
          //setMessages([]);
          //if(!haveDoneAlready){
            //setHaveDoneAlready(false);
          
            socket.removeAllListeners("add-message").once('add-message', acceptChatMessage);
            //off('add-message', acceptChatMessage)
        //}
            console.log("user object: " + JSON.stringify(user));
            console.log("myID: " + user._id);


            
            /*
            const res = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessionsInfo/`, {
                    //"hisID": userID,
                    
                    //"myID": user._id
                    
                  })
                  .then(function (response) {
                        console.log("all sessions: " + JSON.stringify(response));
                  });

                


          console.log("line 125 other user id is: " + userID);
          console.log("line 126 my user id is: " + user._id);
          
          /*const res2 = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/deleteAllSessions/`, {
                    //"hisID": userID,
                    
                    //"myID": user._id
                    
                  })
                  .then(function (response) {
                        console.log("delete all sessions: " + response);
                  });

                  const res3 = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/deleteAllChatMessages/`, {
                    //"hisID": userID,
                    
                    //"myID": user._id
                    
                  })
                  .then(function (response) {
                        console.log("delete all sessions: " + response);
                  });
               
*/
                

          //console.log(JSON.stringify(user));
          console.log("got into loadChatFromUserID");
          //setRecipientIDs([userID]);
          //setRecipientFirstNames([firstName]);
          //setRecipientLastNames([lastName]);
          try {
      
              //console.log(JSON.stringify(user));
      
              //console.log("finalstring:" + FinalString());
      
              //const myArray= FinalString();//"1234,5678"//FinalString();
              console.log("his ID: " + userID + firstName + lastName);
              //async function fetchAllChatMessages()  {
                  const res = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatMessagesFromPairOfUserIDs/`, {
                    "hisID": userID,
                    "hisFirstName": firstName,
                    "hisLastName": lastName,
                    "myID": user._id,
                    "myFirstName": user.firstName,
                    "myLastName": user.lastName,
                    "myProfilePicture": user.mainProfilePicture,
                    "hisProfilePicture": profilePicture

                  })
                  .then(function (response) {
                      console.log("response.data session model:" + JSON.stringify(response.data.sessionModel));
                        //const newObj = [response.data.sessionModel];
                        setMySession(response.data.sessionModel);//was json.parse
                        //console.log("session is " + JSON.stringify(mySession))
                        console.log("loading from chat response: " + JSON.stringify(response.data.chatResponse));
                        //console.log("before:" + response);
                        //console.log("now here: " + JSON.stringify(response.data));
                        setHasLoadedFetchedMessages(true);
                        //const newArray2 = [...response.data.chatResponse];//try json.stringify
                        
                        const myChatResponseArray = [...response.data.chatResponse].reverse();

                        //const newArray = [...response.data.chatResponse];
                        setMessages(myChatResponseArray);
                        //const newArray = [...response.data.chatResponse];
                        //setMessages(newArray);


                        
                        setMySessionHasLoaded(true);
                        
                        props.setLoadedPrivateSession(response.data.sessionModel);

                        

                        console.log("line 170: messages: " + messages + JSON.stringify(messages));

                        
                          //res.data.googleLocation = JSON.parse(res.data.googleLocation);
                         // setProfileData(res.data);
                        //};
                        //setMessages([...response.data]);
                        //console.log("messages.length: " + messages.length);
                        var objDiv = document.getElementById("Messages_Container");
                        objDiv.scrollTop = objDiv.scrollHeight;
                    
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
    

  }));

  function acceptChatMessage(data){
    console.log("entered accept chat messages messages now are: " + JSON.stringify(messages));
    //socket.removeAllListeners("add-message").once('add-message', acceptChatMessage);
    //console.log("into add-message " + lastChatMessageScrambled + "data:" + data.scrambled);

/*
        var lastScrambled = lastChatMessageScrambled;
            //if(data.scrambled != lastScrambled) {
              setLastChatMessageScrambled(data.scrambled);


              setLastChatMessageScrambled((prevValue) => {
                
                return data.scrambled;
              });
              */
      if(mySession.users.indexOf(data.sender_user_id) > -1){

              var chat_session_id = data.chat_session_id;
              var sender_user_id = data.sender_user_id;
              //var recipient_ids = data.recipient_ids;
              var myMessage = data.message;
              var sender_firstName = data.sender_firstName;
              var sender_lastName = data.sender_lastName;
              var sender_profile_src = data.sender_profile_src;
              const myDataArray = 
              {
                

                  "chat_session_id":chat_session_id,
                  "sender_user_id":sender_user_id,
                  "message":myMessage,
                  "timeofmessage":Date.now,
                  "sender_firstName":sender_firstName,
                  "sender_lastName":sender_lastName,
                  "sender_profile_src":sender_profile_src
                  
                  
              }

            console.log(JSON.stringify(messages));
            //const newArray = [...messages, myDataArray];
            //setMessages(newArray);
            console.log("my messages:" + JSON.stringify(messages));

          /*
            const newElement = [myDataArray];//try json.stringify
            const newArray = [...messages, ...newElement];
            setMessages(newArray);
              */

            //ERASE ALL PREV MESSAGES ON RECIEVER: setMessages([...messages,{...myDataArray}])

            setMessages((prevMessages) => {
              const newMessages = [...prevMessages, myDataArray];
              //const myLength = newMessages.length;
              //console.log("newMessages.length: " + myLength);
             // newMessages[myLength] = myDataArray;
              return newMessages;
            });

            

            socket.removeAllListeners("add-message").once('add-message', acceptChatMessage);

            var objDiv = document.getElementById("CEMessages_Container");
              objDiv.scrollTop = objDiv.scrollHeight;
              /*setMessages((prevMessages) => {
                prevMessages.push({...myDataArray})
                return prevMessages;
              })*/
           /* setMessages((prevMessages) => {
              const newMessages = prevMessages;//{...prevMessages};
              const myLength = newMessages.length;
              //console.log("newMessages.length: " + myLength);
              newMessages[myLength] = myDataArray;
              console.log("new messages: " + JSON.stringify(newMessages));
              return newMessages;
            });*/
//end add message
          //}

      }
  }
  
/*
  function messageListener(data) {
    const message = data.message;
    console.log("entered messagelistener2: " + JSON.stringify(data));
          //if(isMounted){
              console.log("entered messagelistener: " + JSON.stringify(data));

              const myMessages = messages;//getExistingMessages();
              
              var myLength = myMessages.length;//Object.keys(myMessages).length;
              if (myLength == undefined) {
                myLength = 0;
                console.log("length was undefined");
              }
              console.log("length: " + myLength);

              var chat_session_id = data.chat_session_id;
              var sender_user_id = data.sender_user_id;
              
              var myMessage = data.message;
              var sender_firstName = data.sender_firstName;
              var sender_lastName = data.sender_lastName;
              var sender_profile_src = data.sender_profile_src;

              const myDataArray = 
                {
                   

                    "chat_session_id":chat_session_id,
                    "sender_user_id":sender_user_id,
                    "message":myMessage,
                    "timeofmessage":Date.now,
                    "sender_firstName":sender_firstName,
                    "sender_lastName":sender_lastName,
                    "sender_profile_src":sender_profile_src
                }
            

              //const newArray = [...messages, ...myDataArray];
              //setMessages(newArray);
              setMessages([...messages],{...myDataArray})
              /*setMessages((prevMessages) => {
                prevMessages.push({...myDataArray})
                return prevMessages;
              })*/
                //const newMessages = {...messages};
                //const thisLength = newMessages.length;
                //console.log("newMessages.length: " + myLength);
                //newMessages[thisLength] = {...myDataArray};
                //setMessages(newMessages);
                //return newMessages;
              //});
/*
              var objDiv = document.getElementById("Messages_Container");
              objDiv.scrollTop = objDiv.scrollHeight;
              //myMessages[myLength] = message;
              console.log("pay attention: " + messages);/*

              //var objDiv = document.getElementById("Messages_Container");
              //objDiv.scrollTop = objDiv.scrollHeight;
              //myMessages[myLength] = message;
              //console.log("pay attention: " + messages);/*
            /* setMessages([...myMessages]);
            
                console.log("myMessages: " + JSON.stringify(messages));
                
        //  }
  };*/

  const deleteMessageListener = (messageID) => {
    setMessages((prevMessages) => {
      const newMessages = {...prevMessages};
      delete newMessages[messageID];
      return newMessages;
    });
  };

  const handleScroll = async(e) => {
    console.log("got into handlescroll")
    const currentScrollY = e.target.scrollTop;
    if(currentScrollY == 0){
    //if(window.pageYOffset === 0) {
      console.log("got into handlescroll at top")
      renewTopChatMessagesFromSessionID(mySession);
    }

    if(e.scrollHeight - e.scrollTop === e.clientHeight) {
      //if(window.pageYOffset === 0) {
        console.log("got into handlescroll at bottom")
        renewBottomChatMessagesFromSessionID(mySession);
      }

  }
  
  async function renewTopChatMessagesFromSessionID(session){
    try {
      console.log("oldesttime: " + JSON.stringify(oldestTime));
  //console.log(JSON.stringify(user));

  //console.log("finalstring:" + FinalString());

  //const myArray= FinalString();//"1234,5678"//FinalString();

  //async function fetchAllChatMessages()  {
      const res = await 
      axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getTopMoreAllChatMessagesFromSessionID/`, {
        "sessionID": mySession._id,
        "myOldestIDSoFar":myOldestIDSoFar
        //"time": mySetMessagesNewestTime,
        //"scrollTopIncrementCount":scrollTopIncrementCount
      })
      .then(function (response) {
        //console.log("before:" + response);
        //console.log("now here: " + JSON.stringify(response.data));
        //setHasLoadedFetchedMessages(true);
        //console.log("now messages are: " + JSON.stringify(response.data));
        var newArray = [...response.data];
        newArray = newArray.reverse();
        //const temp = response.data;
        console.log("here we go renew2: " + JSON.stringify(response));
        //if(temp[0].timeofmessage){
        //  setOldestTime(temp[12].timeofmessage);
        //}
        if(newArray[0]._id){
          setMyOldestIDSoFar(newArray[0]._id)
        }
        console.log("now messages are about to be set: " + JSON.stringify(response.data))
        setScrollTopIncrementCount(scrollTopIncrementCount + 1);
        setMessages([...newArray,...messages]);
        setMySessionHasLoaded(true);
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

async function renewBottomChatMessagesFromSessionID(session){
  try {
    console.log("newesttime: " + JSON.stringify(oldestTime));
//console.log(JSON.stringify(user));

//console.log("finalstring:" + FinalString());

//const myArray= FinalString();//"1234,5678"//FinalString();

//async function fetchAllChatMessages()  {
    const res = await 
    axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getBottomMoreAllChatMessagesFromSessionID/`, {
      "sessionID": mySession._id,
      "myNewestIDSoFar":myNewestIDSoFar
      //"time": mySetMessagesNewestTime,
      //"scrollTopIncrementCount":scrollTopIncrementCount
    })
    .then(function (response) {
      //console.log("before:" + response);
      //console.log("now here: " + JSON.stringify(response.data));
      //setHasLoadedFetchedMessages(true);
      //console.log("now messages are: " + JSON.stringify(response.data));
      var newArray = [...response.data];
      //newArray = newArray.reverse();//delete this?
      //const temp = response.data;
      console.log("here we go renew2: " + JSON.stringify(response));
      //if(temp[0].timeofmessage){
      //  setOldestTime(temp[12].timeofmessage);
      //}
      if(newArray[newArray.length - 1]._id){
        setMyNewestIDSoFar(newArray[newArray.length - 1]._id)
      }
      console.log("now messages are about to be set: " + JSON.stringify(response.data))
      setScrollBottomIncrementCount(scrollBottomIncrementCount + 1);
      setMessages([...messages,...newArray]);
      setMySessionHasLoaded(true);
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

  async function getChatMessagesFromSessionID(session){

            console.log("in getChatMessagesFromSessionID and session id is " +session._id)

              try {
              
            //console.log(JSON.stringify(user));

            //console.log("finalstring:" + FinalString());

            //const myArray= FinalString();//"1234,5678"//FinalString();

            //async function fetchAllChatMessages()  {
                //const myTime = Date.now();
                //set(myTime);
                //console.log("oldesttime: " + JSON.stringify(myTime))

                const res = await 
                axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatMessagesFromSessionID/`, {
                  "sessionID": mySession._id
                  
                  //"time": null,
                  //"scrollTopIncrementCount": scrollTopIncrementCount
                })
                .then(function (response) {
                  //console.log("before:" + response);
                  //console.log("now here: " + JSON.stringify(response.data));
                  //setHasLoadedFetchedMessages(true);
                  //console.log("now messages are: " + JSON.stringify(response.data));
                  var newArray = [...response.data];

                  newArray = newArray.reverse();

                  console.log("now messages are about to be set: " + JSON.stringify(response.data))
                  setMessages(newArray);
                  //setHaveWeJustAddedOldMessages(true);
                  //setScrollTopIncrementCount(scrollTopIncrementCount + 1);
                  
                  //if(response.data != ""){
                  if (newArray.length){
                    console.log("new oldest id is: " + newArray[0]._id + JSON.stringify(newArray));
                    setMyOldestIDSoFar(newArray[0]._id)
                  }
                  //}
                  //const temp = response.data;
                  console.log("here we go: " + JSON.stringify(newArray));
                  //setOldestTime(newArray[12].timeofmessage);
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

  useEffect(() => {


    

    if (haveWeJustAddedOldMessages == true){
      setHaveWeJustAddedOldMessages(false);
      //var objDiv = document.getElementById("CEMessages_Container");
      //objDiv.scrollTop = objDiv.scrollHeight;
      myFormerTopElementRef.current.scrollIntoView()  
    }
/*
    if (haveWeJustAddedNewMessages == true){
      setHaveWeJustAddedNewMessages(false);
      //var objDiv = document.getElementById("CEMessages_Container");
      //objDiv.scrollTop = objDiv.scrollHeight;
      myFormerElementRef.current.scrollIntoView()  
    }
*/
    console.log("in useeffect messages are: " + messages);

    if(doWeHaveAListenerYet==false){
            setDoWeHaveAListenerYet(true);
            socket.removeAllListeners("add-message").once('add-message', acceptChatMessage);
    }

    if(needToLoadChatMessages == true) {
      setNeedToLoadChatMessages(false);
      getChatMessagesFromSessionID(mySession);
    }



    //let isMounted = true;
    //setIsMounted(true);
    const eventHandler = () => setConnected(true);
    console.log ("entered useEffect 1");
        
    //(async () => {
      //if (!isSocketed) {
            //const tempSocket = io(`http://localhost:3000`);
            //setIsSocketed(true);
            /*return () => {
              socket.emit("disconnect");
            };*/
            
            //socket.on("connect", () => {
              //mySocket.on('add-message', messageListener());
/*
              mySocket.on('add-message', function (data) {
                console.log("entered add-message listener messages: " + JSON.stringify(messages));
                messageListener(data);
              });
      */          
                                //console.log("isConnected = " + isConnected);
                          //if (!isConnected) {
                            
                                //((data) => {
                                  //messageListener(data);
                                  //setChat(prev => [...prev, data]);
                                  


                                socket.on('deleteMessage', deleteMessageListener);
                                //socket.emit('getMessages');
                                socket.emit("add-user", {
                                  "id": user._id//.user.
                                });
                                //setUserAdded(true);
                                //setIsConnected(true);
                            
                              //setIsConnected(true);
                              //setMySocket(tempSocket);
                 // });
                
         
          //})();
    /*
    if (!hasLoadedFetchedMessages){
            try {

              console.log(JSON.stringify(user));

              console.log("finalstring:" + FinalString());

              const myArray= FinalString();//"1234,5678"//FinalString();

              async function fetchAllChatMessages()  {
                  const res = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatMessages/`, {
                    "myArray": JSON.stringify(myArray)
                  })
                  .then(function (response) {
                    console.log("before:" + response);
                    console.log("now here: " + JSON.stringify(response.data));
                    setHasLoadedFetchedMessages(true);
                    const newArray = [...messages, ...response.data];
                    setMessages(newArray);

                    //setMessages([...response.data]);
                    console.log("messages.length: " + messages.length);
                    var objDiv = document.getElementById("Messages_Container");
                    objDiv.scrollTop = objDiv.scrollHeight;
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                  
              }
              fetchAllChatMessages();
              

            } catch (err) {
              console.log(JSON.stringify(err));
              //setMessage('Something went wrong!');
              //setOpen(true);
            }
    }

       */
    const script3 = document.createElement("script");
    script3.src = "./bootstrap.bundle.min.js";
    script3.async = true;
    document.body.appendChild(script3);

    const script4 = document.createElement("script");
    script4.src = "./jquery.min.js";
    script4.async = true;
    document.body.appendChild(script4);
/*
    const addUser = () => {
      socket.emit("add-user", {
        "id": user._id//.user.
      });
      setUserAdded(true);
    }*/
    //return () => newSocket.close();
    //return () => { isMounted = false };
    //setIsMounted(false);
   // return function cleanup() {mySocket.off('add-message')}
  }, [setIsConnected, setLastChatMessageScrambled, lastChatMessageScrambled, messages, setMessages, setMySocket, mySocket, isConnected, isSocketed, setIsSocketed]);
  


  const [chatData, setChatData] = useState([]);


  const [textValue, setTextValue] = useState("");

    
  const FinalString = () => {
      
   
      let myID = user._id;
    
      //let friendID = useParams().id;
      const tempArray = mySession.users;
      const newArray = [...tempArray, myID];
      newArray.sort();
    
      return newArray;
    
   
  }

  function getChatMessagesFromCustomMessageFromSessionID(session, message){
    //set oldest id equal to message id  
    setMyOldestIDSoFar(message._id);
    //Load chat message and all messages after that date
    const res = 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getChatMessagesNewerThanOneMessage/`, {
                    "message":message
                    //"session":session
                  })
                  .then(function (response) {
                        console.log("response for 753: " + JSON.stringify(response, null, 2))
                        setHasLoadedFetchedMessages(true);
                        //const newArray2 = [...response.data.chatResponse];//try json.stringify
                        const newArray = [...response.data.response1, ...response.data.response2];
                        
                        console.log("new messages are: " + JSON.stringify(newArray))

                        

                        setMessages(newArray);

                        //setMessages((messages) => {
                          
                          
                          //return newArray;
                        //});

                        console.log("current session is: " + JSON.stringify(mySession._id))
                        
                        setMySessionHasLoaded(true);
                        
                    


                        console.log("line 170: messages: " + messages + JSON.stringify(messages));

                        
                          //res.data.googleLocation = JSON.parse(res.data.googleLocation);
                         // setProfileData(res.data);
                        //};
                        //setMessages([...response.data]);
                        //console.log("messages.length: " + messages.length);
//HERE:
                        //var objDiv = document.getElementById("CEMessages_Container");
                        //objDiv.scrollTop = objDiv.scrollHeight;
                        var element = document.getElementById("Message" + message._id);

                        element.scrollIntoView();


                        //scroll to Message1
                        //automatically scrolls to top
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
  }


  const HandleKeyDown = async (e) => {
    
    console.log("got into keydown: " + e.target.value + "key and keycode:" + e.key + ":" + e.keyCode);
    console.log(e);
    if ((e.key === 'Enter' || e.keyCode === 13)) {
      var message = e.target.value;
      console.log("got into if");
      console.log("user" + JSON.stringify(user));
/*
      if (!userAdded){
        //const addUser = () => {
          socket.emit("add-user", {
            "id": user._id//.user.
           });
      
        //}
        setUserAdded(true);
      }
*/
      //const myIDs = ["622b541ffa9ae732dcd40bb5","622b54c2fa9ae732dcd40bc4"]

      //console.log("1" + mySession);
      //console.log("2" + JSON.stringify(mySession[0]));

      var chat_session_id = mySession._id;
      var sender_user_id = user._id;
      var recipient_ids = mySession.users;

      var scrambled = makeID(20);

      console.log("rec ids " + JSON.stringify(recipient_ids))
      
      socket.emit("message", {
        "chat_session_id":chat_session_id,
        "sender_user_id":sender_user_id,
        "sender_firstName": user.firstName,
        "sender_lastName": user.lastName,
        "recipient_ids":recipient_ids,
        "scrambled":scrambled,
        "message":message,
        "sender_profile_src": user.mainProfilePicture,
        "timeofmessage":Date.now
        

       });
       socket.removeAllListeners("add-message").once('add-message', acceptChatMessage);
       /*,withTimeout(() => {
        console.log("success!" + number);
        setNumber(number + 1);
      }, () => {
        console.log("timeout!");
      }, 1000));*/

      try {
            const formdata = new FormData();

            console.log("mySession: " + JSON.stringify(mySession));
            
            formdata.append('message', message);
            formdata.append('sessionid', mySession._id);
            formdata.append('senderid', user._id);
            formdata.append('senderfirstname', user.firstName);
            formdata.append('senderlastname', user.lastName);
            formdata.append('senderprofilesrc', user.mainProfilePicture);
            
            console.log('formdata: ' + JSON.stringify(formdata));

            for (var key of formdata.entries()) {
              console.log("one row of formdata: " + key[0] + ', ' + key[1]);
            }

            var object = {};
            formdata.forEach(function(value, key){
                object[key] = value;
            });
            var json = JSON.stringify(object);
            console.log("myjson: " + json)



              const res = await 
              axios.post(`${process.env.REACT_APP_API_URL}/api/profile/saveChatMessageFromSessionID/`, {
                "info": json
              })
              .then(function (response) {
                console.log("before:" + response);
                console.log("now here: " + JSON.stringify(response.data));
               
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

        //var objDiv = document.getElementById("Messages_Container");
        //objDiv.scrollTop = objDiv.scrollHeight;
        setTextValue("");
        
      }
      else {
        //setTextValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
        //setTextValue(e.target.value);
      }
    }
     
    
    const DoNothing = (event) => {
      setTextValue(event.target.value);
    }

    function makeID(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }
     return result;
  }

    const withTimeout = (onSuccess, onTimeout, timeout) => {
      let called = false;
    
      const timer = setTimeout(() => {
        if (called) return;
        called = true;
        onTimeout();
      }, timeout);
    
      return (...args) => {
        if (called) return;
        called = true;
        clearTimeout(timer);
        onSuccess.apply(this, args);
      }
    }
    /*const myUserInfo = (mySession) => {
      console.log("myUserInfo: " + JSON.stringify(mySession, null, 2));
          return 
        /**/
          
          
   

   const MyTitle = (mySession) => {
    
     if ( mySession !== undefined && mySession != {} && Object.keys(mySession).length && 
     mySession.title !== undefined) {
       if (mySession.title != ""){
          return mySession.title;
       }
       else{
         return "No title";
       }
     }
     else {
       return "No title";
     }
   }

    return (
        
              <div id = "CEChatContainer">
                    <div id = "CEChatWindowHeaderContainer">
                        <div id = "CEChatWindowTitleDiv">
                            {/*mySession.title != "" ? mySession.title : "No Title"*/}
                            {console.log("absolute session: " + JSON.stringify(mySession, null, 2))}
                        </div>
                        <div id = "CEChatWindowUsersDiv">

                            <span class = "CEChatWindowUsersDivHeaderText">Title:</span> &nbsp;
                            { 
                            
                            MyTitle(mySession)
                            
                            /*
                            mySession !== undefined && mySession != {} && Object.keys(mySession).length && 
                            mySession.title !== undefined ?
                            mySession.title
                            : "No title"
                            */
                            }
                            <br />
                            <span class = "CEChatWindowUsersDivHeaderText">Users:</span> &nbsp;
                            { /*[...Object.values(mySession.userInfo)] 
                                .map((user, index) => (
                                    user.firstName + " " + user.lastName + ", "
                                ))*/
                                //myUserInfo(mySession)
                                  
                                  mySession.userInfo &&
                                  [...Object.values(mySession.userInfo)].map((user) => 
                                  (<>{user.firstName} {user.lastName}, </>)

                                  )
                              
                              }
                            
                                
                                
                                
                        </div>
                    </div>
                    
                     
                      <div id = "CEMessages_Container" onScroll = {handleScroll}>
                        {messages.length == 0 && <>No messages in chat session</>}
                    { [...Object.values(messages)]//makes mappable //was [...Object.values(messages)]
                              //.sort((a, b) => a.time - b.time)
                              .map((message, index) => (
                                 
                                  
                                  message.sender_user_id != user._id
                                    ? (<><div class = "CEHisSpeech" ref={index==12?myFormerTopElementRef:null} id = {"Message"+message._id}>
                                              <img src={message.sender_profile_src} width={30} height={30} />
                                              <span class = "CEHisSpeechText">{message.message}</span>
                                              
                                       </div><br /><br /></>)
                                    
                                    
                                    : (<><div class = "CEMySpeech" ref={index==12?myFormerTopElementRef:null}id = {"Message"+message._id}>
                                              
                                              <span class = "CEMySpeechText">{message.message}</span>
                                            
                                       </div><br /><br /></>)
                                  ))
                              }
                           </div>   
                                  
                    <textarea id = "CEChat_Input" value= {textValue}  onChange={DoNothing} onKeyPress = {HandleKeyDown}  rows={5} placeholder="Type your message" />
                      
                    
              </div>

      
    )
      
        
  });

export default ChatWindow;


