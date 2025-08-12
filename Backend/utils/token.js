const jwt = require("jsonwebtoken");
console.log("✅ Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
console.log("Access Token Expiry:", process.env.ACCESS_TOKEN_EXPIRES);


const generateAccessToken = (userId,role) => {
  return jwt.sign({ userId: userId, role: role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
};

const generateRefreshToken = (userId,role) => {
  return jwt.sign({ userId: userId, role: role }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
