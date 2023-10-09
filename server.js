
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const startWebSocket = require('./startWebSocket');
const startApiListeners = require('./startApiListeners');

const app = express();
const expressSession = session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true
});
app.use(expressSession);
app.use(express.static(path.join(__dirname, 'public')));

startApiListeners(app);
startWebSocket(app, expressSession);
