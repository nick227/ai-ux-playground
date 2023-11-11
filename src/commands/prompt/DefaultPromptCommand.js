import { Prompt } from './index.js';
import Command from '../Command.js';

export default class DefaultPromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
  }

  async execute() {
    try {
      if (this.req.query.prompt) {
        const prompt = new Prompt(null, this.req.query.prompt);
        await prompt.init();
        console.log('Standard Prompt Complete');
        this.res.status(200).json({ response: prompt.responseText });
      } else {
        this.res.status(400).json({ error: 'No prompt provided' });
      }
    } catch (error) {
      console.error('DefaultPromptCommand Error:', error);
      this.res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  }
}
