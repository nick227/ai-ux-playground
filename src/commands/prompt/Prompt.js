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
  }

  async init() {
    await this.renderTemplatePromptCommand.execute();
    this.prompt = this.prompt ? this.prompt : this.renderTemplatePromptCommand?.prompt;
    this.tools = this.renderTemplatePromptCommand?.tools;
    this.messages = this.renderTemplatePromptCommand?.messages;
    this.tool_choice = this.renderTemplatePromptCommand?.tool_choice;
  }
}
