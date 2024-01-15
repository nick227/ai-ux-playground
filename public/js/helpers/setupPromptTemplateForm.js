

function setupPromptTemplateForm() {
    const title = createHtmlElement('h1');
    const desc = createHtmlElement('p');
    const form = createHtmlElement('form');
    const textarea = createHtmlElement({ elementType: 'textarea'});
    const submit = createHtmlElement('button');
    textarea.placeholder = 'Enter prompt template';
    submit.textContent = 'Submit';
    title.textContent = 'Create prompt template';
    desc.innerHTML = 'Templates require type property and either messages or prompt property. Use syntax ${} to reference url parameters in your values. Set data_sources as array to side load data. Use sequence to begin sequence. Current data_sources: chatHistory, snapshots, documentation Define tool_choice and tools to control the chatgpt response format. <small><a target="_blank" href="https://platform.openai.com/docs/guides/function-calling">https://platform.openai.com/docs/guides/function-calling</a></small>';
    desc.className = 'description';
    title.className = 'title';
    submit.type = 'submit';
    form.appendChild(title);
    form.appendChild(desc);
    form.appendChild(textarea);
    form.appendChild(submit);
    form.addEventListener('submit', handleFormSubmit);
    textarea.addEventListener('input', () => setupTextAreaHeight(textarea));
    textarea.addEventListener('keydown', fixTabPress);
    document.body.prepend(form);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const textarea = form.querySelector('textarea');
    const data = textarea.value;
    if (validate(data)) {
        try {
            const jsonData = JSON.parse(data);
            const response = await api.create('/api/promptTemplates', jsonData);
            alert(`Success: ${response.type} prompt template created!`);
            addToList(response, 'promptTemplates');
            textarea.value = '';
            setupTextAreaHeight(textarea);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}

function setupTextAreaHeight(textarea) {
    textarea.style.height = 'auto';
    let maxHeight = window.innerHeight || document.documentElement.clientHeight;
    let newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';
    const data = textarea.value;
    if (isValidJson(data)) {
        textarea.classList.remove('error');
    } else {
        textarea.classList.add('error');
    }
}

function fixTabPress(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) +
            "  " + this.value.substring(end);
        this.selectionStart =
            this.selectionEnd = start + 2;
    }
}

const validate = data => {
    if (!data || !isValidJson(data)) {
        alert('Data is not valid JSON');
        return false;
    }
    const parsedData = JSON.parse(data);
    const { type, messages, prompt, tool_choice, tools, _id, timestamp } = parsedData;
    const expectedKeys = ['type', 'messages', 'prompt', 'tool_choice', 'tools', 'data_sources', 'sequence'];
    const actualKeys = Object.keys(parsedData);
    const extraKeys = actualKeys.filter(key => !expectedKeys.includes(key));

    if (extraKeys.length > 0) {
        alert(`Unexpected keys: ${extraKeys.join(', ')}`);
        return false;
    }

    if (!type) {
        alert('Type is missing');
        return false;
    }

    if (_id || timestamp) {
        alert('Timestamp and _id are not allowed');
        return false;
    }

    if (!Array.isArray(messages) && typeof prompt !== 'string') {
        alert('Messages is not an array or prompt is not a string');
        return false;
    }

    if (typeof tool_choice === 'string') {
        const toolFunction = tools?.find(tool => tool.type === 'function');
        if (!Array.isArray(tools)) {
            alert('Tools is not an array');
            return false;
        }
        if (!toolFunction) {
            alert('Tools does not contain an object with type: function');
            return false;
        }
        if (toolFunction.function?.name !== tool_choice) {
            alert('Function object does not contain element name that equals the tool_choice value');
            return false;
        }
    }

    return true;
};

function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}