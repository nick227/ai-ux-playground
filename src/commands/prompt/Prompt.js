import {
  QueryChatGptCommand,
  GetPromptTemplateCommand
} from '../query/index.js';

import { TemplateRenderCommand, ExtractAndSanitizeJSONCommand } from '../build/index.js';

export default class Prompt {
  constructor(templateType, params) {
    this.promptText = typeof params === 'string' ? params : '';
    this.promptParams = typeof params === 'object' ? params : {};
    this.response = null;
    this.responseText = null;
    this.responseObj = null;
    this.templates = null;
    this.functions = null;
    this.function_call = null;
    this.templateType = templateType;
  }

  async queryPrompt(promptText, params = {}) {
    const extendedParams = { prompt: promptText, ...params };

    if (this.function_call) {
      extendedParams.function_call = this.function_call;
    }

    const extractAndSanitizeJSONCommand = new ExtractAndSanitizeJSONCommand();
    const response = await QueryChatGptCommand.execute(extendedParams);
    const responseObj = extractAndSanitizeJSONCommand.execute(response.choices[0]?.message?.function_call.arguments);
    const responseText = response.choices[0]?.message?.content || '';

    return {
      response: response,
      responseObj: responseObj,
      responseText: responseText
    };
  }

  async executeSingleQuery(prompt) {
    const response = await this.queryPrompt(prompt);
    this.response = response.response;
    this.responseText = response.responseText;
    this.responseObj = response.responseObj;
  }

  async executeMultipleQueries() {
    const responses = await Promise.all(this.templates.map((template, index) => {
      const func = this.functions ? this.functions[index] : null;
      return this.queryPrompt(template, func ? { function: func } : {});
    }));
    this.responseObj = responses.map(r => r.responseObj);
    this.responseText = responses.map(r => r.responseText);
  }

  async queryChatGpt() {
    if (this.promptText) {
      Object.assign(this, await this.executeSingleQuery(this.promptText));
    } else if (Array.isArray(this.templates)) {
      await this.executeMultipleQueries();
    }
  }

  async setTemplates() {
    await this.getTemplates();
    const templateRenderCommand = new TemplateRenderCommand();
    this.templates = templateRenderCommand.execute(this.promptParams, this.templates);
    this.setFunctions();
  }

  async getTemplates() {
    const getPromptTemplateCommand = new GetPromptTemplateCommand();
    const templateResponse = await getPromptTemplateCommand.execute(this.templateType);
    this.templates = templateResponse.templates;
    this.functions = templateResponse.functions;
    this.function_call = templateResponse.function_call;
  }

  async setFunctions() {
    const templateRenderCommand = new TemplateRenderCommand();
    for (const func of this.functions) {
      func.description = templateRenderCommand.execute(this.promptParams, func.description);
      const keys = Object.keys(func.parameters.properties);
      if (keys.length === 0) {
        continue;
      }
      for (const key of keys) {
        func.parameters.properties[key].description = templateRenderCommand.execute(this.promptParams, func.parameters.properties[key].description);
      }
    }
  }
}
