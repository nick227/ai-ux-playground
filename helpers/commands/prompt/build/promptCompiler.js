require('module-alias/register');
const DB = require("@helpers/DB");
const getStaticPromptsList = require("./temp-getStaticPromptsList");

async function promptCompiler(prompt, type) {
  return getStaticPromptsList(0, prompt);
  
  /*
  const db = new DB(promptTemplates.db);
  const regex = new RegExp(type);
  const templateData = await db.find({ keywords: regex });
  const template = templateData[0].template;
  prompt = compile(template);
  return prompt;
  */
}

function compile(template) {
  const searchTerms = {
    title: prompt
  };
  return template.replace(/\$\{(\w+)\}/g, function(_, key) {
    return searchTerms[key] || "";
  });
}

module.exports = promptCompiler;
