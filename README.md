# ai-ux-playground
This node server exposes: 
 - crud operations on the nedb collections
- chatgpt/ prompt requests
- chatgpt/ prompt template requests
- front-end code for making requests and displaying results
- front-end code for typeahead, dropdown, popup views

<b>Setup</b>

 - Visit <a href="https://platform.openai.com/account/api-keys" target="_blank">https://platform.openai.com/account/api-keys</a>
 - Click "Create new secret key" copy secret key to safe place.
 - Clone this repo and run npm i
 - Create a .env file in root directory with:

<code>OPENAI_SECRET=**-**********************************************
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=4096
SESSION_SECRET=************************************************</code>

Session secret is any random string, use chatgpt to generate one. 

Finally run npm start

<b>Enjoy!</b>
