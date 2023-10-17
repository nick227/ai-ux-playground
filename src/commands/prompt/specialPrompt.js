import Prompt from './Prompt.js';
export default async function specialPrompt(req, res) {
    //const templateType = typeof req.params?.template === 'string' ? req.params.template : null;
    const urlParams = req.query;
    const templateType = typeof req.params?.template === 'string' ? req.params.template : null;
    const prompt = new Prompt(templateType, urlParams);
    await prompt.setTemplates();
    await prompt.queryChatGpt();
    console.log('COMPLETE');
    res.send(prompt);
}