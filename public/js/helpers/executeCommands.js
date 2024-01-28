//{"command":"style","value":"background-color: blue","targetNodeId":"69"}
//{"command":"append","value":"<div>hello</div>","targetNodeId":"20"}
//{"command":"remove","value":null,"targetNodeId":"20"}
//{"command":"publish","value":null,"targetNodeId":null}
//{"command":"edit","value":{src:'https://source.unsplash.com/random'},"targetNodeId":5}

function executeCommands(commands) {
    commands.forEach(command => {
        switch (command.command) {
            case 'append':
                append(command.value, command.targetNodeId);
                break;
            case 'prepend':
                prepend(command.value, command.targetNodeId);
                break;
            case 'remove':
                remove(command.value, command.targetNodeId);
                break;
            case 'insert':
                insert(command.value, command.targetNodeId);
                break;
            case 'style':
                style(command.value, command.targetNodeId);
                break;
            case 'edit':
                edit(command.value, command.targetNodeId);
                break;
            case 'publish':
                publish(command.value, command.targetNodeId);
                break;
            default:
                style(command.css, command.nodeId);
                break;
        }
    });
}

function speak(message) {
    const event = new CustomEvent('speak', { detail: { response: message } });
    console.log('dispatch', event);
    window.dispatchEvent(event);
}

function edit(value, targetNodeId) {
    const targetElement = document.querySelector(`[data-node-id="${targetNodeId}"]`);
    if (!targetElement) {
        errorMessage(targetNodeId);
        return;

    }
    let parsedValue;
    try {
        parsedValue = JSON.parse(value);
    } catch (e) {
        parsedValue = value;
    }
    if (typeof parsedValue === 'object') {
        Object.keys(parsedValue).forEach(key => {
            targetElement[key] = parsedValue[key];
        });
    } else {
        targetElement.innerHTML = parsedValue;
    }
}

function style(value, targetNodeId) {
    const targetElement = document.querySelector(`[data-node-id="${targetNodeId}"]`);
    if (!targetElement) {
        errorMessage(targetNodeId);
        return;
    }
    value.split(';').reduce((_, style) => {
        const [property, styleValue] = style.split(':');
        if (property && styleValue) {
            targetElement.style[property.trim()] = styleValue.trim();
        }
    }, {});
}

function append(value, targetNodeId) {
    const targetElement = document.querySelector(`[data-node-id="${targetNodeId}"]`);
    if (!targetElement) {
        errorMessage(targetNodeId);
        return;
    }
    targetElement.innerHTML += value;
}

function remove(_, targetNodeId) {
    const targetElement = document.querySelector(`[data-node-id="${targetNodeId}"]`);
    if (!targetElement) {
        errorMessage(targetNodeId);
        return;
    }
    targetElement.parentNode.removeChild(targetElement);
}

function prepend(value, targetNodeId) {
    const targetElement = document.querySelector(`[data-node-id="${targetNodeId}"]`);
    if (!targetElement) {
        errorMessage(targetNodeId);
        return;
    }
    targetElement.innerHTML = value + targetElement.innerHTML;
}

function insert(value, targetNodeId) {
    const targetElement = document.querySelector(`[data-node-id="${targetNodeId}"]`);
    if (!targetElement) {
        errorMessage(targetNodeId);
        return;
    }
    targetElement.outerHTML = value;
}

function errorMessage(targetNodeId) {
    speak(`Element with data-node-id ${targetNodeId} not found`);
}

function publish(_, __) {
    alert('published!')
}