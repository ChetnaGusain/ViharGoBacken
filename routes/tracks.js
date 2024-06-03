const express = require('express');
const Track = require('../models/track');
const auth = require('../middleware/auth');

const router = express.Router();

// Track live coordinates
router.post('/', auth, async (req, res) => {
  const { latitude, longitude } = req.body;
  const track = new Track({
    user: req.user._id,
    liveCoordinates: { latitude, longitude },
  });

  try {
    await track.save();
    res.status(201).json(track);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get live coordinates
router.get('/', auth, async (req, res) => {
  try {
    const track = await Track.findOne({ user: req.user._id }).sort({ _id: -1 });
    if (!track) {
      return res.status(404).json({ message: 'No track data found' });
    }
    res.json(track.liveCoordinates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
