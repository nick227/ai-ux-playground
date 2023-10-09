async function handleElementNameClick(elementName) {
      
    clearAllElementsByClass('stage');
    try {
        const cssObjects = await api.read('api/styles', { element: elementName });
        if (!Array.isArray(cssObjects)) {
            console.error('Invalid cssObjects:', cssObjects);
            return;
        }

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
            css: 'width: 100%; background-color: #ffffff; padding: 40px; box-sizing: border-box; font-family: Arial, sans-serif;',
            children: childrenArray
        };

        renderStage(options);

    } catch (error) {
        console.error('Error in handleElementNameClick:', error);
    }
}
