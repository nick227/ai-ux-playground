import DB from '../src/db/DB.js';
const db = new DB('promptTemplates.db');

const insertData = {
  "type": "font",
  "templates": ["Pick the best font for: ${description} "],
  "collectionName": "fonts",
  "responseType": "object",
  "functions": [
    {
      "name": "get_font",
      "description": "Chooses the best font for my page description.",
      "parameters": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "The name of the font. Always returned."
          },
          "description": {
            "type": "string",
            "description": "The description of the font. Always returned."
          }
        },
        "required": ["name", "description"]
      }
    }
  ],
  "function_call": {"name": "get_font"}
};

(async () => {
    try {

        await insertRow(insertData);
        await findAll();
  
    } catch (err) {
        console.error(err);
    }
})();

async function insertRow(data) {
    const newRow = await db.insert(data);
    console.log('Inserted:', newRow);
}

async function findAll() {
    const foundRows = await db.find({});
    console.log('Found:', foundRows.length);
    console.log(foundRows);
}

async function removeAll() {
    db.remove({ type: 'section' }, { multi: true }, function (err, numRemoved) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Number of documents removed:', numRemoved);
        }
    });
}
