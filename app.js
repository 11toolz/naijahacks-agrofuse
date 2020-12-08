// Importing Dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth, requiresAuth } = require("express-openid-connect");

// Importing Routes
const usersRouter = require("./routes/users");

// Import mongoose Key
const mongoUri = require("./config/keys").mongoURI;

// Load User
const User = require("./models/User");

// Connect to mongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log('mongoUri...', mongoUri));


// OpenID Config
const openIDConfig = {
  authRequired: false,
  auth0Logout: true,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(openIDConfig));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
app.use(cookieParser());


// req.isAuthenticated is provided from the auth router
app.get("/", requiresAuth(), (req, res) => {
  
  res.send(JSON.stringify(req.oidc.user));
});

// Use routes
// app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("The server has been created on port 3000");
});
