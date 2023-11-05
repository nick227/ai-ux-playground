import Command from '../../Command.js';
import { SavePromptResultCommand } from '../index.js';
import OpenAIAPI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

class CallOpenAICommand extends Command {
    constructor() {
        super();
        this.openai = this.initialize();
    }

    async execute(prompt, params = {}) {
        if (!prompt) {
            throw new Error('Prompt is empty.');
        }
        const options = {
            model: process.env.OPENAI_MODEL,
            messages: [{ role: 'user', content: prompt }],
            max_tokens: params.max_tokens || 150, 
            temperature: params.temperature || 0.7,
            functions: params.functions, 
            function_call: params.function_call,
          };
          console.log('options', options);

        try {
            //const completion = await this.openai.createCompletion(options);
            const completion = await this.openai.chat.completions.create(options);

            const savePromptResult = new SavePromptResultCommand();
            await savePromptResult.execute(prompt, completion);

            return completion;
        } catch (error) {
            console.error("Error sending prompt to OpenAI:", error);
            throw new Error('Failed to get response from OpenAI.');
        }
    }

    initialize() {
        if (!process.env.OPENAI_SECRET) {
            throw new Error('OPENAI_SECRET is not set in environment variables.');
        }
        return new OpenAIAPI({
            apiKey: process.env.OPENAI_SECRET
        });
    }
}

export default CallOpenAICommand;
