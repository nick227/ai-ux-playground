import { Prompt } from './index.js';
import Command from '../Command.js';
import { ExtractAndSanitizeJSONCommand } from '../build/index.js';
import { QueryChatGptCommand } from '../query/index.js';
import { InsertToDBCommand } from '../query/index.js';

export default class TemplatePromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.urlParams = req.query;
    this.templateType = this.urlParams?.type || this.req.params?.type || null;
    this.prompt = new Prompt(null, this.templateType, this.urlParams);
    this.queryChatGptCommand = new QueryChatGptCommand();
    this.insertToDBCommand = new InsertToDBCommand();
    this.extractAndSanitizeJSONCommand = new ExtractAndSanitizeJSONCommand();
  }

  async execute() {
    try {
      //prompt
      await this.prompt.init();
      //query
      const results = await this.queryChatGptCommand.execute(this.prompt);
      //validate
      const response = await this.extractAndSanitizeJSONCommand.execute(results);
      //save
      this.insertToDBCommand.execute(response, this.prompt.collectionName);
      //respond
      this.res.send(response);

    } catch (error) {
      console.error('ExecuteTemplatePromptCommand Error:', error);
      this.res.status(500).send('An error occurred while processing your request.');
    }
  }
}