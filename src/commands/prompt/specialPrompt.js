import Prompt from './Prompt.js';
import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
import { InsertToDBCommand } from '../query/index.js';
import { ExtractAndSanitizeJSONCommand } from '../build/index.js';
export default async function specialPrompt(req, res) {
    try {
        const urlParams = req.query;
        const templateType = typeof req.params?.template === 'string' ? req.params.template : null;
        const prompt = new Prompt(templateType, urlParams);

        console.log('urlParams', urlParams)
        console.log('templateType', templateType)
        await prompt.setTemplates();
        await prompt.queryChatGpt();

        const extractAndSanitizeJSONCommand = new ExtractAndSanitizeJSONCommand();
        const cleanJson = extractAndSanitizeJSONCommand.execute(prompt.responseObj[0]);
        console.log('cleanJson', JSON.stringify(cleanJson))

        //const insertToDBCommand = new InsertToDBCommand();
        //insertToDBCommand.execute(cleanJson, prompt.collectionName);

        console.log('COMPLETE');
    
        sendSocketMsgToClient(JSON.stringify(prompt.responseObj), req);
        res.send(prompt.responseObj);

    } catch (error) {
        console.error('SpecialPrompt Error:', error);
    }
}