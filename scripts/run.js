import DB from '../src/db/DB.js';
const db = new DB('promptTemplates.db');

const insertData = {
  "type": "template",
  "templates": ["Generate a ${description} one-page template."],
  "collectionName": "templates",
  "responseType": "object",
  "functions": [
    {
      "name": "get_template",
      "description": "Generates a ${description} one-page template. The function will always return 'elementType' and 'css'. Optionally, it may include 'children' for nested elements, 'textContent' for text-based elements, and 'src' for image elements.",
      "parameters": {
        "type": "object",
        "properties": {
          "elementType": {
            "type": "string",
            "description": "The type of HTML element to include in the template. Always returned."
          },
          "css": {
            "type": "string",
            "description": "The ${style} CSS styling applied to the element. Always returned."
          },
          "children": {
            "type": "array",
            "items": {"type": "object"},
            "description": "Nested HTML elements within the parent element. Optional."
          },
          "textContent": {
            "type": "string",
            "description": "The text content within the HTML element. Optional."
          },
          "src": {
            "type": "string",
            "description": "The source URL for image elements. Optional."
          }
        },
        "required": ["elementType", "css"]
      }
    }
  ],
  "function_call": {"name": "get_template"}
};

(async () => {
    try {

   
        //await insertRow(insertData);
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
