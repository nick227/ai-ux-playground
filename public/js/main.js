
document.addEventListener('DOMContentLoaded', async (event) => {
    try {

        const popup = addConsole();
        setupWebSocket(popup);
        
        await setupChatBot();
        await setupPromptTemplateForm();
        await loadTemplateList();
        warnOnPageExit();
        
        setupDemo();
        setupToggleButtons();
        document.querySelector('.loading-spinner').classList.toggle('hidden');

        //snapshot();

    } catch (error) {
        console.error('An error occurred:', error);
    }
});