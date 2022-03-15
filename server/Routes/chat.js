const Router = require('express');
const { chatMessageModel } = require('../models/ChatMessageModel');
const { ChatHistory } = require('./../models/ChatHistory');
const ChatRouter = Router();



ChatRouter.post('/saveMessage',  async (req, res) => {//was post and not put, and not async

    
    
    //.findByChatuserIDs(req.params.id);

    //var query = dbSchemas.SomeValue.find({}).select({ "name": 1, "_id": 0});

    //var query = dbSchemas.SomeValue.find({}).select('name -_id');
    try {
        console.log(req.body);
        var message = new chatMessageModel({
          user_one_id: req.body.user_one_id,
          user_two_id: req.body.user_two_id,
          message: req.body.message,
          //timeofmessage: req.body.timeofmessage,
          action_user_id: req.body.action_user_id

        });
        message.save().then((resp) => {
          res.send(resp);
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }


    
  })



ChatRouter.get('/getAllChatMessages/:id', (req, res, next) => {

    let myString = req.params.id;
    let myArray = myString.split(',');
    let userOneID = parseInt(myArray[0]);
    let userTwoID = parseInt(myArray[1]);

  chatMessageModel
  //.find({"chatUserIDs": myProfileID + "," + req.params.id})
  .find({$and:[{user_one_id: userOneID} , {user_two_id: userTwoID}]})
  //.sort('-date')
  .select({})//was here
    //.populate('originalUser')
    //.populate('')
    //.exec() // key to populate
    .then((response) => {
      if (!response) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(response);
    });
});
/*
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
*/


module.exports = { ProfileRouter };
