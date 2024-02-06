
document.addEventListener('DOMContentLoaded', async (event) => {
    try {

        popup = setupPopupConsole();
        setupVoice();
        setupDemoPreLoader();
        await setupChatBot();
        await setupPromptTemplateForm();
        await loadTemplateList();
        setupDemo();

        setTimeout(() => {
            dispatchEvent('updateRemoteSnapshot');
        }, 120);

        document.querySelector('.loading-spinner').classList.toggle('hidden');

    } catch (error) {
        console.error('An error occurred:', error);
    }
});