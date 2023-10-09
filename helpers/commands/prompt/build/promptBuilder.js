const sendSocketMsgToClient = require('@helpers/sendSocketMsgToClient.js');
const promptAnalyzer = require('./promptAnalyzer.js');
const promptCompiler = require('./promptCompiler.js');
const promptSave = require('./promptSave.js');
const promptValidator = require('./promptValidator.js');

async function promptBuilder(req) {
  const initialPrompt = req.query.prompt;
  const type = req.query.type;
  const commandSequence = [
    promptSave,
    promptAnalyzer,
    promptCompiler,
    promptValidator,
  ];

  let result = initialPrompt;

  for (const command of commandSequence) {
    result = await command(result, type);
    const msg = `${result}`;
    sendSocketMsgToClient(msg, req);
  }
  return result;
}
module.exports = promptBuilder;