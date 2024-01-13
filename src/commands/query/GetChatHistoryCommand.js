import Command from "../Command.js";
import DB from "../../db/DB.js";

export default class GetChatHistoryCommand extends Command {
    async execute(sessionId, limit = 3) {
        const db = new DB('chatHistory.db');
        const results = await db.find({ sessionId:sessionId, limit: limit });
        return this.formatResults(results);

    }
    formatResults(results) {
        return results.map(result => {
            return {
                role: result.role,
                content: result.content
            }
        });
    }
}