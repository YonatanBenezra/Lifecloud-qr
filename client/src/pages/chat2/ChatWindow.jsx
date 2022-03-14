import React, {Component} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useParams } from "react";
import axios from 'axios';
import './bootstrap.min.css';
import './chatstyle.css';
import './fonts.css';
//import './jquery.min.js';
//import './bootstrap.bundle.min.js';
import ScriptTag from 'react-script-tag';
import {TextInput} from 'react-native';

const express = require('express');
    const app = express();
    const http = require('http');
    const server = http.createServer(app);

const ChatWindow = (props) => {

  server.listen(2347, () => {
    console.log('listening on *:2347');
  });

  socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });



  //
  const [textValue, setTextValue] = useState("");

  const Jquery = props => (
    <ScriptTag type="text/javascript" src="/jquery.min.js" />
    )
  const Bootstrap = props => (
    <ScriptTag type="text/javascript" src="/bootstrap.bundle.min.js" />
    )
 
  const { user } = useContext(AuthContext);

  console.log(JSON.stringify(user));

  const FinalString = () => {
      
   
      let myID = user.user._id;
    
      let friendID = useParams().id;
    
      let finalString = null;
    
      if (myID > friendID) {
        finalString = friendID + "," + myID;
      }
      else {
        finalString = myID + "," + friendID;
      }
    
      return finalString;
    
   
  }

  const SaveMessage = async (message) => {
      console.log (message.charAt(message.length - 1))
      if (message.charAt(message.length - 1) == "$"){
          const res = async () => {
            await axios.post(
          `${process.env.REACT_APP_API_URL}/` + FinalString);
        
          }
      }
  }

  const HandleKeyDown = (e) => {
    console.log("got into keydown: " + e.target.value + "key and keycode:" + e.key + ":" + e.keyCode);
    console.log(e);
    if ((e.key === 'Enter' || e.keyCode === 13)) {
      var message = e.target.value;
      console.log("got into if");

      socket.emit('chat message', message);

      try {
            const formdata = new FormData();
            formdata.append('user_one_id', user._id);
            formdata.append('user_two_id', user._id);
            formdata.append('message', message);
            //formdata.append(timeofmessage, image);
            formdata.append('action_user_id', 1);
            
           
            // const config = {
            //   headers: {
            //     'content-type': 'multipart/form-data'
            //   }
            // }
            console.log(formdata, 'formdata');


          fetch(`${process.env.REACT_APP_API_URL}/api/chat/saveMessage/`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             },
            method: 'PUT',
            body: formdata
          })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res);
            if (res) {
              //setMessage('Profile updated successfully!');
              //setOpen(true);
              console.log("Saved message successfully!")
              setTextValue()
            }
          });
        // let res = await axios.post('api/profile/createProfile', formdata);
        // console.log('res', res)
        // history.push('/login');
      } catch (err) {
        console.log(err);
        //setMessage('Something went wrong!');
        //setOpen(true);
      }

        
      }
      else {
        setTextValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
      }
    }
      /*
      const res = async () => {
          await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat/saveMessage` + FinalString);
    
      }*/
    
  
  
/*
    async componentDidMount(){
        const script = document.createElement("script");
        script.src = "./bootstrap.bundle.min.js";
        script.async = true;
        document.body.appendChild(script);

        const script2 = document.createElement("script");
        script2.src = "./jquery.min.js";
        script2.async = true;
        document.body.appendChild(script2);


        

        this.loadAndDisplayData();
        
    }
*/
    


     
  
            //this.setState({finalString: GetFinalString()})
          
    //const loadAndDisplayData = (e) => {   
          
            const res = async () => { 
              await axios.post(
            `${process.env.REACT_APP_API_URL}/getAllChatMessages` + this.finalString());
            }
            const myData = async () => { await res.data };
    
            console.log("mydata: " + JSON.stringify(myData))
    
            //console.log("1" + myDropdownNotifications);
            //console.log("2" + JSON.stringify("loadAndDisplayData: " + myData));
            //this.setState ({ messages: myData});
            //props.messages = myData;
            //return myData;
        
            const script = document.createElement("script");
            script.src = "./server.js";
            script.async = true;
            document.body.appendChild(script);

            const script2 = document.createElement("script");
            script2.src = "/socket.io/socket.io.js";
            script2.async = true;
            document.body.appendChild(script2);

            

            
    //}

    
    const DoNothing = (event) => {

    }

    
  
      return (
        <>
                <div id="main" onContextMenu={()=>{return false}} className='snippet-body'>
                <div className="container d-flex justify-content-center">
                    <div className="card mt-5">
                    <div className="d-flex flex-row justify-content-between p-3 adiv text-white"> <i className="fas fa-chevron-left" /> <span className="pb-3">Live chat</span> <i className="fas fa-times" /> </div>
                    <div className="d-flex flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width={30} height={30} />
                        <div className="chat ml-2 p-3">Hello and thankyou for visiting birdlymind. Please click the video above</div>
                    </div>
                    <div className="d-flex flex-row p-3">
                        <div className="bg-white mr-2 p-3"><span className="text-muted">Hello and thankyou for visiting birdlynind.</span></div> <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width={30} height={30} />
                    </div>
                    <div className="d-flex flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width={30} height={30} />
                        <div className="myvideo ml-2"><img src="https://imgur.com/GOxU1jx.png" width={200} /></div>
                    </div>
                    <div className="d-flex flex-row p-3"> <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width={30} height={30} />
                        <div className="chat ml-2 p-3"><span className="text-muted dot">. . .</span></div>
                    </div>
                    <div className="form-group px-3"> <textarea value={textValue} onChange={DoNothing} onKeyDown = {HandleKeyDown} className="form-control" rows={5} placeholder="Type your message"  /> </div>
                    </div>
                </div>
                    <script type='text/javascript' src='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js'></script>

                    </div>
      
                  
        </>
        )
  }

export default ChatWindow;
//onChange={(event)=>InputChangedHandler(event)}

//onKeyDown={HandleKeyDown}