import Command from '../Command.js';
import { CallOpenAICommand, AddToQueueCommand } from './helpers/index.js';

export default class QueryChatGptCommand extends Command {
    constructor(prompt, params = {}) {
        super();
        this.prompt = prompt;
        this.params = params;
        this.addToQueueCommand = new AddToQueueCommand();
    }

    build() {
        const maxTokens = this.params.max_tokens || Number(process.env.OPENAI_MAX_TOKENS) || 150;
        if (!this.prompt) {
            throw new Error('Prompt is empty.');
        }
        return {
            model: process.env.OPENAI_MODEL || 'text-davinci-003',
            prompt: this.prompt,
            max_tokens: maxTokens,
            temperature: this.params.temperature || 0.7,
            ...this.params
        };
    }

    async execute() {
        const options = this.build();
        return this.addToQueueCommand.enqueue(async () => {
            const callOpenAICommand = new CallOpenAICommand();
            return await callOpenAICommand.execute(options);
        });
    }
}
