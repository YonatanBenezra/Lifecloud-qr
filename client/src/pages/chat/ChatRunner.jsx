import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import React, {Component, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import  ChatFeed  from './ChatFeed';
import { ChatEngine } from 'react-chat-engine';

const ChatRunner = (props) => {

    const { user } = useContext(AuthContext);

    const FinalString = () => {
      
        //let loggedUser = user;
        //let myID = `/createprofile/${LoggedUser.user._id}`;
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
    
    


    const LoadAndDisplayData = () => {
  
        //this.setState({finalString: GetFinalString()})
      
        
      
        const res = async () => { 
          await axios.post(
        `${process.env.REACT_APP_API_URL}/getAllChatMessages` + FinalString);
        }
        const myData = async () => { await res.data };

        

        //console.log("1" + myDropdownNotifications);
        console.log("2" + JSON.stringify("loadAndDisplayData: " + myData));
        //this.setState ({ messages: myData});
        //props.messages = myData;
        return myData;
    }

/*
    const People =  [
        { 'id': '1', 'firstname': 'yoni', 'AAA', 'isOK': true },
        { 'id': '2', 'desc': 'BBB', 'isOK': true },
        { 'id': '3', 'desc': 'CCC', 'isOK': false },
      ];
*/

//two jsons: chat.people and chat.messages

    const chats = 
        {
                "people":[{
                    
                            "username":"yoni",
                            "last_read":"0"
                        },
                        {
                            "username":"james",
                            "last_read":"1"
                        }]

                
                
        }
            
    const activechat = 0;

    const messages = [
        {
            'id':"0",
            'message':"Hello",
            "senderUserID":"15"
        },
        {
            "id":"1",
            'message':"How are you?",
            "senderUserID":"20"
        }

    ];






    const chatAppProps = [chats => chats, activeChat => activechat, messages => messages, userName => "Joe"];



    return (
     <> in chatrunner
    <ChatEngine
      height="100vh"
            //projectID = "605510ab-0732-488c-bd78-dabc3db7cec2"
            //Admin user
            projectID = "605510ab-0732-488c-bd78-dabc3db7cec2"
            //Admin user
            userName="yonikirby"
            userSecret="1234"
            renderChatFeed={() => <ChatFeed userName= "yoni"//{localStorage.getItem('username')}
            //userSecret="1234"
                                        messages={messages}
                                        chats = {chats}
                                        activeChat = {activechat} />}
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
          />
        
        </>
       
    )





}





export default ChatRunner;