require('dotenv').config();
require('module-alias/register');

const OpenAIAPI = require('openai');
const { 
    htmlTagAttributesObject,
    htmlElementTypesEmum  } = require('@helpers/constants.js');
  
class Command {
    execute() {}
}

class InitializeOpenAICommand extends Command {
    execute() {
        if (!process.env.OPENAI_SECRET) {
            throw new Error('OPENAI_SECRET is not set in environment variables.');
        }
        return new OpenAIAPI({
            apiKey: process.env.OPENAI_SECRET
        });
    }
}

class CallOpenAICommand extends Command {
    constructor(openai) {
        super();
        if (!openai) {
            throw new Error('OpenAI instance is not provided.');
        }
        this.openai = openai;
    }

    async execute(prompt) {
        if (!prompt) {
            throw new Error('Prompt is empty.');
        }
        try {
            const maxTokens = Number(process.env.OPENAI_MAX_TOKENS) - prompt.length;
            console.log('maxTokens:', maxTokens);
            console.log('prompt.length', prompt.length);
            const model = process.env.OPENAI_MODEL;
            const completion = await this.openai.chat.completions.create({
                model,
                max_tokens: maxTokens,
                messages: [{ role: 'user', content: prompt }]
            });
            const message = completion.choices[0]?.message?.content || 'No content returned from OpenAI.';
            
            return message;
        } catch (error) {
            console.error("Error sending prompt to ChatGPT:", error);
            throw new Error('Failed to get response from OpenAI.');
        }
    }
}

class AddToQueueCommand extends Command {
    constructor(queue) {
        super();
        this.queue = queue;
        this.execute = this.execute.bind(this);  // Bind the method
    }

    execute(item) {
        return new Promise(async (resolve, reject) => {
            this.queue.push({ ...item, resolve, reject });
            if (this.queue.length === 1) {
                await processQueue();
            }
        });
    }
}

// Initialize OpenAI
let openai;
try {
    const initializeOpenAI = new InitializeOpenAICommand();
    openai = initializeOpenAI.execute();
} catch (error) {
    console.error('Failed to initialize OpenAI:', error);
    process.exit(1);
}

// Initialize queue
const queue = [];

// Command instances
const callOpenAI = new CallOpenAICommand(openai);
const addToQueue = new AddToQueueCommand(queue);

async function processQueue() {
    if (queue.length === 0) return;
    const { prompt, resolve, reject } = queue.shift();
    try {
        const result = await callOpenAI.execute(prompt);
        resolve(result);
    } catch (error) {
        reject(error);
    }
    setTimeout(processQueue, 1000);
}

module.exports = {
    addToQueue: addToQueue.execute
};
