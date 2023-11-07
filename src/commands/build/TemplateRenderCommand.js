import Command from '../../interfaces/Command.js';

class TemplateRenderCommand extends Command {
  execute(params, templates) {
    if (!Array.isArray(templates)) {
      return this.replaceTemplate(params, templates);
    }

    const results = [];

    for (const template of templates) {
      results.push(this.replaceTemplate(params, template));
    }

    return results;
  }

  replaceTemplate(params, template) {
    if (typeof template !== 'string') {
      console.error('Template is not a string:', template);
      return template;
    }
    return template.replace(/\$\{(\w+)\}/g, function(_, key) {
      return params[key] || "";
    });
  }
}

export default TemplateRenderCommand;
