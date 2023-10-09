async function handleTitleClick(promptValue) {
  try {
    document.querySelector('.loading').classList.toggle('hidden');
    const data = await requestChatGpt(promptValue, 'template');
    clearAllElementsByClass('stage');
    renderStage(data);
    document.querySelector('.loading').classList.toggle('hidden');
    
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
