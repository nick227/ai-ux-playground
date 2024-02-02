
document.addEventListener('DOMContentLoaded', async (event) => {
    try {

        //setupPopupConsole();
        
        await setupChatBot();
        await setupPromptTemplateForm();
        await loadTemplateList();

        document.querySelector('.loading-spinner').classList.toggle('hidden');

    } catch (error) {
        console.error('An error occurred:', error);
    }
});