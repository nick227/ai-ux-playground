
import chatGptControllers from '../src/controllers/chatGptControllers.js';
import apiHandlers from '../src/controllers/apiControllers.js';
import { collectionNames, methods } from '../src/constants.js';

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
    path: '/api/chatgpt/:endpoint?',
    fn: chatGptControllers
  }, 
]);

export default routes;
