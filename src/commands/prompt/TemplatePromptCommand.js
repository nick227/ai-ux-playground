import { Prompt } from './index.js';
import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
import { InsertToDBCommand } from '../query/index.js';
import { ExtractAndSanitizeJSONCommand } from '../build/index.js';
import Command from '../Command.js';
import { QueryChatGptCommand } from '../query/index.js';

export default class TemplatePromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
  }

  async execute() {
    try {
      const urlParams = this.req.query;
      const templateType = urlParams?.type || this.req.params?.type || null;

      //prompt
      const prompt = new Prompt(null, templateType, urlParams);
      await prompt.init();
      console.log('prompt:', prompt);
      
      //query
      const queryChatGptCommand = new QueryChatGptCommand();
      const response = await queryChatGptCommand.execute(prompt);
      console.log('response:', response);

      //db
      const insertToDBCommand = new InsertToDBCommand();
      insertToDBCommand.execute(response, prompt.collectionName);

      console.log('COMPLETE');

      //finish
      sendSocketMsgToClient(JSON.stringify(response), this.req);
      this.res.send(response);

    } catch (error) {
      console.error('ExecuteTemplatePromptCommand Error:', error);
      this.res.status(500).send('An error occurred while processing your request.');
    }
  }
}
