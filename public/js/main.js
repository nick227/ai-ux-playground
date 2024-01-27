

startWebSocketHandler();

(async () => {
    try {
        async function renderDataObject(key, target) {
            const data = await api.read(`api/${key}`);
            renderList(data, key, target);
        }

        //await setupStage();
        await setupChatBot();
        await setupPromptTemplateForm();
        
        const keys = ['promptTemplates'];
        const target = document.querySelector('#templates');
        const buildPromises = keys.map((key) => {
            return renderDataObject(key, target);
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