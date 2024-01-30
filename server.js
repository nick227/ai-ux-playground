import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
//import compression from 'compression';
//import expressMinify from 'express-minify';
import cors from 'cors'; 
import startWebSocket from './startWebSocket.js';
import startApiListeners from './startApiListeners.js';
import 'module-alias/register.js';

dotenv.config();

const app = express();

const corsOptions = {
  //origin: `http://localhost:${process.env.API_PORT}`,
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const expressSession = session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: true
});

app.use(expressSession);
//app.use(compression());
//app.use(expressMinify());
app.use(express.static('./public'));

const server = startApiListeners(app);
startWebSocket(server, app, expressSession);
