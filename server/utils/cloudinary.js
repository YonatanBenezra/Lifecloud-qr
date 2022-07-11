const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const dotenv = require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'storage',
    resource_type: 'auto',
    allowedFormats: ['jpeg', 'png', 'jpg', 'mp3', 'mp4'],
  },
});

module.exports = { cloudinary, storage };
