import dotenv from 'dotenv';
dotenv.config();
import OpenAIAPI from 'openai';
import { SavePromptResultCommand } from './index.js';

//gpt-3.5-turbo-16k
//gpt-4-0613
//gpt-3.5-turbo
class Command {
    execute() { }
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

    async execute(prompt, params = null) {
        if (!prompt) {
            throw new Error('Prompt is empty.');
        }
        try {
            const maxTokens = Number(process.env.OPENAI_MAX_TOKENS) - prompt.length;
            const model = process.env.OPENAI_MODEL;

            // Initialize the options object with mandatory fields
            const options = {
                model,
                max_tokens: maxTokens,
                messages: [{ role: 'user', content: prompt }]
            };

            // Conditionally add params if they exist
            if (params) {
                if (params.functions) {
                    options.functions = [];
                    options.functions.push(params.functions);
                }
                if (params.function_call) {
                    options.function_call = params.function_call;
                }
            }


            const completion = await this.openai.chat.completions.create(options);

            console.log('COMPLETION');
            console.log(JSON.stringify(completion, null, 2));
            
            const savePromptResult = new SavePromptResultCommand();
            await savePromptResult.execute(prompt, completion);

            return completion;
        } catch (error) {
            console.error("Error sending prompt to ChatGPT:", error);
            throw new Error('Failed to get response from OpenAI.');
        }
    }
}

class QueryChatGptCommand extends Command {
    constructor(queue) {
        super();
        this.queue = queue;
        this.execute = this.execute.bind(this);  
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
const addToQueue = new QueryChatGptCommand(queue);

async function processQueue() {
    if (queue.length === 0) return;
    const { prompt, function: func, function_call, resolve, reject } = queue.shift();
    try {
        const result = await callOpenAI.execute(prompt, { functions: func, function_call });
        resolve(result);
    } catch (error) {
        reject(error);
    }

    setTimeout(processQueue, 1000);
}


export default addToQueue;