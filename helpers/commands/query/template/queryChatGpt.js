const sendSocketMsgToClient = require('@helpers/sendSocketMsgToClient.js');
require('dotenv').config();
const {
    BuildPromptCommand,
    AddToQueueCommand,
    SavePromptResultCommand,
    ExtractAndSanitizeJSONCommand,
    InsertToTemplateDBCommand
  } = require('./queryCommands.js');
  
async function queryChatGpt(req, res) {
  try {

    const buildPrompt = new BuildPromptCommand();
    const prompt = await buildPrompt.execute(req);
 
    const addToQueue = new AddToQueueCommand();
    let result = await addToQueue.execute(prompt);
    sendSocketMsgToClient(result, req);

    const savePromptResult = new SavePromptResultCommand();
    await savePromptResult.execute(prompt, result);

    const extractAndSanitize = new ExtractAndSanitizeJSONCommand();
    result = extractAndSanitize.execute(result);

    const insertToDB = new InsertToTemplateDBCommand();
    const newRow = await insertToDB.execute(result);
    
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    sendSocketMsgToClient(error, req);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = queryChatGpt;