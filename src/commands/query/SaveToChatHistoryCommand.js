
import Command from "../Command.js";
import { InsertToDBCommand } from '../query/index.js';

export default class SaveToChatHistoryCommand extends Command {
  async execute(params) {
    const insertToDB = new InsertToDBCommand();
    return await insertToDB.execute({
      sessionId: params.sessionId,
      role: params.role,
      content: params.content
    }, 'chatHistory');
  }
}