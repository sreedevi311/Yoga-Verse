const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const City = require('../models/city.model');
const jwt = require("jsonwebtoken");
const { sendEmail } = require('../utils/emailSender')
const Contact = require('../models/contact.model');
const passport = require('passport')
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

// Helper to set cookies
function setAuthCookies(res, accessToken, refreshToken) {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true, // set true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

const profile = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const user = await User.findById(userId).select('-password -refreshToken'); // exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error("❌ Failed to fetch profile:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  console.log("🪵 Received login body:", req.body); 
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ no user found");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    console.log("❌ Password mismatch");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user._id,user.role);
  const refreshToken = generateRefreshToken(user._id,user.role);

  user.refreshToken = refreshToken;
  await user.save();

  setAuthCookies(res, accessToken, refreshToken);

  res.json({
  success: true,
  user: {
    _id: user._id,
    role:user.role,
    email: user.email,
    city: user.city,
    interests: user.interests,
    nearbyCities: user.nearbyCities,
  }
});

};

const signup = async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email already exists" });

  const newUser = new User({ email, password }); // plain password here
  const accessToken = generateAccessToken(newUser._id,newUser.role);
  const refreshToken = generateRefreshToken(newUser._id,newUser.role);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  setAuthCookies(res, accessToken, refreshToken);

  res.json({
  success: true,
  user: {
    _id: newUser._id,
    role:newUser.role,
    email: newUser.email,
    city: newUser.city,
    interests: newUser.interests,
    nearbyCities: newUser.nearbyCities,
  }
});

};

const logout = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: "Logged out successfully" });
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken; // 🍪 read from cookie

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({ success: true });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};


const updateUserPreferences = async (req, res) => {
  const { city, interests } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    if (city) {
      user.city = city;

      // Find coordinates of the selected city
      const baseCity = await City.findOne({ name: city });
      if (!baseCity || !baseCity.location || !baseCity.location.coordinates) {
        return res.status(400).json({ success: false, error: 'City not found or missing coordinates' });
      }

      const [lng, lat] = baseCity.location.coordinates;

      // Find nearby cities within 50 km (distance in meters)
      const nearbyCities = await City.aggregate([
        {
          $geoNear: {
            near: { type: 'Point', coordinates: [lng, lat] },
            distanceField: 'distance',
            maxDistance: 30000, // 30 km
            spherical: true
          }
        },
        {
          $match: { name: { $ne: city } } // exclude base city itself
        },
        {
          $project: { _id: 0, name: 1 }
        }
      ]);

      // Extract just the names
      user.nearbyCities = nearbyCities.map(c => c.name);
    }

    if (interests) user.interests = interests;

    await user.save();

    res.json({
      success: true,
      user: {
        email: user.email,
        city: user.city,
        interests: user.interests,
        nearbyCities: user.nearbyCities
      }
    });
  } catch (err) {
    console.error("❌ Failed to update preferences:", err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// 📨 Contact Form Submission
const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save contact message to MongoDB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Send email notification to admin
    await sendEmail(
      'vivekpotnuru9392@gmail.com', // ✅ FIXED typo here
      `New Contact: ${subject}`,
      `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    );

    return res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('❌ Error saving contact message:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


const googleAuthCallback = async (req, res) => {
  const mode = req.query.state; // 'login' or 'signup'
  const { email } = req.user;

  try {
    let user = await User.findOne({ email });

    // Signup flow
    if (mode === 'signup') {
      if (user) {
        return res.redirect('http://localhost:5173/?googleError=' + encodeURIComponent('Account already exists. Please sign in.'));
      }

      user = new User({ email, authProvider: 'google' });
      await user.save();
    }

    // Login flow
    else if (mode === 'login') {
      if (!user) {
        return res.redirect('http://localhost:5173/?googleError=' + encodeURIComponent('No account found. Please sign up.'));
      }
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Set tokens in secure httpOnly cookies
    res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: false, // change to true in production (HTTPS)
  sameSite: 'Lax',
  maxAge: 15 * 60 * 1000 // 15 minutes
});

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: false, // change to true in production
  sameSite: 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

    // Redirect to Vue app (OAuth success)
    return res.redirect('http://localhost:5173/');
  } catch (err) {
    console.error('❌ Google OAuth callback error:', err);
    return res.redirect('http://localhost:5173/?googleError=' + encodeURIComponent('OAuth login failed.'));
  }
};



const googleAuthInitiate = (req, res, next) => {
  const mode = req.query.mode === 'signup' ? 'signup' : 'login' // Validate mode input

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account', // 👈 Forces account selector every time
    state: mode               // 👈 Passes mode to the callback
  })(req, res, next)
};

module.exports = {
  profile,
  login,
  signup,
  refreshToken,
  logout,
  updateUserPreferences,
  googleAuthCallback,
  googleAuthInitiate,
  submitContactForm,
};
