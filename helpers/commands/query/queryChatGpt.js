const sendSocketMsgToClient = require('@helpers/sendSocketMsgToClient.js');
require('dotenv').config();
const initialPrompt = require('./initialPrompt.js');
  
async function queryChatGpt(req, res) {
  try {
    const type = req.query.type;
    switch (type) {
        case 'initial-prompt':
            await initialPrompt(req, res);
            break;
    }
  } catch (error) {
    console.error('Error:', error);
    sendSocketMsgToClient(error, req);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = queryChatGpt;