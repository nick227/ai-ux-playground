import Command from "../Command.js";
import DB from "../../db/DB.js";

export default class InsertToDBCommand extends Command {
  async execute(result, tableName) {
    console.log('--------');
    console.log('Inserting to DB...', tableName);
    if (!result) {
      console.log('FAILED');
      console.log(result);
      throw new Error('Result is empty!');
    }
    const db = new DB(`${tableName}.db`);
    return await db.insert(result);
  }
}