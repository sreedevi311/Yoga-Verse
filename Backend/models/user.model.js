
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    validate: {
      validator: function (v) {
        if (!this.googleId && (!v || v.length === 0)) {
          return false;
        }
        return true;
      },
      message: "Password is required unless signing in with Google.",
    },
  },

  googleId: {
    type: String,
    default: null,
  },

  isOAuth: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  city: {
    type: String,
    default: '',
  },
  level: {
    type: String,
    default: '',
  },
  nearbyCities: [String],
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theme',
    },
  ],
  communities: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Community' }
  ],

  isOrganizer: {
    type: Boolean,
    default: false,
  },

  hostedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],

  refreshToken: {
    type: String,
    default: '',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving (only if modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);