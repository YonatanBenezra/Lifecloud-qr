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
const { NotificationsRouter } = require('./Routes/notifications');
const { ProfileRouter, uploadpic } = require('./Routes/profile');
var cors = require('cors');
dotenv.config();
mongoose.connect(process.env.MONGO_URL, (err, data) => {
  console.log(err || data);
  console.log('mongodb  connected');
});
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: '5mb',
  })
);

app.use(bodyParser.json());

app.use(`${process.env.REACT_APP_API_URL}/api/users`, UserRouter);
app.use(`${process.env.REACT_APP_API_URL}/api/memory`, MemoryRouter);
app.use(`${process.env.REACT_APP_API_URL}/api/notification`, NotificationsRouter);
app.use(`${process.env.REACT_APP_API_URL}/api/auth`, AuthRouter);
app.use(`${process.env.REACT_APP_API_URL}/api/posts`, PostRouter);
app.use(`${process.env.REACT_APP_API_URL}/api/profile`, ProfileRouter);
app.use(express.static('./server'));
app.use(express.static(path.join(__dirname, 'client/build')));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
