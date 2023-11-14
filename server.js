import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import startWebSocket from './startWebSocket.js';
import startApiListeners from './startApiListeners.js';
import 'module-alias/register.js';

dotenv.config();

const app = express();
const expressSession = session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true
});
app.use(expressSession);
app.use(express.static('./public'));

const server = startApiListeners(app);
startWebSocket(server, app, expressSession);