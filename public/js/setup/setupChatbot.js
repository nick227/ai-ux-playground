let showWelcomeMessage = false;
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
                className: 'chatbot-input',
                children: [{
                    type: 'div',
                    className: 'chatbot-input-inner',
                    children: [
                        {
                            type: 'h2',
                            textContent: 'Chatbot'
                        },
                        {
                            type: 'select',
                            className: 'chatbot-picker',
                            options: promptTemplatesTypes,
                            event: {
                                type: 'change',
                                handler: e => setCurrentDataSourceValue(e.target.value)
                            }
                        },
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
                        }, {
                            type: 'button',
                            className: 'chatbot-submit',
                            inputType: 'submit',
                            textContent: 'go',
                            event: {
                                type: 'click',
                                handler: handleChatbotSubmit
                            }
                        },
                        {
                            type: 'div',
                            className: 'chatbot-controls',
                            children: [{
                                type: 'a',
                                className: 'chatbot-clear',
                                title: 'Deletes chat history',
                                children: [{
                                    type: 'i',
                                    className: 'fas fa-trash-alt'
                                }
                                ],
                                event: [{
                                    type: 'click',
                                    handler: handleChatbotClear
                                }]
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
                        }
                    ]
                }]
            },
            {
                type: 'div',
                className: 'chatbot-output',
                children: []
            }
        ]
    }
    ];
    //handlers
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

    async function handleWelcomeMessage() {
        if (!showWelcomeMessage) {
            return;
        }

        const output = document.querySelector('.chatbot-output');
        let prompt = 'Hello for the first time';

        if (output.children.length > 0) {
            prompt = 'Hello again.';
        }
        const defaultOption = localStorage.getItem('defaultOptionValue') || 'main';
        prompt += `You have ${defaultOption} personality`;

        const data = await requestChatGpt(prompt, 'welcome');
        handleChatbotResults(data);
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
        const textarea = document.querySelector('.chatbot-textarea');
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

    async function handleChatbotSubmit(e) {
        const prompt = getPromptValue();
        if (!validatePrompt(prompt)) {
            return;
        }
        addToOutput(prompt, 'You');
        saveMessageToLocalStorage(prompt, 'You');

        toggleLoading();
        const templateTypeValue = document.querySelector('.chatbot-picker').value;
        const data = await requestChatGpt(prompt, templateTypeValue);
        handleChatbotResults(data);
        toggleLoading();
        resetTextarea();
    }

    function handleChatbotResults(data) {
        if (data.commands && Array.from(data.commands)) {
            executeCommands(data.commands);
        }
        if (typeof data === 'object' && data.data && data.data[0].b64_json) {
            const img = generateImage(data);
            addToOutput(img, 'ChatGpt');
            saveMessageToLocalStorage('[image]', 'ChatGpt');
        } else {
            displayChatbotResponse(data);
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

    function handleDownloadButtonClick(e, sender) {
        console.log('wtf')
        const isImage = handleImageDownload(e);
        console.log('?? ', isImage);
        if (!isImage) {
            handleTextDownload(e);
        }
    }

    function handleImageDownload(e) {
        const message = e.target.closest('.chatbot-output-message');
        const messageText = message.querySelector('.chatbot-output-message p');
        const img = messageText.querySelector('img.chatbot-output-image');
        if (img) {
            const src = img.src;
            const mime = src.split(',')[0].split(':')[1].split(';')[0];
            const extension = mime.split('/')[1];
            let filename = makeFileNameSafe(img.dataset.prompt);
            filename = prompt('Please enter a filename', `${filename}.${extension}`);
            if (!filename) {
                return true;
            }
            const blob = dataURItoBlob(src);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            return true;
        }
        return false;
    }

    function handleTextDownload(e) {
        console.log('handleTextDownload')
        const message = e.target.closest('.chatbot-output-message');
        const messageText = message.querySelector('.chatbot-output-message p');
        const text = messageText.innerHTML;
        const promptText = message.dataset.prompt;
        let filename = makeFileNameSafe(promptText) + '.html';
        filename = prompt('Please enter a filename', `${filename}`);
        if (!filename) {
            return false;
        }
        const link = document.createElement('a');
        link.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(text);
        link.download = filename;
        link.click();
    }

    function makeFileNameSafe(filename) {
        console.log('safe', filename)
        return filename.replace(/[\/\\?%*:|"<>]/g, '-').substring(0, 40);
    }

    function prependElementToOutput(element) {
        const output = document.querySelector('.chatbot-output');
        output.scrollTop = 0;
        output.insertBefore(element, output.firstChild);
    }

    function extractFieldHtml(field) {
        return `<label>${field.label}<${field.type} style="${field.css}"></${field.type}></label>`;
    }

    function validatePrompt(prompt) {
        if (!prompt) {
            alert('Please enter a prompt');
            return false;
        }
        return true;
    }

    function resetTextarea() {
        const textarea = document.querySelector('.chatbot-textarea');
        textarea.value = '';
        textarea.style.height = 'auto';
    }

    function getPromptValue() {
        const textarea = document.querySelector('.chatbot-textarea');
        return textarea.value;
    }

    function getLanguageFromString(str) {
        const languages = ['html', 'css', 'javascript', 'plaintext', 'scss', 'python'];
        for (let language of languages) {
            if (str.startsWith(language)) {
                return language;
            }
        }
        return null;
    }

    function generateImage(data) {
        const prompt = getPromptValue();
        console.log('generating image', prompt);
        let img = document.createElement('img');
        img.className = 'chatbot-output-image';
        img.src = 'data:image/png;base64,' + data.data[0].b64_json;
        img.dataset.prompt = prompt;
        return img;

    }

    async function displayChatbotResponse(data) {
        let response = data.response || data.html || data.translation || data.json || data.promptObjects;
        response = typeof response === 'object' ? JSON.stringify(response, null, 2) : response;
        if (response) {
            addToOutput(response, 'ChatGpt');
            saveMessageToLocalStorage(response, 'ChatGpt');
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

    function toggleLoading() {
        const loading = document.querySelector('.chatbot-loading');
        if (loading) {
            loading.remove();
            return;
        } else {
            const html = `Thinking...`;
            const loading = createHtmlElement('div');
            loading.className = 'chatbot-loading';
            loading.innerHTML = html;
            prependElementToOutput(loading);
        }
    }

    function deleteAllMessages() {
        localStorage.removeItem('messages');
    }

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    function createMessageElement(html, sender) {
        const container = createHtmlElement('div');
        const inner = createHtmlElement('div');
        container.className = 'chatbot-output-message';
        container.classList.add(sender.toLowerCase());
        const prompt = getPromptValue();
        container.dataset.prompt = prompt;

        inner.className = 'chatbot-message';
        inner.classList.add(sender.toLowerCase());

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
        container.appendChild(avatarContainer);
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
            let code = match[2].trim();
            let language = match[1] || getLanguageFromString(code) || 'plaintext';
            if (language === 'html') {
                code = convertHtmlToEntities(code);
            }
            text = text.replace(match[0], `<code class="language-${language}"><button onclick="copyCodeToClipboard(this)">copy</button><pre>${code}</pre></code>`);
            match = regex.exec(text);
        }
        return text;
    }

    function convertHtmlToEntities(html) {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        return html.replace(/[&<>"'`=\/]/g, (s) => entities[s]);
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
        addDataSource(dataSourceList, 3, { name: 'snapshots', path: 'api/snapshots' }, 0);
        addDataSource(dataSourceList, 3, { name: 'chatHistory', path: 'api/chatHistory' }, 0);
        const dataSources = await api.read('api/dataSources'/*, { projection: JSON.stringify({ name: 1 }) }*/);
        dataSources.forEach((dataSource, index) => {
            dataSource.path = `uploads/${dataSource.path}`;
            addDataSource(dataSourceList, dataSources.length, dataSource, index);
        });

    }

    function addToOutput(html, sender) {
        const messageElement = createMessageElement(html, sender);
        prependElementToOutput(messageElement);
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

    function setCurrentDataSourceValue(value) {
        localStorage.setItem('defaultOptionValue', value);
        handleWelcomeMessage();
        displayChatbotResponse({ commands: [{ command: `change to ${value}` }] });
    }

    function setupDispatchListener() {
        window.addEventListener('speak', (event) => {
            const data = event.detail;
            if (data) {
                handleChatbotResults(data);
            }
        });
    }

    async function init() {
        const chatbotElements = createElements(chatbotConfig);
        const target = document.querySelector('#chatbot');
        target.append(...chatbotElements);
        loadMessages();
        handleWelcomeMessage();
        await loadDataSources();
        setupDispatchListener();
    }

    init();
}