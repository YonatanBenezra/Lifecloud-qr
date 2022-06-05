const Router = require('express');
const { Memory } = require('../models/Memory');
const { Notifications } = require('../models/Notifications');
const NotificationsRouter = Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: 'life.cloud.fiverr@gmail.com',
    pass: 'wfaguxqqiiziybkq',
  },
});

//Send Notification
NotificationsRouter.post('/sendNotificationEmail', async (req, res) => {
  try {
    var mailOptions = {
      from: 'life.cloud.fiverr@gmail.com',
      to: req.body.email,
      subject: `Fried request notification on ${req.body.profileName}`,
      text: 'LifeCloud-QR',
      attachDataUrls: true,
      html: `Your have a fried request notification on ${req.body.profileName}. Request sent by ${req.body.userName}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(info);
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//Update User
NotificationsRouter.post('/addnotifications', async (req, res) => {
  try {
    let { profileId, loggedInId, notificationType } = req.body;
    console.log(loggedInId);
    let createNotifications = new Notifications({
      memoryCreatorNotification: profileId,
      logedInUser: loggedInId,
      notificationType: notificationType,
    });
    let res = await createNotifications.save();
    res.send(res);
  } catch (error) {
    res.send(error);
  }
});

NotificationsRouter.get('/getallNotifications', (req, res) => {
  Notifications.find({})
    .sort({ createdAt: -1 })
    .populate('memoryCreatorNotification')
    .populate('logedInUser') // key to populate
    .then((resonse) => {
      if (!resonse) {
        return res.status(404).json({
          message: 'data not found',
        });
      }
      res.json(resonse);
    });
});

module.exports = { NotificationsRouter };
