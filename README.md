# ai-ux-playground

This node server exposes: 
 - Generates, executes and saves dynamic ChatGPT prompt responses
 - Generates, executes and saves dynamic ChatGPT prompt images
 - Front-end demo code
 - CRUD operations on nedb collections

<b>Setup</b>

 - Visit <a href="https://platform.openai.com/account/api-keys" target="_blank">https://platform.openai.com/account/api-keys</a>
 - Click "Create new secret key" copy secret key to safe place.
 - Clone this repo and run npm i
 - Create a .env file in root directory with:

```
OPENAI_SECRET=sk-************************************************
OPENAI_MODEL=gpt-3.5-turbo-16k
OPENAI_MAX_TOKENS=16000
SESSION_SECRET=9d3c29d46eac24b74698b9f4358e8b2a
DALLE_MODEL=dall-e-2
GENERATED_IMAGES_PATH=./generated/images/
API_PORT=5200
```

Session secret is any random string, use chatgpt to generate one. 

Finally run <code>npm start</code>

<b>Enjoy!</b>

---------------------------------------------------------------------

<b>Prompt Templates</b>

 - Manually edit /data/database.db
 - Or Insert row using <code>node scripts/run.js</code>
 - Prompt template is now available at api/chatgpt/:templateName?attribute=value
