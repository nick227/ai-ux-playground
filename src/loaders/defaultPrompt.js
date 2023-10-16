
import {
    AddToQueueCommand,
    SavePromptResultCommand,
    InsertToDBCommand,
  } from '../commands/prompt/index.js';
  
async function processPrompt(req) {
    const prompt = req.query?.prompt || req.prompt;
    const collectionName = req.query?.collectionName || req.collectionName;

    // Step 1
    const addToQueue = new AddToQueueCommand();
    const result = await addToQueue.execute(prompt);
    const response = result.choices[0]?.message?.content || '';

    // Step 3
    const savePromptResult = new SavePromptResultCommand();
    await savePromptResult.execute(prompt, result);

    // Step 4
    if (collectionName) {
        const insertToDB = new InsertToDBCommand();
        await insertToDB.execute(response, collectionName);
    }

    return result;
}

export default async function defaultPrompt(req, res = null) {
res.send('yay');
    /*
    try {
        const finalResult = await processPrompt(req);

        console.log('FINAL RESULT');
        console.log(finalResult);

        if (req) {
            sendSocketMsgToClient('Prompt Complete', req);
        }

        if (res) {
            res.json(finalResult);
        }
    } catch (error) {
        console.error('Error:', error);

        if (req) {
            sendSocketMsgToClient(error, req);
        }

        if (res) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    */
}
