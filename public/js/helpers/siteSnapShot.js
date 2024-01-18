function getBodyHtmlWithInlineStyles() {
    const bodyClone = document.body.cloneNode(true);
    Array.from(bodyClone.getElementsByTagName('script')).forEach(
        script => script.parentNode.removeChild(script)
    );
    //removeTextContent(bodyClone);
    return bodyClone.outerHTML.replace(/\s+/g, ' ');
}

function removeTextContent(element) {
    if (element.children.length === 0) {
        element.textContent = '';
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
    const combinedStyles = getCombinedStyles();
    console.log(bodyClone);
    console.log(combinedStyles);
    }, 2000);
};
