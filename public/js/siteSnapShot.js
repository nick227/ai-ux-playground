let snapShotCurrentId = 0;
const keepAttributes = ['src', 'style', 'class', 'id', 'title', 'href', 'data-node-id'];
const keepContent = [
    'button',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'label',
    'section',
    'div',
    'a',
    'li',
    'pre',
    'option',
    'body'
];
const maxContentCharacterCount = 25;

function processNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        removeScriptTags(element);
        removeStyleTags(element);
        removeAttributes(element);
        removeSvgContent(element);
        //addNodeId(element);
        Array.from(element.childNodes).forEach(processNode);
    } else if (node.nodeType === Node.COMMENT_NODE) {
        removeComments(node);
    } else if (node.nodeType === Node.TEXT_NODE) {
        truncateTextContent(node);
    }
}

function removeStyleTags(element) {
    if (element.tagName === 'style') {
        element.parentNode?.removeChild(element);
    }
}

function truncateTextContent(node) {
    const isTextNode = node.nodeType === Node.TEXT_NODE;
    const parentNodeName = node.parentNode?.nodeName || '';
    const shouldKeepContent = keepContent.includes(parentNodeName.toLowerCase());

    if (isTextNode && !shouldKeepContent) {
        console.log('clearing', parentNodeName);
        node.nodeValue = '';
        return;
    }

    if (
        isTextNode &&
        node.nodeValue &&
        node.nodeValue.length > maxContentCharacterCount
    ) {
        node.nodeValue = node.nodeValue.substring(0, maxContentCharacterCount);
        return;
    }

    Array.from(node.childNodes).forEach(truncateTextContent);
}

function addNodeId(element) {
    element.setAttribute('data-node-id', snapShotCurrentId.toString());
    snapShotCurrentId++;
}

function removeSvgContent(element) {
    if (element.tagName === 'svg') {
        element.innerHTML = '';
    }
}

function removeScriptTags(element) {
    const scripts = Array.from(element.getElementsByTagName('script'));
    scripts.forEach((script) => {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
    });
}

function removeComments(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

function removeAttributes(element) {
    if (element.nodeType === Node.ELEMENT_NODE) {
        for (const attr of Array.from(element.attributes)) {
            if (!keepAttributes.includes(attr.name)) {
                element.removeAttribute(attr.name);
            }
        }

        for (const child of Array.from(element.children)) {
            removeAttributes(child);
        }
    }
}

function getStyles() {
    let combinedStyles = '';
    for (const style of Array.from(document.getElementsByTagName('style'))) {
        combinedStyles += style.textContent || '';
    }

    for (const styleSheet of Array.from(document.styleSheets)) {
        if (styleSheet.href && styleSheet.href.startsWith(window.location.origin)) {
            try {
                for (const rule of Array.from(styleSheet.cssRules)) {
                    combinedStyles += rule.cssText;
                }
            } catch (e) {
                console.error('Error accessing stylesheet rules:', e);
            }
        }
    }
    return combinedStyles;
}

function getHtml(bodyClone) {
    processNode(bodyClone);
    return bodyClone.outerHTML.replace(/\s+/g, ' ');
}

function snapshot() {
    setTimeout(() => {
        const element = document.body.cloneNode(true);
        const html = getHtml(element);
        const styles = getStyles(element);
        console.log(html);
        console.log(styles);
    }, 4000);
}
