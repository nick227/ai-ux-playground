import DB from '../../src/db/DB.js';
const execute = async (operation, req, res) => {
  const dbName = req.path.split('/')[req.path.split('/').length - 1] + '.db';
  console.log(dbName);
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
        results = await db.findOne(params);
      } else {
        results = await db.find(req.query);
        console.log(req.query, results);
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

const post = (req, res) => execute('post', req, res);
const get = (req, res) => execute('get', req, res);
const put = (req, res) => execute('put', req, res);
const del = (req, res) => execute('delete', req, res); 

export default {
  'post':post, 'get':get, 'put':put, 'delete':del
};