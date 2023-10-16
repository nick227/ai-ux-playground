import sendSocketMsgToClient from '../sendSocketMsgToClient.js';
import dotenv from 'dotenv';
dotenv.config();
/*
import initialPrompt from './initialPrompt.js';
import specialPrompt from './specialPrompt.js';
import templatePrompt from './templatePrompt.js';
*/

import { defaultPrompt, specialPrompt } from '../commands/prompt/index.js';

const chatGptControllers = async (req, res) => {
  const template = typeof req.params?.template === 'string' ? req.params.template : null;
  try {
    switch (template) {
      case "description":
      case "template":
      case "style":
        console.log('Begin special prompt');
        await specialPrompt(req, res);
        //sendSocketMsgToClient('Begin style prompt', req);
        //await stylePrompt(req, res);
        break;
      default:
        console.log('Begin default prompt');
        //sendSocketMsgToClient('Begin default prompt', req);
        await defaultPrompt(req, res);
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    //sendSocketMsgToClient(error, req);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default chatGptControllers;
