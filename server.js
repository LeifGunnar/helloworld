// server.mjs
const express = require('express')
const app = express()
const portno = 3000
const pkgdb = require('./db.js');


app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  pkgdb.getUsersOver(40, function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      console.log(result);
      res.write('<h2>Over 40</h2>')
      res.write(`${result}`);
      res.end('<p>Hello world!</p>');
    }
  })
})

app.listen( portno, '127.0.0.1', () => {
  console.log(`Example app listening on port ${portno}`)
})




// run with `node server.mjs`
