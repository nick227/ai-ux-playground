import Prompt from './Prompt.js';
import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
import { InsertToDBCommand } from '../query/index.js';
import { ExtractAndSanitizeJSONCommand } from '../build/index.js';
import { QueryChatGptCommand } from '../query/index.js';
export default async function templatePrompt(req, res) {
    try {
        const urlParams = req.query;
        const templateType = typeof urlParams?.type === 'string' ? urlParams.type : null;

        const prompt = new Prompt(null, templateType, urlParams);
        await prompt.init();

        const queryChatGptCommand = new QueryChatGptCommand();
        const response = await queryChatGptCommand.execute(prompt);
   
        const extractAndSanitizeJSONCommand = new ExtractAndSanitizeJSONCommand();
        const cleanJson = extractAndSanitizeJSONCommand.execute(response);

        const insertToDBCommand = new InsertToDBCommand();
        insertToDBCommand.execute(cleanJson, prompt.collectionName);

        console.log('COMPLETE');
    
        sendSocketMsgToClient(JSON.stringify(response), req);
        res.send(response);

    } catch (error) {
        console.error('templatePrompt Error:', error);
    }
}