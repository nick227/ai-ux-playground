const sendSocketMsgToClient = require('@helpers/sendSocketMsgToClient.js');
const promptAnalyzer = require('./promptAnalyzer.js');
const promptCompiler = require('./promptCompiler.js');
const promptValidator = require('./promptValidator.js');
const sentMessages = new Set();

async function buildPrompt(req, template) {
  const initialPrompt = req.query.prompt;
  const commandSequence = [
    promptAnalyzer,
    promptCompiler,
    promptValidator,
  ];

  let result = initialPrompt;

  for (const command of commandSequence) {
    result = await command(result, template);
    const msg = `${result}`;
    if (!sentMessages.has(msg)) {
      sendSocketMsgToClient(msg, req);
      sentMessages.add(msg);
    }
  }
  return result;
}
module.exports = buildPrompt;