
function renderList(list, key) {
    const wrapper = createHtmlElement({ elementType: 'section', className: `${key} wrapper` });
    list.forEach((item) => { 
    	const options = getHtmlObjectMap(item, key);
    	const html = createHtmlElement(options);
    	wrapper.appendChild(html);
    });
    document.body.appendChild(wrapper);
}

function renderStage(stageData) {
    const stageContents = createHtmlElement(stageData);
    const stage = createHtmlElement({ elementType:'div', className:'stage'});
    stage.appendChild(stageContents);
    document.body.appendChild(stage);
}
