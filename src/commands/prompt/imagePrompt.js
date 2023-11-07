import Prompt from "./Prompt.js";
import sendSocketMsgToClient from "../../sendSocketMsgToClient.js";
import { QueryChatGptCommand } from "../query/index.js";
import { SaveImageCommand } from "../build/index.js";
import dotenv from "dotenv";
dotenv.config();

export default async function imagePrompt(req, res) {
  try {
    const urlParams = req.query;
    const templateType =
      typeof urlParams?.type === "string" ? urlParams.type : null;

console.log("urlParams", urlParams);

    const promptText = urlParams.prompt;
    const prompt = new Prompt(promptText, templateType, urlParams);
    await prompt.init();

console.log("prompt", prompt);

    const queryChatGptCommand = new QueryChatGptCommand();
    const response = await queryChatGptCommand.executeImage(prompt.prompt);
    const b64JsonString = response.data[0].b64_json;

    const saveImageCommand = new SaveImageCommand(b64JsonString, prompt.prompt);
    saveImageCommand.execute();

    //const insertToDBCommand = new InsertToDBCommand();
    //insertToDBCommand.execute(cleanJson, prompt.collectionName);

    console.log("COMPLETE");
    //sendSocketMsgToClient(JSON.stringify(prompt.responseObj), req);
    res.json({ b64JsonString: b64JsonString });
  } catch (error) {
    console.error("imagePrompt Error:", error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
      error: error.message, // It's usually not a good practice to expose error details to the client, especially in production
    });
  }
}
