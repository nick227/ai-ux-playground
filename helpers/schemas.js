const { 
  elementStatesAndMouseEventsObject,
  htmlTagAttributesObject,
  htmlElementTypesEmum } = require('./constants.js');

  const createTemplate = (depth) => {
    if (depth === 0) return null;
    return {
      name: 'string',
      description: 'string',
      keywords: 'string',
      elementType: htmlElementTypesEmum,
      id: 'string',
      className: 'string',
      css: 'string',
      content: 'string',
      textContent: 'string',
      value: 'string',
      attributes: htmlTagAttributesObject,
      children: [createTemplate(depth - 1)]
    };
  };

module.exports = {
    'templates': createTemplate(5),
    'styles': {
        name: 'string',
        description: 'string',
        theme: 'string',
        css: 'string',
        element: htmlElementTypesEmum,
        category: 'string',
        states: elementStatesAndMouseEventsObject
    },
    'elements': {
        type: htmlElementTypesEmum,
        name: 'string'
    },
    'palettes': {
        name: 'string',
        description: 'string',
        colors: {
            functional: 'string',
            friendly: 'string',
            usage: 'string',
            hex: 'string',
            rgba: 'string'
        }
    },
    'layouts': {
        name: 'string',
        description: 'string',
        css: 'string'
    },
    'themes': {
        name: 'string',
        description: 'string',
        css: 'string'
    },
    'forms': {
        title: 'string',
        description: 'string',
        keywords: 'string'
    },
    'labels': {
        textContent: 'string',
        keywords: 'string'
    }, 
    'content': {
        textContent: 'string',
        type: 'string',
        keywords: 'string'
    },
    'prompts': {
        textContent: 'string',
        type: 'string',
        userId: 'string'
    },
    'promptTemplates': {
        template: 'string',
        type: ['section', 'style', 'textContent', 'image'],
        keywords: 'string'
    },
    'promptModifiers': {
        textContent: 'string',
        type: ['layout', 'style', 'industry', 'adjectives', 'boosters']
    },
    'chatgptQueries': {
        prompt: 'string',
        result: 'string',
        error: 'string',
        model: 'string'
    }
};
