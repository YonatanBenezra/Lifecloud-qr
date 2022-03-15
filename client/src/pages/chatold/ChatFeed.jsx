import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import React, {Component, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';

const ChatFeed = (props) => {

  const { user } = useContext(AuthContext);

  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  //const finalString = GetFinalString();
  
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

const SaveMessage = async (message) => {


  const res = async () => {
    await axios.post(
  `${process.env.REACT_APP_API_URL}/` + FinalString);

}
}



/*
*/
const loggedUser = JSON.parse(localStorage.getItem('user'));


  const renderMessages = () => {
    const keys = Object.keys(messages);

    //const userName = `/createprofile/${LoggedUser.user.firstName}`;
    

    const userID = loggedUser.user.id;
    return (
      <>
    {keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userID === message.senderUserID;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {this.renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    })
  }</>)
  }


  const renderReadReceipts = (message, isMyMessage) => {
    //const {messages, myString, loggedUser, chat, props, activeChat} = this.state;
    
    console.log(JSON.stringify(user));
  
    return chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: `${process.env.REACT_APP_API_URL}/${user.profilePicture}` && `url(${`${process.env.REACT_APP_API_URL}/${user.profileImg}`})`,
      }}//was profiledata instead of user
    />
  ));
  
  }
  
  
  
  
//render(){
  //const {messages, myString, loggedUser, chat, props, activeChat} = this.state;
  console.log ("chat is 1: " + chat);
  console.log ("chat is 2: " + JSON.stringify(chat));
  
  if (!chat) return <div>no chat available</div>;
  //if (!chat) return <div />;

  return (
    <>
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {this.renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
    </>
  );


/*
  const fetchuserprofiles = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${id}`
    );
    res.data.googleLocation = JSON.parse(res.data.googleLocation);
    setProfileData(res.data);
  };



/*

const example = () => {
  const { user } = useContext(AuthContext);

  let data = {
    userId: profiledata.originalUser[0]._id,
  };
}
*/

}

export default ChatFeed;