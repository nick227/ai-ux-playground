
function renderList(list, key) {
    const wrapper = createHtmlElement({ elementType: 'section', className: `${key} wrapper` });
    list.forEach((item) => { 
    	const options = getObjectToHtmlMap(item, key);
    	const html = createHtmlElement(options);
    	wrapper.appendChild(html);
    });
    document.body.appendChild(wrapper);
}

function renderStage(stageData) {
    if (Array.isArray(stageData)) {
      stageData.forEach(data => renderStage(data));
      return;
    }
  
    const stageContents = createHtmlElement(stageData);
    let stage = document.querySelector('.stage');
  
    if (stage) {
      stage.prepend(stageContents);
    } else {
      stage = createHtmlElement({ elementType: 'div', className: 'stage' });
      stage.appendChild(stageContents);
      document.body.appendChild(stage);
    }
  }
  

function prependToStage(html) {
    const stage = document.querySelector('.stage');
    stage.prepend(html);
}