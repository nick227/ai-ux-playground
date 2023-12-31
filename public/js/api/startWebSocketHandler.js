function startWebSocketHandler() {
    const popup = addConsole();
    setupWebSocket(popup);
}

function createWebSocketUrl() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const hostname = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : '';
  return `${protocol}://${hostname}${port}`;
}

function setupWebSocket(popup) {
    const ws = new WebSocket(createWebSocketUrl());

    ws.addEventListener('error', (error) => {
        console.error('WebSocket Error:', error);
    });

    ws.addEventListener('open', () => {
        ws.send('Hello from client');
    });

    let messageQueue = [];
    let isProcessing = false;
    
    async function processQueue() {
      if (isProcessing) return;
      isProcessing = true;
    
      while (messageQueue.length > 0) {
        const event = messageQueue.shift();
        const popupBody = popup.document.body.querySelector('section#main');
        const newElement = popup.document.createElement('p');
        console.log('event.data', event.data);
        newElement.innerHTML = event.data;
        //newElement.className = /error/i.test(event.data) ? 'error' : '';
    
        if (popupBody.firstChild) {
          popupBody.insertBefore(newElement, popupBody.firstChild);
        } else {
          popupBody.appendChild(newElement);
        }
    
        await new Promise(resolve => setTimeout(resolve, 1111)); // Wait for 3 seconds
      }
    
      isProcessing = false;
    }
    
    ws.addEventListener('message', async (event) => {
      messageQueue.push(event);
      processQueue();
    });
}

function jsonToUlLi(str) {
  const splitStr = str.split(':');
  if (splitStr.length !== 2) {
    return str;
  }

  const prefix = splitStr[0];
  const objStr = splitStr[1].trim();

  try {
    const jsonObj = JSON.parse(objStr);
    
    let html = '<ul>';
  
    for (const [key, value] of Object.entries(jsonObj)) {
      html += `<li>${key}: `;
      if (Array.isArray(value)) {
        html += '<ul>';
        value.forEach(item => {
          html += `<li>${item}</li>`;
        });
        html += '</ul>';
      } else {
        html += value;
      }
      html += '</li>';
    }
  
    html += '</ul>';
    return `${prefix}: ${html}`;
  } catch (e) {
    return str;
  }
}
