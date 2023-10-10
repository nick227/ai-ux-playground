require('module-alias/register');
const queryChatGpt = require('@commands/query/queryChatGpt');
const apiHandlers = require('@helpers/apiHandlers');
const { collectionNames, methods } = require('@helpers/constants');

const routes = collectionNames.reduce((acc, endpoint) => {
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
