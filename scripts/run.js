import DB from '../src/db/DB.js';
const db = new DB('promptTemplates.db');

const insertData = {
  "type": "sections",
  "tool_choice": "get_sections",
  "messages": [
    {
      "role": "user",
      "content": "Generate an array nested section objects for a ${style} ${title}. Each array element is an object like: { elementType: 'htmlElmentTypeString', css: 'cssString', textContent:'string',attributes:'htmlAttributesObject',children:'nestedObject'}"
    },
    {
      "role": "system",
      "content": "You are a website designer and content writer. You are given the title of the website and you must recommend sections for the website. Each section contains a heading, paragraph and input fields with their own headings. You must return the results in my defined structured schema. "
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_sections",
        "description": "gets sections and content and fields for a webpage",
        "parameters": {
          "type": "object",
          "properties": {
            "sections": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "heading": {
                    "type": "string"
                  },
                  "paragraph": {
                    "type": "string"
                  },
                  "fields": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "heading": {
                          "type": "string"
                        },
                        "type": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
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


/* BACK UP INSERTS */

/*
{
  "type": "intent",
  "messages": [
    {
      "role": "user",
      "content": "Read this prompt '${prompt}', if the prompt wants to create an image return 'image', if the prompt wants to create text return 'text', if the prompt wants to modify a webpage return 'csm', if the prompt wants to have a conversation return 'conversation'"
    },
    {
      "role": "system",
      "content": "You are a prompt interpreter, that can either respond 'image', 'text', 'csm', or 'conversation'"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_intent",
        "description": "gets user intent from prompt",
        "parameters": {
          "type": "object",
          "properties": {
            "intent": {
              "type": "string",
              "enum": [
                "conversation",
                "text",
                "image",
                "csm"
              ]
            }
          }
        }
      }
    }
  ]
}

*/