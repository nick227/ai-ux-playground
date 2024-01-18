import Command from "../Command.js";
import DB from "../../db/DB.js";
import { QueryDocumentCommand } from './index.js';

export default class GetDataSourceCommand extends Command {
    constructor(req, res) {
      super();
      this.req = req;
      this.res = res;
      this.name = null;
      this.path = null;
    }
    async execute(name) {
        this.name = name;
        await this.getDataSource();
        const queryDocumentCommand = new QueryDocumentCommand(this.path);
        const results = await queryDocumentCommand.execute(this.req.query.prompt);
        console.log(' # results:', results);
    }

    async getDataSource() {
        try {
            const db = new DB('dataSources.db');
            const results = await db.find({name: this.name});
            this.name = results[0].name;
            this.path = results[0].path;
        } catch (error) {
            return error;
        }
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