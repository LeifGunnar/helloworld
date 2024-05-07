// server.mjs
import { createServer } from 'node:http';
import pkgdb from './db.js';
const { db } = pkgdb;

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  pkgdb.getUsersOver(40, function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      console.log(result);
      res.write(`over 40 ${result}`);
      res.end('Hello world!');
    }
  })
  
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
