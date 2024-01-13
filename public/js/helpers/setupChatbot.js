setupChatBot();

function createElementFromConfig(config) {
    const element = document.createElement(config.type);
    element.className = config.className;
    if (config.textContent) element.textContent = config.textContent;
    if (config.type === 'input') element.type = config.inputType;
    if (config.placeholder) element.placeholder = config.placeholder;
    if (config.event) element.addEventListener(config.event.type, config.event.handler);
    if (config.options && config.type === 'select') {
        for (let optionValue of config.options) {
            const optionElement = document.createElement('option');
            optionElement.value = optionValue;
            optionElement.textContent = optionValue;
            if (optionValue === 'main') {
                optionElement.selected = true;
            }
            element.appendChild(optionElement);
        }
    }

    return element;
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
            textContent: 'Chatbot'
        },
        {
            type: 'div',
            className: 'chatbot',
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
                    className: 'chatbot-output'
                },
                {
                    type: 'select',
                    className: 'template-picker',
                    options: promptTemplatesTypes
                }
            ]
        }
    ];

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
        toggleLoading();

        displayChatbotResponse(data);
    }

    function getChatbotTextarea() {
        return document.querySelector('.chatbot-textarea');
    }

    function getTemplateTypeValue() {
        return document.querySelector('.template-picker').value;
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
        const response = data.sections ? JSON.stringify(data.sections) : data.response;
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
            const loading = document.createElement('div');
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
        const div = document.createElement('div');
        div.className = 'chatbot-output-message';
        const h6 = document.createElement('h6');
        h6.className = sender.toLowerCase();
        const p = document.createElement('p');
        p.className = sender.toLowerCase();
        p.textContent = text;
        h6.textContent = sender;
        div.appendChild(h6);
        div.appendChild(p);
        return div;
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