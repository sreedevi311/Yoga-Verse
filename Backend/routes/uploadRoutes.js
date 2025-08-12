// backend/routes/uploadRoutes.js
const express = require('express')
const router = express.Router()
const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
require('dotenv').config();

// 🔐 Replace with your real credentials from Cloudinary dashboard
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// 📦 Setup multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'community-posts', // cloud folder name
    allowed_formats: ['jpg', 'jpeg', 'png'],
  }
})

const upload = multer({ storage })

// 📤 Handle POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  res.json({ url: req.file.path }) // Cloudinary gives this image URL
})

module.exports = router
