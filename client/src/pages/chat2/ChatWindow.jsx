

import React, {Component} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useParams, useEffect } from "react";
import axios from 'axios';
import './bootstrap.min.css';
import './bootstrapchatstyle.css';
import './chatstyle.css';
import './fonts.css';
import * as utils from './serverold.js'; 
import cancel from './cancel.png';

import {TextInput} from 'react-native';

import Messages from './Messages';

import io from 'socket.io-client';
import { getAdditionalUserInfo } from 'firebase/auth';
import { textAlign } from '@mui/system';

require('console-polyfill')


const ChatWindow = (props) => {

  const [isMounted, setIsMounted] = useState(false);

  const [socket, setSocket] = useState(null);
  const [userAdded, setUserAdded] = useState(false);

  const [hasLoadedFetchedMessages, setHasLoadedFetchedMessages] = useState(false);
  //const [fetchedMessages, setFetchedMessages] = useState("");

  const [messages, setMessages] = useState([]);
  const [messageCounter, setMessageCounter] = useState(0);

  const fetch = require('node-fetch');

  const { user } = useContext(AuthContext);

  function getExistingMessages() {
    return messages;
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

              const myDataArray = 
                {
                   

                    "_id":"nothing",
                    "user_one_id":data.id,
                    "user_two_id":data.recipientid,
                    "message":data.message,
                    "action_user_id":1,
                    "__v":0,
                    "timeofmessage":Date.now
                }
            

              //const newArray = [...messages, ...myDataArray];
              //setMessages(newArray);

              setMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                const myLength = newMessages.length;
                console.log("newMessages.length: " + myLength);
                newMessages[myLength] = {...myDataArray};
                return newMessages;
              });

              var objDiv = document.getElementById("Messages_Container");
              objDiv.scrollTop = objDiv.scrollHeight;
              //myMessages[myLength] = message;
              console.log("pay attention: " + messages);/*
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

  useEffect(() => {
    //let isMounted = true;
    setIsMounted(true);

    console.log ("entered useEffect 1")


    const mySocket = io(`http://localhost:3000`);
    setSocket(mySocket);
    /*return () => {
      socket.emit("disconnect");
    };*/

    mySocket.on("connect", () => {
      //mySocket.on('add-message', messageListener());

      mySocket.on('add-message', function (data) {
        messageListener(data);
      });

      mySocket.on('deleteMessage', deleteMessageListener);
      //socket.emit('getMessages');
      mySocket.emit("add-user", {
        "id": user._id//.user.
      });
      setUserAdded(true);
    });
    if (!hasLoadedFetchedMessages){
            try {

              console.log(JSON.stringify(user));

              console.log("finalstring:" + FinalString());

              const myString = FinalString();//"1234,5678"//FinalString();

              async function fetchAllChatMessages()  {
                  const res = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatMessages/`, {
                    "myString": myString
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

       
    const script3 = document.createElement("script");
    script3.src = "./bootstrap.bundle.min.js";
    script3.async = true;
    document.body.appendChild(script3);

    const script4 = document.createElement("script");
    script4.src = "./jquery.min.js";
    script4.async = true;
    document.body.appendChild(script4);

    const addUser = () => {
      socket.emit("add-user", {
        "id": user._id//.user.
      });
      setUserAdded(true);
    }
    //return () => newSocket.close();
    //return () => { isMounted = false };
    //setIsMounted(false);
  }, [setSocket, setMessages]);
  


  const [chatData, setChatData] = useState([]);


  const [textValue, setTextValue] = useState("");

    
  const FinalString = () => {
      
   
      let myID = user._id;
    
      //let friendID = useParams().id;

      let friendID = "";
      if (myID == "622b541ffa9ae732dcd40bb5"){
        friendID = "622b54c2fa9ae732dcd40bc4";
      }
      else {
        friendID = "622b541ffa9ae732dcd40bb5";
      }

      let finalString = null;
    
      if (myID > friendID) {
        finalString = friendID + "," + myID;
      }
      else {
        finalString = myID + "," + friendID;
      }
    
      return finalString;
    
   
  }

  const HandleKeyDown = async (e) => {
    console.log("got into keydown: " + e.target.value + "key and keycode:" + e.key + ":" + e.keyCode);
    console.log(e);
    if ((e.key === 'Enter' || e.keyCode === 13)) {
      var message = e.target.value;
      console.log("got into if");
      console.log("user" + JSON.stringify(user));

      if (!userAdded){
        //const addUser = () => {
          socket.emit("add-user", {
            "id": user._id//.user.
           });
      
        //}
        setUserAdded(true);
      }

      //const myIDs = ["622b541ffa9ae732dcd40bb5","622b54c2fa9ae732dcd40bc4"]

      var recipient_id = "";
      if (user._id == "622b541ffa9ae732dcd40bb5"){
        recipient_id = "622b54c2fa9ae732dcd40bc4";
      }
      else {
        recipient_id = "622b541ffa9ae732dcd40bb5";
      }

      socket.emit("message", {
        "id": user._id, //user._id,//.user.
        "recipientid": recipient_id,
        "message": message
       });

      try {
            const formdata = new FormData();

            if (user._id < recipient_id){
              formdata.append('user_one_id', user._id);
              formdata.append('user_two_id', recipient_id);
              formdata.append('action_user_id', 1);
            }
            else {
              formdata.append('user_one_id', recipient_id);
              formdata.append('user_two_id', user._id);
              formdata.append('action_user_id', 2);
            }
            
            formdata.append('message', message);
            
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
              axios.post(`${process.env.REACT_APP_API_URL}/api/profile/saveChatMessage/`, {
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

        var objDiv = document.getElementById("Messages_Container");
        objDiv.scrollTop = objDiv.scrollHeight;
        setTextValue("");
        
      }
      else {
        setTextValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
      }
    }
     
    
    const DoNothing = (event) => {

    }

   
    return (
        
              <div id = "ChatContainer">
                    
                    
                      <div id = "TopContainer">
                            <div id = "CancelContainer">
                                <img id = "CancelImg" src={cancel} onClick={() => props.disappearChatWindow()}/>
                            </div>
                      </div>
                      <div id = "Messages_Container">
                    {[...Object.values(messages)] //makes mappable
                              //.sort((a, b) => a.time - b.time)
                              .map((message, index) => (
                                  
                                  message.sender_user_id != user._id
                                    ? (<><div class = "HisSpeech">
                                              <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width={30} height={30} />
                                              <span class = "HisSpeechText">{message.message}</span>
                                       </div><br /><br /></>)
                                    
                                    
                                    : (<><div class = "MySpeech">
                                              
                                              <span class = "MySpeechText">{message.message}</span>
                                       </div><br /><br /></>)

                              ))}
                           </div>   
                                  
                    <textarea id = "Chat_Input" value= {textValue}  onChange={DoNothing} onKeyDown = {HandleKeyDown}  rows={5} placeholder="Type your message" />
                      
                    
              </div>

        
    )
      
        
  }

export default ChatWindow;
