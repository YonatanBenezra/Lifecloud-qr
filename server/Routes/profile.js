const Router = require('express');
const { profileModel } = require('./../models/Profile');
const ProfileRouter = Router();
const multer = require('multer');
const qr = require('qrcode');
const Email = require('../utils/email');
var { cloudinary, storage } = require('../utils/cloudinary');
const { addRow } = require('../utils/googleSheet');
const { User } = require('../models/User');

let uploadpic = multer({ storage: storage });
const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send('upload image error');
      resolve({
        res: res.secure_url,
      });
    });
  });
};

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
      let resultProfileImage;
      if (req.files.profileImg?.[0]?.path) {
        resultProfileImage = await cloudinary.uploader.upload(
          req.files.profileImg[0].path
        );
      }

      let resultWallImage;
      if (req.files.wallImg?.[0]?.path) {
        resultWallImage = await cloudinary.uploader.upload(
          req.files.wallImg[0].path
        );
      }

      let resultgraveImage;
      if (req.files.graveImg?.[0]?.path) {
        resultgraveImage = await cloudinary.uploader.upload(
          req.files.graveImg[0].path
        );
      }

      const multiFilesurls = [];
      const multifiles = req.files.multiplefiles || [];
      for (const file of multifiles) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        multiFilesurls.push(newPath);
      }

      const axisurls = [];
      const axisImagesObj = req.files.axisImages || [];
      for (const file of axisImagesObj) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        axisurls.push(newPath);
      }

      //new user
      let newUser = new profileModel({
        originalUser: req.body.originalUser,
        gallery: multiFilesurls.map((url) => {
          return url.res;
        }),
        organizationProfile: req.body.organizationProfile,
        profileImg: resultProfileImage?.secure_url,
        wallImg: resultWallImage?.secure_url,
        graveImg: resultgraveImage?.secure_url,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        privacy: req.body.privacy,
        gender: req.body.gender,
        facebookUrl: req.body.facebookUrl,
        instagramUrl: req.body.instagramUrl,
        birthDate: req.body.birthDate,
        deathDate: req.body.deathDate,
        hebBirthDate: req.body.hebBirthDate,
        hebDeathDate: req.body.hebDeathDate,
        degree: req.body.degree,
        city: req.body.city,
        wazeLocation: req.body.wazeLocation,
        description: req.body.description,
        googleLocation: req.body.googleLocation,
        lifeAxis: req.body.lifeAxis,
        isMain: req.body.isMain,

        axisImages: axisurls.map((url) => {
          return url.res;
        }),
      });

      //save and response
      newUser.save().then(async (resp) => {
        res.send(resp);
        const qrUrl = `https://lifecloud-qr.com/profiledetails/${resp._id}`;
        const user = await User.findById(resp.originalUser[0]);
        addRow({
          ID: resp._id,
          'Profile Name': resp.firstName + ' ' + resp.lastName,
          'User Name': user.firstName + ' ' + user.lastName,
          Email: user.email,
          Phone: user.phone,
          QR: qrUrl,
          'Creation Date': new Date().toLocaleDateString(),
          'Death Date': resp.deathDate,
          'Physical QR': req.body.email ? 0 : 1,
        });
        if (!req.body.email) {
          return;
        }

        var img = await qr.toDataURL(qrUrl);
        await new Email({ email: req.body.email }).sendProfileQR(
          req.body.firstName,
          img
        );
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
    { name: 'multiplefiles', maxCount: 99 },
    { name: 'axisImages', maxCount: 99 },
    { name: 'graveImg', maxCount: 1 },
  ]),
  async (req, res) => {
    // const axisImageChangeIndex = JSON.parse(
    //   req.body.axisImageChangeIndex
    // )?.sort();
    try {
      let resultProfileImage;
      if (req.files.profileImg?.[0]?.path) {
        resultProfileImage = await cloudinary.uploader.upload(
          req.files.profileImg[0].path
        );
      }

      let resultWallImage;
      if (req.files.wallImg?.[0]?.path) {
        resultWallImage = await cloudinary.uploader.upload(
          req.files.wallImg[0].path
        );
      }

      let resultgraveImage;
      if (req.files.graveImg?.[0]?.path) {
        resultgraveImage = await cloudinary.uploader.upload(
          req.files.graveImg[0].path
        );
      }

      const multiFilesurls = [];
      const multifiles = req.files.multiplefiles || [];
      for (const file of multifiles) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        multiFilesurls.push(newPath);
      }

      const axisurls = [];
      const axisImagesObj = req.files.axisImages || [];
      for (const file of axisImagesObj) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        axisurls.push(newPath);
      }

      const prevGalleryImg = Array.isArray(req.body.gallery)
        ? req.body.gallery
        : req.body.gallery
        ? [req.body.gallery]
        : [];

      const galleryUrls = multiFilesurls.map((url) => url.res);
      const newGalleryImg = Array.isArray(galleryUrls)
        ? galleryUrls
        : galleryUrls
        ? [galleryUrls]
        : [];

      if (req.files.profileImg && req.files.wallImg) {
        var dataSource = {
          originalUser: req.body.originalUser,
          profileImg: resultProfileImage?.secure_url,
          wallImg: resultWallImage?.secure_url,
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
          isMain: req.body.isMain,
          // axisImages: axisurls.map((url) => {
          //   return url.res;
          // }),
          facebookUrl: req.body.facebookUrl,
          instagramUrl: req.body.instagramUrl,
        };
      } else if (req.files.graveImg) {
        var dataSource = {
          graveImg: resultgraveImage?.secure_url,
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
          isMain: req.body.isMain,

          // axisImages: axisurls.map((url) => {
          //   return url.res;
          // }),
          facebookUrl: req.body.facebookUrl,
          instagramUrl: req.body.instagramUrl,
        };
      } else if (req.files.wallImg) {
        var dataSource = {
          originalUser: req.body.originalUser,
          wallImg: resultWallImage?.secure_url,
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
          isMain: req.body.isMain,
          // axisImages: axisurls.map((url) => {
          //   return url.res;
          // }),
          facebookUrl: req.body.facebookUrl,
          instagramUrl: req.body.instagramUrl,
        };
      } else if (req.files.profileImg) {
        var dataSource = {
          originalUser: req.body.originalUser,
          profileImg: resultProfileImage?.secure_url,
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
          isMain: req.body.isMain,

          // axisImages: axisurls.map((url) => {
          //   return url.res;
          // }),
          facebookUrl: req.body.facebookUrl,
          instagramUrl: req.body.instagramUrl,
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
          isMain: req.body.isMain,
          // axisImages: axisurls.map((url) => {
          //   return url.res;
          // }),
          facebookUrl: req.body.facebookUrl,
          instagramUrl: req.body.instagramUrl,
        };
      }
      const updateStr = {
        ...dataSource,
        gallery: [...newGalleryImg, ...prevGalleryImg],
      };
      if (axisurls.length > 0) {
        updateStr.axisImages = axisurls.map((url) => {
          return url.res;
        });
      }

      // if (axisurls.length > 0) {
      //   const userProfile = await profileModel.findById(req.body._id);
      //   if (userProfile.axisImages.length > 0) {
      //     let count = -1;

      //     updateStr.axisImages = [
      //       ...userProfile.axisImages.map((axisImage, index) => {
      //         if (axisImageChangeIndex.includes(index)) {
      //           count++;
      //           return axisurls[count].res;
      //         }
      //         return axisImage;
      //       }),
      //       ...axisurls.slice(count + 1).map((url, i) => {
      //         return url.res;
      //       }),
      //     ];
      //   } else {
      //     updateStr.axisImages = [
      //       ...axisurls.map((url, i) => {
      //         if (axisImageChangeIndex.includes(index)) {
      //           return url.res;
      //         }
      //         return null;
      //       }),
      //     ];
      //   }
      // }

      profileModel.findOneAndUpdate(
        { _id: req.body._id },
        updateStr,

        { upsert: true },
        (err, doc) => {
          if (err) {
            throw err;
          } else {
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
    .populate('friendRequests.user')
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

// ProfileRouter.put('/addFriends/:id', async (req, res) => {
//   console.log(req.params.id,"req")
//   let profileAccess = await profileModel.findById(req.params.id);
//   let pullreq = profileAccess.addFriends.find((friend) => {
//     console.log(friend.user,'friend');
//     return friend.user == req.body.userId;
//   });
//   console.log(pullreq, req.body.userId, 'pro');
//   if (pullreq && pullreq.user == req.body.userId) {
//     let result = await profileAccess.updateOne(
//       {
//         $pull: {
//           addFriends: { user: req.body.userId },
//         },
//       },
//       {
//         upsert: true, //to return updated document
//       }
//     );
//     res.send(profileAccess);
//   } else {
//     let result = await profileAccess.updateOne(
//       {
//         $push: {
//           addFriends: {
//             $each: [{ user: req.body.userId, isFriend: req.body.isFriend }],
//             $position: -1,
//           },
//         },
//       },
//       {
//         upsert: true, //to return updated document
//       }
//     );
//     res.send(profileAccess);
//   }
// });

ProfileRouter.put('/addFriendRequests/:id', async (req, res) => {
  let profileAccess = await profileModel.findById(req.params.id);
  let pullreq = profileAccess.friendRequests.find((friendRequest) => {
    console.log(friendRequest.user, 'friend');
    return friendRequest.user == req.body.userId;
  });
  if (pullreq && pullreq.user == req.body.userId) {
    // return false
    // let result = await profileAccess.updateOne(
    //   {
    //     $pull: {
    //       friendRequests: { user: req.body.userId },
    //     },
    //   },
    //   {
    //     upsert: true, //to return updated document
    //   }
    // );
    res.send('Friend req already sent');
  } else {
    let result = await profileAccess.updateOne(
      {
        $push: {
          friendRequests: {
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

// ProfileRouter.put('/addFriendRequest/:id', async (req, res) => {
//   console.log(req.params.id,"req")
//   try {
//     const filter = { _id: req.params.id, 'friendRequests._id': req.body.userId };
//     const options = { upsert: true };
//     const updateDoc = {
//       $set: {
//         'friendRequests.$.requested': req.body.requested,
//       },
//     };
//     const result = await profileModel.updateOne(filter, updateDoc, options);
//     res.send(true);
//   } catch (err) {
//     res.status(500).json(err);
//   }

// res.send('friend request accepted');

// } catch (err) {
//     res.status(500).json(err);
// }
// });

// ProfileRouter.put('/addAdmins/:id', async (req, res) => {
//   let profileAccess = await profileModel.findById(req.params.id);
//   let pullreq = profileAccess.addAdmins.find((friend) => {
//     return friend.user == req.body.userId;
//   });
//   // console.log(pullreq, req.body.userId, 'pro');
//   if (pullreq && pullreq.user == req.body.userId) {
//     let result = await profileAccess.updateOne(
//       {
//         $pull: {
//           addAdmins: { user: req.body.userId, isAdmin: req.body.isAdmin },
//         },
//       },
//       {
//         upsert: true, //to return updated document
//       }
//     );
//     res.send(profileAccess);
//   } else {
//     let result = await profileAccess.updateOne(
//       {
//         $push: {
//           addAdmins: {
//             $each: [{ user: req.body.userId, isAdmin: req.body.isAdmin }],
//             $position: -1,
//           },
//         },
//       },
//       {
//         upsert: true, //to return updated document
//       }
//     );
//     res.send(profileAccess);
//   }
// });
ProfileRouter.patch('/addFriends/:id', async (req, res) => {
  const profiles = await profileModel.findById(req.params.id);
  const friend = profiles.addFriends.find(
    (friend) => friend.user == req.body.userId
  );
  if (friend) return;
  const response = await profileModel.findByIdAndUpdate(
    req.params.id,

    {
      $push: {
        addFriends: { user: req.body.userId, isFriend: req.body.isFriend },
      },
    },
    { new: true }
  );

  res.send(response);
});
ProfileRouter.patch('/addAdmins/:id', async (req, res) => {
  const profiles = await profileModel.findById(req.params.id);

  const admin = profiles.addAdmins.find(
    (admin) => admin.user == req.body.userId
  );

  if (admin) return;
  const response = await profileModel.findByIdAndUpdate(
    req.params.id,

    {
      $push: {
        addAdmins: { user: req.body.userId, isAdmin: req.body.isAdmin },
      },
    },
    { new: true }
  );

  res.send(response);
});
ProfileRouter.patch('/addAdmins/:id', async (req, res) => {
  const profiles = await profileModel.findById(req.params.id);

  const admin = profiles.addAdmins.find(
    (admin) => admin.user == req.body.userId
  );

  if (admin) return;
  const response = await profileModel.findByIdAndUpdate(
    req.params.id,

    {
      $push: {
        addAdmins: { user: req.body.userId, isAdmin: req.body.isAdmin },
      },
    },
    { new: true }
  );

  res.send(response);
});
ProfileRouter.delete('/removeAdmin/:id', async (req, res) => {
  const response = await profileModel.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        addAdmins: { user: req.body.userId },
      },
    }
  );
  res.send(response);
});
ProfileRouter.delete('/removeFriend/:id', async (req, res) => {
  const response = await profileModel.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        addFriends: { user: req.body.userId },
      },
    }
  );

  res.send(response);
});
ProfileRouter.delete('/removeFriendRequest/:id', async (req, res) => {
  const response = await profileModel.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        friendRequests: { user: req.body.userId },
      },
    }
  );
  res.send(response);
});
// ProfileRouter.put('/addFriends/:id', async (req, res) => {
//   let profileAccess = await profileModel.findById(req.params.id);
//   let pullreq = profileAccess.addAdmins.find((friend) => {
//     return friend.user == req.body.userId;
//   });
//   // console.log(pullreq, req.body.userId, 'pro');
//   if (pullreq && pullreq.user == req.body.userId) {
//     let result = await profileAccess.updateOne(
//       {
//         $pull: {
//           addFriends: { user: req.body.userId, isFriend: req.body.isFriend },
//         },
//       },
//       {
//         upsert: true, //to return updated document
//       }
//     );
//     res.send(profileAccess);
//   } else {
//     let result = await profileAccess.updateOne(
//       {
//         $push: {
//           addFriends: {
//             $each: [{ user: req.body.userId, isFriend: req.body.isFriend }],
//             $position: -1,
//           },
//         },
//       },
//       {
//         upsert: true, //to return updated document
//       }
//     );
//     res.send(profileAccess);
//   }
// });

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
ProfileRouter.patch('/updateObjectYPos/:id', async (req, res) => {
  try {
    const profile = await profileModel.findByIdAndUpdate(
      req.params.id,
      { objectYPos: req.body.objectYPos },
      { new: true }
    );
    res.json(profile);
  } catch (e) {
    console.log(e);
  }
});

module.exports = { ProfileRouter };
