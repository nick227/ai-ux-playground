const DB = require('./DB');
const execute = async (operation, req, res) => {
  const dbName = req.path.split('/')[req.path.split('/').length - 1] + '.db';
  const db = new DB(dbName);
  let results;

  try {
    switch (operation) {
      case 'post':
        results = await db.insert(req.body);
        break;
      case 'get':
      const { limit, ...params } = req.query;
      const options = limit ? { limit: parseInt(limit) } : {};
      if(options.limit === 1){
        console.log('finding one');
        results = await db.findOne(params);
        console.log('found', results);
      } else {
        results = await db.find(req.query);
      }
        break;
      case 'put':
        results = await db.update(req.query, req.body);
        break;
      case 'delete':
        results = await db.remove(req.query);
        break;
      default:
        res.status(400).json({ error: 'Invalid operation' });
        return;
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  post: (req, res) => execute('post', req, res),
  get: (req, res) => execute('get', req, res),
  put: (req, res) => execute('put', req, res),
  delete: (req, res) => execute('delete', req, res)
};
