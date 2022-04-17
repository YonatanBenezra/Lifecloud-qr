const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    memoryCreatorNotification: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    ],
    logedInUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    notificationType: {
      type: String,
      enum: ['memoryCreation', 'profileVisit'],
      default: 'memoryCreation',
    },
  },

  {
    timestamps: true,
  }
);

const Notifications = mongoose.model('Notification', NotificationSchema);

module.exports = { Notifications };