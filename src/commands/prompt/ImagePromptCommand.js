import { Prompt } from "./index.js";
import { QueryChatGptCommand } from "../query/index.js";
import { SaveImageCommand } from "../build/index.js";
import Command from '../Command.js';
import dotenv from "dotenv";
dotenv.config();

export default class ImagePromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
  }

  async execute() {
    try {
      const urlParams = this.req.query;
      const templateType = typeof urlParams?.type === "string" ? urlParams.type : null;

      const prompt = new Prompt(null, templateType, urlParams);
      await prompt.init();
      const queryChatGptCommand = new QueryChatGptCommand();
      const response = await queryChatGptCommand.executeImage(prompt.prompt);
      const b64JsonString = response.data[0].b64_json;

      const saveImageCommand = new SaveImageCommand(b64JsonString, prompt.prompt);
      saveImageCommand.execute();
      
      console.log("COMPLETE");

      this.res.json({ b64JsonString: b64JsonString });

    } catch (error) {
      console.error("ImagePromptCommand Error:", error);
      this.res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  }
}
