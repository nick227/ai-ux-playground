import 'module-alias/register.js';
import Datastore from 'nedb';
import util from 'util';
import path from 'path';
import validateSchema from './validateSchema.js';
import schemas from './schemas.js';

const DB_PATH = path.join(process.cwd(), './data/');
console.log('DB_PATH', DB_PATH);
export default class DB {
    constructor(dbName) {
        this.validateSchema = validateSchema;
        this.db = new Datastore({ filename: path.join(DB_PATH, dbName), autoload: true });
        this.dbName = dbName.split('.')[0];
        this.db.loadDatabase(err => {
            if (err) {
                console.error('Error loading database:', err);
            }
        });
        this.db.insertAsync = util.promisify(this.db.insert);
        this.db.findAsync = util.promisify(this.db.find);
        this.db.findOneAsync = util.promisify(this.db.findOne);
        this.db.updateAsync = util.promisify(this.db.update);
        this.db.removeAsync = util.promisify(this.db.remove);
    }

    async insert(rows) {
        if (Array.isArray(rows)) {
            rows.forEach(row => row.timestamp = new Date());
        } else {
            rows.timestamp = new Date();
        }
     /*
        if (typeof rows === 'string') {
            try {
                rows = JSON.parse(rows);
                //temp fix for now
                return await this.db.insertAsync(row);
            } catch (e) {
                throw new Error('Invalid JSON string');
            }
        }
     */
  
        const schema = schemas[this.dbName];
        const isArrayOfStrings = Array.isArray(rows) && rows.every(item => typeof item === 'string');
      
        // Normalize input to always be an array
        const normalizedRows = isArrayOfStrings ? rows.map(str => ({ value: str })) : Array.isArray(rows) ? rows : [rows];
    
        // Validate schema and insert rows
        const insertPromises = normalizedRows.map(async row => {
          //if (!this.validateSchema(row, schema)) {
            //throw new Error('Invalid schema for one of the rows');
          //}
          return await this.db.insertAsync(row);
        });
      
        const results = await Promise.all(insertPromises);
        return Array.isArray(rows) ? results : results[0];
   
      }
      
    
    async update(query, update) {
        const schema = schemas[this.dbName];
        if (!this.validateSchema(update, schema)) {
            throw new Error('Invalid schema');
        }

        return await this.db.updateAsync(query, update, {});
    }

    async find(query, options = {}) {
        options.sort = { _id: -1 };
        console.log('query', query);
        return await this.db.findAsync(query, options);
    }

    async findOne(query, options = {}) {
        try {
            options.sort = { timestamp: -1 }; 
            const row = await this.db.findOneAsync(query, options);
            return row;
        } catch (err) {
            throw new Error(err);
        }
    }
 

    async remove(query) {
        try {
            const numRemoved = await this.db.removeAsync(query, {});
            return numRemoved;
        } catch (err) {
            throw new Error(err);
        }
    }
}
