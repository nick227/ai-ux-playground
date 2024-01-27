import { RenderTemplatePromptCommand } from '../build/index.js';
import Command from '../Command.js';

export default class Prompt extends Command {
  constructor(prompt, templateType = null, params = []) {
    super();
    this.messages = [];
    this.prompt = prompt;
    this.params = params;
    this.templateType = templateType;
    this.renderTemplatePromptCommand = new RenderTemplatePromptCommand(this.templateType, this.params);
    this.data_sources = null;
    this.sequence = null;
    this.use_embedding = null;
  }

  async init() {
    await this.renderTemplatePromptCommand.execute();
    this.prompt = this.prompt ? this.prompt : this.renderTemplatePromptCommand?.prompt;
    this.tools = this.renderTemplatePromptCommand?.tools;
    this.messages = this.renderTemplatePromptCommand?.messages;
    this.tool_choice = this.renderTemplatePromptCommand?.tool_choice;
    this.data_sources = this.renderTemplatePromptCommand?.data_sources;
    this.sequence = this.renderTemplatePromptCommand?.sequence;
    this.use_embedding = this.renderTemplatePromptCommand?.use_embedding;
  }
}
