export default class AddToQueueCommand {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    async enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            if (!this.isProcessing) {
                this.processQueue();
            }
        });
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const { task, resolve, reject } = this.queue.shift();
            try {
                const result = await task();
                resolve(result);
            } catch (error) {
                console.error("Error processing queue item:", error);
                reject(error);
            }
        }

        this.isProcessing = false;
    }
}