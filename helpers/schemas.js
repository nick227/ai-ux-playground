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
    'forms': {
        title: 'string',
        description: 'string',
        keywords: 'string'
    },
    'fieldLists': {
        name: 'string',
        category: 'string',
        list: ['string']
    },
    'fields': {
        value: 'string',
        type: ''
    },
    'descriptions': {
        text: 'string',
        category: 'string',
        name: 'string'
    },
    'labels': {
        textContent: 'string',
        keywords: 'string'
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
    'content': {
        textContent: 'string',
        type: 'string',
        keywords: 'string'
    },
    'prompts': {
        text: 'string',
        type: 'string',
        userId: 'string'
    },
    "chatgptTransactions": {
        response: {
            id: 'string',
            object: 'string',
            created: 'number',
            model: 'string',
            choices: [
              {
                index: 'number',
                message: {
                  role: 'string',
                  content: 'any'
                },
                finish_reason: 'string'
              }
            ],
            usage: {
              prompt_tokens: 'number',
              completion_tokens: 'number',
              total_tokens: 'number'
            }
          },
        prompt: 'string',
        userId: 'string'
    },
    'promptTemplates': {
        templates: [{
            title: 'string',
            collectionName: 'string',
            type: ['common-fields', 'form-description', 'form-template'],
            template: 'string'
        }],
        type: ['initial-prompt', 'text-improve', 'image-enhance', 'template-make']
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
