import dotenv from 'dotenv';
import Command from '../../Command.js';
import { SavePromptResultCommand } from '../index.js';
import sendSocketMsgToClient from '../../../sendSocketMsgToClient.js';


dotenv.config();

class ChatGptTextRequest extends Command {
  constructor(openaiInstance, req = null) {
    super();
    this.req = req;
    this.openai = openaiInstance;
    this.maxTokens = Number(process.env.OPENAI_MAX_TOKENS) || 150;
    this.model = process.env.OPENAI_MODEL;
    this.SavePromptResultCommand = SavePromptResultCommand;
  }

  async execute(prompt) {
    sendSocketMsgToClient("Prompt Template: " + prompt.templateType, this.req);
    const messages = prompt.messages || [{ role: 'user', content: prompt.prompt }];
    const tool_choice = {
      "type": "function",
      "function": { "name": prompt.tool_choice },
    };

    const options = {
      model: this.model,
      messages: messages,
      ...(prompt.tools && { tools: prompt.tools }),
      ...(prompt.tool_choice && { tool_choice: tool_choice })
    };
    
    const totalChars = JSON.stringify(options).length;
    const estimatedInputTokens = Math.ceil(totalChars / 3.75);
    let newMaxToken = this.maxTokens - estimatedInputTokens;
    newMaxToken = Math.max(newMaxToken, 0);
    options.max_tokens = newMaxToken;

    console.log("\n");
    console.log("#################");
    console.log('start openai request');
    sendSocketMsgToClient(JSON.stringify(options, null, 2), this.req);
    try {
      const completion = await this.openai.chat.completions.create(options);
      console.log(completion.choices);
      console.log(completion.usage);
      const savePromptResult = new this.SavePromptResultCommand();
      await savePromptResult.execute(completion, null, this.req.session.id);
      sendSocketMsgToClient(JSON.stringify(completion, null, 2), this.req);
      const results = this.getResponse(completion);
      console.log('success!');
      return response;
    } catch (error) {
      sendSocketMsgToClient("Error sending prompt to ChatGPT: " + error, this.req);
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
      console.log('1')
      return choice.message.tool_calls[0].function.arguments;
    } else if (choice?.message?.content) {
      console.log('2')
      return { response: choice.message.content };
    } else {
      console.log('3')
      return choice.message;
    }
  }
}

export default ChatGptTextRequest;