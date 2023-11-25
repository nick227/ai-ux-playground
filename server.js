import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
//import cors from 'cors'; 
import startWebSocket from './startWebSocket.js';
import startApiListeners from './startApiListeners.js';
import 'module-alias/register.js';

dotenv.config();

const app = express();
/*
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
};
app.use(cors(corsOptions));
*/
const expressSession = session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true
});

app.use(expressSession);
app.use(express.static('./public'));

const server = startApiListeners(app);
startWebSocket(server, app, expressSession);
