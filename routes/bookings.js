const express = require('express');
const Booking = require('../models/booking');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Booking
router.post('/', auth, async (req, res) => {
  const { location, date, time, slot, numberOfPersons } = req.body;
  const booking = new Booking({
    user: req.user._id,
    location,
    date,
    time,
    slot,
    numberOfPersons,
  });

  try {
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get User Bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
