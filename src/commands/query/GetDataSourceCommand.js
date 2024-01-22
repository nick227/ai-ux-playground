import fs from "fs/promises";
import Command from "../Command.js";
import DB from "../../db/DB.js";

export default class GetDataSourceCommand extends Command {
    constructor(prompt) {
        super();
        this.prompt = prompt;
        this.folder = './public/uploads';
        this.path = null;
        this.name = null;
        this.extension = null;
        this.filePath = null;
        this.role = 'system';
    }
    async execute(name) {
        await this.load(name);
        if (this.extension !== 'pdf') {
            const fileData = await fs.readFile(this.filePath);
            let results = this.formatResults(fileData.toString());
            return results;
        }
    }

    async load(name) {
        try {
            const db = new DB('dataSources.db');
            const results = await db.find({ name: name });
            this.name = results[0].name;
            this.path = results[0].path;
            this.extension = this.name.split('.').pop();
            this.filePath = `${this.folder}/${this.path}`;
        } catch (error) {
            return error;
        }
    }

    formatResults(results) {
        if (typeof results === 'string' && results.length > 0) {
            return [{
                role: this.role,
                content: results
            }]
        }
        else if (results[0] && results[0].content) {
            return [{
                role: this.role,
                content: results[0].content || results[0]
            }]
        } else {
            return []
        }
    }
}