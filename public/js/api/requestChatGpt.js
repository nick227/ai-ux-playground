async function requestChatGpt(prompt, template=null, image=null, voice=null) {
  try {
    const url = '/api/chatgpt';
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('template', template);
    formData.append('image', image);
    formData.append('voice', voice);
    const response = await fetch(url, {
      method: 'POST',
      body: formData 
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
