import { GetPromptTemplateCommand } from '../../query/index.js';
import { TemplateRenderCommand } from '../../build/index.js';

export default class PromptTemplateHelper {
  constructor(templateType, params) {
    this.templateType = templateType;
    this.params = params;
    this.templates = null;
    this.functions = null;
    this.collectionName = null;
  }

  async execute () {
    try {
      await this.loadTemplates();
      this.setFunctions(this.params);
      this.renderTemplates(this.params);
    } catch (error) {
      console.error('Helper Error initializing templates:', error);
      throw error;
    }
  }

  async loadTemplates() {
    const getPromptTemplateCommand = new GetPromptTemplateCommand();
    const templateResponse = await getPromptTemplateCommand.execute(this.templateType);
    this.templates = templateResponse.templates;
    this.functions = templateResponse.functions;
    this.collectionName = templateResponse.collectionName;
  }

  renderTemplates(params) {
    const templateRenderCommand = new TemplateRenderCommand();
    this.templates = templateRenderCommand.execute(params, this.templates);
  }

  setFunctions(params) {
    const templateRenderCommand = new TemplateRenderCommand();
    for (const func of this.functions) {
      func.description = templateRenderCommand.execute(params, func.description);
      const keys = Object.keys(func.parameters.properties);
      for (const key of keys) {
        func.parameters.properties[key].description = templateRenderCommand.execute(params, func.parameters.properties[key].description);
      }
    }
  }
}
