const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Tool Schema
const ToolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {   
    type: Date,
    default: Date.now,
  },
//   Other tool information should be added to the schema
});

module.exports = Tool = mongoose.model("tools", ToolSchema);
