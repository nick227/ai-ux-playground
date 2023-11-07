import dotenv from 'dotenv';
import OpenAIAPI from 'openai';
import Command from '../Command.js';
import { SavePromptResultCommand } from './index.js';

dotenv.config();

class QueryChatGptCommand extends Command {
  constructor() {
    super();
    const apiKey = process.env.OPENAI_SECRET;
    if (!apiKey) {
      throw new Error('OPENAI_SECRET is not set in environment variables.');
    }
    this.openai = new OpenAIAPI({ apiKey });
  }

  async execute(prompt) {
    if (!prompt) {
      throw new Error('Prompt is empty.');
    }
    const maxTokens = Number(process.env.OPENAI_MAX_TOKENS) || 150;
    const model = process.env.OPENAI_MODEL;

    const options = {
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt.prompt }]
    };
    if (prompt.tools) {
        options.tools = prompt.tools;
      }

    try {
      const completion = await this.openai.chat.completions.create(options);
      const savePromptResult = new SavePromptResultCommand();
      await savePromptResult.execute(prompt, completion);
      return completion;
 
    } catch (error) {
      console.error("Error sending prompt to ChatGPT:", error);
      throw new Error('Failed to get response from OpenAI.');
    }
  }

  async executeImage(prompt) {
    if (!prompt) {
      throw new Error('Prompt is empty.');
    }

    const options = {
      model:  process.env.DALLE_MODEL,
      prompt: prompt,
      n: 1,
      quality: 'hd',
      response_format: 'b64_json',
      size: '1024x1024'
    };

    console.log('...options: ', options);

    try {
      const completion = await this.openai.images.generate(options);
      const savePromptResult = new SavePromptResultCommand();
      await savePromptResult.execute(prompt, completion);

      return completion;
 
    } catch (error) {
      console.error("Error sending prompt to ChatGPT:", error);
      throw new Error('Failed to get response from OpenAI.');
    }
    

  }
}

export default QueryChatGptCommand;
