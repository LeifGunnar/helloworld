// server.js
const express = require('express')
const app = express()
const portno = 3000
const pkgdb = require('./db.js');

global.minimumalder = 40

app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  pkgdb.getUsersOver(global.minimumalder, function (err, result) {
    if (err) {
      console.log(err);
      res.render('index', { title: "hello world", message: 'An error occured', errormessage: err, minage: global.minimumalder, nypersmeld: global.nypersonmelding });
    }
    if (result) {
      //console.log(result);
      res.render('index', { title: "hello world", message: result, minage: global.minimumalder, nypersmeld: global.nypersonmelding });
    }
    global.nypersonmelding = "";
  })
})

app.post('/membersoverage', (req, res) => {
  console.log(req.body);
  const alder = req.body.age;
  console.log("alder: " + alder);
  global.minimumalder = alder;
  res.redirect("/");
})

app.post('/nyperson', (req, res) => {
  console.log(req.body);
  const alder = req.body.age;
  const navn = req.body.name;
  console.log("alder: " + alder);
  console.log("navn:" + navn);
  pkgdb.insertUser({name: navn, age: alder} , function (err, result) {
    if (err) {
      console.log(err);
      global.nypersonmelding = "Opprettelse av ny person feilet, sjekk loggen.";
    }
    if (result) {
      console.log(result);
      global.nypersonmelding ="Ny person med navn="+navn+" og alder="+alder+" er opprettet."
    }
  })
  res.redirect("/");
})

app.listen(portno, '127.0.0.1', () => {
  console.log(`Example app listening on port ${portno}`)
})




// run with `node server.mjs`
