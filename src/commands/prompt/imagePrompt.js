import Prompt from './Prompt.js';
import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
export default async function imagePrompt(req, res) {
    try {
        const urlParams = req.query;
        const templateType = typeof req.params?.template === 'string' ? req.params.template : null;
        const prompt = new Prompt(templateType, urlParams);

        if(templateType){
            await prompt.setTemplates();
        }

        //await prompt.queryChatGpt();

        console.log('urlParams', urlParams)
        console.log('templateType', templateType)
        //await prompt.setTemplates();
        //await prompt.init();
        //const insertToDBCommand = new InsertToDBCommand();
        //insertToDBCommand.execute(cleanJson, prompt.collectionName);

        console.log('COMPLETE');
        sendSocketMsgToClient(JSON.stringify(prompt.responseObj), req);
        res.sendStatus(200);

    } catch (error) {
        console.error('imagePrompt Error:', error);
    }
}