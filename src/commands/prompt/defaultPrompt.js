import Prompt from './Prompt.js';

export default async function defaultPrompt(req, res){
    if(req.query.prompt){
        const prompt = new Prompt(req.query.prompt);
        await prompt.queryChatGpt();
        await prompt.saveResponse();
        res.status(200).json({ response: prompt.responseText });
    }
}