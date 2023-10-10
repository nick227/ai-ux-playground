const sendSocketMsgToClient = require('@helpers/sendSocketMsgToClient.js');
require('dotenv').config();
const {
    BuildPromptCommand,
    AddToQueueCommand,
    SavePromptResultCommand,
    ExtractAndSanitizeJSONCommand,
    InsertToDBCommand,
    QueryPromptTemplatesCommand
} = require('./queryCommands.js');

async function processTemplate(templateObject, req) {
    const template = templateObject.template;
    const collectionName = templateObject.collectionName;

    // Step 1
    const buildPromptCommand = new BuildPromptCommand();
    const prompt = await buildPromptCommand.execute(req, template);

    // Step 2
    const addToQueue = new AddToQueueCommand();
    const result = await addToQueue.execute(prompt);
    const response = result.choices[0]?.message?.content || '';

    sendSocketMsgToClient(response, req);

    // Step 3
    const savePromptResult = new SavePromptResultCommand();
    await savePromptResult.execute(prompt, result);

    // Step 4
    const extractAndSanitize = new ExtractAndSanitizeJSONCommand();
    const sanitizedResult = extractAndSanitize.execute(response);
    
    // Step 5
    const insertToDB = new InsertToDBCommand();
    return await insertToDB.execute(sanitizedResult, collectionName);
    
}

async function initialPrompt(req, res) {
    try {
        const type = req.query.type;
        const promptTemplatesCommand = new QueryPromptTemplatesCommand();
        const promptTemplatesObject = await promptTemplatesCommand.execute(type);
        const templates = promptTemplatesObject.templates;
        const finalResult = await Promise.all(templates.map(template => processTemplate(template, req)));

        console.log('FINAL RESULT');
        console.log(finalResult);
        sendSocketMsgToClient('finished', req);
        res.json(finalResult);
    } catch (error) {
        console.error('Error:', error);
        sendSocketMsgToClient(error, req);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = initialPrompt;
