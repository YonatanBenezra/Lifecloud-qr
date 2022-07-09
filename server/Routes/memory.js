const Router = require('express');
const { Memory } = require('./../models/Memory');
var { cloudinary, storage } = require('../utils/cloudinary');
const MemoryRouter = Router();
const multer = require('multer');

let uploadpic = multer({ storage: storage });

MemoryRouter.post(
  '/createMemory',
  uploadpic.fields([
    { name: 'memoryImges', maxCount: 1 },
    { name: 'memoryVideo', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let resultImage;
      if (req.files.memoryImges?.[0]?.path) {
        resultImage = await cloudinary.uploader.upload(
          req.files.memoryImges[0].path
        );
      }
      let resultVideo;
      if (req.files.memoryVideo?.[0]?.path) {
        resultVideo = await cloudinary.uploader.upload(
          req.files.memoryVideo[0].path,
          { resource_type: 'video' }
        );
      }

      let newUser = new Memory({
        originalUser: req.body.originalUser,
        file: resultImage?.secure_url,
        memoryVideo: resultVideo?.secure_url,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        description: req.body.description,
        likes: [],
        comments: [],
      });

      newUser.save().then((resp) => {
        res.send(resp);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

MemoryRouter.put('/like/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body.userId);
    const memory = await Memory.findById(req.params.id);
    if (!memory.likes.includes(req.body.userId)) {
      await memory.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('The post has been liked');
    } else {
      await memory.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.put('/comment/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const memory = await Memory.findById(req.params.id);
    await memory.updateOne(
      {
        $push: {
          comments: {
            $each: [
              {
                text: req.body.comments[0].text,
                userPicture: req.body.comments[0].userPicture,
                id: Math.ceil(Math.random() * 1000),
                date: Date.now(),
              },
            ],
            $position: -1,
          },
        },
      },
      {
        upsert: true, //to return updated document
      }
    );
    res.status(200).json('Coment Added');
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.delete('/commentdell/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    await Memory.updateOne(
      { _id: req.params.id },
      { $pull: { comments: req.body.comment } }
    );
    res.status(200).json('Comment Deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.delete('/commentdellOBJ/:id', async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    await Memory.deleteOne({ _id: req.params.id });
    res.status(200).json('Comment Deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

MemoryRouter.get('/getallmemory/:id', (req, res) => {
  Memory.find({ originalUser: req.params.id }).then((resonse) => {
    if (!resonse) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    res.json(resonse);
  });
});

MemoryRouter.get('/getSingleMemory/:id', (req, res) => {
  Memory.findById(req.params.id).then((resonse) => {
    if (!resonse) {
      return res.status(404).json({
        message: 'data not found',
      });
    }
    res.json(resonse);
  });
});

module.exports = { MemoryRouter };
