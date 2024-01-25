let isDragging = false;

let isChatBotSetup = false;

const clearLocalStorage = false;

async function setupChatBot() {
    if (clearLocalStorage) {
        deleteAllMessages();
    }
    const promptTemplates = await api.read(`api/promptTemplates`);
    const promptTemplatesTypes = promptTemplates.map(template => template.type);
    if (isChatBotSetup) return;
    isChatBotSetup = true;
    const chatbotConfig = [{
        type: 'div',
        className: 'chatbot',
        children: [
            {
                type: 'div',
                className: 'chatbot-controls',
                children: [
                    {
                        type: 'select',
                        className: 'chatbot-picker',
                        options: promptTemplatesTypes,
                        event: {
                            type: 'change',
                            handler: e => setCurrentDataSourceValue(e.target.value)
                        }
                    }, {
                        type: 'div',
                        className: 'chatbot-uploader',
                        children: [{
                            type: 'input',
                            inputType: 'file',
                            id: 'data-source-file',
                        }, {
                            type: 'a',
                            className: 'chatbot-upload',
                            textContent: 'upload',
                            event: {
                                type: 'click',
                                handler: handleUploadDataSource
                            }
                        }, {
                            type: 'div',
                            className: 'chatbot-data-source-container',
                            children: [{
                                type: 'div',
                                className: 'chatbot-data-source-list'
                            }
                            ]
                        }]
                    }]
            },
            {
                type: 'div',
                className: 'chatbot-input',
                children: [
                    {
                        type: 'textarea',
                        className: 'chatbot-textarea',
                        inputType: 'textarea',
                        placeholder: 'Talk to me',
                        event: [{
                            type: 'input',
                            handler: handleChatbotInput,
                        }, {
                            type: 'keydown',
                            handler: handleChatbotKeyDown,
                        }, {
                            type: 'drop',
                            handler: handleDrop,
                        }, {
                            type: 'dragleave',
                            handler: handleDragLeave,
                        }, {
                            type: 'dragover',
                            handler: handleDragOver,
                        }, {
                            type: 'mousedown',
                            handler: handleMouseDown,
                        }]
                    },{
                        type: 'button',
                        className: 'chatbot-submit',
                        inputType: 'submit',
                        textContent: 'go',
                        event: {
                            type: 'click',
                            handler: handleChatbotSubmit
                        }
                    }
                ]
            },
            {
                type: 'div',
                className: 'chatbot-output',
                children: [{
                    type: 'button',
                    className: 'chatbot-clear',
                    textContent: 'clear',
                    event: [{
                        type: 'click',
                        handler: handleChatbotClear
                    }]
                }]
            }
        ]
    }
    ];

    function handleChatbotClear(e) {
        const confirm = window.confirm('Are you sure you want to clear the chat history?');
        if (!confirm) {
            return;
        }
        if (ws.readyState === WebSocket.OPEN) {
            const message = 'clearHistory';
            ws.send(message.toString());
            const output = document.querySelector('.chatbot-output');
            output.innerHTML = '';
            deleteAllMessages();
        } else {
            console.error('WebSocket is not open: readyState = ' + ws.readyState);
        }
    }

    function addToOutput(html, sender) {
        const messageElement = createMessageElement(html, sender);
        prependElementToOutput(messageElement);
    }

    function setCurrentDataSourceValue(value) {
        localStorage.setItem('defaultOptionValue', value);
        displayChatbotResponse({ commands: [{ command: `change to ${value}` }] });
    }

    function handleMouseDown(event) {
        isDragging = true;
    }

    function handleDragLeave(event) {
        event.target.style.backgroundColor = '';
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.target.style.backgroundColor = 'pink';
    }

    function handleChatbotInput(e) {
        const textarea = getChatbotTextarea();
        textarea.style.height = 'auto';
        let maxHeight = window.innerHeight || document.documentElement.clientHeight;
        let newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = newHeight + 'px';
        const data = textarea.value;
    }

    function handleChatbotKeyDown(e) {
        if (e.key === 'Enter' && document.activeElement === e.target && !event.shiftKey && !event.ctrlKey) {
            e.preventDefault();
            handleChatbotSubmit(e);
        }
    }

    function getChatbotTextarea() {
        return document.querySelector('.chatbot-textarea');
    }

    function getTemplateTypeValue() {
        return document.querySelector('.chatbot-picker').value;
    }

    function getPromptFromTextarea(textarea) {
        return textarea.value;
    }

    function clearTextarea(textarea) {
        textarea.value = '';
    }

    function extractFieldHtml(field) {
        return `<label>${field.label}<${field.type} style="${field.css}"></${field.type}></label>`;
    }

    async function handleChatbotSubmit(e) {
        const textarea = getChatbotTextarea();
        const prompt = getPromptFromTextarea(textarea);
        if (!prompt) {
            alert('Please enter a prompt');
            return;
        };
        const templateTypeValue = getTemplateTypeValue();
        clearTextarea(textarea);
        textarea.style.height = 'auto';
        addToOutput(prompt, 'You');
        saveMessageToLocalStorage(prompt, 'You');

        toggleLoading();
        const data = await requestChatGpt(prompt, templateTypeValue);
        console.log('data', data)
        handleChatbotResults(data);
    }

    function handleChatbotResults(data) {
        if (data.commands && Array.from(data.commands)) {
            executeCommands(data.commands);
        }
        if (typeof data === 'object' && data.data && data.data[0].b64_json) {
            console.log('image detected')
            let img = document.createElement('img');
            img.src = 'data:image/png;base64,' + data.data[0].b64_json;
            addToOutput(img, 'ChatGpt');
            saveMessageToLocalStorage('[ai-image]', 'ChatGpt');
        } else {
            displayChatbotResponse(data);
            toggleLoading();
        }
    }

    async function displayChatbotResponse(data) {
        let response = data.response || data.html || data.translation || data.json || data.promptObjects;
        response = typeof response === 'object' ? JSON.stringify(response, null, 2) : response;
        if (response) {
            addToOutput(response, 'ChatGpt');
            saveMessageToLocalStorage(JSON.stringify(response), 'ChatGpt');
        }

        if (data.commands && data.commands.length > 0) {
            saveMessageToLocalStorage(JSON.stringify(data.commands), 'Commands');
            addToOutput(JSON.stringify(data.commands), 'Commands');
        }

        if (data.fields && data.fields.length > 0) {
            const fieldHtml = data.fields.map(field => extractFieldHtml(field)).join('');
            saveMessageToLocalStorage(fieldHtml, 'Fields');
            addToOutput(fieldHtml, 'Fields');
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        event.target.style.backgroundColor = '';
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(`Data URL: ${event.target.result}`);
            };
            reader.readAsDataURL(file);
            console.log(`Name: ${file.name}, Type: ${file.type}, Size: ${file.size}`);
        }
        isDragging = false;
    }

    async function handleUploadDataSource() {
        let fileInput = document.querySelector('#data-source-file');
        let file = fileInput.files[0];
        if (!file) {
            alert("Please choose a file to upload!");
            return;
        }
        let defaultName = file.name;
        let promptValue = prompt("Please name the data source", defaultName);

        if (promptValue && file) {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('name', promptValue);
            await api.upload('/api/dataSources', formData);
            fileInput.value = '';
            alert(`Added ${promptValue} to data sources!`);
            loadDataSources();
        }
    }

    function toggleLoading() {
        const loading = document.querySelector('.chatbot-loading');
        if (loading) {
            loading.remove();
            return;
        } else {
            const loading = createHtmlElement('div');
            loading.className = 'chatbot-loading';
            loading.textContent = 'Thinking...';
            prependElementToOutput(loading);
        }
    }

    function deleteAllMessages() {
        localStorage.removeItem('messages');
    }

    function handleDownloadButtonClick(e, sender) {
        const message = e.target.closest('.chatbot-output-message');
        const messageText = message.querySelector('.chatbot-output-message p');
        let text = messageText.dataset.value;
        text = text.replace(/\\n/g, '\n');
        var today = new Date();
        var time = today.getHours() + "." + today.getMinutes();
        var date = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
        let filename = sender + "-" + date + "." + time;

        filename = prompt('Please enter a filename', `${filename}.txt`);
        if (!filename) return;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    }

    function createMessageElement(html, sender) {
        const container = createHtmlElement('div');
        const inner = createHtmlElement('div');
        container.className = 'chatbot-output-message';
        container.classList.add(sender.toLowerCase());

        const avatarContainer = createHtmlElement('div');
        avatarContainer.className = 'chatbot-avatar-container';
        const h6 = createHtmlElement('h6');
        const avatar = createHtmlElement('img');
        avatar.className = 'chatbot-avatar';
        const avatarMap = {
            'you': '/images/monster.gif',
            'commands': '/images/computer.png',
            'chatgpt': '/images/lucy.png'
        };
        avatar.src = avatarMap[sender.toLowerCase()];
        avatarContainer.appendChild(avatar);

        h6.textContent = sender.toLowerCase() === 'chatgpt' ? 'Lucy' : sender.toLowerCase() === 'commands' ? 'commands' : sender.toLowerCase();
        h6.className = sender.toLowerCase();

        const downloadButton = createHtmlElement('button');
        downloadButton.className = 'chatbot-download-button';
        downloadButton.classList.add('fas', 'fa-arrow-down');
        downloadButton.addEventListener('click', (e) => {
            handleDownloadButtonClick(e, sender);
        });

        const messageText = createHtmlElement('p');
        messageText.className = sender.toLowerCase();

        if (html instanceof Node) {
            messageText.appendChild(html);
        } else {
            const formattedHtml = formatHtml(html);
            messageText.innerHTML = formattedHtml;
            messageText.dataset.value = html;
        }
        if (sender.toLowerCase() === 'chatgpt') {
            messageText.prepend(downloadButton);
        }

        if (sender.toLowerCase() !== 'you') {
            container.appendChild(avatarContainer);
        }
        inner.appendChild(messageText);
        inner.appendChild(h6);
        container.appendChild(inner);
        return container;
    }

    function formatHtml(html) {
        return processText(html
            .replace(/\n/g, '<br>')
            .replace(/\t/g, '&nbsp;&nbsp;')
            .replace(/\r/g, '<br>')
            .replace(/\\n/g, '<br>')
            .replace(/\\t/g, '&nbsp;&nbsp;')
            .replace(/\\r/g, '<br>'));
    }

    function processText(text) {
        let regex = /```(\w*?)([\s\S]+?)```/g;
        let match = regex.exec(text);
        while (match) {
            let language = match[1] || 'plaintext';
            let code = match[2].trim();
            text = text.replace(match[0], `<code class="language-${language}"><button onclick="copyCodeToClipboard(this)">copy</button><pre>${code}</pre></code>`);
            match = regex.exec(text);
        }
        return text;
    }

    function escapeHtml(html) {
        var text = document.createTextNode(html);
        var p = document.createElement('p');
        p.appendChild(text);
        return p.innerHTML;
    }

    window.copyCodeToClipboard = function (btn) {
        const parentElm = btn.closest('p');
        let code = parentElm.dataset.value;
        code = code.replace(/\\n/g, '\n');
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    function prependElementToOutput(element) {
        const output = document.querySelector('.chatbot-output');
        output.scrollTop = 0;
        output.insertBefore(element, output.firstChild);
    }

    function saveMessageToLocalStorage(text, sender) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ text, sender });
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const lastMessages = messages.slice(-10);
        lastMessages.forEach(message => addToOutput(message.text, message.sender));
    }

    async function loadDataSources() {
        const dataSourceList = document.querySelector('.chatbot-data-source-list');
        if (!dataSourceList || dataSourceList.length === 0) {
            return;
        }
        dataSourceList.innerHTML = '';
        addDataSource(dataSourceList, 3, { name: 'snapshots', path: 'uploads/snapshots/page.html' }, 0);
        addDataSource(dataSourceList, 3, { name: 'chatHistory', path: 'api/chatHistory' }, 0);
        const dataSources = await api.read('api/dataSources'/*, { projection: JSON.stringify({ name: 1 }) }*/);
        dataSources.forEach((dataSource, index) => {
            dataSource.path = `uploads/${dataSource.path}`;
            addDataSource(dataSourceList, dataSources.length, dataSource, index);
        });

    }

    function addDataSource(dataSourceList, dataSourcesLen, dataSource, index) {
        const element = dataSource.path ? createHtmlElement('a') : createHtmlElement('span');
        if (dataSource.path) {
            element.target = '_blank';
            element.href = `/${dataSource.path}`;
        }
        element.style.fontSize = '0.8rem';
        element.textContent = dataSource.name;
        dataSourceList.appendChild(element);
        if (index < dataSourcesLen - 1) {
            dataSourceList.appendChild(document.createTextNode(' '));
        }
    }

    const chatbotElements = createElements(chatbotConfig);
    const target = document.querySelector('#workbench');
    target.append(...chatbotElements);
    loadMessages();
    await loadDataSources();
}