import dotenv from 'dotenv';
import Command from '../Command.js';
import { SavePromptResultCommand } from './index.js';

dotenv.config();

class ChatGptTextRequest extends Command {
  constructor(openaiInstance) {
    super();
    this.openai = openaiInstance;
    this.maxTokens = Number(process.env.OPENAI_MAX_TOKENS) || 150;
    this.model = process.env.OPENAI_MODEL;
    this.SavePromptResultCommand = SavePromptResultCommand;
  }

  async execute(prompt) {
    const messages = prompt.messages || [{ role: 'user', content: prompt.prompt }];
    const options = {
      model: this.model,
      max_tokens: this.maxTokens,
      messages: messages,
      ...(prompt.tools && { tools: prompt.tools }),
      ...(prompt.tool_choice && { tool_choice: prompt.tool_choice })
    };

    try {
      const completion = await this.openai.chat.completions.create(options);
      const savePromptResult = new this.SavePromptResultCommand();
      await savePromptResult.execute(prompt, completion);

      return completion;

    } catch (error) {
      console.error("Error sending prompt to ChatGPT:", error);
      throw new Error('Failed to get response from OpenAI.');
    }
  }
}

export default ChatGptTextRequest;