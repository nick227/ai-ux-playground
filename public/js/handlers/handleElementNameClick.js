async function handleElementNameClick(elementName) {
      
    try {
        clearAllElementsByClass('stage');
        console.log('elementName:', elementName);
        const cssObjects = await api.read('api/styles', { element: elementName });/*
        if (!Array.isArray(cssObjects)) {
            console.error('Invalid cssObjects:', cssObjects);
            return;
        }*/

        console.log('cssObjects:', cssObjects);

        const childrenArray = Array.from({ length: cssObjects.length }, (_, count) => {
            const obj = cssObjects[count];

            return {
                elementType: elementName,
                css: obj.css,
                cssStates: obj.states || {},
                className: 'example'
            };
        }).filter(Boolean);

        const options = {
            elementType: 'section',
            className: 'outer-section',
            children: childrenArray
        };


        console.log('options:', options);

        renderStage(options);

    } catch (error) {
        console.error('Error in handleElementNameClick:', error);
    }
}
