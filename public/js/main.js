
  

startWebSocketHandler();

(async () => {
    try {
/*
        async function renderDataObject(key){
            const data = await api.read(`api/${key}`);
            console.log(key, data);
            renderList(data, key);
        }
    
        const keys = ['palettes', 'fieldLists', 'elements', 'forms', 'descriptions'];
        const buildPromises = keys.map((key) => {
            return renderDataObject(key);  // Note the return here
        });
*/    
        //await Promise.all(buildPromises);
        await new Promise(resolve => setTimeout(resolve, 500));  // Fixed setTimeout

        const template1 = await api.read('api/templates', { limit: 1 });
        renderStage(template1);

        document.querySelector('.loading').classList.toggle('hidden');
    } catch (error) {
        console.error('An error occurred:', error);
    }

})();
