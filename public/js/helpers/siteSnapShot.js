function getBodyHtmlWithInlineStyles() {
    const bodyClone = document.body.cloneNode(true);
    Array.from(bodyClone.getElementsByTagName('script')).forEach(
        script => script.parentNode.removeChild(script)
    );
    removeTextContent(bodyClone);
    return bodyClone.outerHTML.replace(/\s+/g, ' ');
}

function removeTextContent(element) {
    if (element.nodeType === Node.ELEMENT_NODE) {
        element.removeAttribute('data-value');
        element.removeAttribute('data-id');
        Object.keys(element).forEach(key => {
            if (typeof element[key] === 'string' && key !== 'data-node-id') {
                element.removeAttribute[key];
            }
        });
    }
    if (element.nodeType === Node.TEXT_NODE) {
        element.nodeValue = '';
    } else {
        Array.from(element.childNodes).forEach(child => removeTextContent(child));
    }
}


function removeTextContentd(element) {
    if (element.children.length === 0) {
        element.textContent = '';
        //truncate all element properties to 10 characters
        Object.keys(element).forEach(key => {
            if (typeof element[key] === 'string') {
                element[key] = element[key].substring(0, 10);
            }
        });
    } else {
        Array.from(element.children).forEach(child => removeTextContent(child));
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
    const bodyClone = getBodyHtmlWithInlineStyles();
    //const combinedStyles = getCombinedStyles();
    console.log(bodyClone);
//    console.log(combinedStyles);
    }, 2000);
};
