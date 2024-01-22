import Command from "../Command.js";
import DB from "../../db/DB.js";

export default class ClearChatHistoryCommand extends Command {
  async execute(sessionId) {
    const db = new DB(`chatHistory.db`);
    const query = { sessionId: sessionId };
    console.log('try remove', query);
    return await db.remove(query);
  }
}