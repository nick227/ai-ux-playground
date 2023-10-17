import Prompt from './Prompt.js';

export default async function defaultPrompt(req, res){
    if(req.query.prompt){
        console.log(req.query.prompt, '...');
        const prompt = new Prompt(null, req.query.prompt);
        await prompt.queryChatGpt();
        console.log(prompt);
        res.status(200).json({ response: prompt.responseText });
    }
}