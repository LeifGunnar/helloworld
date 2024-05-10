// server.mjs
const express = require('express')
const app = express()
const portno = 3000
const pkgdb = require('./db.js');

app.set('view engine', 'pug');


app.get('/', (req, res) => {
  pkgdb.getUsersOver(40, function (err, result) {
    if (err) {
      console.log(err);
      res.render('index', { title: "hello world", message: 'An error occured' });
    }
    if (result) {
      //console.log(result);
      res.render('index', { title: "hello world", message: result });
    }
  })
})


app.listen(portno, '127.0.0.1', () => {
  console.log(`Example app listening on port ${portno}`)
})




// run with `node server.mjs`
