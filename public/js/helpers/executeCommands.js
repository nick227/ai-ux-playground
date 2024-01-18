//{"command":"style","value":"background-color: blue","targetNodeId":"69"}

function executeCommands(commands) {
    commands.forEach(command => {
        switch (command.command) {
            case 'add':
                add(command.value, command.targetNodeId);
                break;
            case 'remove':
                remove(command.value, command.targetNodeId);
                break;
            case 'move':
                move(command.value, command.targetNodeId);
                break;
            case 'copy':
                copy(command.value, command.targetNodeId);
                break;
            case 'undo':
                undo(command.value, command.targetNodeId);
                break;
            case 'redo':
                redo(command.value, command.targetNodeId);
                break;
            case 'select':
                select(command.value, command.targetNodeId);
                break;
            case 'style':
                style(command.value, command.targetNodeId);
                break;
            case 'insert':
                insert(command.value, command.targetNodeId);
                break;
            case 'edit':
                edit(command.value, command.targetNodeId);
                break;
            case 'publish':
                publish(command.value, command.targetNodeId);
                break;
            default:
                console.error(`Unknown command: ${command.command}`);
        }
    });
}

function style(value, targetNodeId) {
    const targetElement = document.querySelector(`[data-node-id="${targetNodeId}"]`);
    if (!targetElement) {
        console.error(`Element with data-node-id ${targetNodeId} not found`);
        return;
    }
    value.split(';').reduce((_, style) => {
        const [property, styleValue] = style.split(':');
        if (property && styleValue) {
            targetElement.style[property.trim()] = styleValue.trim();
        }
    }, {});
}

function add(value, targetNodeId) {
    // Implement add command
}

function remove(value, targetNodeId) {
    // Implement remove command
}

function move(value, targetNodeId) {
    // Implement move command
}

function copy(value, targetNodeId) {
    // Implement copy command
}

function undo(value, targetNodeId) {
    // Implement undo command
}

function redo(value, targetNodeId) {
    // Implement redo command
}

function select(value, targetNodeId) {
    // Implement select command
}

function insert(value, targetNodeId) {
    // Implement insert command
}

function edit(value, targetNodeId) {
    // Implement edit command
}

function publish(value, targetNodeId) {
    // Implement publish command
}