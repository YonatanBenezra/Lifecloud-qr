const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    originalUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    addAdmins: [
      {
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        isAdmin: {
          type: Boolean,
        },
      },
    ],
    // addAdmins: {
    //     user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    //     isAdmin: Boolean
    // },
    addFriends: [
      {
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        isFriend: {
          type: Boolean,
        },
      },
    ],
    profileImg: {
      type: String,
    },
    privacy: {
      type: String,
    },
    wallImg: {
      type: String,
    },
    graveImg: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    deathDate: {
      type: Date,
    },
    gender: {
      type: String,
    },
    wazeLocation: {
      type: String,
    },
    googleLocation: {
      type: String,
    },
    description: {
      type: String,
    },
    gallery: {
      type: Array,
    },
    lifeAxis: {
      type: String,
    },
  },
  { timestamps: true }
);

const profileModel = mongoose.model('Profile', PostSchema);

module.exports = { profileModel };
