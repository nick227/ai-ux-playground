import { GetPromptTemplateCommand } from '../query/index.js';
import { TemplateRenderCommand } from './index.js';
import Command from '../Command.js';

export default class PromptTemplateCommand extends Command {
  constructor(templateType, params) {
    super();
    this.templateType = templateType;
    this.params = params;
    this.prompt = null;
    this.tools = null;
    this.messages = null;
    this.collectionName = null;
  }

  async execute() {
    if(!this.templateType) {
      this.prompt = this.params.prompt;
      return;
    }
    try {
      await this.loadTemplates();
      this.renderFunctions(this.tools, this.params);
      this.renderTemplates(this.params);
    } catch (error) {
      console.error('Error initializing prompt template:', error);
      throw error;
    }
  }

  async loadTemplates() {
    const getPromptTemplateCommand = new GetPromptTemplateCommand();
    console.log('this.templateType',this.templateType)
    const templateResponse = await getPromptTemplateCommand.execute(this.templateType);
    this.messages = templateResponse.messages;
    this.prompt = templateResponse.prompt;
    this.tools = templateResponse.tools;
    this.tool_choice = templateResponse.tool_choice;
    this.collectionName = templateResponse.collectionName;
  }

  renderTemplates(params) {
    const templateRenderCommand = new TemplateRenderCommand();
    if(this.prompt){
      this.prompt = templateRenderCommand.execute(this.prompt, params);
    }
    if(this.messages){
      this.messages.forEach(message => {
        message.content = templateRenderCommand.execute(message.content, params);
      })
    }
  }

  renderFunctions(data, params) {
    if (Array.isArray(data)) {
      data.forEach(item => this.renderFunctions(item, params));
    } else if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === 'description') {
            const templateRenderCommand = new TemplateRenderCommand();
            data[key] = templateRenderCommand.execute(data[key], params);
          } else {
            this.renderFunctions(data[key], params);
          }
        }
      }
    }
  }
}
