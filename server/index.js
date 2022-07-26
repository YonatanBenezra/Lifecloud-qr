const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const { MemoryRouter } = require('./Routes/memory');
const { UserRouter } = require('./Routes/users');
const { AuthRouter } = require('./Routes/auth');
const { PostRouter } = require('./Routes/posts');
const { PaymentRouter } = require('./Routes/payment');
const { NotificationsRouter } = require('./Routes/notifications');
const { ProfileRouter } = require('./Routes/profile');
const { CandleFlowerRouter } = require('./Routes/candleFlower');
const { cloudinary, storage } = require('./utils/cloudinary');
const cors = require('cors');
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then((con) => {
    console.log('DB Connected Successfully');
  });

app.use(cors({ origin: '*' }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '8mb',
  })
);

app.use(bodyParser.json());
app.use(express.static('./server'));
app.use(express.static(path.join(__dirname, 'client/build')));

const { User } = require('./models/User');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const upload = multer({ storage: storage });
app.patch(
  '/updateUserProfilePicture',
  upload.single('mainProfilePicture'),
  async (req, res) => {
    const { _id: userId } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const response = await User.findOneAndUpdate(
      { _id: ObjectId(userId) },
      { mainProfilePicture: result.secure_url },
      { new: true }
    );

    res.json(response);
  }
);

app.all('/insertOrUpdate', async (req, res) => {
  const { email, firstName, lastName, profilePicture, user_type } = req.body;
  const query = { email: email };
  const update = {
    $set: {
      email,
      firstName,
      lastName,
      profilePicture,
      user_type,
    },
  };
  const options = { upsert: true };
  await User.updateOne(query, update, options);
  const user = await User.findOne({ email: email });
  res.json(user);
});

app.use('/api/users', UserRouter);
app.use('/api/memory', MemoryRouter);
app.use('/api/notification', NotificationsRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api/candleFlower', CandleFlowerRouter);
app.use('/api/payment', PaymentRouter);

//Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Something went wrong' });
});
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
