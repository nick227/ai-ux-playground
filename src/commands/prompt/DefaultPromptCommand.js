import { Prompt } from './index.js';
import Command from '../Command.js';
import { QueryChatGptCommand, InsertToDBCommand, GetChatHistoryCommand } from '../query/index.js';
import { RenderSnapshotCommand } from '../build/index.js';

export default class DefaultPromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.urlParams = req.query;
    this.prompt = new Prompt(this.urlParams.prompt);
    this.queryChatGptCommand = new QueryChatGptCommand(this.req);
    this.insertToDBCommand = new InsertToDBCommand();
    this.getChatHistoryCommand = new GetChatHistoryCommand();
    this.renderSnapshotCommand = new RenderSnapshotCommand();
  }

  async execute() {
    try {
      if (this.urlParams.prompt) {
        this.prompt = new Prompt(this.prompt, this.urlParams.template || "main", { prompt: this.prompt.prompt });
        await this.prompt.init();
        const snapshot = await this.renderSnapshotCommand.execute(this.req.session.id);
        console.log(' ! snapshot', snapshot);
        const chatHistory = await this.getChatHistoryCommand.execute(this.req.session.id);
        this.prompt.messages.unshift(...chatHistory);

        const results = await this.queryChatGptCommand.execute(this.prompt);
        await this.saveToChatHistory(this.urlParams.prompt, JSON.parse(results));
        this.res.send(results);
      } else {
        this.res.status(400).json({ error: 'No prompt provided.' });
      }
    } catch (error) {
      this.res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }

  async saveToChatHistory(prompt, results) {
    const response = results.response;
    const sessionId = this.req.session.id;
    const params = [{ role: 'user', content: prompt, sessionId: sessionId }, { role: 'assistant', content: response, sessionId: sessionId }];
    this.saveLater(params);
  }

  saveLater(params) {
    setImmediate(() => {
      this.insertToDBCommand.execute(params, 'chatHistory');
    });
  }
}