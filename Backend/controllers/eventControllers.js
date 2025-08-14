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

const userCityUpcomingDayEvents = async (req, res) => {
  try {
    console.log("📥 Fetching 10 upcoming events for user's city");

    const userId = req.params.userId;
    if (!userId) {
      console.log("⚠️ No User ID provided in params");
      return res.status(400).json({ message: "User ID is required" });
    }
    console.log("🔹 User ID from params:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("⚠️ User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.name, "| City:", user.city);

    const userCity = user.city;
    const now = new Date();
    console.log("🕒 Current date and time:", now.toISOString());

    // Fetch upcoming events in the user's city
    const events = await Event.find({
      city: userCity,
      $expr: { $gte: [{ $toDate: "$start" }, now] }
    })
      .sort({ start: 1 }) // Sort by start date ascending
      .limit(10);         // Limit to 10 results

    if (!events.length) {
      console.log("⚠️ No upcoming events found for city:", userCity);
      return res.status(200).json({ message: "No upcoming events found", events: [] });
    }

    console.log(`🎉 Found ${events.length} upcoming event(s) for city: ${userCity}`);
    events.forEach((e, i) => {
      console.log(`   ${i + 1}. ${e.title} - ${new Date(e.start).toLocaleString()}`);
    });

    return res.status(200).json(events);

  } catch (err) {
    console.error("❌ Error fetching events:", err);
    return res.status(500).json({ error: "Server error" });
  }
};




module.exports = { getEventsByTheme,userCityUpcomingDayEvents,
}