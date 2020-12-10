const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Tools Input Validation
const validateToolInput = require("../../validation/tool");

// Load Tool Model
const Tool = require("../../models/Tool");

// @route   GET /api/tool/test
// @desc    Test tools route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Tools works" }));

// @route   GET /api/tool
// @desc    Get all tools
// @access  Public
router.get("/", (req, res) => {
  Tool.find()
    .sort({ date: -1 })
    .then((tools) => res.status(200).json(tools))
    .catch((err) =>
      res.status(404).json({ noToolFound: "No tool found", err })
    );
});

// @route   GET /api/tool/:id
// @desc    Get tool by tool id
// @access  Public
router.get("/:id", (req, res) => {
  Tool.findById(req.params.id)
    .then((tool) => res.status(200).json({ success: "Tool found", tool }))
    .catch((err) =>
      res.status(404).json({ noToolFound: "No tool found with this ID", err })
    );
});

// @route   POST /api/tool/
// @desc    Register Tool
// @access  Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateToolInput(req.body);

  // Check Validation
  if (!isValid) return res.status(400).json(errors);
  const { name } = req.body;

  Tool.findOne({ name }).then((tool) => {
    if (tool) {
      errors.tool = "tool name already exist";
      return res.status(400).json(errors);
    }
    const newTool = new Tool({ name });

    newTool
      .save()
      .then((tool) => res.status(200).json(tool))
      .catch((err) => res.status(400).json(err));
  });
});

// @route   UPDATE /api/tool/:id
// @desc    Delete tool by id
// @access  Public
router.put("/:id", (req, res) => {
  Tool.findByIdAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
    }
  )
    .then((tool) => res.status(200).json(tool))
    .catch((err) =>
      res.status(404).json({ noToolFound: "No tool found with this ID", err })
    );
});

// @route   DELETE /api/tool/:id
// @desc    Delete tool by id
// @access  Public
router.delete("/:id", (req, res) => {
  Tool.findByIdAndDelete(req.params.id)
    .then((tool) => res.json(tool))
    .catch((err) =>
      res.status(404).json({ noToolFound: "No tool found with this ID", err })
    );
});

module.exports = router;
