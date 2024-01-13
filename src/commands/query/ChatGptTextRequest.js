import dotenv from 'dotenv';
import Command from '../Command.js';
import { SavePromptResultCommand } from './index.js';

dotenv.config();

class ChatGptTextRequest extends Command {
  constructor(openaiInstance, req=null) {
    super();
    this.req = req;
    this.openai = openaiInstance;
    this.maxTokens = Number(process.env.OPENAI_MAX_TOKENS) || 150;
    this.model = process.env.OPENAI_MODEL;
    this.SavePromptResultCommand = SavePromptResultCommand;
  }

  async execute(prompt) {
    const messages = prompt.messages || [{ role: 'user', content: prompt.prompt }];
    const tool_choice = {
      "type": "function",
      "function": { "name": prompt.tool_choice },
    };
    const options = {
      model: this.model,
      max_tokens: this.maxTokens,
      messages: messages,
      ...(prompt.tools && { tools: prompt.tools }),
      ...(prompt.tool_choice && { tool_choice: tool_choice })
    };
    console.log("\n");
    console.log("#################");
    console.log('start openai request');
    console.log(options)
    try {
      const completion = await this.openai.chat.completions.create(options);
      const savePromptResult = new this.SavePromptResultCommand();
      console.log(completion.usage);
      await savePromptResult.execute(completion, null, this.req.session.id);
      const response = this.getResponse(completion);
      console.log('success!');
      return response;
    } catch (error) {
      console.error("Error sending prompt to ChatGPT:", error);
      throw new Error('Failed to get response from OpenAI.');
    }
  }

  getResponse(completion) {
    if (!completion || !Array.isArray(completion.choices) || completion.choices.length === 0) {
      throw new Error('Invalid completion object');
    }
  
    const choice = completion.choices[0];
    if (choice?.message?.tool_calls) {
      return choice.message.tool_calls[0].function.arguments;
    } else if (choice?.message?.content) {
      return choice.message.content;
    } else {
      return choice.message;
    }
  }
}

export default ChatGptTextRequest;