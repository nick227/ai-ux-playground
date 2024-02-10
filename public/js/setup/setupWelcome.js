
function setupWelcome(chatbot) {
    console.log('what', localStorage.getItem('visited'));
    if (localStorage.getItem('visited') !== 'true') {
    chatbot.triggerRequest('welcome');
    localStorage.setItem('visited', 'true');
  }
}