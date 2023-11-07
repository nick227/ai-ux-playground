import Prompt from './Prompt.js';

export default async function defaultPrompt(req, res){
    if(req.query.prompt){
        const prompt = new Prompt(null, req.query.prompt);
        await prompt.init();
        console.log('Standard Prompt Complete');
        res.status(200).json({ response: prompt.responseText });
    }
}