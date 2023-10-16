function addOpener(popup) {
  document.querySelector('.showPopup').addEventListener('click', function () {
    if (!popup || popup.closed) {
      addConsole();
      return;
    }
    popup.focus();
  });
}
function addConsole() {

  const popup = window.open("", "AI Console Window", "width=600,height=400");
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

const styles = `
body {
  background-color: #1E1E1E !important;
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
p.error {
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
section#main > p {
  animation: slideFade 0.5s ease-out forwards;
  opacity: 0;
  max-height: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid gray;
  }
  section#main > p:first-child {
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