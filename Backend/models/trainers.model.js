// models/trainers.model.js
const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String, // e.g., "Vinyasa Instructor"
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Basic email validation
  },
  phone: {
    type: String,
    required: true
  },
  responseTime: {
    type: Number, // in hours or minutes depending on your logic
    required: true
  },
  short: {
    type: String, // Short description
    required: true
  },
  avatar: {
    type: String, // URL to the trainer's image
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Trainer', trainerSchema);