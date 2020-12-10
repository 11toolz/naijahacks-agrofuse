const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Tool Schedule Schema
const ToolScheduleSchema = new Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "farmers",
  },
  tool: {
    type: Schema.Types.ObjectId,
    ref: "tools",
  },
  schedule: {
    type: Schema.Types.ObjectId,
    ref: "schedule",
  },
});

module.exports = FarmerTool = mongoose.model(
  "tool_schedule",
  ToolScheduleSchema
);
