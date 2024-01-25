function getBodyHtmlWithInlineStyles(bodyClone) {
    
    Array.from(bodyClone.getElementsByTagName('script')).forEach(
        script => script.parentNode.removeChild(script)
    );
    removeComments(bodyClone);
    removeTextContent(bodyClone);
    return bodyClone.outerHTML.replace(/\s+/g, ' ');
}

function removeComments(element) {
    Array.from(element.childNodes).forEach(child => {
        if (child.nodeType === Node.COMMENT_NODE) {
            element.removeChild(child);
        } else {
            removeComments(child);
        }
    });
}

function removeTextContent(element) {
    if (element.nodeType === Node.ELEMENT_NODE) {
        element.removeAttribute('data-value');
        element.removeAttribute('data-id');
        Object.keys(element).forEach(key => {
            if (typeof element[key] === 'string' && key !== 'data-node-id') {
                element.removeAttribute(key);
            }
        });
    }
    if (element.nodeType === Node.TEXT_NODE) {
        element.nodeValue = element.nodeValue.split(' ').slice(0, 3).join(' ');
    } else {
        Array.from(element.childNodes).forEach(child => removeTextContent(child));
    }
}

function getCombinedStyles() {
    let combinedStyles = '';
    const styleTags = Array.from(document.getElementsByTagName('style'));
    combinedStyles += styleTags.reduce((combined, style) => {
        return combined + style.textContent;
    }, '');

    for (let i = 0; i < document.styleSheets.length; i++) {
        let styleSheet = document.styleSheets[i];
        if (styleSheet.href && styleSheet.href.startsWith(window.location.origin)) {
            try {
                let rules = Array.from(styleSheet.cssRules);
                combinedStyles += rules.reduce((combined, rule) => {
                    return combined + rule.cssText;
                }, '');
            } catch (e) {
                console.error('Error accessing stylesheet rules:', e);
            }
        }
    }
    return combinedStyles;
}

window.onload = () => {
    setTimeout(() => {
    const website = document.body.cloneNode(true);
    const bodyClone = getBodyHtmlWithInlineStyles(website);
    const combinedStyles = getCombinedStyles();
    console.log(bodyClone);
    console.log(combinedStyles);
    }, 2000);
};
