
import Command from "../../interfaces/Command.js";
import { promises as fs } from 'fs';
import {
    InsertToDBCommand,
  } from '../query/index.js';

export default class SavePromptResultCommand extends Command {
  async execute(prompt, result) {
    writeDataToFile(prompt, result);
    const insertToDB = new InsertToDBCommand();
    return await insertToDB.execute({
      prompt: prompt,
      response: result
    }, 'chatgptTransactions');
  }
}

//temporary backup
async function writeDataToFile(prompt, result) {
    const filename = `../${Math.floor(Date.now() / 1000)}-${process.env.OPENAI_MODEL}-queries.txt`;
    const stringifiedResult = typeof result === 'object' ? JSON.stringify(result, null, 2) : result;
    const data = `prompt:\n${prompt}\n\nresponse:\n${stringifiedResult}`;
    await fs.writeFile(filename, data);
  }