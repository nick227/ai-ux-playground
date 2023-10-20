function createResultElements(type, data) {
  const resultContainer = document.createElement('div');
  resultContainer.className = 'result-container';

  data[0].section.forEach(element => {
    const itemContainer = document.createElement('div');
    const itemTitle = document.createElement('h3');
    const itemDescription = document.createElement('p');
    itemTitle.textContent = element.name;
    itemDescription.textContent = element.tips;
    resultContainer.appendChild(itemContainer);
  });

  return resultContainer;
}

function attachResultElements(resultContainer) {
  const container = document.querySelector('.search-container');
  container.appendChild(resultContainer);
  document.body.appendChild(container);
}

async function submitNewTitle(title) {

  
  const options = {
    htmlStrings: formsTips,
    targetSelector: '.text-fader-container'
  };
  const textFader = new TextFader(options);
  textFader.start();
  

  /*
  const encodedTitle = encodeURIComponent(title);
  const url = `${window.location.origin}/api/chatgpt/description?title=${encodedTitle}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Results:', data);
    } else {
      console.log('Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Fetch Error:', error);
  }
  */
}
