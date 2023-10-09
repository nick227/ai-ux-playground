(async () => {

    const formTitles = await api.read('api/forms');
    const template1 = await api.read('api/templates', { name: 'Travel Authorization Form' });
    const elementNames = await api.read('api/elements');
    elementNames.sort((a, b) => a.name.localeCompare(b.name));

    startWebSocketHandler();

    renderList(formTitles, 'formTitles');

    renderList(elementNames, 'elementNames');

    renderStage(template1[0]);

    document.querySelector('.loading').classList.toggle('hidden');

})();