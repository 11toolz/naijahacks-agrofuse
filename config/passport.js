const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Farmer = mongoose.model("farmers");
const keys = require("./keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Farmer.findById(jwt_payload.id, (err, farmer) => {
        if (err) console.log(err);
        if (farmer) return done(null, farmer);
        return done(err, false);
      });
    })
  );
};
