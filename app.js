// Importing Dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth, requiresAuth } = require("express-openid-connect");

// Importing Routes
const indexRouter = require("./routes/index");
// const farmerRouter = require("./routes/farmers");

// Import mongoose Key
const mongoUri = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("mongoUri...", mongoUri));

// OpenID Config
const openIDConfig = {
  clientSecret: process.env.SECRET,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientID: process.env.CLIENT_ID,
  baseURL: process.env.BASE_URL,
  authorizationParams: {
    response_type: "code",
    audience: "https://api.example.com/products",
    scope: "openid profile email read:products",
  },
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
app.get("/", requiresAuth(), async (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/test", async (req, res) => {
  // let { access_token, isExpired, refresh } = req.oidc.accessToken;
  // if (isExpired()) {
  //   ({ access_token } = await refresh());
  // }

  // console.log(access_token);
  res.send(JSON.stringify(req.oidc));
});

// Use routes
// app.use("/", indexRouter);
// app.use("/farmer", farmerRouter);

app.listen(3000, () => {
  console.log("The server has been created on port 3000");
});
