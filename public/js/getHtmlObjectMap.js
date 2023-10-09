getHtmlObjectMap = (item, key) => {
    const map = {
        formTitles: {
            elementType: 'div',
            className: 'title',
            children: [{
                elementType: 'a',
                textContent: item.title,
                attributes: {
                    onclick: (event) => {
                        handleTitleClick(item.title);
                    }
                }
            }, {
                elementType: 'p',
                textContent: item.description,
            }]
        },
        stage: {
            elementType: 'section',
            className: 'stage',
            css: '',
            textContent: '',
            attributes: {
                required: true,
                title: 'testing'
            }
        },
        elementNames: {
            elementType: 'div',
            className: 'element-name',
            textContent: item.name,
            attributes: {
                onclick: (event) => {
                    handleElementNameClick(item.name);
                }
            }
        }
    }
    return map[key];
};