setupPromptTemplateForm();

function setupPromptTemplateForm() {
    const title = document.createElement('h1');
    const desc = document.createElement('p');
    const form = document.createElement('form');
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter prompt template';
    const submit = document.createElement('button');
    submit.textContent = 'Submit';
    title.textContent = 'Create prompt template';
    desc.innerHTML = 'Templates require <b>type</b> property and either <b>messages</b> or <b>prompt</b> property.<BR>Use syntax <b>${}</b> to reference url parameters in your values.<BR>Define <b>tool_choice</b> and <b>tools</b> to control the chatgpt response format. <BR><small><a target="_blank" href="https://platform.openai.com/docs/guides/function-calling">https://platform.openai.com/docs/guides/function-calling</a></small>';
    title.className = 'title';
    submit.type = 'submit';
    form.appendChild(title);
    form.appendChild(desc);
    form.appendChild(textarea);
    form.appendChild(submit);
    form.addEventListener('submit', handleFormSubmit);
    textarea.addEventListener('input', setupTextAreaHeight);
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
            setupTextAreaHeight();
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}

function setupTextAreaHeight() {
    this.style.height = 'auto';
    let maxHeight = window.innerHeight || document.documentElement.clientHeight;
    let newHeight = Math.min(this.scrollHeight, maxHeight);
    this.style.height = newHeight + 'px';
    const data = this.value;
    if (isValidJson(data)) {
        this.classList.remove('error');
    } else {
        this.classList.add('error');
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
    const expectedKeys = ['type', 'messages', 'prompt', 'tool_choice', 'tools'];
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