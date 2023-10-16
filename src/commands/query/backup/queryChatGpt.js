import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
import dotenv from 'dotenv';
dotenv.config();
/*
import initialPrompt from './initialPrompt.js';
import specialPrompt from './specialPrompt.js';
import templatePrompt from './templatePrompt.js';
*/
import defaultPrompt from '../prompt/defaultPrompt.js';

const queryChatGpt = async (req, res) => {
  try {
    const type = typeof req.query?.type === 'string' ? req.query.type : null;
    switch (type) {
      /*case 'initial-prompt':
        console.log('Begin initial prompt');
        sendSocketMsgToClient('Begin initial prompt', req);
        await initialPrompt(req, res);
        break;
      case 'special-prompt':
        console.log('Begin special prompt');
        sendSocketMsgToClient('Begin special prompt', req);
        await specialPrompt(req, res);
        break;
      case 'template-prompt':
        console.log('Begin template prompt');
        sendSocketMsgToClient('Begin template prompt', req);
        await templatePrompt(req, res);
        break;*/
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

export default queryChatGpt;
