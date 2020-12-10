const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Farmer Schema
const FarmerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  family_name: {
    type: String,
  },
  given_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Farmer = mongoose.model("farmers", FarmerSchema);
