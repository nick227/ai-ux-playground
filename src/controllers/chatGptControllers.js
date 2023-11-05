import sendSocketMsgToClient from '../sendSocketMsgToClient.js';
import dotenv from 'dotenv';
dotenv.config();
import { defaultPrompt, templatePrompt, imagePrompt } from '../commands/prompt/index.js';

const chatGptControllers = async (req, res) => {
  const type = typeof req.params?.type === 'string' ? req.params.type : null;
  console.log('type', type);
  try {
    switch (type) {
      case "image":
        console.log('Begin image prompt');
        await imagePrompt(req, res);
        sendSocketMsgToClient('Begin image prompt', req);
        break;
      case "prompt-template":
        console.log('Begin prompt-template prompt');
        await templatePrompt(req, res);
        sendSocketMsgToClient('Begin ' + type + ' prompt-template', req);
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
