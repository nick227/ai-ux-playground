import { PromptTemplateHelper } from './helpers/index.js';
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
    this.templateHelper = new PromptTemplateHelper(this.templateType, this.params);
    await this.templateHelper.execute(); 
    
    this.prompt = this.templateHelper?.prompt;
    this.tools = this.templateHelper?.tools;
    this.tool_choice = this.templateHelper?.tool_choice;
  }
}
