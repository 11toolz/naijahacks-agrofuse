const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schedule Schema
const ScheduleSchema = new Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "farmers",
  },
  tool: {
    type: Schema.Types.ObjectId,
    ref: "tools",
  },
  name: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tool = mongoose.model("schedule", ScheduleSchema);
