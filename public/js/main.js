
document.addEventListener('DOMContentLoaded', async (event) => {
    try {

        await setupChatBot();

        const popup = addConsole();
        setupWebSocket(popup);
        
        await setupPromptTemplateForm();
        await loadTemplateList();
        
        setupDemo();
        setupToggleButtons();
        document.querySelector('.loading-spinner').classList.toggle('hidden');

        takeSnapshot();

    } catch (error) {
        console.error('An error occurred:', error);
    }
});