function generateRandomCSS(elementName) {
  return createCssString();
//    return getFromObject(elementName);
}

function getFromObject(elementName) {
    const filteredStyles = textualStyles.filter(style => style.type === elementName);
    if (filteredStyles.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredStyles.length);
    return filteredStyles[randomIndex].css;

}

function createCssString() {

    const properties = [
        'color', 'background-color', 'font-size',
        'margin', 'padding', 'border', 'border-radius', 'text-align',
        'font-weight'
    ];

    const colors = generateRandomHexColor();

    let cssString = '';
    const numProperties = Math.floor(Math.random() * 4) + 13; // 3 to 6 properties

    for (let i = 0; i < numProperties; i++) {
        const property = properties[Math.floor(Math.random() * properties.length)];
        let value;

        switch (property) {
            case 'color':
            case 'background-color':
                value = colors[Math.floor(Math.random() * colors.length)];
                break;
            case 'font-size':
            case 'width':
            case 'height':
            case 'border-radius':
            case 'line-height':
            case 'letter-spacing':
                value = Math.floor(Math.random() * 55) + 'px';
                break;
            case 'margin':
            case 'padding':
                value = Math.floor(Math.random() * 50) + 'px';
                break;
            case 'border':
                value = `${Math.floor(Math.random() * 5) + 1}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
                break;
            case 'text-align':
                value = ['left', 'right', 'center', 'justify'][Math.floor(Math.random() * 4)];
                break;
            case 'font-weight':
                value = ['normal', 'bold', 'bolder'][Math.floor(Math.random() * 3)];
                break;
            case 'opacity':
                value = (Math.random()).toFixed(2);
                break;
            default:
                value = 'inherit';
        }

        cssString += `${property}: ${value}; `;
    }

    return cssString.trim();
}

function generateRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}