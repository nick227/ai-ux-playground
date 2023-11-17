import { Prompt } from './index.js';
import Command from '../Command.js';
import { QueryChatGptCommand } from '../query/index.js';
import { InsertToDBCommand } from '../query/index.js';

export default class DefaultPromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.urlParams = req.query;
    this.prompt = new Prompt(this.urlParams.prompt);
    this.queryChatGptCommand = new QueryChatGptCommand();
    this.insertToDBCommand = new InsertToDBCommand();
  }

  async execute() {
    try {
      if (this.urlParams.prompt) {
        await this.prompt.init();
        console.log(this.prompt);
        const response = await this.queryChatGptCommand.execute(this.prompt);
        this.insertToDBCommand.execute(response, this.prompt.collectionName);
        this.res.send(response);
      } else {
        this.res.status(400).json({ error: 'No prompt provided' });
      }
    } catch (error) {
      console.error('DefaultPromptCommand Error:', error);
      this.res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
}
