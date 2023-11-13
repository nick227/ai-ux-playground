import dotenv from 'dotenv';
import OpenAIAPI from 'openai';
import Command from '../Command.js';
import { ChatGptTextRequest, ChatGptImageRequest } from './index.js';

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
    const chatGptTextRequest = new ChatGptTextRequest(this.openai);
    return chatGptTextRequest.execute(prompt);
  }

  async executeImage(prompt) {
    if (!prompt) {
      throw new Error('Image Prompt is empty.');
    }
    const chatGptImageRequest = new ChatGptImageRequest(this.openai);
    return chatGptImageRequest.execute(prompt);
  }
}

export default QueryChatGptCommand;
