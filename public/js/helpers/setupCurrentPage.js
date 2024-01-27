async function setupStage(){
    const stageConfig = [{
        elementType: 'div',
        className: 'current-page',
        children: [{
            elementType: 'div',
        }]
    }];
    const stage = createElements(stageConfig);
    const target = document.querySelector('#workbench');
    target.prepend(...stage);

}

