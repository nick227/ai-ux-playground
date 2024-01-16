import Command from "../Command.js";
import DB from "../../db/DB.js";

export default class GetPageHistoryCommand extends Command {
    async execute(sessionId) {
        const db = new DB('snapshots.db');
        const results = await db.find({ sessionId:sessionId, limit: 1 });
        return this.formatResults(results);
    }
    formatResults(data) {
        /*
        //this code chunks css and html into separate messages
        if (data.length > 0 && data[0].html && data[0].css) {
            return ['html', 'css'].map(key => ({ content: `Current ${key}: ` + data[0][key], role: 'assistant' }));
        } else {
            return [];
        }
        */
        if (data.length > 0 && data[0].html && data[0].css) {
            const html = data[0].html;
            const css = data[0].css;
            return [{ role: 'assistant', content: `Current HTML and CSS:\n\nHTML:\n${html}\n\nCSS:\n${css}`}];
        } else {
            return [];
        }

    }
}