import React, {Component, useCallback, useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useParams, useEffect, Memo } from "react";
import axios from 'axios';
import './chatexplorerstyle.css';
import cancel from './cancel.png';
import $ from 'jquery';
import ExplorerChatWindow from './ExplorerChatWindow';
import ExplorerChatSessions from './ExplorerChatSessions';
import ellipses from './icons8-ellipsis-30.png';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import LoadingAlert from './loadingAlert'
import { red } from '@material-ui/core/colors';
import {socket} from "./socket.js";

const ChatExplorer = (props) => {
    const { useState, useMemo } = React;
    const { forwardRef, useRef, useImperativeHandle } = React;
    const [hasLoaded, setHasLoaded] = useState(false);
    const [myUrl, setMyUrl] = useState("");
    const [chatSessions, setChatSessions] = useState([]);
    const [people, setPeople] = useState([]);



    const [messages, setMessages] = useState([]);
    const [sasLoadedFetchedMessages, setHasLoadedFetchedMessages] = useState(false);
    const { user } = useContext(AuthContext);
    var [currentSession, setCurrentSession] = useState();

    const [onlinePeople, setOnlinePeople] = useState([]);
    const [refreshOnlinePeople, setRefreshOnlinePeople] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const myExplorerChatWindow =  useRef();
    const myExplorerChatSessions =  useRef();

    const loadMyChatFromUserID = React.useRef(null)

    const [cursor, setCursor] = useState('hourglass');


    function changeCursor() {
        setCursor(prevState => {
          if(prevState === 'hourglass'){
            return 'pointer';
          }
          return 'hourglass';
        });
      }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    }

    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
      
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
      
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        return windowDimensions;
    }
      

    const { myHeight, myWidth } = useWindowDimensions();

    function createNewChat(userid, firstName, lastName, profilePicture)  {
        console.log("in create function and userid is " + userid)

        myExplorerChatWindow.current.loadChatFromUserID(userid, firstName, lastName, profilePicture);
              
    }

