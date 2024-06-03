const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  slot: { type: String, required: true },
  numberOfPersons: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
