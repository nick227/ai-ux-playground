function startWebSocketHandler() {
    const popup = addConsole();
    setupWebSocket(popup);
    window.addEventListener('beforeunload', () => {
        popup.close();
    });
}

function setupWebSocket(popup) {
    const ws = new WebSocket('ws://localhost:8080');

    ws.addEventListener('error', (error) => {
        console.error('WebSocket Error:', error);
    });

    ws.addEventListener('open', () => {
        ws.send('Hello from client');
    });

    ws.addEventListener('message', (event) => {
        console.log(`Received: ${event.data}`);
        const popupBody = popup.document.body.querySelector('section#main');
        const newElement = popup.document.createElement('p');
        newElement.innerHTML = event.data;
        newElement.className = /error/i.test(event.data) ? 'error' : '';
        if (popupBody.firstChild) {
            popupBody.insertBefore(newElement, popupBody.firstChild);
        } else {
            popupBody.appendChild(newElement);
        }
    });

}

function addConsole() {

    const popup = window.open("", "AI Console Window", "width=600,height=400");
    if (!popup) {
        alert("Please allow the console to open");
        return;
    }
    const styles = `
          body {
            background-color: #1E1E1E;
            color: #A9B7C6;
            font-family: 'Courier New', Courier, monospace;
            margin: 0;
            padding: 20px;
            overflow: auto;
          }
          p {
            margin: 0;
            padding: 0;
            line-height: 1.5;
            font-size: 16px;
          }
          p::before {
            content: "•";
            margin-right: 10px;
            display: inline-block;
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
          section#main > p {
            animation: slideFade 0.5s ease-out forwards;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
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
    popup.document.write(`
            <html>
              <head>
                <title>AI Console</title>
                <style>${styles}</style>
              </head>
              <body>
              <textarea id="prompt" placeholder="type prompt here - press enter to submit"></textarea>
              <section id="main"></section>
              <script>
                const textarea = document.getElementById("prompt");
              
                textarea.addEventListener("keydown", function(event) {
                  if (event.key === "Enter") {
                    if (event.shiftKey) {
                      return;
                    }
                    event.preventDefault();
                    askChatGpt(this.value);
                    this.value = "";
                  }
                });
              function askChatGpt(promptValue) {
                if(promptValue.length < 5){
                    alert("Please enter a prompt longer than 5 characters");
                }else{
                    window.opener.handleTitleClick(promptValue)
                }
              }              
              </script>
              </body>
            </html>
          `);
    return popup;
}