//onMouseOut() { setHovered(false); }
    const useHover = () => {
        const [hovered, setHovered] = useState();
        
        const eventHandlers = useMemo(() => ({
          onMouseOver() { setHovered(true);},
          onMouseLeave() { setHovered(false);}
           
          
        }), []);

     
        
        return [hovered, eventHandlers];
      }

      

      const Item = ({_id, firstName, lastName, profilePicture, children }) => {
        const [hovered, eventHandlers] = useHover();
        //console.log("props are: " + _id);
        return (
            <>
          <div class = "OneReactionItem" {...eventHandlers}>
                        {children}
                        {hovered && <MenuDiv _id = {_id} firstName = {firstName} lastName = {lastName} profilePicture = {profilePicture} />}
            </div>
                        <br />
                        {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
            </>
        );
      };

      const HoverContainer = ({children }) => {
        const [hovered, eventHandlers] = useHover();
        //console.log("props are: " + _id);
        return (
            <>

                       <div style = {{background: hovered ? '#e6ffee' : 'rgb(241,239,241)'}} {...eventHandlers}>
                        {children}
                       
                        {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
                        </div>
            </>
        );
      };

      


    async function addToExistingChat(id, firstName, lastName, profilePicture)  {
        console.log("in chatexplorer addToExistingChat, " + id + "," + firstName + "," + lastName);
            if(currentSession._id != ""){
                        try {
                            console.log("inside try");
                            console.log("current session id: " + currentSession._id);
                           
                                console.log("in chatexplorer, about to call addRecipientID");
                                myExplorerChatWindow.current.addRecipientID(id, firstName, lastName, profilePicture);
                            //console.log ("add user to session response: " + JSON.stringify(response));
                            //console.log("chatSessions.length: " + chatSessions.length);
                            var objDiv = document.getElementById("PeopleInnerContainer");
                            objDiv.scrollTop = 0;
                            //})
                            //.catch(function (error) {
                            //console.log(error);
                            //});
                            
                        
                        

                    } catch (err) {
                        console.log(JSON.stringify(err));
                        //setMessage('Something went wrong!');
                        //setOpen(true);
                    }
        }
        else {
            createNewChat(id, firstName, lastName, profilePicture);
        }
}

    /*
    var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], {type: 'text/plain'});
  
      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
  
      textFile = window.URL.createObjectURL(data);
  
      // returns a URL you can use as a href
      return textFile;
    };

    */

    const showMenuContainer = event => {
        console.log("show" + event.target);

        var firstChild = event.target.firstChild;
        console.log("show first child:" + firstChild);
        //firstChild.css("display","block");
        firstChild.style.display = "block";
    }

    const hideMenuContainer = event => {
        console.log("hide" + event.target)
        var firstChild = event.target.firstChild;
        console.log("hide first child " + firstChild);
        firstChild.style.display = "none";
    }

    const setWhoIsOnline = (data) =>{
        setOnlinePeople(data.clientsarray);
        setRefreshOnlinePeople(true);
      //acceptWhoIsOnline(data);
        console.log("got into data.purpose is clientarray " + JSON.stringify(data))
        console.log("got into data.purpose is people " + JSON.stringify(people))
        
    }
    

    async function loadPeople()  {
        
        /*
        socket.emit("message", {
            "senderID":user._id,
            "purpose":"get client array"
            
    
           });*/
        try {
            
                const res = await 
                axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllPeople/`, {
                
                })
                
                //let id = user._id;
                /*const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${id}`
                    )*/
                .then(function (response) {
                    //var myUrl = makeTextFile(JSON.stringify(response.data));
                    setMyUrl(myUrl);

                console.log("before:" + JSON.stringify(response.data));
                console.log("People " + JSON.stringify(response.data[0].firstName));
                
                //const stringified = JSON.stringify(response.data);
                const newArray = [...response.data];

                
                //setPeople([...JSON.stringify(response.data[0])]);
                console.log("MY NEW ARRAY: " + JSON.stringify(newArray))
                setPeople(newArray);

                
                    //from "my people"
                var profileid = "6229e7160c72f8cadff6b44c";//response.data[1].originalUser[0];
                console.log("profileid: " + profileid)
                    

                    //loadWhoIsOnline();



                    /*
                const fetchData = async () => {await 
                    axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getSingleProfileDetails/${profileid}`, {
                      //"hisID": userID,
                      
                      //"myID": user._id
                      
                    })
                    .then(function (response2) {
                          console.log("all sessions2: " + JSON.stringify(response2));
                          return response2;
                    });
                    return res;
                  }
              const myData = fetchData()*/
              // make sure to catch any error
              

                //const myData = fetchuserprofiles.data;
                //console.log("profile data:" + JSON.stringify(myData))
                //console.log("chatSessions.length: " + chatSessions.length);
                //var objDiv = document.getElementById("PeopleInnerContainer");
                //objDiv.scrollTop = 0;
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
/*
const loadWhoIsOnline = async () => {
//function loadWhoIsOnline(){
    console.log("got into loadWhoIsOnline");
    socket.emit("message", {
        "senderID":user._id,
        "purpose":"get client array"
        

       });
}
*/

function acceptWhoIsOnline(data){
    console.log("got into acceptWhoIsOnline");
    const tempPeople = people;

    console.log("my client array:" + JSON.stringify(data.clientsarray));

    
    //for (const i in clientArray){
     //   if ()
    //}    
}

    function updateCurrentSession (session) {
        setCurrentSession(session)
    }

    //const onChangeChatWindow = useCallback((session) => {
        //console.log("got into chatexplorer onChangeChatWindow");
        //setCurrentSession(session);
        //myExplorerChatWindow.current.loadChatFromSessionID(session);

    //})

    function onChangeChatWindow (session) {
        //useMemo(() => updateCurrentSession(session), [times]);
        currentSession = session;
        //setCurrentSession(session);
        myExplorerChatWindow.current.loadChatFromSessionID(session);
    }
/*
    const togglePopUp = useCallback(
        event => {
          event.preventDefault();
          setPopup(!popup);
        },
        [popup]
      );
    */

    useEffect(() => {
        /*
        socket.emit("add-user", {
            "id": user._id//.user.
          });
*/
        if(refreshOnlinePeople){
            setRefreshOnlinePeople(false);
            const myPeople = people;//[...people]
            const myClientsArray = onlinePeople;
            console.log("myClientsArray:"  + JSON.stringify(myClientsArray))
             for (const [key, value] of Object.entries(myClientsArray)) {
        //for (i in myClientsArray){
                    for(const p in myPeople){
                        //if(myPeople[p]._id == key){
                            myPeople[p].isOnline = "true";
                        //}
                    }
            }
            setPeople(myPeople);
        }          


        if (!hasLoaded){
            
            changeCursor();
            const fetchData = async () => {const res = await 
                  axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllChatSessionsInfo/`, {
                    //"hisID": userID,
                    
                    //"myID": user._id
                    
                  })
                  .then(function (response) {
                        console.log("all sessions: " + JSON.stringify(response, null, 2));
                  });
                }
            fetchData()
            // make sure to catch any error
            .catch(console.error);
            
            myExplorerChatSessions.current.loadMyChatSessions();
            //loadMyChatSessions();
            //arrayOfUsers = [];
            //this.myExplorerChatWindow.loadChat(arrayOfUsers);
            
            loadPeople();
            setHasLoaded(true);
            
        }
        
        

            console.log("myheight:" + window.innerHeight);
            let myHeight = window.innerHeight;
            //document.getElementById("WholePage").style.height = myHeight;
            $("#WholePage").css("height", myHeight + "px");

    }, [setHasLoaded, loadPeople, setPeople, setRefreshOnlinePeople]);

    const mystyle = {
        width: myWidth,
        height: myHeight
        
      };

    const OnePeopleDivPersonMouseOver = e =>{
        e.target.background = "#1affa3";//e.target
        //console.log(e.target.parentElement.classList);
        console.log("in appear");
    }

    function OnePeopleDivPersonMouseOut(e) {
        e.target.style.background = "#a3a3a3";
        //console.log(e.target.parentElement.id);
        console.log("in dissappear");
    }
/*
    function containingMakeDropdownDissappear(e) {
        //e.target.parentElement.firstChild.style.display = "none";//third child's first child
        var elements = e.target.children;
        var myElement = elements.item(2);
        var myChild = myElement.querySelector('.DropdownMenu');
        console.log("in containing function");
        //myElement.firstChild
        myChild.style.display = "none";
    }
    */

    const handleMouseEnter = e => {
        e.target.style.background = "grey"
        //setShowText(true)
      }

    console.log(myWidth + "," + myHeight);


    function updatePeople() {
        /*console.log('formatting ...') // this will print only when data has changed
        const formattedData = []
        data.forEach(item => {
          const newItem = // ... do somthing here, formatting, sorting, filtering (by date, by text,..) etc
          if (newItem) {
            formattedData.push(newItem)
          }
        })
        return formattedData*/
      }


    //const memoizedPeople = useMemo(updatePeople, [people])

    function GetReaction(){
        {console.log("my people: " + JSON.stringify(people))}
        const reactionItems = people && [...Object.values(people)] //makes mappable
                                    //.sort((a, b) => a.time - b.time)
                                    .map((onePerson, index) => (
                                        <>
                                            <OnePeopleDivPerson onePerson = {onePerson} />
                                            
                                            
                                       
                                        </>
                                    ))
    
        return (
            <>
                
                <>{reactionItems}</>
                
            </>
            );
    
    }
      
    const MenuDiv = (props) => {
        
        const [hovered2, eventHandlers2] = useHover();
        const [hovered3, eventHandlers3] = useHover();
        
        /*<button className = "AddDivButton" onClick = {createNewChat.bind(null, onePerson._id, onePerson.firstName, onePerson.lastName)}>+</button>
                                                        <button className = "AddDivButton" onClick = {addToExistingChat.bind(null, onePerson._id, onePerson.firstName, onePerson.lastName)}>e</button>*/
        return (
        <div className = "DropdownMenu">
            <div className = "MenuItem" {...eventHandlers2} onClick = {createNewChat.bind(null, props._id, props.firstName, props.lastName, props.profilePicture)}>
                <div className = "MenuItemInner" style={{background: hovered2 ? '#1aa3ff' : 'white'}}>Private Chat</div>
                
            </div>
            <div className = "MenuItem" {...eventHandlers3} onClick = {addToExistingChat.bind(null, props._id, props.firstName, props.lastName, props.profilePicture)}>
                <div className = "MenuItemInner" style={{background: hovered3 ? '#1aa3ff' : 'white'}}>Add to Existing Chat</div>
                
            </div>
        </div>
        )

    }

    function makeMeSelected(e){
        e.target.style.background = '#1aa3ff';
    }

    const useChatSessionsMemoRef = useRef(0);

    const incrementChatSessionsUseMemoRef = () => useChatSessionsMemoRef.current++;
    const chatSessionsMemoizedValue = useMemo(() => incrementChatSessionsUseMemoRef(), [chatSessions]);

    // the next line ensures that <UseMemoCounts /> only renders when the times value changes
//const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]);

    function OnePeopleDivPerson(props){
        return (
            <>
            <HoverContainer>
                        <div className = "OnePeopleDivPerson">
                            
                            
                           
                                        
                                    <div className = "PictureDiv">
                                        {console.log("onePicture"+props.onePerson.profileImg)}
                                        <img src = {`${process.env.REACT_APP_API_URL}/${props.onePerson.profileImg}`} />
                                    </div>
                                    <div className = "NameDiv">
                                        <span>
                                            {props.onePerson.firstName}
                                        </span>
                                         &nbsp;
                                         <span>
                                             {props.onePerson.lastName}
                                         </span>
                                    </div>
                                    <Item _id = {props.onePerson._id} firstName = {props.onePerson.firstName} lastName = {props.onePerson.lastName} profilePicture = {props.onePerson.profileImg}>
                                    <div className = "AddDiv">
                                        
                                        
                                        {/*...
                                        {showAddPersonMenuContainer<AddMenuContainer id = {onePerson._id} />}
                                        */
                                        console.log("id" + props.onePerson._id)
                                        }
                                        
                                        <div class = "DropdownDiv"> 
                                       
                                            <img src = {ellipses} />
                                        </div>
                                        {/*props.onePerson.isOnline && props.onePerson.isOnline == "true"*/}
                                        <GreenDot />
                                        {/*<button className = "AddDivButton" onClick = {createNewChat.bind(null, onePerson._id, onePerson.firstName, onePerson.lastName)}>+</button>
                                        <button className = "AddDivButton" onClick = {addToExistingChat.bind(null, onePerson._id, onePerson.firstName, onePerson.lastName)}>e</button>*/}
                                    </div>
                                    </Item>

                            </div>
                            <br />
                            </HoverContainer>
                            </>          
        )


}


    return (
        
        <div id = "WholePage" >{/*style={/*{ cursor: isLoading? "wait" : "pointer" }*/}
            {/*isLoading && <LoadingAlert />*/}
                <div id = "ExistingChats">
                        <ExplorerChatSessions ref={myExplorerChatSessions}
                        onChangeChatWindow={onChangeChatWindow} setIsLoading = {setIsLoading} memoizedValue = {chatSessionsMemoizedValue}/>{/**  
                    ref={(ref) => myExplorerChatSessions=ref} */}

                        



                </div>
                <div id = "CEChatWindow">
                        <ExplorerChatWindow ref={myExplorerChatWindow} 
                        onLoadRender={onChangeChatWindow} 
                        setWhoIsOnline = {setWhoIsOnline}/>
                        {/**ref={(ref) => myExplorerChatWindow=ref} */}





                </div>
                <div id = "PeopleDiv">
                        <div id = "PeopleHeader">
                            People
                        </div>
                        <div id = "PeopleInnerContainer">
                                <GetReaction />

                        </div>
                        {/*<a href = {myUrl && myUrl}>click here</a>*/}
                        
                        <div id = "ExitWindow" onClick={props.disappearChatExplorer()}>
                                <img id = "ExitImage" src={cancel} />

                        </div>
                </div>

        </div>
    )   


}

export default ChatExplorer;

export function AddMenuContainer(props){
    console.log(JSON.stringify((props)));
    
    
    return (
        <div className = "MenuContainer">
            <div className = "TopOption" >
                Create New Chat
            </div>
            <div className = "SecondOption">
                Add To Existing Chat
            </div>
        </div>
    );
  }


  export function GreenDot(props){
    //console.log(JSON.stringify((props)));
    
    
    return (
        <div className = "GreenDot">
            
        </div>
    );
  }
  