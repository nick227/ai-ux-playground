
document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        setupDemoPreLoader();
        popup = setupPopupConsole();
        setupVoice();
        const chatbot = await setupChatBot();
        await setupPromptTemplateForm();
        await loadTemplateList();
        setupDemo();
        dispatchEvent('updateRemoteSnapshot');

        setTimeout(() => {
            //chatbot.triggerRequest('welcome');
        }, 120);

        document.querySelector('.loading-spinner').classList.toggle('hidden');

    } catch (error) {
        console.error('An error occurred:', error);
    }
});