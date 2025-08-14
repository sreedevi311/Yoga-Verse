const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  theme: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  spots: {
    type: Number,
    required: true,
    min: 0
  },
  interested: {
    type: Number,
    default: 0,
    min: 0
  },
  organizer: {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true }
  },
  bring: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  gallery: {
    type: [String],
    default: []
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports= mongoose.model("Event", eventSchema);
