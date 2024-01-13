

startWebSocketHandler();

(async () => {
    try {
        async function renderDataObject(key) {
            const data = await api.read(`api/${key}`);
            renderList(data, key);
        }
        
        const keys = ['promptTemplates'];
        const buildPromises = keys.map((key) => {
            return renderDataObject(key);
        });

        await Promise.all(buildPromises);
        await new Promise(resolve => setTimeout(resolve, 500));

        //const template = await api.read('api/templates', { name:"Leave Request Form" });
        //renderStage(template);

        document.querySelector('.loading').classList.toggle('hidden');
    } catch (error) {
        console.error('An error occurred:', error);
    }

})();