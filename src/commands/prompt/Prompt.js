import { PromptTemplateCommand } from '../build/index.js';
import Command from '../Command.js';

export default class Prompt extends Command {
  constructor(prompt, templateType=null, params=null) {
    super();
    this.prompt = prompt;
    this.templateType = templateType;
    this.params = params;
  }

  async init() {
    if(!this.templateType || !this.params){
      return;
    }
    this.templateTemplate = new PromptTemplateCommand(this.templateType, this.params);
    await this.templateTemplate.execute(); 
    
    this.prompt = this.templateHelper?.prompt;
    this.tools = this.templateHelper?.tools;
    this.messages = this.templateHelper?.messages;
    this.tool_choice = this.templateHelper?.tool_choice;
  }
}
