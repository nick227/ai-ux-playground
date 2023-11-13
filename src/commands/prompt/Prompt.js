import { PromptTemplateCommand } from '../build/index.js';
import Command from '../Command.js';

export default class Prompt extends Command {
  constructor(prompt, templateType=0, params=[]) {
    super();
    this.prompt = prompt;
    this.params = params;
    this.templateType = templateType;
    this.promptTemplateCommand = new PromptTemplateCommand(this.templateType, this.params);
  }

  async init() {
    await this.promptTemplateCommand.execute();
    this.prompt = this.promptTemplateCommand?.prompt;
    this.tools = this.promptTemplateCommand?.tools;
    this.messages = this.promptTemplateCommand?.messages;
    this.tool_choice = this.promptTemplateCommand?.tool_choice;
  }
}
