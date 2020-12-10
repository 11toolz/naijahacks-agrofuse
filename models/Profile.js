const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Farmer Profile Schema
const ProfileSchema = new Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "farmers",
  },
  farm_name: {
    type: String,
  },
  farm_location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
