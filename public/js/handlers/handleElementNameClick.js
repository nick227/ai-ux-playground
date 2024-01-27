async function handleElementNameClick(elementName) {
      
    try {
        clearAllElementsByClass('stage');
        const cssObjects = await api.read('api/styles', { element: elementName });
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

        renderStage(options);

    } catch (error) {
        console.error('Error in handleElementNameClick:', error);
    }
}
