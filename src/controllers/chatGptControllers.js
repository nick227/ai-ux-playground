import sendSocketMsgToClient from '../sendSocketMsgToClient.js';
import dotenv from 'dotenv';
dotenv.config();
import { defaultPrompt, specialPrompt } from '../commands/prompt/index.js';

const chatGptControllers = async (req, res) => {
  const template = typeof req.params?.template === 'string' ? req.params.template : null;
  try {
    switch (template) {
      case "description":
      case "css":
      case "template":
      case "font":
      case "style":
        console.log('Begin special prompt');
        await specialPrompt(req, res);
        sendSocketMsgToClient('Begin ' + template + ' prompt', req);
        break;
      default:
        console.log('Begin default prompt');
        sendSocketMsgToClient('Begin default prompt', req);
        await defaultPrompt(req, res);
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    sendSocketMsgToClient(error, req);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default chatGptControllers;
