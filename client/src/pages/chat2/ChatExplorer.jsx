import React, {Component, useCallback, useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext, useParams, useEffect, Memo } from "react";
import axios from 'axios';
import './chatexplorerstyle.css';
import cancel from './cancel.png';
import $ from 'jquery';
import ExplorerChatWindow from './ExplorerChatWindow';
import ExplorerChatSessions from './ExplorerChatSessions';
import SessionEditTitle from './SessionEditTitle';
import ellipses from './icons8-ellipsis-30.png';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import LoadingAlert from './loadingAlert'
import { red } from '@material-ui/core/colors';
import {socket} from "./socket.js";
import ReactDOM from 'react-dom';
import magnifyingglass from './magnifying-glass.png';


const ChatExplorer = (props) => {

    


    const { useState, useMemo } = React;
    const { forwardRef, useRef, useImperativeHandle } = React;
    const [hasLoaded, setHasLoaded] = useState(false);
    const [myUrl, setMyUrl] = useState("");
    const [chatSessions, setChatSessions] = useState([]);
    const [people, setPeople] = useState([]);
    const [bottomMostPersonID, setBottomMostPersonID] = useState("");

    const [hasSetInitialChat,setHasSetInitialChat] = useState(false);

    const [messages, setMessages] = useState([]);
    const [sasLoadedFetchedMessages, setHasLoadedFetchedMessages] = useState(false);
    const { user } = useContext(AuthContext);
    var [currentSession, setCurrentSession] = useState();

    const [onlinePeople, setOnlinePeople] = useState([]);
    const [refreshOnlinePeople, setRefreshOnlinePeople] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const myExplorerChatWindow =  useRef();
    const myExplorerChatSessions =  useRef();
    const [textValue, setTextValue] = useState("");
    const loadMyChatFromUserID = React.useRef(null)
    const [peopleAjax, setPeopleAjax] = useState([]);
    const [cursor, setCursor] = useState('hourglass');
    const PeopleHolderRef = useRef(null);
    const [haveWeReachedTheEndOfLoadingPeople, setHaveWeReachedTheEndOfLoadingPeople] = useState(false);
    const [isEditingTitleSession, setIsEditingTitleSession] = useState(false);
    const [currentSessionToEditTitle, setCurrentSessionToEditTitle] = useState(undefined);
    //const clickOutsideRef = useRef(null);
    //useOutsideAlerter(clickOutsideRef);
    const myScrollRef = useRef();
    const [scrollTop, setScrollTop] = useState(0);
    const [hasBeenClosed, setHasBeenClosed] = useState(false);

    const [myExplorerChatWindowStateVal, setMyExplorerChatWindowStateVal] = useState({value:0});
    const [myExplorerChatSessionsStateVal, setMyExplorerChatSessionsStateVal] = useState({value:0});

    const [peopleAjaxHasJustBeenSet, setPeopleAjaxHasJustBeenSet] = useState(false);
    

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


/*
    const handlePeopleScroll = async(e) => {
      console.log("got into handlePeopleScroll")
      const currentScrollY = e.target.scrollBottom;
      if(currentScrollY == 0){
      //if(window.pageYOffset === 0) {
          console.log("got into handlePeopleScroll at bottom")
          renewMyPeople();
      }
  }*/


//onMouseOut() { setHovered(false); }
    const useHover = () => {
        const [hovered, setHovered] = useState();
        
        const eventHandlers = useMemo(() => ({
          onMouseOver() { setHovered(true);},
          onMouseLeave() { setHovered(false);}
           
          
        }), []);

     
        
        return [hovered, eventHandlers];
      }


      const AjaxSearchResult = ({_id, firstName, lastName, profilePicture, children }) => {
        const [hovered, eventHandlers] = useHover();
        const [hovered2, eventHandlers2] = useHover();
        const [hovered3, eventHandlers3] = useHover();
        //console.log("props are: " + _id);
        {console.log("in ajaxsearchresult " + firstName)}
        return (
            <>
          <div class = "OnePersonAjax" {...eventHandlers}>
                        
                        {firstName} {lastName}
                        {children}
                        <div className = "AddCreateSpan">{hovered && <><span class = "ajaxButton" {...eventHandlers2} style={{background: hovered2 ? '#1aa3ff' : 'white'}} onClick = {createNewChat.bind(null, _id, firstName, lastName, profilePicture)}>New+</span><span class = "ajaxButton" {...eventHandlers3} style={{background: hovered3 ? '#1aa3ff' : 'white'}} onClick = {addToExistingChat.bind(null, _id, firstName, lastName, profilePicture)}>Existing+</span></>}
                        </div>
            </div>
                        
                        {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
            </>

        )
      }

      

      const Item = ({isLastElement, _id, firstName, lastName, profilePicture, children }) => {
        const [hovered, eventHandlers] = useHover();
        //console.log("props are: " + _id);
        return (
            <>
          <div class = "OneReactionItem" {...eventHandlers}>
                        {children}
                        {hovered && <MenuDiv isLastElement = {isLastElement} _id = {_id} firstName = {firstName} lastName = {lastName} profilePicture = {profilePicture} />}
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

                       <div className = "myHoverContainer" style = {{background: hovered ? '#e6ffee' : 'rgb(241,239,241)'}} {...eventHandlers}>
                        {children}
                       
                        {/*<Alert severity="success">This is a success alert — check it out!</Alert>*/}
                        </div>
            </>
        );
      };

      
      function refreshSessionWindow() {
        const myConst = myExplorerChatSessionsStateVal.value;
        //myConst++;

        setMyExplorerChatSessionsStateVal(myConst + 1);
      }

    async function addToExistingChat(id, firstName, lastName, profilePicture)  {
        console.log("in chatexplorer addToExistingChat, " + id + "," + firstName + "," + lastName);
            if(currentSession && currentSession._id != ""){
                        try {
                            console.log("inside try");
                            console.log("current session id: " + currentSession._id);
                           
                                console.log("in chatexplorer, about to call addRecipientID");
                                myExplorerChatWindow.current.addRecipientID(id, firstName, lastName, profilePicture);
                                
                                const myConst = myExplorerChatWindowStateVal.value;
                                myConst++;

                                
                                setMyExplorerChatWindowStateVal(myConst);
                                
                                
                                
                                
                                
                                
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
                    bottomMostPersonID: bottomMostPersonID
                })
                
                //let id = user._id;
                /*const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/profile/getallprofileofSingleUser/${id}`
                    )*/
                .then(function (response) {
                    //var myUrl = makeTextFile(JSON.stringify(response.data));
                    setMyUrl(myUrl);

                console.log("getAllPeopleResponse" + JSON.stringify(response.data));
                console.log("People " + JSON.stringify(response.data[0].firstName));
                
                //const stringified = JSON.stringify(response.data);
                const newArray = [...response.data];

                
                //setPeople([...JSON.stringify(response.data[0])]);
                console.log("MY NEW ARRAY: " + JSON.stringify(newArray))
                setPeople(newArray);
                setBottomMostPersonID(newArray[newArray.length - 1]._id);

                
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
        console.log("in chatexplorer onchangechatwindow and session is: " + JSON.stringify(session))
        //useMemo(() => updateCurrentSession(session), [times]);
        setCurrentSession(session);
        //setCurrentSession(session);
        myExplorerChatWindow.current.loadChatFromSessionID(session);
    }

    async function onChangeChatWindowFromMessageAjax (message) {
        console.log("into message load: " + JSON.stringify(message))
        const myNewSession = await getSessionFromSessionID(message.chat_session_id);
        console.log("got current session from click: " + JSON.stringify(myNewSession._id))
        setCurrentSession(myNewSession);
        myExplorerChatWindow.current.loadChatFromAjaxMessage(myNewSession, message);

    }


    async function getSessionFromSessionID(sessionID) {
            
              const myVar = await axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getChatSessionFromSessionID/`, {
                "sessionID": sessionID
                //"hisID": userID,
                
                //"myID": user._id
                
              })
              .then(function (response) {
                    //console.log("all sessions: " + JSON.stringify(response, null, 2));
                    console.log("about to return response: " + JSON.stringify(response.data));
                    const myTempVar = response.data;
                    return myTempVar;
              })
              .catch(function (error) {
                console.log("axios error: " + error);
             });
            console.log("myVar is: " + JSON.stringify(myVar));
             return myVar;
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

      if (peopleAjaxHasJustBeenSet){
                if (textValue != ""){

                      var lastNameIndex = textValue.lastIndexOf(" ");
                      
                      var firstName = textValue;
                      var lastName = "";
                      
                      if (lastNameIndex != -1){
                        lastName = textValue.split(lastNameIndex + 1);
                        firstName = textValue.split(0, lastNameIndex - 1);
                      }


                      var sender_user_id = user._id;

        
                      const res = 
                      axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAjaxSearchPeople/`, {
                          "firstName": firstName,
                          "lastName": lastName
                          
                          //"time": mySetMessagesNewestTime,
                          //"scrollIncrementCount":scrollIncrementCount
                      })
                      .then(function (response) {
                          //console.log("before:" + response);
                          //console.log("now here: " + JSON.stringify(response.data));
                          //setHasLoadedFetchedMessages(true);
                          //console.log("now messages are: " + JSON.stringify(response.data));
                          console.log("ajax response: " + JSON.stringify(response.data));
                          setPeopleAjax([...response.data]);
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
                  else {
                    setPeopleAjax([]);
                  }

                  setPeopleAjaxHasJustBeenSet(false);

      }
















      document.body.style.overflow = "hidden";




      if (hasBeenClosed){
        props.disappearChatExplorer();
      }

      window.addEventListener('scroll', peopleOnScroll, true);
      //window.addEventListener("scroll", handleScrollDown);
      
/*
        function handleClickOutside(event) {
            if (clickOutsideRef.current && !clickOutsideRef.current.contains(event.target)) {
              //console.log("You clicked outside of me!");
              setPeopleAjax(false);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          */

        //const myNode = ReactDOM.findDOMNode(refs.PeopleHolderRef)
        //myNode.addEventListener('scroll', handlePeopleScroll);
        //if(PeopleHolderRef.current){
         
            //function watchScroll() {
                //PeopleHolderRef.current.addEventListener('scroll', handlePeopleScroll);
            //}
              //watchScroll();
              
        //}
        
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
            
            const firstSession = myExplorerChatSessions.current.loadMyChatSessions();
            if (firstSession != null){
                onChangeChatWindow(firstSession);
            }
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
/*
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
              };*/
    
              //return () => {
                // Unbind the event listener on clean up
               // document.getElementById("PeopleDiv").removeEventListener("scroll", e => handleScrollDown(e));
              //};

              return () => {
                
                window.removeEventListener('scroll', peopleOnScroll, true);
              };
    }, [setHasLoaded, loadPeople, setPeople, setRefreshOnlinePeople]);

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

    const peopleOnScroll = (e) => {
      //alert("got into scroll");
      //e.stopPropagation();
      console.log("my id: " + e.target.id)
      if (e.target.id == "PeopleInnerContainer") {
        //setIsVisible(false);
        //console.log("variables: " + e.target.scrollHeight + "," + e.target.scrollY + "," + e.target.scrollTop + "," + mySessionsScrollRef.current.scrollTop + ", " + mySessionsScrollRef.current.scrollTop)
    
        if (atBottom(e.target)) {
          //amIInsideAtBottom = true;
    
          console.log("renewing sessions")
          renewMyPeople();
    
          //setTimeout(() => {  console.log("World!"); }, 3000);
          //amIInsideAtBottom = false;
        }
      }
    
    
      }



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
        
        const reactionItems = <div>{/*<PeopleScrollDownAlerter>*/}{people && [...Object.values(people)] //makes mappable
                                    //.sort((a, b) => a.time - b.time)
                                    .map((onePerson, index, people) => (
                                        <>
                                            <OnePeopleDivPerson isLastElement = {index + 1 == people.length ? true : false} onePerson = {onePerson} />
                                            
                                            
                                       
                                        </>
                                    ))  }{/*</PeopleScrollDownAlerter>*/}</div>
        
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
        <div className = {props.isLastElement? "DropDownMenuLastElement" : "DropdownMenu"}>
            <div className = "MenuItem" {...eventHandlers2} onMouseDown = {createNewChat.bind(null, props._id, props.firstName, props.lastName, props.profilePicture)}>
                <div className = "MenuItemInner" style={{background: hovered2 ? '#1aa3ff' : 'white'}}>Private Chat</div>
                
            </div>
            <div className = "MenuItem" {...eventHandlers3} onMouseDown = {addToExistingChat.bind(null, props._id, props.firstName, props.lastName, props.profilePicture)}>
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

    const EditSessionTitleMemoRef = useRef(0);

    const incrementEditSessionTitleMemoRef = () => EditSessionTitleMemoRef.current++;
    const EditSessionTitleMemoizedValue = useMemo(() => incrementChatSessionsUseMemoRef(), []);

    // the next line ensures that <UseMemoCounts /> only renders when the times value changes
//const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]);




async function renewMyPeople(){
  console.log("got inside renewmypeople")
    try {
      
  //console.log(JSON.stringify(user));

  //console.log("finalstring:" + FinalString());

  //const myArray= FinalString();//"1234,5678"//FinalString();

  //async function fetchAllChatMessages()  {
      console.log("inside getmypeople and bottommostpersonid: " + bottomMostPersonID);
      const res = await 
      axios.post(`${process.env.REACT_APP_API_URL}/api/profile/getAllPeople/`, {
        
        "bottomMostPersonID":bottomMostPersonID
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
        console.log("getAllPeopleResponseRenew" + JSON.stringify(response.data));
        console.log("here we go renew2: " + JSON.stringify(response));
        //if(temp[0].timeofmessage){
        //  setOldestTime(temp[12].timeofmessage);
        //}
        if(newArray[newArray.length - 1]._id){
          setBottomMostPersonID(newArray[newArray.length - 1]._id)
        }
        console.log("now messages are about to be set: " + JSON.stringify(response.data))
        //setScrollIncrementCount(scrollIncrementCount + 1);
        //setMessages([...newArray,...messages]);
        setPeople([...people,...newArray]);
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

function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //alert("You clicked outside of me!");
          setPeopleAjax(false);
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

  

    function OnePeopleDivPerson(props){
        return (
            <>
            <HoverContainer className = "HoverContainer">
               
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
                                    <Item isLastElement = {props.isLastElement} _id = {props.onePerson._id} firstName = {props.onePerson.firstName} lastName = {props.onePerson.lastName} profilePicture = {props.onePerson.profileImg}>
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
                                        
                                        {/*<button className = "AddDivButton" onClick = {createNewChat.bind(null, onePerson._id, onePerson.firstName, onePerson.lastName)}>+</button>
                                        <button className = "AddDivButton" onClick = {addToExistingChat.bind(null, onePerson._id, onePerson.firstName, onePerson.lastName)}>e</button>*/}
                                    </div>
                                    </Item>
                                    <div class = "RightDiv">
                                        <GreenDot />
                                    </div>    
                                        
                            </div>
                            <br />
                           
                            </HoverContainer>
                            </>          
        )


}
const HandleChange = (event) => {
        setTextValue(event.target.value);
        setPeopleAjaxHasJustBeenSet(true);
}

const setSessionToEditTitle = (session) => {
  console.log("is inside editing title in main" + session._id);
    setCurrentSessionToEditTitle(session);
    setIsEditingTitleSession(true);
    
}

function setLoadedPrivateSession(session){
    myExplorerChatSessions.current.setLoadedPrivateSession(session);

    //const myConst = myExplorerChatSessionsStateVal.value;
    //myConst++;

    refreshSessionWindow();
    //setMyExplorerChatSessionsStateVal(myConst);
}


const SearchPeopleHandleKeyDown = async (e) => {
    
    console.log("got into keydown: " + e.target.value + "key and keycode:" + e.key + ":" + e.keyCode);
    console.log(e);
    //if ((e.key === 'Enter' || e.keyCode === 13)) {
      var message = e.target.value;
      console.log("got into if");
      console.log("user" + JSON.stringify(user));
      

        //var objDiv = document.getElementById("Messages_Container");
        //objDiv.scrollTop = objDiv.scrollHeight;
        //setTextValue("");
        
      //}
      //else {
        //setSearchTextValue(e.target.value + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode - 48 : e.keyCode));
      //}
    }

    function saveNewTitleToRenderIntermediate(sessionid, title){
      myExplorerChatSessions.current.saveNewTitleToRender(sessionid, title);
    }

    return (
        
        <div id = "WholePage" >{/*style={/*{ cursor: isLoading? "wait" : "pointer" }*/}
            {/*isLoading && <LoadingAlert />*/}
            {isEditingTitleSession && <SessionEditTitle 
            closeMe = {() => setIsEditingTitleSession(false)} 
            mySession = {currentSessionToEditTitle}
            saveNewTitleToRender = {saveNewTitleToRenderIntermediate}
            /*memoizedValue = {EditSessionTitleMemoizedValue}*//>}


                <div id = "ExistingChats">
                        <ExplorerChatSessions ref={myExplorerChatSessions}
                        onChangeChatWindow={onChangeChatWindow} 
                        onChangeChatWindowFromMessageAjax = {onChangeChatWindowFromMessageAjax}
                        setIsLoading = {setIsLoading} memoizedValue = {chatSessionsMemoizedValue}
                        setSessionToEditTitle = {setSessionToEditTitle}
                        myVal = {myExplorerChatSessionsStateVal} />{/**  
                    ref={(ref) => myExplorerChatSessions=ref} */}

                        



                </div>
                <div id = "CEChatWindow">
                        <ExplorerChatWindow ref={myExplorerChatWindow} 
                        onLoadRender={onChangeChatWindow} 
                        setWhoIsOnline = {setWhoIsOnline}
                        myVal = {myExplorerChatWindowStateVal} 
                        refreshSessionWindow = {refreshSessionWindow} 
                        setLoadedPrivateSession = {setLoadedPrivateSession} />
                        {/**ref={(ref) => myExplorerChatWindow=ref} */}





                </div>
                <div id = "PeopleDiv">
                        <div id = "PeopleHeader">
                            People
                            <div id = "SearchPeopleContainer">
                                <img id = "SearchPeopleMagnifyingGlass"src = {magnifyingglass} />
                                <textarea id = "SearchPeopleInput" style = {{height:"40%",width:"80%"}} value = {textValue} onChange={HandleChange} onKeyDown = {SearchPeopleHandleKeyDown}  rows={1} placeholder="" />
                                <div id = "PeopleInnerContainer">
                                <OutsideAlerter>
                                {
                                    peopleAjax && [...Object.values(peopleAjax)] //makes mappable
                                    //.sort((a, b) => a.time - b.time)
                                    .map((onePersonAjax, index) => (
                                        <>{console.log("in map: " + onePersonAjax.firstName)}
                                            <AjaxSearchResult  _id = {onePersonAjax._id} firstName = {onePersonAjax.firstName} lastName = {onePersonAjax.lastName} profilePicture = {onePersonAjax.profileImg} />
                                             
                                    
                                        </>
                                    ))  

                                }
                                </OutsideAlerter>
                                </div>
                            </div>
                        </div>
                        <div id = "PeopleInnerContainerBox">
                            <div id = "PeopleInnerContainer"  ref = {PeopleHolderRef}>
                                    <GetReaction />

                            </div>
                        </div>
                        {/*<a href = {myUrl && myUrl}>click here</a>*/}
                        
                        <div id = "ExitWindow" onClick={() => setHasBeenClosed(true)}>
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
  
