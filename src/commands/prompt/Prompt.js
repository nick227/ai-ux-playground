import { PromptTemplateHelper } from './helpers/index.js';
import { QueryChatGptCommand } from '../query/index.js';
import { ExtractAndSanitizeJSONCommand } from '../build/index.js';

export default class Prompt {
  constructor(templateType, params) {
    this.templateType = templateType;
    this.params = params;
  }

  async init() {
    this.templateHelper = new PromptTemplateHelper(this.templateType, this.params);
    await this.templateHelper.execute(); 
    console.log(',,,....,,,', this.templateHelper)
    this.templates = this.templateHelper.templates;
    this.params = this.templateHelper.params;
    this.functions = this.templateHelper.functions;
    this.function_call = this.templateHelper.function_call;
  }

  async executeQueries() {
    try {
      await this.init();
      for (const [index, template] of this.templateHelper.templates.entries()) {
        const func = this.templateHelper.functions[index];
        const response = await this.queryGPT(template, this.params, func);
        this.responses.push(response);
      }
      return this.responses;
    } catch (error) {
      console.error('Error executing queries in Prompt:', error);
      throw error;
    }
  }

  async queryGPT(promptText, params = {}, function_call = null) {
    try {
      const extendedParams = { ...params, function_call };
      const queryChatGptCommand = new QueryChatGptCommand(promptText, extendedParams);
      const response = await queryChatGptCommand.execute();
      if (!response.choices || response.choices.length === 0 || !response.choices[0].message) {
        throw new Error('GPT service returned no response.');
      }

      const { message } = response.choices[0];
      const extractAndSanitizeJSONCommand = new ExtractAndSanitizeJSONCommand();
      const responseObj = extractAndSanitizeJSONCommand.execute(message.function_call?.arguments);
      const responseText = message.content || '';

      return { response, responseObj, responseText };
    } catch (error) {
      console.error('Error querying GPT in Prompt:', error);
      throw error;
    }
  }
}
