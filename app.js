// Importing Dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
<<<<<<< HEAD
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Importing Routes
const indexRouter = require("./routes/api/index");
const farmerRouter = require("./routes/api/farmers");
const toolRouter = require("./routes/api/tools");
=======
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth, requiresAuth } = require("express-openid-connect");

// Importing Routes
const usersRouter = require("./routes/users");
>>>>>>> e7af592bc89affb1c786a3a7785753bae709e07b

// Import mongoose Key
const mongoUri = require("./config/keys").mongoURI;

<<<<<<< HEAD
=======
// Load User
const User = require("./models/User");

>>>>>>> e7af592bc89affb1c786a3a7785753bae709e07b
// Connect to mongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
<<<<<<< HEAD
  .catch((err) => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);
=======
  .catch((err) => console.log('mongoUri...', mongoUri));


// OpenID Config
const openIDConfig = {
  authRequired: false,
  auth0Logout: true,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(openIDConfig));
>>>>>>> e7af592bc89affb1c786a3a7785753bae709e07b

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());

<<<<<<< HEAD
// Use routes
app.use("/api", indexRouter);
app.use("/api/farmer", farmerRouter);
app.use("/api/tool", toolRouter);
=======

// req.isAuthenticated is provided from the auth router
app.get("/", requiresAuth(), (req, res) => {
  
  res.send(JSON.stringify(req.oidc.user));
});

// Use routes
// app.use("/users", usersRouter);
>>>>>>> e7af592bc89affb1c786a3a7785753bae709e07b

app.listen(3000, () => {
  console.log("The server has been created on port 3000");
});
