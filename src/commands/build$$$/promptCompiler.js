async function promptCompiler(prompt, template, argument) {
  if(!template) {
    return prompt;
  }
  argument = argument ? argument : 'title';
  const searchTerms = {};
  searchTerms[argument] = prompt;
  return template.replace(/\$\{(\w+)\}/g, function(_, argument) {
    return searchTerms[argument] || "";
  });
}


module.exports = promptCompiler;
