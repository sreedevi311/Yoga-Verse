const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: String,
  imageUrl: String,
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'User'
},
  createdAt: { type: Date, default: Date.now }
});

const communitySchema = new mongoose.Schema({
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme', // reference to the Theme collection
    required: true
  },
  cities: [String],
  posts: [postSchema]
});

module.exports = mongoose.model('Community', communitySchema);
