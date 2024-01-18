
import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';
import { Document, VectorStoreIndex } from "llamaindex";
import Command from '../Command.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class QueryDocumentCommand extends Command {
    constructor(fileName) {
      super();
      const dir = './public/uploads';
      this.filePath = path.join(dir, fileName);
    }
  
    async execute(prompt) {
        console.log('-----')
        console.log('prompt', prompt);
  
      const essay = await fs.readFile(this.filePath, "utf-8");
      const document = new Document({ text: essay });
      const index = await VectorStoreIndex.fromDocuments([document]);
console.log('index', index);
      const queryEngine = index.asQueryEngine();
      const response = await queryEngine.query(prompt);
  console.log('response.toString()', response.toString())
  console.log('-----')
      return response.toString();
    }
  }