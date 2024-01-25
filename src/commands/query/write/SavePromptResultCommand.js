import Command from "../../Command.js";
import { InsertToDBCommand } from '../index.js';

export default class SavePromptResultCommand extends Command {
  async execute(completion, userId=null, sessionId=null) {
    const insertToDB = new InsertToDBCommand();
    return await insertToDB.execute({
      userId: userId,
      sessionId: sessionId,
      completion: completion
    }, 'chatgptTransactions');
  }
}