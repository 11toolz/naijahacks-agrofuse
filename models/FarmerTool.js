const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This model contains all tools saved under a farmer

// Create Farmer Tool Schema
const FarmerToolSchema = new Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "farmers",
  },
  tools: [
    {
      tool: {
        type: Schema.Types.ObjectId,
        ref: "tools",
      },
    },
  ],
});

module.exports = FarmerTool = mongoose.model("farmer_tools", FarmerToolSchema);
