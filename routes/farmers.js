const express = require("express");
const router = express.Router();

// Load Farmer Model
const Farmer = require("./models/Farmer");

// @route   GET /api/farmers/test
// @desc    Test farmers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Farmers works" }));

