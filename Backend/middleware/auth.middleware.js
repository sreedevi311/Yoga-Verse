const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.accessToken; // 🍪 read from cookie

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { userId: payload.userId, role: payload.role};
    next();
  } catch (err) {
    console.error('❌ Invalid access token');
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = requireAuth;
