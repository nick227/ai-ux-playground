import DB from '../src/db/DB.js';
const db = new DB('promptTemplates.db');

const insertData = {
  "type": "image-abstract",
  "prompt": "Create astrange abstract artistic ${prompt} image, ${style} styles. Crazy expressionism artwork, surreal, nocrop."
};


/*

EXAMPLES:

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################
https://platform.openai.com/docs/guides/function-calling

{
  "type": "template",
  "messages": [
    {
      "role": "user",
      "content": "Create a full-screen section for a ${title} webpage containing an image from https://placehold.co/ using and relevant heading and paragraph text. Include detailed css for the section and each element that always includes positioning, font properties, colors, backgrounds, etc. Use good spacing and symmetry. ${style} style"
    },
    {
      "role": "assistant",
      "content": "You are a professional web designer, ui/ux engineer and content writer."
    }
  ],
  "tool_choice": "get_template",
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_template",
        "description": "create modern stylish full screen website section, creative position, style, etc.",
        "parameters": {
          "type": "object",
          "properties": {
            "css": {
              "type": "string"
            },
            "section": {
              "type": "object",
              "properties": {
                "heading": {
                  "type": "object",
                  "properties": {
                    "text": {
                      "type": "string",
                      "description": "${title} ${tone} heading text"
                    },
                    "css": {
                      "type": "string",
                      "description": "actual css for heading, cohesive style, position, font, color, size, etc. ${style}"
                    }
                  }
                },
                "paragraph": {
                  "type": "object",
                  "properties": {
                    "text": {
                      "type": "string",
                      "description": "${title} ${tone} paragraph text"
                    },
                    "css": {
                      "type": "string",
                      "description": "actual css for paragraph, cohesive style, position, font, color, size, etc. ${style}"
                    }
                  }
                },
                "image": {
                  "type": "object",
                  "properties": {
                    "src": {
                      "type": "string"
                    },
                    "css": {
                      "type": "string",
                      "description": "actual css for image, cohesive style, position, style, etc."
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
}

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################

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
