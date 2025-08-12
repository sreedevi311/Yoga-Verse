
const axios = require('axios');

const searchLocation = async (req, res) => {
  const { query, city } = req.query;

  if (!query || !city) {
    return res.status(400).json({ message: 'Missing query or city parameter' });
  }

  try {
    const searchTerm = `${query} ${city}`.trim();

    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: searchTerm,
        format: 'json',
        limit: 10,
        addressdetails: 1
      },
      headers: {
        'User-Agent': 'NearbyHappeningsApp/1.0 (your@email)'
      }
    });

    const allResults = response.data;

    // Filter results strictly by city match
    const filtered = allResults.filter(place =>
      place.address &&
      (place.address.city?.toLowerCase() === city.toLowerCase() ||
       place.address.town?.toLowerCase() === city.toLowerCase() ||
       place.address.village?.toLowerCase() === city.toLowerCase())
    );

    const results = filtered.map(place => ({
      display_name: place.display_name,
      lat: place.lat,
      lon: place.lon,
      type: place.type,
      class: place.class,
      address: place.address
    }));

    res.json(results);
  } catch (error) {
    console.error('❌ Nominatim API error:', error.message);
    res.status(500).json({ message: 'Error searching location' });
  }
};

module.exports = { searchLocation };