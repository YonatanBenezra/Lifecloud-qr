const Router = require('express');
const { profileModel } = require('./../models/Profile');
const { chatMessageModel } = require('./../models/ChatMessageModel');
const { chatSessionModel } = require('./../models/ChatSessionModel');
const { userModel } = require('./../models/User');
const ProfileRouter = Router();
const multer = require('multer');
var storage = multer.diskStorage({
  destination: './server/picUploader/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let uploadpic = multer({ storage: storage });


ProfileRouter.post('/getAjaxSearchSessionsTitle', (req, res, next) => {//:id

  let myTitle = req.body.title;
  let userid = req.body.userid;
 
  
  
  var myFind = {title: {$regex: new RegExp(myTitle, "i")}};
  
//{'title': {$regex: myTitle, $options: 'i'}}//
  var mysort = { title: -1 };
  let mySessions = chatSessionModel //was userModel
  //.find({})
  .find(myFind)
  .sort(mysort)
  .limit(5)
  .populate('title','_id')
  .then((response) => {
      
    if (!response) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    console.log("ajax response getAjaxSearchSessionsTitle: " + JSON.stringify(response))
    //return response;
    res.json(response);
    //res.write(response);
  });



//.sort('-timeofmessage')


});





ProfileRouter.post('/getAjaxSearchSessionsChatBody', (req, res, next) => {//:id

  let text = req.body.text;
  let userid = req.body.userid;
 
  

  let myChatSessions = chatSessionModel //was userModel
  //.find({})
  .find({"users": userid})
  //.populate('title','_id')
  .then((response) => {
    var myChatSessionIDs = [];
    for (var i = 0;i<response.length;i++){
      //        ^^^^
        myChatSessionIDs.push(response[i]._id);
    }

    
  var myFind = {$and:[ {"message": {$regex: new RegExp(text, "i")}}, {"chat_session_id": myChatSessionIDs}]}


  var mysort = { _id: -1 };
  let myChatMessages = chatMessageModel //was userModel
  //.find({})
  .find(myFind)
  .sort(mysort)
  .limit(5)
  //.populate('_id','users','userInfo')
  .then((response) => {
      
    if (!response) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    console.log("ajax response: " + JSON.stringify(response))
    //return response;
    res.json(response);
    //res.write(response);
  });



//.sort('-timeofmessage')

  })
});




ProfileRouter.post('/getChatMessagesNewerThanOneMessage', (req, res, next) => {//:id

  let message = req.body.message;
  //let session = req.body.session;
 
  var mysort = { _id: 1 };

  let myChatMessage = chatMessageModel //was userModel
  //.find({})
  .find({"chat_session_id":message.chat_session_id,"_id": {$gte: message._id}})
  .sort(mysort)
  //.populate('sender_firstName','sender_lastName','timeofmessage','sender_profile_src')
  .then((response) => {
        let myChatMessage = chatMessageModel //was userModel
        //.find({})
        .find({"chat_session_id":message.chat_session_id,"_id": {$lt: message._id}})
        .limit(10)
        .sort(mysort)
        //.populate('sender_firstName','sender_lastName','timeofmessage','sender_profile_src')
        .then((response2) => {

              if (!response) {
                return res.status(404).json({
                  message: 'data not found',
                });
              }
              console.log("ajax response: " + JSON.stringify(response))
              //return response;


              const finalResponse = {
                response1:response2,
                response2:response
               
              }


              

              res.json(finalResponse);
              //res.write(response);
        })
  });



//.sort('-timeofmessage')

  
});

ProfileRouter.post('/getChatMessagesSurroundingOneMessage', (req, res, next) => {//:id

  let message = req.body.message;
  //let session = req.body.session;
 
  var mysort = { _id: 1 };

  let myChatMessage = chatMessageModel //was userModel
  //.find({})
  .find({"chat_session_id":message.chat_session_id,"_id": {$gte: message._id}})
  .sort(mysort)
  .limit(10)
  
  //.populate('sender_firstName','sender_lastName','timeofmessage','sender_profile_src')
  .then((response) => {
        var mysort = { _id: -1 };
        let myChatMessage = chatMessageModel //was userModel
        //.find({})
        .find({"chat_session_id":message.chat_session_id,"_id": {$lt: message._id}})
        .sort(mysort)
        .limit(10)
        
        //.populate('sender_firstName','sender_lastName','timeofmessage','sender_profile_src')
        .then((response2) => {

              if (!response) {
                return res.status(404).json({
                  message: 'data not found',
                });
              }
              console.log("ajax response: " + JSON.stringify(response))
              //return response;
              response2 = response2.reverse();

              const finalResponse = {
                response1:response2,
                response2:response
               
              }


              

              res.json(finalResponse);
              //res.write(response);
        })
  });



//.sort('-timeofmessage')

  
});



ProfileRouter.post('/getChatSessionFromSessionID', (req, res, next) => {//:id

  let sessionID = req.body.sessionID;
 
  

  let myChatSessions = chatSessionModel //was userModel
  //.find({})
  .findOne({"_id": sessionID})
  .populate('title','_id')
  .then((response) => {
    
    if (!response) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    console.log("ajax response: " + JSON.stringify(response))
    //return response;
    res.json(response);
    //res.write(response);
  });



//.sort('-timeofmessage')

  
});






ProfileRouter.post('/getAjaxSearchPeople', (req, res, next) => {//:id

          let firstName = req.body.firstName;
          let lastName = req.body.lastName;
         
          var myFind = {}
          if (lastName == ""){
            myFind = {"firstName": {$regex: '.*' + firstName + '.*'}}
          }
          else {
          myFind = {$or:[ {"firstName": {$regex: '.*' + firstName + '.*'}}, {"lastName": {$regex: '.*' + lastName + '.*'}}]}
          }

          var mysort = { lastName: -1 };
          let myPeople = profileModel //was userModel
          //.find({})
          .find({})
          .sort(mysort)
          .limit(5)
          .populate('firstName','lastname')
          .then((response) => {
              
            if (!response) {
              return res.status(404).json({
                message: 'data not found',
              });
            }
            console.log("ajax response: " + JSON.stringify(response))
            //return response;
            res.json(response);
            //res.write(response);
          });
  
  
  
  //.sort('-timeofmessage')
  

});



ProfileRouter.post('/getAllPeople', (req, res, next) => {//:id

  let bottomMostPersonID = req.body.bottomMostPersonID;

  if (bottomMostPersonID == ""){
          //var mysort = { lastupdated: -1 };
          let myPeople = profileModel //was userModel
          //.find({})
          .find({})
          //.sort(mysort)
          .limit(14)
          .populate('firstName','lastname')
          .then((response) => {
              
            if (!response) {
              return res.status(404).json({
                message: 'data not found',
              });
            }
            //return response;
            res.json(response);
            //res.write(response);
          });
  }
  else{
    console.log("my object id is: " + bottomMostPersonID)
        //var mysort = { lastupdated: -1 };
        let myPeople = profileModel //was userModel
        //.find({})
        .find({_id: {$gt: bottomMostPersonID}})
        //.sort(mysort)
        .limit(14)
        .populate('firstName','lastname')
        .then((response) => {
            
          if (!response) {
            return res.status(404).json({
              message: 'data not found',
            });
          }
          //return response;
          res.json(response);
          //res.write(response);
        });
  }

  
  //.sort('-timeofmessage')
  

});







ProfileRouter.post('/getSessionInfo', (req, res, next) => {//:id
  let sessionID = req.body.sessionID;  //params.id;
  //let arrMyID = myID;//was [myID]
  //var mysort = { lastupdated: -1 };
  let mySessions = chatSessionModel
  //.find({})
  .findOne({ _id: sessionID })
  //.populate('users','userinfo','title','timeofcreation','lastmessage','lastupdated')
  .then((response) => {
      
    if (!response) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    //return response;
    res.json(response);
    //res.write(response);
  });
  
  //.sort('-timeofmessage')
  


});

ProfileRouter.post('/getAllChatSessions', (req, res, next) => {//:id

  let bottomMostSessionID = req.body.bottomMostSessionID;
  let myID = req.body.userid;  //params.id;
  let skipCount = req.body.skipCount;
  let isArchived = req.body.isArchived;
  var mysort = { lastupdated: -1 };
console.log("got into getAllChatSessions and skipcount = " + skipCount)
  //if (bottomMostSessionID == ""){
          //var mysort = { lastupdated: -1 };
      try{
          if (!isArchived){
                  let mySessions = chatSessionModel //was userModel
                  //.find({})
                  .find({ users: {$all: myID}, archiveUserIDList: {$ne: myID } })
                  .sort(mysort)
                  .skip(skipCount * 13)
                  .limit(13)
                  //.populate('firstName','lastname')
                  .then((response) => {
                      
                    if (!response) {
                      return res.status(404).json({
                        message: 'data not found',
                      });
                    }
                    //return response;
                    res.json(response);
                    //res.write(response);
                  });
        }
        else { //is Archived

                let mySessions = chatSessionModel //was userModel
                //.find({})
                .find({ users: {$all: myID}, archiveUserIDList: {$all: myID } })
                .sort(mysort)
                .skip(skipCount * 13)
                .limit(13)
                //.populate('firstName','lastname')
                .then((response) => {
                    
                  if (!response) {
                    return res.status(404).json({
                      message: 'data not found',
                    });
                  }
                  //return response;
                  res.json(response);
                  //res.write(response);
                });

        }
  }
  catch (err) {
    res.status(500).json(err);
  }
  //}
  /*else{
    console.log("my object id is: " + bottomMostPersonID)
        //var mysort = { lastupdated: -1 };
        let myPeople = profileModel //was userModel
        //.find({})
        .find({_id: {$gt: bottomMostPersonID}})
        //.sort(mysort)
        .limit(14)
        .populate('firstName','lastname')
        .then((response) => {
            
          if (!response) {
            return res.status(404).json({
              message: 'data not found',
            });
          }
          //return response;
          res.json(response);
          //res.write(response);
        });
  }
*/

});

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

ProfileRouter.post('/getAllChatMessagesFromSessionID', (req, res, next) => {//:id

  let myString = req.body.sessionID;  //params.id;
  //let myNewestTime= req.body.time;
  /*if (myNewestTime == null){
    myNewestTime = Date.now();
  }*/
  //let scrollIncrementCount= req.body.scrollIncrementCount;
  //console.log("scroll increment count of mine: " + scrollIncrementCount)
  //console.log("my newest time: " + myNewestTime)
  //let arrSessionID = [myString];
  var mysort = { timeofmessage: -1 };//from bottom going up
  let myChatMessages = chatMessageModel
  //.find({})
  .find({ chat_session_id: myString})//timeofmessage: {$lt: myNewestTime}})//, timeofmessage: {$lte: myNewestTime}
  .sort(mysort)
  .limit(12)
  .populate('message')
  
  .then((response) => {
      console.log("my response:" + JSON.stringify(response));
    if (!response) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    
    //return response;
    res.json(response);
    //res.write(response);
  });
  
  //.sort('-timeofmessage')
  

});

ProfileRouter.post('/getTopMoreAllChatMessagesFromSessionID', (req, res, next) => {//:id

  let myString = req.body.sessionID;  //params.id;
  //let myNewestTime= req.body.time;
  //if (myNewestTime == null){
  //  myNewestTime = Date.now();
  //}
  let myOldestIDSoFar = req.body.myOldestIDSoFar;
  //let scrollIncrementCount= req.body.scrollIncrementCount;
  //console.log("scroll increment count of mine: " + scrollIncrementCount)
  //console.log("my newest time: " + myNewestTime)
  //let arrSessionID = [myString];
  var mysort = { timeofmessage: -1 };//from bottom going up
  let mySession = chatMessageModel
  //.find({})
  .find({ chat_session_id: myString, _id: {$lt: myOldestIDSoFar}})//timeofmessage: {$lt: myNewestTime}})//, timeofmessage: {$lte: myNewestTime}
  .sort(mysort)
  //.skip(12 * scrollIncrementCount)
  .limit(12)
  .populate('message')
  
  .then((response) => {
      console.log("my response:" + JSON.stringify(response));
    if (!response) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    
    //return response;
    res.json(response);
    //res.write(response);
  });
  
  //.sort('-timeofmessage')
  

});

ProfileRouter.post('/getBottomMoreAllChatMessagesFromSessionID', (req, res, next) => {//:id

  let myString = req.body.sessionID;  //params.id;
  //let myNewestTime= req.body.time;
  //if (myNewestTime == null){
  //  myNewestTime = Date.now();
  //}
  let myNewestIDSoFar = req.body.myNewestIDSoFar;
  //let scrollIncrementCount= req.body.scrollIncrementCount;
  //console.log("scroll increment count of mine: " + scrollIncrementCount)
  //console.log("my newest time: " + myNewestTime)
  //let arrSessionID = [myString];
  if (myNewestIDSoFar != ""){
                var mysort = { timeofmessage: 1 };//from bottom going up
                let mySession = chatMessageModel
                //.find({})
                .find({ chat_session_id: myString, _id: {$gt: myNewestIDSoFar}})//timeofmessage: {$lt: myNewestTime}})//, timeofmessage: {$lte: myNewestTime}
                .sort(mysort)
                //.skip(12 * scrollIncrementCount)
                .limit(12)
                .populate('message')
                
                .then((response) => {
                    console.log("my response:" + JSON.stringify(response));
                  if (!response) {
                    return res.status(404).json({
                      message: 'data not found',
                    });
                  }
                  
                  //return response;
                  res.json(response);
                  //res.write(response);
                });
  
  //.sort('-timeofmessage')
  
      }
});


ProfileRouter.post('/archiveSession', (req, res, next) => {//:id

  try{
      let userID = req.body.userID;  //params.id;
      let chatSessionID = req.body.sessionID;
     
     

      chatSessionModel.find({ _id: chatSessionID }, function(err, chatSession) {
        
        //console.log("all results: " + JSON.stringify(chatSession, null, 2))

        const myExistingArchiveUserIDsArray = chatSession[0].archiveUserIDList;
        
        if (!myExistingArchiveUserIDsArray.includes(userID))
            myExistingArchiveUserIDsArray.push(userID);
        
        chatSession[0].archiveUserIDList = myExistingArchiveUserIDsArray;
        chatSession[0].save(function(err, updatedChatSession) {
          console.log("updatedChatSession" + JSON.stringify(updatedChatSession))
          //res.json("Success!");
          var mysort = { lastupdated: -1 };
                let mySessions = chatSessionModel //was userModel
                //.find({})
                .find({ users: {$all: userID}, archiveUserIDList: {$ne: userID } })
                .sort(mysort)
                .skip(0 * 13)
                .limit(13)
                //.populate('firstName','lastname')
                .then((response) => {
                    
                  if (!response) {
                    return res.status(404).json({
                      message: 'data not found',
                    });
                  }
                  //return response;
                  res.json(response);
                  //res.write(response);
                });
        });
        
    });
      
      
  }
  catch (err) {
    res.status(500).json(err);
  }

  

});

ProfileRouter.post('/unArchiveSession', (req, res, next) => {//:id

  try{
      let userID = req.body.userID;  //params.id;
      let chatSessionID = req.body.sessionID;
     
     

      chatSessionModel.find({ _id: chatSessionID }, function(err, chatSession) {
        
        //console.log("all results: " + JSON.stringify(chatSession, null, 2))

        const myExistingArchiveUserIDsArray = chatSession[0].archiveUserIDList;
        
        if (myExistingArchiveUserIDsArray.includes(userID))
            removeItemAll(myExistingArchiveUserIDsArray,userID);
        
        chatSession[0].archiveUserIDList = myExistingArchiveUserIDsArray;
        chatSession[0].save(function(err, updatedChatSession) {
          console.log("updatedChatSession" + JSON.stringify(updatedChatSession))
          //res.json("Success!");
                var mysort = { lastupdated: -1 };
                let mySessions = chatSessionModel //was userModel
                //.find({})
                .find({ users: {$all: userID}, archiveUserIDList: {$all: userID } })
                .sort(mysort)
                .skip(0 * 17)
                .limit(17)
                //.populate('firstName','lastname')
                .then((response) => {
                    
                  if (!response) {
                    return res.status(404).json({
                      message: 'data not found',
                    });
                  }
                  //return response;
                  res.json(response);
                  //res.write(response);
                });
        });
        
    });
      
      
  }
  catch (err) {
    res.status(500).json(err);
  }

  

});

function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

ProfileRouter.post('/setChatSessionTitle', (req, res, next) => {//:id

  try{
      let myTitle = req.body.value;  //params.id;
      let chatSessionID = req.body.sessionid;
     
     

      chatSessionModel.find({ _id: chatSessionID }, function(err, chatSession) {
        
        console.log("all results: " + JSON.stringify(chatSession, null, 2))

        chatSession[0].title = myTitle;
        chatSession[0].save(function(err, updatedChatSession) {
          console.log("updatedChatSession" + JSON.stringify(updatedChatSession))
          res.json("Success!");
        });
        
    });
      
      
  }
  catch (err) {
    res.status(500).json(err);
  }

  

});


ProfileRouter.post('/setSessionHasBeenClicked', (req, res, next) => {//:id

  try{
      let myString = req.body.sessionID;  //params.id;
      
      //let arrSessionID = [myString];
      //var mysort = { timeofmessage: 1 };
      const filter = { chat_session_id: myString };
      const update = { hasNotBeenRead: false };
      /*
      let mysessions = chatSessionModel.find({ _id: myString }
        ).then((mySessionModel) => {
        console.log("my result sessions: " + JSON.stringify(mySessionModel, null, 2))
        });
*/
      chatSessionModel.findOne({ _id: myString }, function(err, chatSession) {
        chatSession.hasNotBeenRead = false;
        chatSession.save(function(err, updatedChatSession) {
          console.log("updatedChatSession" + JSON.stringify(updatedChatSession))
          res.json("Success!");
        });
        
    });
      
      
  }
  catch (err) {
    res.status(500).json(err);
  }

  

});

ProfileRouter.post('/deleteAllSessionsWithUserPair', (req, res, next) => {//:id
      let myString = req.body.hisID + "," + req.body.myID;  //params.id;
      let myArray = myString.split(',');
      myArray.sort();
      let userOneID = myArray[0];
      let userTwoID = myArray[1];


      let mySession = chatSessionModel
      //.find({})
      .find({ users: [userOneID, userTwoID] })
      .remove().exec();;
      

})

ProfileRouter.post('/deleteAllSessions', (req, res, next) => {//:id
  

  let mySession = chatSessionModel
  .find({})
  //.find({ users: [userOneID, userTwoID] })
  .remove().exec();;
  
  res.json("nothing");
})

ProfileRouter.post('/deleteAllChatMessages', (req, res, next) => {//:id
  

  let myMessages = chatMessageModel
  .find({})
  //.find({ users: [userOneID, userTwoID] })
  .remove().exec();;
  
  res.json("nothing");
})





ProfileRouter.post('/getAllChatSessionsInfo', (req, res, next) => {

  let mySession = chatSessionModel
  //.find({})
  .find({})
  .then((mySessions) => {

      res.json(mySessions)
  })

})

ProfileRouter.post('/getAllChatMessagesFromPairOfUserIDs', async function (req, res, next){//:id
  let hisProfilePicture = req.body.hisProfilePicture; 
  let myProfilePicture = req.body.myProfilePicture; 

  let hisFirstName = req.body.hisFirstName; 
  let hisLastName = req.body.hisLastName; 
  let myFirstName = req.body.myFirstName; 
  let myLastName = req.body.myLastName; 

  //console.log("my two vars: " + );

  let myArray = [];
  myArray.push(req.body.myID)
  myArray.push(req.body.hisID)
  
  myArray.sort();
  let userOneID = myArray[0];
  let userTwoID = myArray[1];

  console.log("myarray is: " + myArray)
/*
  const fs = require('fs');
  fs.writeFile("C:/myfolder/log2.txt", "12345response: " + req.body.myString + " reqbody: " , function(err) {
      if(err) {
          return console.log(err);
      }
  
      console.log("The file was saved 3!");
  }); 
  */
  
      //let myMessages = chatMessageModel.find({_id: response._id})
      //.sort(mysort)

  let mySession = chatSessionModel
  //.find({})
  .findOne({ users: [userOneID, userTwoID] })
  
  .then((mySessionModel) => {
    var modifiedSessionModel = mySessionModel;
                    console.log("mysessionmodel: " + JSON.stringify(mySessionModel));
                  if (mySessionModel == null){
                            console.log("got here 1");
                            modifiedSessionModel = new chatSessionModel({

                              users: myArray,
                              title: "",
                              userInfo : [{
                                id: req.body.myID,
                                firstName: myFirstName,
                                lastName: myLastName,
                                profilePicture: myProfilePicture
                              },
                              {
                                id: req.body.hisID,
                                firstName: hisFirstName,
                                lastName: hisLastName,
                                profilePicture: hisProfilePicture
                              }],
                              title: "",
                              //timeofcreation: {type: Date, default:Date.now},
                              lastmessage: ""
                              //lastupdated: {type: Date, default:Date.now}
                              
                              //user_one_id: myInfo["user_one_id"],
                              //user_two_id: myInfo["user_two_id"],
                              //message: myInfo["message"],
                              //timeofmessage: req.body.timeofmessage,
                              //action_user_id: myInfo["action_user_id"]

                            });
                            console.log("got here 2: " + JSON.stringify(modifiedSessionModel.toJSON()));
                            modifiedSessionModel.save().then((sessionModel) => {
                              console.log("got here 3")
                              /*if (err) {
                                console.log(err)
                              }*/
                              //myChatSessionID = sessionModel.id;
                              console.log("sessionModel:" + sessionModel);
                                mySessionModel = sessionModel;

                                    var mysort = { timeofmessage: 1 };
                                    let myMessages = chatMessageModel.find({chat_session_id: mySessionModel._id})
                                    .sort(mysort)
                                    .limit(30)
                                      .populate('message') // key to populate
                                      .then((myChatResponse) => {
                    
                    
                    
                    
                                                const responseData = {
                                                  message:"Information Enclosed",
                                                  sessionModel: mySessionModel,
                                                  chatResponse: myChatResponse
                                                }
                                                  
                                                console.log("chatresponse: " + JSON.stringify(myChatResponse));
                                                //const jsonContent = JSON.stringify(responseData);
                                                res.json(responseData);
                                                return; 
                                      });
                              
                              });
                }
                else {

                var mysort = { timeofmessage: -1 };
                let myMessages = chatMessageModel.find({chat_session_id: mySessionModel._id})
                .sort(mysort)
                .limit(30)
                  .populate('message') // key to populate
                  .then((myChatResponse) => {




                            const responseData = {
                              message:"Information Enclosed",
                              sessionModel: mySessionModel,
                              chatResponse: myChatResponse
                            }
                              
                            console.log("chatresponse: " + JSON.stringify(myChatResponse));
                            //const jsonContent = JSON.stringify(responseData);
                            res.json(responseData);
                            return;
                  });

                }  
      });
    



});



/*
ProfileRouter.post('/saveChatMessageFromUserIDsPair',  async (req, res) => {//was post and not put, and not async
  console.log("got into savechatmessage2");
  
  try {
      console.log("req.body.info: " + req.body.info);

      const myInfo = JSON.parse(req.body.info);


      const fs = require('fs');
      fs.writeFile("C:/myfolder/log.txt", "req.bodyaaaaa: " + JSON.stringify(req.body), function(err) {
          if(err) {
              return console.log(err);
          }
      
          console.log("The file was saved!");
      }); 

      var senderID = "";
      var recipientID = "";
      if (myInfo[action_user_id] == 1){
        senderID = myInfo["user_one_id"];
        recipientID = myInfo["user_two_id"];
      }
      else {
        senderID = myInfo["user_two_id"];
        recipientID = myInfo["user_one_id"];
      }

      const myUserIDs = new Array(senderID, recipientID);
      myUserIDs.sort();


      let mySession = chatSessionModel
  //.find({})
  .find({ users: myUserIDs })
  .then((response) => {
      let myChatSessionID = "";
      if (!response.length){
          
          var sessionModel = new chatSessionModel({
            users: myUserIDs
            //user_one_id: myInfo["user_one_id"],
            //user_two_id: myInfo["user_two_id"],
            //message: myInfo["message"],
            //timeofmessage: req.body.timeofmessage,
            //action_user_id: myInfo["action_user_id"]
    
          });

          sessionModel.save(function(err,sessionModel) {
            myChatSessionID = sessionModel.id;
         });
      }
      else {
          let myChatSessionID = response[0].chat_session_id;
      }
      //console.log(response[0].chat_session_id);
      //var mysort = { timeofmessage: 1 };
      //let myMessages = chatMessageModel.find({chat_session_id: response.chat_session_id})
      //db.collection.find(<query>).count()
      var message = new chatMessageModel({
        chat_session_id: myChatSessionID,
        sender_user_id: senderID,
        message: myInfo["message"]
        
      });
      
      message.save().then((resp) => {
        res.send(resp);
      });
  });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


  
})
*/
ProfileRouter.post('/saveChatMessageFromSessionID',  async (req, res) => {//was post and not put, and not async
  console.log("got into savechatmessage2");
  
  try {
      console.log("req.body.info: " + req.body.info);

      const myInfo = JSON.parse(req.body.info);

      let sessionid = myInfo["sessionid"];
      let sender_user_id = myInfo["senderid"];
      let myMessage = myInfo["message"];
      let timeofmessage = Date.now();
      let sender_firstName = myInfo["senderfirstname"];
      let sender_lastName = myInfo["senderlastname"];

      let sender_profile_src = "";
      
      if (myInfo["senderprofilesrc"] != null){
        //sender_profile_src = myInfo["senderprofilesrc"];
      }
      
      var message = new chatMessageModel({
        chat_session_id: sessionid,
        sender_user_id: sender_user_id,
        message: myMessage,
        //timeofmessage: timeofmessage,
        sender_firstName: sender_firstName,
        sender_lastName: sender_lastName,
        sender_profile_src: sender_profile_src
      });
      
      message.save().then((resp) => {

        console.log("save response:" + resp);

        let mySession = chatSessionModel
            
        .findOne({ _id: sessionid })
        .then((doc) => {
            doc.lastmessage = myMessage;
            doc.save().then((resp) => {
              res.send(resp);
            
            })

      });
      })
 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


  
})


ProfileRouter.post('/addUserToChatSession',  async (req, res) => {//was post and not put, and not async
  console.log("entered addUser")
  
  try {
      //console.log("req.body.info: " + req.body.info);

      //const myInfo = JSON.parse(req.body);

      let chatsessionid = req.body.chatsessionid;
      let userid = req.body.userid;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let profilePicture = req.body.profilePicture;

      let mySession = chatSessionModel
      
      .findOne({ _id: chatsessionid })
      .then((doc) => {
        console.log("entered addUser response")
        let array = doc.users;
        if (!array.includes(userid)){
        
            let newArray = [...array, userid];

            doc.users = newArray;


            let array2 = doc.userInfo;
            let tempArray2 = myObj = {
                        id: userid,
                        firstName: firstName,
                        lastName: lastName,
                        profilePicture: profilePicture
            };
          
            let newArray2 = [...array2, tempArray2];

            doc.userInfo = newArray2;
            doc.save().then((sessionModel) => {

                console.log(sessionModel);


                res.send(sessionModel);

            });
        }
          //sent respnse to client
        }).catch(err => {
          console.log('Oh! Dark')
          res.status(500).json(err);
        });
      
    
 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


  
})


ProfileRouter.post('/setChatSessionLastUpdatedToNow',  async (req, res) => {//was post and not put, and not async
  
  
  try {
      //console.log("req.body.info: " + req.body.info);

      //const myInfo = JSON.parse(req.body);

      let chatsessionid = req.body.chatsessionid;
      

      let mySession = chatSessionModel
      
      .findOne({ _id: chatsessionid })
      .then((doc) => {
            doc.lastupdated = Date.now();
            console.log("got into save response: " + JSON.stringify(doc, null, 2));
        
            doc.save().then((sessionModel) => {

                console.log("in save and sessionmodel: " + JSON.stringify(sessionModel, null, 2));


                res.send(sessionModel);

            });
        
          //sent respnse to client
        }).catch(err => {
          console.log('Oh! Dark')
          res.status(500).json(err);
        });
      
    
 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


  
})



ProfileRouter.post(
  '/createYoniProfile',
  uploadpic.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'wallImg', maxCount: 1 },
    { name: 'multiplefiles', maxCount: 20 },
    { name: 'graveImg', maxCount: 1 },
    { name: 'axisImages', maxCount: 99 },
  ]),
  async (req, res) => {
    try {
      //gen new password
      const url = req.protocol + '://' + req.get('host');

      let multiFiles = req.files.multiplefiles.map((res) => {
        return res.path.slice(7);
      });
      //new user
      let newUser = new profileModel({
        originalUser: req.body.originalUser,
        gallery: multiFiles,
        profileImg: req.files.profileImg[0].path.slice(7),
        wallImg: req.files.wallImg[0].path.slice(7),
        graveImg: req.files.graveImg[0].path.slice(7),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        privacy: req.body.privacy,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        deathDate: req.body.deathDate,
        hebBirthDate: req.body.hebBirthDate,
        degree: req.body.degree,
        city: req.body.city,
        wazeLocation: req.body.wazeLocation,
        description: req.body.description,
        googleLocation: req.body.googleLocation,
        lifeAxis: req.body.lifeAxis,
        isMain: req.body.isMain,
        axisImages: req.files?.axisImages?.map((res) => {
          return res.filename;
        }),
      });

      //save and response
      newUser.save().then((resp) => {
        res.send(resp);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// create profile
ProfileRouter.post(
  '/createProfile',
  uploadpic.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'wallImg', maxCount: 1 },
    { name: 'multiplefiles', maxCount: 20 },
    { name: 'graveImg', maxCount: 1 },
    { name: 'axisImages', maxCount: 99 },
  ]),
  async (req, res) => {
    try {
      //gen new password
      const url = req.protocol + '://' + req.get('host');

      let multiFiles = req.files.multiplefiles.map((res) => {
        return res.path.slice(7);
      });
      //new user
      let newUser = new profileModel({
        originalUser: req.body.originalUser,
        gallery: multiFiles,
        profileImg: req.files.profileImg[0].path.slice(7),
        wallImg: req.files.wallImg[0].path.slice(7),
        graveImg: req.files.graveImg[0].path.slice(7),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        privacy: req.body.privacy,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        deathDate: req.body.deathDate,
        hebBirthDate: req.body.hebBirthDate,
        degree: req.body.degree,
        city: req.body.city,
        wazeLocation: req.body.wazeLocation,
        description: req.body.description,
        googleLocation: req.body.googleLocation,
        lifeAxis: req.body.lifeAxis,
        isMain: req.body.isMain,
        axisImages: req.files?.axisImages?.map((res) => {
          return res.filename;
        }),
      });

      //save and response
      newUser.save().then((resp) => {
        res.send(resp);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);



ProfileRouter.put(
  '/updateProfile',
  uploadpic.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'wallImg', maxCount: 1 },
    { name: 'multiplefiles', maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      //gen new password

      const url = req.protocol + '://' + req.get('host');
      console.log(req.body, 'body');
      console.log(req.files, 'file');
      //new user
      let multiFiles =
        req.files &&
        req.files.multiplefiles &&
        req.files.multiplefiles.map((res) => {
          return res.path.slice(7);
        });
      if (req.files.profileImg && req.files.wallImg) {
        var dataSource = {
          originalUser: req.body.originalUser,
          profileImg: req.files.profileImg[0].path.slice(7),
          wallImg: req.files.wallImg[0].path.slice(7),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          privacy: req.body.privacy,
          gender: req.body.gender,
          birthDate: req.body.birthDate,
          deathDate: req.body.deathDate,
          hebDeathDate: req.body.hebDeathDate,
          degree: req.body.degree,
          city: req.body.city,
          wazeLocation: req.body.wazeLocation,
          description: req.body.description,
          googleLocation: req.body.googleLocation,
          lifeAxis: req.body.lifeAxis,
          isMain: req.body.isMain
        };
      } else if (req.files.wallImg) {
        var dataSource = {
          originalUser: req.body.originalUser,
          // profileImg: req.files.profileImg[0].path.slice(7),
          wallImg: req.files.wallImg[0].path.slice(7),
          firstName: req.body.firstName,
          privacy: req.body.privacy,
          lastName: req.body.lastName,
          gender: req.body.gender,
          birthDate: req.body.birthDate,
          deathDate: req.body.deathDate,
          hebDeathDate: req.body.hebDeathDate,
          degree: req.body.degree,
          city: req.body.city,
          wazeLocation: req.body.wazeLocation,
          description: req.body.description,
          googleLocation: req.body.googleLocation,
          lifeAxis: req.body.lifeAxis,
          isMain: req.body.isMain
        };
      } else if (req.files.profileImg) {
        var dataSource = {
          originalUser: req.body.originalUser,
          profileImg: req.files.profileImg[0].path.slice(7),
          // wallImg: req.files.wallImg[0].path.slice(7),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          privacy: req.body.privacy,
          gender: req.body.gender,
          birthDate: req.body.birthDate,
          deathDate: req.body.deathDate,
          hebDeathDate: req.body.hebDeathDate,
          degree: req.body.degree,
          city: req.body.city,
          wazeLocation: req.body.wazeLocation,
          description: req.body.description,
          googleLocation: req.body.googleLocation,
          lifeAxis: req.body.lifeAxis,
          isMain: req.body.isMain
        };
      } else {
        var dataSource = {
          originalUser: req.body.originalUser,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          privacy: req.body.privacy,
          gender: req.body.gender,
          birthDate: req.body.birthDate,
          deathDate: req.body.deathDate,
          hebDeathDate: req.body.hebDeathDate,
          degree: req.body.degree,
          city: req.body.city,
          wazeLocation: req.body.wazeLocation,
          description: req.body.description,
          googleLocation: req.body.googleLocation,
          lifeAxis: req.body.lifeAxis,
          isMain: req.body.isMain
        };
      }
      profileModel.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: dataSource,
          $push: {
            gallery: {
              $each: multiFiles,
              $position: 0,
            },
          },
        },

        { upsert: true },
        (err, doc) => {
          if (err) {
            throw err;
          } else {
            console.log('Updated', doc);
            res.send(true);
          }
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

ProfileRouter.get('/getallprofile', (req, res) => {
  profileModel
    .find({})
    .populate('originalUser') // key to populate
    .then((resonse) => {
      if (!resonse) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(resonse);
    });
});

ProfileRouter.get('/getallprofileofSingleUser/:id', (req, res, next) => {
  profileModel
    .find({
      $or: [
        { originalUser: req.params.id },
        { 'addAdmins.user': req.params.id },
      ],
    })
    .populate('originalUser')
    .populate('')
    .exec() // key to populate
    .then((resonse) => {
      if (!resonse) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(resonse);
    });
});

ProfileRouter.get('/getSingleProfileDetails/:id', (req, res, next) => {
  profileModel
    .findById(req.params.id)
    .populate('originalUser')
    .populate('addFriends.user')
    .populate('addAdmins.user')
    .exec() // key to populate
    .then((resonse) => {
      if (!resonse) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(resonse);
    });
});

ProfileRouter.put('/addFriends/:id', async (req, res) => {
  let profileAccess = await profileModel.findById(req.params.id);
  let pullreq = profileAccess.addFriends.find((friend) => {
    console.log(friend);
    return friend.user == req.body.userId;
  });
  console.log(pullreq, req.body.userId, 'pro');
  if (pullreq && pullreq.user == req.body.userId) {
    let result = await profileAccess.updateOne(
      {
        $pull: {
          addFriends: { user: req.body.userId },
        },
      },
      {
        upsert: true, //to return updated document
      }
    );
    res.send(profileAccess);
  } else {
    let result = await profileAccess.updateOne(
      {
        $push: {
          addFriends: {
            $each: [{ user: req.body.userId, isFriend: req.body.isFriend }],
            $position: -1,
          },
        },
      },
      {
        upsert: true, //to return updated document
      }
    );
    res.send(profileAccess);
  }
});

ProfileRouter.put('/addAcceptFriends/:id', async (req, res) => {
  try {
    const filter = { _id: req.params.id, 'addFriends._id': req.body.userId };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        'addFriends.$.isFriend': req.body.isFriend,
      },
    };
    const result = await profileModel.updateOne(filter, updateDoc, options);
    res.send(true);
  } catch (err) {
    res.status(500).json(err);
  }

  // res.send('friend request accepted');

  // } catch (err) {
  //     res.status(500).json(err);
  // }
});

ProfileRouter.put('/addAdmins/:id', async (req, res) => {
  let profileAccess = await profileModel.findById(req.params.id);
  let pullreq = profileAccess.addAdmins.find((friend) => {
    return friend.user == req.body.userId;
  });
  console.log(pullreq, req.body.userId, 'pro');
  if (pullreq && pullreq.user == req.body.userId) {
    let result = await profileAccess.updateOne(
      {
        $pull: {
          addAdmins: { user: req.body.userId, isAdmin: req.body.isAdmin },
        },
      },
      {
        upsert: true, //to return updated document
      }
    );
    res.send(profileAccess);
  } else {
    let result = await profileAccess.updateOne(
      {
        $push: {
          addAdmins: {
            $each: [{ user: req.body.userId, isAdmin: req.body.isAdmin }],
            $position: -1,
          },
        },
      },
      {
        upsert: true, //to return updated document
      }
    );
    res.send(profileAccess);
  }
});

ProfileRouter.get('/searchProfile/:firstName', (req, res, next) => {
  profileModel
    .find({ firstName: { $regex: req.params.firstName, $options: 'i' } })
    .populate('originalUser')
    .populate('addFriends.user')
    .exec() // key to populate
    .then((resonse) => {
      if (!resonse) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(resonse);
    });
});

ProfileRouter.post('/graveLocation/:id', async (req, res) => {
  try {
    const location = req.body.location;
    const profile = await profileModel.findById(req.params.id);
    profile.googleLocation = location;
  } catch (e) {
    console.log(e);
  }
});

module.exports = { ProfileRouter };
