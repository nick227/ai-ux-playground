const config = {
    maxRetries: 3,
    timer: 1000
};

const promptValidationProcessList = {
    'getName': {
        prompt: (previousResults, initialPrompt, finalResults) => {
            return `Write a css string for the main section body of a ${initialPrompt}. Include background, font, padding, `;
        },
        validate: (result) => {
            return typeof result === 'string' && result.length > 0;
        },
        process: (result, finalResults) => {
            finalResults.sectionCss = result;
        }
    },
    'getDescription': {
        prompt: (previousResults, initialPrompt, finalResults) => {
            return `${initialPrompt} Enter the description for the HTML element. Previous description was ${previousResults?.description ?? 'none'}.`;
        },
        validate: (result) => {
            return typeof result === 'string' && result.length > 0;
        },
        process: (result, finalResults) => {
            finalResults.description = result;
        }
    },
    'getKeywords': {
        prompt: (previousResults, initialPrompt, finalResults) => {
            return `${initialPrompt} Enter the keywords for the HTML element. Previous keywords were ${previousResults?.keywords ?? 'none'}.`;
        },
        validate: (result) => {
            return typeof result === 'string' && result.length > 0;
        },
        process: (result, finalResults) => {
            finalResults.keywords = result;
        }
    }
};

class PromptCommand {
    constructor(key, previousResults, initialPrompt, finalResults) {
        this.key = key;
        this.finalResults = finalResults;
        this.previousResults = previousResults;
        this.initialPrompt = initialPrompt;
    }

    execute() {
        return promptValidationProcessList[this.key].prompt(this.previousResults, this.initialPrompt, this.finalResults);
    }
}

class ValidateCommand {
    constructor(key, result) {
        this.key = key;
        this.result = result;
    }

    execute() {
        return promptValidationProcessList[this.key].validate(this.result);
    }
}

class ProcessCommand {
    constructor(key, result, finalResults) {
        this.key = key;
        this.result = result;
        this.finalResults = finalResults;
    }

    execute() {
        promptValidationProcessList[this.key].process(this.result, this.finalResults);
    }
}

async function queryGPT(prompt) {
  // Simulate GPT query logic
  return "Sample Result"; // Replace with actual GPT query
}

async function executeRetryOperation(key, prompt, chain) {
    let retries = 0;
    let result;

    // Retry loop
    while (retries < config.maxRetries) {
        // Query and validate
        result = await queryGPT(prompt);
        if (isValidResult(key, result)) {
            chain[key] = result;
            return result;
        }

        // Delay before next retry
        await delayBeforeNextRetry();
        retries++;
    }

    throw new Error('Max retries reached');
}


function isValidResult(key, result) {
    const validateCmd = new ValidateCommand(key, result);
    return validateCmd.execute();
}

async function delayBeforeNextRetry() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(config.timer);
}


async function processPrompt(key, chain, initialPrompt, finalResults) {
    const previousResults = chain[key];
    const promptCmd = new PromptCommand(key, previousResults, initialPrompt, finalResults);
    const prompt = promptCmd.execute();

    if (Array.isArray(previousResults)) {
        const results = [];
        for (const prevResult of previousResults) {
            try {
                const result = await executeRetryOperation(key, `${prompt} Previous result: ${prevResult}`, chain);
                results.push(result);
            } catch (error) {
                console.error(`Failed to get valid result for prompt: ${key} with previous result: ${prevResult}`, error);
            }
        }
        chain[key] = results;
        const processCmd = new ProcessCommand(key, results, finalResults);
        processCmd.execute();
    } else {
        try {
            const result = await executeRetryOperation(key, prompt, chain);
            chain[key] = result;
            const processCmd = new ProcessCommand(key, result, finalResults);
            processCmd.execute();
            finalResults[key] = result;  // Update this line
        } catch (error) {
            console.error(`Failed to get valid result for prompt: ${key}`, error);
        }
    }
}

async function templatePrompt(initialPrompt) {
    const chain = {};
    const finalResults = {};

    for (const key of Object.keys(promptValidationProcessList)) {
        try {
            await processPrompt(key, chain, initialPrompt, finalResults);
        } catch (error) {
            console.error(`Failed to get valid result for prompt: ${key}`, error);
        }
    }

    console.log('Final Results:', finalResults);
}


// Run the main function
templatePrompt("Employee Onboarding").catch(error => {
    console.error('An errorf occurred:', error);
});

module.exports = templatePrompt;
