
function addConsole() {

  const width = 600;
  const height = 600;
  const left = screen.width - width;
  const top = screen.height - height;
  const popup = window.open("", "AI Console Window", `width=${width},height=${height},left=${left},top=${top}`);
  
  if (!popup) {
    alert("Please allow popups to use the console window.");
    return;
  }

  window.addEventListener('beforeunload', () => {
    popup.close();
  });
  
  popup.document.write(`
            <html>
              <head>
                <title>AI Console</title>
                <style>${styles}</style>
              </head>
              <body>
              <section id="main"></section>
              </body>
            </html>
          `);
  return popup;
}

const styles = `
body {
  background-color: #1E1E1E;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  margin: 0;
  padding: 20px;
  overflow: auto;
}
.message {
  margin: 10px 0;
  padding: 10px 0;
  line-height: 1.5;
  font-size: 16px;
  border-bottom: 1px solid #A9B7C6;
}
.message.error {
    color: red;
}
textarea#prompt {
  width: 100%;
  height: 90px;
  margin-bottom: 20px;
  background-color: #0D0C0C;
  color: #A9B7C6;
  font-family: 'Courier New', Courier, monospace;
  border: none;
  padding: 10px;
  outline: none;
  resize: none;
}
textarea#prompt:focus {
  outline: 1px solid dodgerblue;
}
section#main > .message {
  animation: slideFade 0.5s ease-out forwards;
  opacity: 0;
  max-height: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  color: white;
  }
  @keyframes slideFade {
  0% {
      opacity: 0;
      max-height: 0;
  }
  40% {
      max-height: 50px; 
      opacity: 0;
  }
  100% {
      opacity: 1;
      max-height: 100%; 
  }
}
`;


function setupPopupConsole() {
  const popup = addConsole();

  let messageQueue = [];
  let isProcessing = false;

  async function processQueue() {
    if (isProcessing) return;
    isProcessing = true;
    if (popup) {
      while (messageQueue.length > 0) {
        const event = messageQueue.shift();
        const popupBody = popup.document.body.querySelector('section#main');
        const newElement = popup.document.createElement('div');
        newElement.className = 'message';
        const pre = popup.document.createElement('pre');
        pre.textContent = event.data;
        newElement.appendChild(pre);

        if (popupBody.firstChild) {
          popupBody.insertBefore(newElement, popupBody.firstChild);
        } else {
          popupBody.appendChild(newElement);
        }

        await new Promise(resolve => setTimeout(resolve, 1111));
      }
    }
    isProcessing = false;
  }

  ws.addEventListener('message', async (event) => {
    messageQueue.push(event);
    processQueue();
  });
}
