function createHtmlElement(options) {
    if(!options){
        return document.createElement('div');
    }
    const { elementType, className, css, cssStates = {}, textContent, attributes = {}, children = [] } = options;

    const el = document.createElement(elementType);
    el.className = className || '';
    el.textContent = textContent || '';

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'header'].includes(elementType)) {
        el.textContent = textContent || 'Lorem Ipsum';
    }
    if (['button'].includes(elementType)) {
        el.textContent = textContent || 'click me';
    }
    if (elementType === 'img' && !attributes.href) {
        el.src = 'https://picsum.photos/200';
    }

    setAttributes(el, attributes);
    setStyle(el, css);
    addListeners(el, cssStates, attributes, css);
    handleSpecialElements(el, elementType, attributes);

    // Recursively append children
    children.forEach(childOptions => {
        const childElement = createHtmlElement(childOptions);
        el.appendChild(childElement);
    });

    return el;
}

function setAttributes(el, attributes) {
    const ignore = ['onclick'];
    for (const [key, value] of Object.entries(attributes)) {
        if (ignore.includes(key)) continue; // Skip ignored properties
        try {
            el[key] = value;
        } catch (e) {
            console.warn(`Could not set property ${key}: ${e.message}`);
        }
    }
}


const handleSpecialElements = (el, elementType, attributes) => {
    if (elementType === 'select') {
        const options = [1, 2, 3, 4, 5];
        options.forEach((optionValue) => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.text = optionValue;
            el.appendChild(option);
        });
    }
    if (elementType === 'a') {
        el.href = attributes.href || 'javascript:void(0);';
    }
};

function setStyle(el, styles) {
    if (!styles) return;
    if (typeof styles === 'string') {
        el.setAttribute('style', styles);
    } else if (typeof styles === 'object') {
        for (const [key, value] of Object.entries(styles)) {
            console.log(key, value)
            el.style[key] = value;
        }
    }
}

function addListeners(el, cssStates, attributes, initialStyle) {
    const jsEvents = [
        'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover',
        'mouseout', 'mouseenter', 'mouseleave', 'contextmenu', 'drag', 'dragend',
        'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop', 'wheel'
    ];

    const pseudoClassHandlers = [{
            state: 'hover',
            listener: (el, style, initialStyle) => {
                el.addEventListener('mouseenter', () => setStyle(el, style));
                el.addEventListener('mouseleave', () => setStyle(el, initialStyle));
            }
        },
        {
            state: 'active',
            listener: (el, style, initialStyle) => {
                el.addEventListener('mousedown', () => setStyle(el, style));
                el.addEventListener('mouseup', () => setStyle(el, initialStyle));
            }
        },
        {
            state: 'focus',
            listener: (el, style, initialStyle) => {
                el.addEventListener('focus', () => setStyle(el, style));
                el.addEventListener('blur', () => setStyle(el, initialStyle));
            }
        }
    ];

    for (const [state, style] of Object.entries(cssStates)) {
        if (jsEvents.includes(state)) {
            el.addEventListener(state, () => setStyle(el, style));
        } else {
            const pseudoClassHandler = pseudoClassHandlers.find(handler => handler.state === state);
            if (pseudoClassHandler) {
                pseudoClassHandler.listener(el, style, initialStyle);
            }
        }
    }

    if (attributes.onclick) {
        el.addEventListener('click', attributes.onclick);
    }
}