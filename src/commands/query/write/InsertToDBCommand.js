import Command from "../../Command.js";
import DB from "../../../db/DB.js";

export default class InsertToDBCommand extends Command {
  async execute(data, tableName, sessionId=null) {
    if (!data || !tableName) {
      return;
    }
    const db = new DB(`${tableName}.db`);
    const exists = sessionId && await db.exists('sessionId', sessionId);
    if (exists) {
      return await db.update({ sessionId: sessionId }, data);
    } else {
      return await db.insert(data);
    }
  }
}