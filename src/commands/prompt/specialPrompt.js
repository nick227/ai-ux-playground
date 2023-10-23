import Prompt from './Prompt.js';
import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
import {InsertToDBCommand} from '../query/index.js';
export default async function specialPrompt(req, res) {
    const urlParams = req.query;
    const templateType = typeof req.params?.template === 'string' ? req.params.template : null;
    const prompt = new Prompt(templateType, urlParams);

    await prompt.setTemplates();
    await prompt.queryChatGpt();
    try {
        const insertToDBCommand = new InsertToDBCommand();
        insertToDBCommand.execute(prompt.responseObj[0], templateType+'s');

    } catch (error) {
        console.error('Error:', error);
    }

    console.log('COMPLETE');
    
    sendSocketMsgToClient(JSON.stringify(prompt.responseObj), req);
    res.send(prompt.responseObj);
}