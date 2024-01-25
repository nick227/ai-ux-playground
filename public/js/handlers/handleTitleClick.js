const keyMap = {
  template: ['elementType', 'css', 'name'],
  description: ['category', 'name', 'text'],
  fields: ['category', 'list', 'name']
}

async function handleTitleClick(promptValue) {
  try {
    document.querySelector('.loading').classList.toggle('hidden');
    const data = await requestChatGpt(promptValue);
    clearAllElementsByClass('stage');

    const stageData = findObjectByKeys(data, keyMap.template);
    renderStage(data[0]);
/*
    const descriptionData = findObjectByKeys(data, keyMap.description);
    renderList([descriptionData.text], 'description');

    const fieldsData = findObjectByKeys(data, keyMap.fields);
    renderList([fieldsData.list], 'fieldsData');
*/
    document.querySelector('.loading').classList.toggle('hidden');
    
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function findObjectByKeys(array, keyNames) {
  return array.find(obj => {
    return keyNames.every(key => obj.hasOwnProperty(key));
  }) || false;
}