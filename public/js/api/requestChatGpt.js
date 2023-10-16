async function requestChatGpt(promptValue, type){
  
  try {
    const url = new URL('/api/chatgpt', window.location.origin);
    url.searchParams.append('prompt', promptValue);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('response:', data);
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}