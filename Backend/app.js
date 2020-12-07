require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.CLIENT_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: 'https://dev-9lyb4o1h.eu.auth0.com',
  
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});




app.listen(3000, () => {
    console.log("The server has been created on port 3000");
});