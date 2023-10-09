require('module-alias/register');
const queryChatGpt = require('@commands/query/template/queryChatGpt');
const apiHandlers = require('@helpers/apiHandlers');

const methods = ['get', 'post', 'put', 'delete'];
const endpoints = ['styles', 'elements', 'layouts', 'themes', 'palettes', 'forms', 'templates', 'promptTemplates'];

const routes = endpoints.reduce((acc, endpoint) => {
  methods.forEach(method => {
    acc.push({
      type: method,
      path: `/api/${endpoint}`,
      fn: apiHandlers[method]
    });
  });
  return acc;
}, [
  {
    type: 'get',
    path: '/api/chatgpt',
    fn: queryChatGpt
  }
]);

module.exports = routes;
