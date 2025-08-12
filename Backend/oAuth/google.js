
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user.model')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/nearby-happenings/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value
    let user = await User.findOne({ email })

    if (user) {
      // ✅ User exists - link Google ID if not already linked
      if (!user.googleId) {
        user.googleId = profile.id
        await user.save()
      }
    } else {
      // ❌ No user found - create new user
      user = await User.create({
        googleId: profile.id,
        email: email,
        name: profile.displayName
      })
    }

    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
}))