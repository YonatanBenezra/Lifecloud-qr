import React, { useEffect, useState } from 'react';
import './bootstrap.min.css';
import './chatstyle.css';
import './fonts.css';

function Messages({ socket }) {
  const [messages, setMessages] = useState({});
  const [messageCounter, setMessageCounter] = useState(0);

  useEffect(() => {
    const messageListener = (message) => {
      console.log("entered messagelistener");

      const myMessages = messages;
      myMessages[myMessages.length] = message;
      setMessages(myMessages);
      //setMessageCounter(messageCounter + 1);
      
      //setMessages((prevMessages) => {
        //const newMessages = {...prevMessages};
        //newMessages[messageCounter] = message;
        //setMessageCounter(messageCounter + 1);
        console.log("myMessages: " + JSON.stringify(messages));
        //return newMessages;
      //});
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('add-message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    /*return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };*/
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)] //makes mappable
        //.sort((a, b) => a.time - b.time)
        .map((message, index) => (
            
            <div key={index} className="d-flex flex-row p-3">
                              <div className='bg-white mr-2 p-3'>
                                  <span className='text-muted'>
                                      {message.content}
                                  </span>
                              </div> 
    
                              <img src='https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png' width={30} height={30} /> \
            </div>
        ))
      }
    </div>
  );
}

export default Messages;