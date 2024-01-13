function applyInlineStyles(element) {
    const computedStyle = window.getComputedStyle(element);
    let inlineStyle = element.getAttribute('style') || '';
    const ignoredValues = ['relative', 'start', 'static', 'auto', '0px', 'none', 'normal', '0s', 'default', 'initial', '0%', 'padding-box', 'visible', '0', '0em', '0px', '0%', 'repeat', 'block'];
    const allowedProperties = ["background", "background-color", "width", "height", "color", "font-size", "font-family", "text-align", "text-decoration", "text-shadow", "line-height", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "border", "border-radius", "box-shadow", "display", "position", "top", "right", "bottom", "left", "z-index", "opacity", "visibility", "animation", "background-image", "background-repeat", "background-position", "background-size"];

    for (let i = 0; i < computedStyle.length; i++) {
        const key = computedStyle.item(i);
        const value = computedStyle.getPropertyValue(key);
        if (allowedProperties.includes(key) && value && !ignoredValues.includes(value) && !inlineStyle.includes(`${key}:`)) {
            inlineStyle += `${key}:${value};`;
        }
    }

    element.setAttribute('style', inlineStyle);

    Array.from(element.children).forEach(child => applyInlineStyles(child));
}

function getBodyHtmlWithInlineStyles() {
    const bodyClone = document.body.cloneNode(true);

    Array.from(bodyClone.getElementsByTagName('script')).forEach(
        script => script.parentNode.removeChild(script)
    );

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.appendChild(bodyClone);
    document.body.appendChild(container);

    applyInlineStyles(bodyClone);
    document.body.removeChild(container);

    return bodyClone.outerHTML.replace(/\s+/g, ' ');
}



window.onload = () => {
    setTimeout(() => {
        
    const bodyClone = getBodyHtmlWithInlineStyles();
    console.log(bodyClone);
    
    }, 2000);
};
