const express = require('express');
const router = express.Router();
const { getEventsByTheme,
    userCityUpcomingDayEvents,
    
}= require('../controllers/eventControllers');
const authMiddleware=require('../middleware/auth.middleware')

router.get('/user-cities-events',authMiddleware, getEventsByTheme);
router.get('/user-city-upcoming-day-events/:userId',userCityUpcomingDayEvents);
module.exports = router;
