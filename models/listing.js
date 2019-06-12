mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  coords: {
    lat: Number,
    lng: Number
  },
  street: {
    name: String,
    number: Number
  },
  municipality: String,
  type: String,
  price: Number,
  fee: Number,
  bidding: Boolean
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
