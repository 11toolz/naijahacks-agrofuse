const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");

// Load Register Input Validation
const validateRegisterInput = require("../../validation/register");

// Load Login Input Validation
const validateLoginInput = require("../../validation/login");

// Load Farmer Model
const Farmer = require("../../models/Farmer");

// @route   GET /api/farmers/test
// @desc    Test farmers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Farmers works" }));

// @route   POST /api/farmer/register
// @desc    Register Farmer
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  const { email, name, password } = req.body;
  Farmer.findOne({ email: email }).then((farmer) => {
    if (farmer) {
      errors.email = "email already exist";
      return res.status(400).json(errors);
    }
    Farmer.findOne({ name: name }).then((farmer) => {
      errors.name = "farmer already exist";
      if (farmer) return res.status(400).json(errors);
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newFarmer = new Farmer({
        name,
        email,
        avatar,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          newFarmer.password = hash;
          newFarmer
            .save()
            .then((farmer) => res.json(farmer))
            .catch((err) => res.json(err));
        });
      });
    });
  });
});

// @route   POST /api/farmer/login
// @desc    Login Farmer / Return JWT Token
// @access  Private
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  //   Find farmer by email
  Farmer.findOne({ email }).then((farmer) => {
    //   Check if there is farmer
    if (!farmer) {
      errors.email = "This farmer does not exist";
      return res.status(404).json(errors);
    }

    const { id, name, avatar } = farmer;

    // Check Password
    bcrypt.compare(password, farmer.password).then((isMatch) => {
      if (!isMatch) {
        errors.password = "Farmer name and password incorrect";
        res.status(400).json(errors);
      } else {
        // Matched farmer details

        // Create jwt payload
        const payload = { id, name, avatar };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 * 24 * 30 },
          (err, token) => {
            res.json({ success: true, token: `Bearer ${token}` });
          }
        );
      }
    });
  });
});

// @route   GET /api/farmer/current
// @desc    Get current farmer
// @access  Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, name, email } = req.user;
    return res.json({ id, name, email });
  }
);

module.exports = router;
