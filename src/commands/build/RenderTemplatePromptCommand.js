import { GetPromptTemplateCommand } from '../query/index.js';
import { RenderTemplateCommand } from './index.js';
import Command from '../Command.js';

export default class RenderTemplatePromptCommand extends Command {
  constructor(templateType, params) {
    super();
    this.templateType = templateType;
    this.params = params;
    this.prompt = null;
    this.tools = null;
    this.messages = null;
    this.sequence = null;
    this.use_embedding = null;
    this.data_sources = null;
    this.collectionName = null;
    this.getPromptTemplateCommand = new GetPromptTemplateCommand();
    this.renderTemplateCommand = new RenderTemplateCommand();
  }

  async execute() {
    if (!this.templateType) {
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
    const templateResponse = await this.getPromptTemplateCommand.execute(this.templateType);
    console.log('templateResponse', templateResponse)
    console.log('templateType', this.templateType)
    this.messages = templateResponse.messages;
    this.prompt = templateResponse.prompt;
    this.tools = templateResponse.tools;
    this.tool_choice = templateResponse.tool_choice;
    this.collectionName = templateResponse.collectionName;
    this.data_sources = templateResponse.data_sources;
    this.sequence = templateResponse.sequence;
    this.use_embedding = templateResponse.use_embedding;
    if (this.messages) {
      //user messages should be last
      this.messages.sort((a, b) => (a.role === 'user') ? 1 : ((b.role === 'user') ? -1 : 0));
    }
  }

  renderTemplates(params) {
    if (this.prompt) {
      this.prompt = this.renderTemplateCommand.execute(this.prompt, params);
    }
    if (this.messages) {
      this.messages.forEach(message => {
        message.content = this.renderTemplateCommand.execute(message.content, params);
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
            data[key] = this.renderTemplateCommand.execute(data[key], params);
          } else {
            this.renderFunctions(data[key], params);
          }
        }
      }
    }
  }
}
