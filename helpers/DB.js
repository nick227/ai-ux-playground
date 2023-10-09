require('module-alias/register');
const Datastore = require('nedb');
const util = require('util');
const path = require('path');
const validateSchema = require('./validateSchema');
const schemas = require('./schemas');
const DB_PATH = path.join(__dirname, '../data/');

class DB {
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

    async insert(row) {
        const schema = schemas[this.dbName];
        if (!this.validateSchema(row, schema)) {
            throw new Error('Invalid schema');
        }
        return await this.db.insertAsync(row);
    }

    async update(query, update) {
        const schema = schemas[this.dbName]; // Fetch schema based on dbName
        if (!this.validateSchema(update, schema)) {
            throw new Error('Invalid schema');
        }

        return await this.db.updateAsync(query, update, {});
    }

    async find(query, options = {}) {
        options.sort = { _id: -1 };
        const results = await this.db.findAsync(query);
        return results.sort((a, b) => b._id.localeCompare(a._id));
    }


    async findOne(query) {
        try {
            const row = await this.db.findOneAsync(query);
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

module.exports = DB;