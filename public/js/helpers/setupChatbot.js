

function createElementFromConfig(config) {
    const element = createHtmlElement(config.type);
    element.className = config.className;
    if (config.textContent) element.textContent = config.textContent;
    if (config.type === 'input') element.type = config.inputType;
    if (config.placeholder) element.placeholder = config.placeholder;
    if (config.id) element.id = config.id;
    if (config.event) element.addEventListener(config.event.type, config.event.handler);
    if (config.options && config.type === 'select') {
        let defaultOptionValue = getDefaultOptionValue();
        for (let optionValue of config.options) {
            const optionElement = document.createElement('option');
            optionElement.value = optionValue;
            optionElement.textContent = optionValue;
            if (optionValue === defaultOptionValue) {
                optionElement.selected = true;
            }
            element.appendChild(optionElement);
        }
    }

    return element;
}

function getDefaultOptionValue() {
    return localStorage.getItem('defaultOptionValue') || 'main';
}

function setDefaultOptionValue(value) {
    localStorage.setItem('defaultOptionValue', value);
}

let isChatBotSetup = false;

async function setupChatBot() {
    //deleteAllMessages();
    const promptTemplates = await api.read(`api/promptTemplates`);
    const promptTemplatesTypes = promptTemplates.map(template => template.type);
    if (isChatBotSetup) return;
    isChatBotSetup = true;
    const chatbotConfig = [
        {
            type: 'h1',
            textContent: 'Chatbot',
            className: 'chatbot-title',
        },
        {
            type: 'div',
            className: 'chatbot',
            children: [
                {
                    type: 'div',
                    className: 'chatbot-input',
                    children: [
                        {
                            type: 'textarea',
                            className: 'chatbot-textarea',
                            inputType: 'textarea',
                            placeholder: 'Talk to me',
                            event: {
                                type: 'keydown',
                                handler: handleChatbotInput
                            }
                        },
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
                                        handler: e => setDefaultOptionValue(e.target.value)
                                    }
                                }, {
                                    type: 'button',
                                    className: 'chatbot-submit',
                                    inputType: 'submit',
                                    textContent: 'go',
                                    event: {
                                        type: 'click',
                                        handler: handleChatbotSubmit
                                    }
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
                            }]
                        }
                    ]
                },
                {
                    type: 'div',
                    className: 'chatbot-output'
                }
            ]
        }
    ];

    async function handleUploadDataSource() {
        let fileInput = document.querySelector('#data-source-file');
        let file = fileInput.files[0];
        if(!file){
            alert("Please choose a file to upload!");
            return;
        }
        let promptValue = prompt("Please enter the name for the data source");

        let reader = new FileReader();

        reader.onload = async function (e) {
            let contents = e.target.result;

            let data = {
                name: promptValue,
                content: contents
            };

            if(promptValue && contents){
                await api.create('/api/dataSources', data);
                fileInput.value = '';
                alert(`Added ${promptValue} to data sources!`);
            }
        }

        reader.readAsText(file);
    }

    function handleChatbotInput(e) {
        if (e.key === 'Enter' && document.activeElement === e.target) {
            e.preventDefault();
            handleChatbotSubmit(e);
        }
    }

    async function handleChatbotSubmit(e) {
        const textarea = getChatbotTextarea();
        const prompt = getPromptFromTextarea(textarea);
        const templateTypeValue = getTemplateTypeValue();
        clearTextarea(textarea);
        displayUserMessage(prompt);

        toggleLoading();
        const data = await requestChatGpt(prompt, templateTypeValue);
        console.log(data);
        toggleLoading();

        displayChatbotResponse(data);
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

    function displayUserMessage(prompt) {
        addToOutput(prompt, 'You');
        saveMessageToLocalStorage(prompt, 'You');
    }

    async function displayChatbotResponse(data) {
        let response = typeof data === 'object' ? Object.values(data)[0] : data;
        response = typeof response === 'object' ? JSON.stringify(response) : response;
        addToOutput(response, 'ChatGpt');
        saveMessageToLocalStorage(JSON.stringify(response), 'ChatGpt');

        if (data.commands && data.commands.length > 0) {
            saveMessageToLocalStorage(JSON.stringify(data.commands), 'Commands');
            addToOutput(JSON.stringify(data.commands), 'Commands');
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

    function addToOutput(text, sender) {
        const messageElement = createMessageElement(text, sender);
        prependElementToOutput(messageElement);
    }

    function createMessageElement(text, sender) {
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
        h6.textContent = sender.toLowerCase() === 'chatgpt' ? 'Lucy' : sender.toLowerCase() === 'commands' ? 'commands' : sender.toLowerCase();
        avatarContainer.appendChild(avatar);

        const messageText = createHtmlElement('p');
        messageText.className = sender.toLowerCase();
        h6.className = sender.toLowerCase();
        messageText.textContent = text;
        if (sender.toLowerCase() !== 'you') {
            container.appendChild(avatarContainer);

        }
        inner.appendChild(messageText);
        inner.appendChild(h6);
        container.appendChild(inner);
        return container;
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
        if (this.prompt.messages.length > 10) {
            this.prompt.messages = this.prompt.messages.slice(0, 10);
        }
    }

    function createElements(configs) {
        return configs.map(config => {
            const element = createElementFromConfig(config);
            if (config.children) {
                const children = createElements(config.children);
                children.forEach(child => element.appendChild(child));
            }
            return element;
        });
    }

    const chatbotElements = createElements(chatbotConfig);
    document.body.prepend(...chatbotElements);
    loadMessages();
}