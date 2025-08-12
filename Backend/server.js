const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./oAuth/google');
const passport = require('passport');

const authRoutes = require('./routes/auth.routes');
const communityRoutes = require('./routes/communityRoutes');
const locationRoutes=require('./routes/location.routes')
const uploadRoutes = require('./routes/uploadRoutes')
const authenticate = require("./middleware/auth.middleware");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/yoga-verse/auth', authRoutes);
app.use('/yoga-verse/communities',communityRoutes)
app.use('/yoga-verse/location',locationRoutes)
app.use('/yoga-verse/upload', uploadRoutes)




app.get('/', (req, res) => {
  res.send('yoga verse API');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ✅"))
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`)))
  .catch(err => console.error(err));
  require('./notificationScheduler');
