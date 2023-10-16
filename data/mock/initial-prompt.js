
const insertData = {
    type: 'initial-prompt',
    templates: [{
        title: 'Get common fields prompt',
        type: 'common-fields',
        collectionName: 'fields',
        template: `Write a list of 6 to 10 input fields commonly found in a \${title} online form, return them as an array.`,
    }, {
        title: 'Get form description prompt',
        type: 'form-description',
        collectionName: 'descriptions',
        template: `Write a \${title} form description. Use an informative and friendly tone, describe what a good \${title} form contains and what makes it successful.`,
    }, {
        title: 'Get initial template prompt',
        type: 'form-template',
        collectionName: 'templates',
        template: `Create a "\${title}" template. Return a nested json objects. 
    Objects contain required properties: name, keywords, description, attributes, css, elementType. 
    And optional children and attributes and textContent objects as properties. 
    The "elementType" property is the element ONLY: div, img, section, a, input, select, textarea, h1, h2, h3 or p. 
    The "attributes" property is an object of key value pairs of html attributes and their values such as src and href. 
    The css property is a css string of css properties, colorful background, good typography, aligned positioning the element.
    The keywords property is a comma separated string of keywords that describe the template.
    The children property is always and array of more html objects. Write professional headline and subheadlines and paragraph copy.
    Use full page design, professional typegraphy, Engaging copy, Use picsum images. Use multicolor, ui/ux. Only return only valid json. The response should pass JSON.parse()`
    }]
};
