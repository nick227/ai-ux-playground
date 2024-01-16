import { Prompt } from './index.js';
import Command from '../Command.js';
import * as QueryCommands from '../query/index.js';

export default class DefaultPromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.urlParams = req.query;
    this.prompt = new Prompt(this.urlParams.prompt, this.urlParams.template || "main", { prompt: this.urlParams.prompt });
    this.queryChatGptCommand = new QueryCommands.QueryChatGptCommand(this.req);
    this.insertToDBCommand = new QueryCommands.InsertToDBCommand();
    this.getChatHistoryCommand = new QueryCommands.GetChatHistoryCommand();
    this.saveToChatHistoryCommand = new QueryCommands.SaveToChatHistoryCommand();
    this.getPageHistoryCommand = new QueryCommands.GetPageHistoryCommand();
    this.getDocumentationCommand = new QueryCommands.GetDocumentationCommand();
    this.getDataSourceCommand = new QueryCommands.GetDataSourceCommand();
    this.results = [];
  }

  async execute() {
    try {
      if (!this.urlParams.prompt) {
        this.res.status(400).json({ error: 'No prompt provided.' });
        return;
      }

      await this.initPrompt();
      await this.loadMessages();
      await this.loadResults();

      if (this.prompt.sequence) {
        await this.handleSequence();
      }

      await this.saveHistory();
      this.res.send(this.results);
    } catch (error) {
      console.error(error);
      this.res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }

  async initPrompt() {
    await this.prompt.init();
  }

  async loadResults() {
    this.results = await this.queryChatGptCommand.execute(this.prompt);
  }

  async loadMessages() {
    const staticDataSources = ['chatHistory', 'snapshots', 'documentation'];

    if (this.prompt.data_sources && this.prompt.data_sources.includes('chatHistory')) {
      const chatHistory = await this.getChatHistoryCommand.execute(this.req.session.id);
      this.prompt.messages.unshift(...chatHistory);
    }

    if (this.prompt.data_sources && this.prompt.data_sources.includes('snapshots')) {
      const snapshots = await this.getPageHistoryCommand.execute(this.req.session.id);
      this.prompt.messages.unshift(...snapshots);
    }

    if (this.prompt.data_sources && this.prompt.data_sources.includes('documentation')) {
      const documentation = await this.getDocumentationCommand.execute();
      this.prompt.messages.unshift(...documentation);
    }

    if (this.prompt.data_sources && Array.isArray(this.prompt.data_sources)) {
      for (let datasource of this.prompt.data_sources) {
        if (!staticDataSources.includes(datasource)) {
          const dynamicData = await this.getDataSourceCommand.execute(datasource);
          this.updateMessages(dynamicData);
        }
      }
    }
  }

  updateMessages(data) {
    if (Array.isArray(data)) {
      this.prompt.messages.unshift(...data);
    }
  }

  async handleSequence() {
    this.prompt.sequence = false;
    const intent = JSON.parse(this.results).intent;
    if (intent) {
      this.prompt = new Prompt(this.prompt, intent, { prompt: this.prompt.prompt });
      await this.prompt.init();
      await this.loadMessages();
      await this.loadResults();
    }
  }

  async saveHistory() {
    const prompt = this.urlParams.prompt;
    this.saveToChatHistoryCommand.execute(prompt, this.results, this.req.session.id);
  }
}