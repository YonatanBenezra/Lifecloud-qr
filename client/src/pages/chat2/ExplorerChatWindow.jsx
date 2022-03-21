

import React, {Component} from 'react';
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

import Messages from './Messages';
import {socket} from "./socket.js";
import io from 'socket.io-client';
import { getAdditionalUserInfo } from 'firebase/auth';
import { textAlign } from '@mui/system';
//import TimeAgo from './TimeAgo';
import ReactTimeAgo from 'react-time-ago'

require('console-polyfill')

const { forwardRef, useRef, useImperativeHandle } = React;

const ExplorerChatWindow = forwardRef((props, ref) => {
const [connected, setConnected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSocketed, setIsSocketed] = useState(false);
  const [haveDoneAlready, setHaveDoneAlready] = useState(false);

  const [lastChatMessageScrambled, setLastChatMessageScrambled] = useState(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [doWeHaveAListenerYet, setDoWeHaveAListenerYet] = useState(true);
  //const [socket, setSocket] = useState(null);
  const [userAdded, setUserAdded] = useState(false);
  const [recipientFirstNames, setRecipientFirstNames] = useState(false);
  const [recipientLastNames, setRecipientLastNames] = useState(false);

  const [hasLoadedFetchedMessages, setHasLoadedFetchedMessages] = useState(false);
  //const [fetchedMessages, setFetchedMessages] = useState("");

  const [number, setNumber] = useState(1);

  const [mySocket, setMySocket] = useState(null);

  const [messages, setMessages] = useState([]);
  const [messageCounter, setMessageCounter] = useState(0);

  const fetch = require('node-fetch');

  const [sessionID, setSessionID] = useState("");

  const [recipientIDs, setRecipientIDs] = useState([]);

  const { user } = useContext(AuthContext);
  
  const [myUserArray, setMyUserArray] = useState(props.userarray);

  const [myUsersInfo, setMyUsersInfo] = useState([]);

  const [mySession, setMySession] = useState(undefined);

  const [needToLoadChatMessages, setNeedToLoadChatMessages] = useState(false);

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
            const newArray2 = [...existing, newElement];
            thisSession.userInfo = newArray2;
            setMySession(thisSession);
            /*const res2 = axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getChatSessionWithID/`, {
            
              "chatsessionid": mySession[0]._id
              
            }).then(function (response) {
              
            });*/
          });


          
        },

        async loadChatFromSessionID(session){
          console.log("in loadChatFromSessionID")
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
        },
      
        async loadChatFromUserID(userID, firstName, lastName, profilePicture){
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
                        const newArray = [...response.data.chatResponse];
                        setMessages(newArray);

                        console.log("line 170: messages: " + messages + JSON.stringify(messages));
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
    

  }));

  function acceptChatMessage(data){
    socket.removeAllListeners("add-message").once('add-message', acceptChatMessage);
    //socket.removeAllListeners("add-message").once('add-message', acceptChatMessage);
    console.log("into add-message " + lastChatMessageScrambled + "data:" + data.scrambled);


    var lastScrambled = lastChatMessageScrambled;
    //if(data.scrambled != lastScrambled) {
              setLastChatMessageScrambled(data.scrambled);


              setLastChatMessageScrambled((prevValue) => {
                
                return data.scrambled;
              });


              var chat_session_id = data.chat_session_id;
              var sender_user_id = data.sender_user_id;
              var recipient_ids = data.recipient_ids;
              var myMessage = data.message;
              var sender_firstName = data.sender_firstName;
              var sender_lastName = data.sender_lastName;
              const myDataArray = 
              {
                

                  "chat_session_id":chat_session_id,
                  "sender_user_id":sender_user_id,
                  "message":myMessage,
                  "sender_firstName":sender_firstName,
                  "sender_lastName":sender_lastName,
                  
                  
                  "timeofmessage":Date.now
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
            setMessages((prevMessages) => {
              const newMessages = prevMessages;//{...prevMessages};
              const myLength = newMessages.length;
              //console.log("newMessages.length: " + myLength);
              newMessages[myLength] = myDataArray;
              console.log("new messages: " + JSON.stringify(newMessages));
              return newMessages;
            });
//end add message
          //}
  }
  

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
              var recipient_ids = data.recipient_ids;
              var myMessage = data.message;
              var sender_firstName = data.sender_firstName;
              var sender_lastName = data.sender_lastName;

              

              //var objDiv = document.getElementById("Messages_Container");
              //objDiv.scrollTop = objDiv.scrollHeight;
              //myMessages[myLength] = message;
              //console.log("pay attention: " + messages);/*
            /* setMessages([...myMessages]);
            
                console.log("myMessages: " + JSON.stringify(messages));
                */
        //  }
  };

  const deleteMessageListener = (messageID) => {
    setMessages((prevMessages) => {
      const newMessages = {...prevMessages};
      delete newMessages[messageID];
      return newMessages;
    });
  };


  async function getChatMessagesFromSessionID(session){
              try {
              
            //console.log(JSON.stringify(user));

            //console.log("finalstring:" + FinalString());

            //const myArray= FinalString();//"1234,5678"//FinalString();

            //async function fetchAllChatMessages()  {
                const res = await 
                axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatMessagesFromSessionID/`, {
                  "sessionID": mySession._id
                })
                .then(function (response) {
                  //console.log("before:" + response);
                  //console.log("now here: " + JSON.stringify(response.data));
                  //setHasLoadedFetchedMessages(true);
                  //console.log("now messages are: " + JSON.stringify(response.data));
                  const newArray = [...response.data];

                  console.log("now messages are about to be set: " + JSON.stringify(response.data))
                  setMessages(newArray);
                  
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
              console.log(key[0] + ', ' + key[1]);
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
        setTextValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
      }
    }
     
    
    const DoNothing = (event) => {

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
   
   

    return (
        
              <div id = "ChatContainer">
                    
                    
                     
                      <div id = "Messages_Container">
                    { [...Object.values(messages)]//makes mappable //was [...Object.values(messages)]
                              //.sort((a, b) => a.time - b.time)
                              .map((message, index) => (
                                 
                                  
                                  message.sender_user_id != user._id
                                    ? (<><div class = "HisSpeech">
                                              <img src={message.sender_profile_src} width={30} height={30} />
                                              <span class = "HisSpeechText">{message.message}</span>
                                              
                                       </div><br /><br /></>)
                                    
                                    
                                    : (<><div class = "MySpeech">
                                              
                                              <span class = "MySpeechText">{message.message}</span>
                                            
                                       </div><br /><br /></>)
                                  ))
                              }
                           </div>   
                                  
                    <textarea id = "Chat_Input" value= {textValue}  onChange={DoNothing} onKeyDown = {HandleKeyDown}  rows={5} placeholder="Type your message" />
                      
                    
              </div>

      
    )
      
        
  });

export default ExplorerChatWindow;


