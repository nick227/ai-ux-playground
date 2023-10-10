const getStaticPromptsList = (index, prompt) => {
    return [
        //0
        `Create a "${prompt}" template. Return a nested json objects. 
    Objects contain required properties: name, keywords, description, attributes, css, elementType. 
    And optional children and attributes and textContent objects as properties. 
    The "elementType" property is the element ONLY: div, img, section, a, input, select, textarea, h1, h2, h3 or p. 
    The "attributes" property is an object of key value pairs of html attributes and their values such as src and href. 
    The css property is a css string of css properties, colorful background, good typography, aligned positioning the element.
    The keywords property is a comma separated string of keywords that describe the template.
    The children property is always and array of more html objects. Write professional headline and subheadlines and paragraph copy.
    Use full page design, professional typegraphy, Engaging copy, Use picsum images. Use multicolor, ui/ux. Only return only valid json. The response should pass JSON.parse()`,
        //1  input, select, textarea,
        `Create a full page "${prompt}" template. 
        Objects contain required properties: name, keywords, description, attributes, css, elementType. 
        Objects contain optional children and attributes objects as properties. 
    The "elementType" IS ONLY: div, img, section, a, h1, h2, h3, p. 
    The "attributes" property is an object with values such as src and href. 
    The css property is a css string. The textContent property on text elements.
    STYLE EVERY ELEMENT WITH COHESIVE THEME. 
    The children property is an array of html objects. 
    Write a extra large typographic heading and professional text description.
    Use picsum images. studio-quality design. Only return only valid json. The response should pass JSON.parse()`,
    //2
    `Create a full page colorful "${prompt}" template. Use creative colors and big typography. Align the layout and use good spacing. 
    Write detailed engaging text for the headlines and content areas. 
    Return a nested json objects. 
    Objects contain required properties: name, keywords, description, attributes, css, elementType. 
    And optional children and attributes objects as properties. 
    The "elementType" property is the element ONLY: div, img, section, a, input, select, textarea, h1, h2, h3 or p. 
    The "attributes" property is an object of key value pairs of html attributes and their values such as src and href. 
    The css property is a css string of css properties, colorful background, good typography, aligned positioning the element.
    The keywords property is a comma separated string of keywords that describe the template.
    Use picsum images. 
    Return JSON, Return valid json object of studio-quality html template. the response should pass JSON.parse(), Pass the result through this schema: 
    {
     elementType: 'string',
     name: 'string',
     css: 'string',
     attributes: 'object',
     children: "array"
    }`, 
    //3 
    `Create a stylish html object for a "${prompt}" template. 
    Write a extra large typographic heading and professional text description. Use picsum images. 
    Creatively align the elements, colorful the backgrounds, good design.
    Return a valid JSON object like: 
    {
     elementType: 'string',
     name: 'string',
     css: 'string',
     attributes: 'object',
     children: "array of nested objects"
    } the result must pass JSON.parse()`,
    //4
    `Write an array of 3 typographical headings objects for a "${prompt}", upbeat and professional, ONLY return valid json like: 
    {
     elementType: 'h1',
     name: 'string',
     css: 'string',
     textContent: 'string'
    } the result must pass JSON.parse()`,
    //5
    `return valid html document with red background`
    ][index];

}

module.exports = getStaticPromptsList;