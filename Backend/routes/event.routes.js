const express = require('express');
const router = express.Router();
const { getEventsByTheme,
    
}= require('../controllers/eventControllers');
const authMiddleware=require('../middleware/auth.middleware')

router.get('/user-cities-events',authMiddleware, getEventsByTheme);

module.exports = router;
