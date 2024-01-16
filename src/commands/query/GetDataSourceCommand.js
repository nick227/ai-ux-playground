import Command from "../Command.js";
import DB from "../../db/DB.js";

export default class GetDataSourceCommand extends Command {
    async execute(name) {
        const db = new DB('dataSources.db');
        const results = await db.find({ name:name });
        return this.formatResults(results);
    }
    formatResults(results) {
        if(results[0] && results[0].content){
            return [{
                role: 'assistant',
                content: results[0].content || results[0]
            }]
        } else {
            return []
        }
    }
}