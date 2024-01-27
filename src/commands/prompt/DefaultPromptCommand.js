import { Prompt } from './index.js';
import Command from '../Command.js';
import * as QueryCommands from '../query/index.js';
import sendSocketMsgToClient from '../../sendSocketMsgToClient.js';
import { PdfReader } from "pdfreader";

export default class DefaultPromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.urlParams = req.body || req.query;
    this.prompt = new Prompt(this.urlParams.prompt, this.urlParams.template || "main", { prompt: this.urlParams.prompt });
    this.queryChatGptCommand = new QueryCommands.QueryChatGptCommand(this.req);
    this.insertToDBCommand = new QueryCommands.InsertToDBCommand();
    this.getChatHistoryCommand = new QueryCommands.GetChatHistoryCommand();
    this.saveToChatHistoryCommand = new QueryCommands.SaveToChatHistoryCommand();
    this.getPageHistoryCommand = new QueryCommands.GetPageHistoryCommand();
    this.getDataSourceCommand = new QueryCommands.GetDataSourceCommand(this.urlParams.prompt);
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
      //await this.loadResults();

      if (this.prompt.sequence) {
        await this.handleSequence();
      }

      if (this.prompt.templateType !== 'ai_image_request') {
        await this.saveHistory();
      }
      sendSocketMsgToClient(JSON.stringify(this.results, null, 2), this.req);

      this.res.send(this.results);
    } catch (error) {
      console.error(error);
      sendSocketMsgToClient(JSON.stringify(error, null, 2), this.req);
      this.res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }

  async initPrompt() {
    await this.prompt.init();
  }

  async loadResults() {
    if (this.prompt.templateType === 'ai_image_request') {
      this.results = await this.queryChatGptCommand.executeImage(this.prompt.prompt);
      return;
    } 
    if (!this.prompt.use_embedding) {
      this.results = await this.queryChatGptCommand.execute(this.prompt);
      return;
    }
    if (this.prompt.use_embedding) {
      console.log('this.prompt.use_embedding', this.prompt.use_embedding);
      return;
    }
  }

  async loadMessages() {
    const staticDataSources = ['chatHistory', 'snapshots', 'documentation'];
console.log(this.prompt.data_sources)
    if (this.prompt.data_sources && this.prompt.data_sources.includes('chatHistory')) {
      const chatHistory = await this.getChatHistoryCommand.execute(this.req.session.id);
      this.prompt.messages.unshift(...chatHistory);
    }

    if (this.prompt.data_sources && this.prompt.data_sources.includes('snapshots')) {
      const snapshots = await this.getPageHistoryCommand.execute(this.req.session.id);
      this.prompt.messages.unshift(...snapshots);
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