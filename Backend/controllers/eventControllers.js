const Event = require('../models/event.model'); 
const User=require('../models/user.model')

const getEventsByTheme = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: no user info' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.city) {
      return res.status(400).json({ message: 'User city not found' });
    }

    const citiesToSearch = [user.city, ...(user.nearbyCities || [])];

    const events = await Event.find({
      city: { $in: citiesToSearch }
    }).sort({ start: 1 });

    if (!events.length) {
      return res.status(404).json({
        message: `No events found in your city or nearby cities`
      });
    }
console.log(events)
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getEventsByTheme,
}