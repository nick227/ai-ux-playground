import path from 'path';
import DB from '../../src/db/DB.js';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.resolve(__dirname, '../../public/uploads');
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `${file.originalname}-${timestamp}${extension}`;
    req.filename = filename;
    cb(null, filename);
  }
});
const upload = multer({ storage: storage });

function uploadHandler(operation, req, res, db) {
  console.log("1")
  return new Promise((resolve, reject) => {
    if (operation === 'post' && req.path === '/api/dataSources') {
      console.log("2")
      upload.single('file')(req, res, async function (err) {
        if (err) {
          console.log("3", err.message)
          res.status(500).json({ error: err.message });
          resolve(true);
        } else if (!req.file) {
          console.log("4")
          res.status(400).json({ error: 'No file was uploaded.' });
          resolve(true);
        } else {
          console.log("5")
          const filename = req.filename;
          console.log(filename)
          await db.insert({ name: req.body.name, path: filename });
          res.status(200).json({ message: 'File uploaded successfully' });
          resolve(true);
        }
      });
    } else {
      resolve(false);
    }
  });
}

const execute = async (operation, req, res) => {
  const dbName = req.path.split('/')[req.path.split('/').length - 1] + '.db';
  const db = new DB(dbName);
  let results;

  if (!(await uploadHandler(operation, req, res, db))) {
    try {
      switch (operation) {
        case 'post':
          results = await db.insert(req.body);
          break;
        case 'get':
          const { limit, ...params } = req.query;
          const options = limit ? { limit: parseInt(limit) } : {};
          if (options.limit === 1) {
            results = await db.findOne(params);
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
  } else {
    console.log('true');
  
  }
};

const post = (req, res) => execute('post', req, res);
const get = (req, res) => execute('get', req, res);
const put = (req, res) => execute('put', req, res);
const del = (req, res) => execute('delete', req, res);

export default {
  'post': post, 'get': get, 'put': put, 'delete': del
};