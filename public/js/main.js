
document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        popup = setupPopupConsole();
        setupDemoPreLoader();
        setupVoice();
        const chatbot = await setupChatBot();
        await setupPromptTemplateForm();
        await loadTemplateList();
        setupDemo();
        dispatchEvent('updateRemoteSnapshot');
        setupWelcome(chatbot);

        document.querySelector('.loading-spinner').classList.toggle('hidden');

    } catch (error) {
        console.error('An error occurred:', error);
    }
});