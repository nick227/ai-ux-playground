import Prompt from './Prompt.js';
import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
import { InsertToDBCommand } from '../query/index.js';
import { ExtractAndSanitizeJSONCommand } from '../build/index.js';
import { QueryChatGptCommand } from '../query/index.js';
export default async function templatePrompt(req, res) {
    try {
        const urlParams = req.query;
        const templateType = typeof urlParams?.type === 'string' ? urlParams.type : null;
        const prompt = new Prompt(templateType, urlParams);
        await prompt.init();
        console.log('prompt', prompt);
        const queryChatGptCommand = new QueryChatGptCommand(prompt.templates[0], prompt);
        queryChatGptCommand.execute();


return;
        //const extractAndSanitizeJSONCommand = new ExtractAndSanitizeJSONCommand();
        //const cleanJson = extractAndSanitizeJSONCommand.execute(prompt.responseObj[0]);

        //const insertToDBCommand = new InsertToDBCommand();
        //insertToDBCommand.execute(cleanJson, prompt.collectionName);

        console.log('COMPLETE');
    
        sendSocketMsgToClient(JSON.stringify(prompt.responseObj), req);
        res.send(prompt.responseObj);

    } catch (error) {
        console.error('templatePrompt Error:', error);
    }
}