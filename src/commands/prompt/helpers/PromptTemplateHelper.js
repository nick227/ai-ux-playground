import { GetPromptTemplateCommand } from '../../query/index.js';
import { TemplateRenderCommand } from '../../build/index.js';

export default class PromptTemplateHelper {
  constructor(templateType, params) {
    this.templateType = templateType;
    this.params = params;
    this.prompt = null;
    this.tools = null;
    this.collectionName = null;
  }

  async execute() {
    try {
      await this.loadTemplates();
      this.renderFunctions(this.tools, this.params);
      this.renderTemplates(this.params);
    } catch (error) {
      console.error('Helper Error initializing prompt:', error);
      throw error;
    }
  }

  async loadTemplates() {
    const getPromptTemplateCommand = new GetPromptTemplateCommand();
    const templateResponse = await getPromptTemplateCommand.execute(this.templateType);
    this.prompt = templateResponse.prompt;
    this.tools = templateResponse.tools;
    this.tool_choice = templateResponse.tool_choice;
    this.collectionName = templateResponse.collectionName;
  }

  renderTemplates(params) {
    const templateRenderCommand = new TemplateRenderCommand();
    this.prompt = templateRenderCommand.execute(params, this.prompt);
  }

  renderFunctions(data, params) {
    if (Array.isArray(data)) {
      data.forEach(item => this.renderFunctions(item, params));
    } else if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (key === 'description') {
            const templateRenderCommand = new TemplateRenderCommand();
            data[key] = templateRenderCommand.execute(params, data[key]);
          } else {
            this.renderFunctions(data[key], params);
          }
        }
      }
    }
  }


}
