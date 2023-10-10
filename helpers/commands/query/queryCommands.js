require('dotenv').config();
require('module-alias/register');
const chatGptApi = require('@helpers/chatGptApi');
const DB = require('@helpers/DB');
const buildPrompt = require('@commands/prompt/build/buildPrompt');
const fs = require('fs').promises;

class Command {
  execute() { throw new Error('Method not implemented.'); }
}

class QueryPromptTemplatesCommand extends Command {
  async execute(type) {
    if (!type) {
      throw new Error('Missing required query parameters.');
    }
    const db = new DB('promptTemplates.db');
    return await db.findOne({ type: type });
  }
}

class BuildPromptCommand extends Command {
  async execute(req, template = null) {
    if (!req.query.prompt) {
      throw new Error('Missing required query parameters.');
    }
    const prompt = await buildPrompt(req, template);

    return prompt;
  }
}

class AddToQueueCommand extends Command {
  async execute(prompt) {
    if (!prompt) {
      throw new Error('Prompt is empty.');
    }
    return await chatGptApi.addToQueue({ prompt });
  }
}

class SavePromptResultCommand extends Command {
  async execute(prompt, result) {
    writeDataToFile(prompt, result);
    const insertToDB = new InsertToDBCommand();
    return await insertToDB.execute({
      prompt: prompt,
      response: result
    }, 'chatgptTransactions');
  }
}

class InsertToDBCommand extends Command {
  async execute(result, tableName) {
    console.log('Inserting to DB...', tableName);
    console.log('w--------w-w-w-w-w-w-w-w-w-w-w-w-w-w');
    if (!result) {
      console.log('FAILED');
      console.log(result);
      throw new Error('Result is empty!');
    }
    const db = new DB(`${tableName}.db`);
    return await db.insert(result);
  }
}

class ExtractAndSanitizeJSONCommand extends Command {
  execute(input) {
    if (!input) {
      throw new Error('Input is empty.');
    }
    return typeof input === 'object' ? input : extractAndSanitizeJSON(input);
  }
}

function extractAndSanitizeJSON(input) {
  try {
    const parsed = JSON.parse(input);
    return parsed;
  } catch (e) {
    const firstCurly = input.indexOf('{');
    const lastCurly = input.lastIndexOf('}');

    if (firstCurly === -1 || lastCurly === -1 || firstCurly >= lastCurly) {
      return input;
    }

    const extracted = input.substring(firstCurly, lastCurly + 1);

    try {
      return JSON.parse(extracted);
    } catch (e) {
      return sanitizeJSON(extracted);
    }
  }
}

async function writeDataToFile(prompt, result) {
  const filename = `../${Math.floor(Date.now() / 1000)}-${process.env.OPENAI_MODEL}-queries.txt`;
  const data = `prompt:\n${prompt}\n\nresponse:\n${result}`;
  await fs.writeFile(filename, data);
}

function sanitizeJSON(input) {
  try {
    return JSON.parse(input);
  } catch (initialError) {
    let sanitized = input
      .replace(/\/\/[^\n]*\n/g, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/'/g, '"') // Replace single quotes with double quotes
      .replace(/(\w+):/g, '"$1":') // Add quotes around unquoted property names
      .replace(/,\s*([\]}])/g, '$1') // Remove trailing commas
      .replace(/:\s*([a-zA-Z_$][\w]*)/g, ':"$1"') // Quote unquoted string values
      .replace(/:\s*undefined/g, ':null'); // Replace undefined with null

    try {
      return JSON.parse(sanitized);
    } catch (finalError) {
      console.error("Initial error:", initialError.message);
      console.error("Final error:", finalError.message);
      console.error("Sanitized input:", sanitized);
      return null;
    }
  }
}

module.exports = {
  BuildPromptCommand,
  AddToQueueCommand,
  SavePromptResultCommand,
  ExtractAndSanitizeJSONCommand,
  InsertToDBCommand,
  QueryPromptTemplatesCommand
};