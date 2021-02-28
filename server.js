const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const reload = require('reload');

const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/src')));
app.set('views', './src');

app.get('/', function (req, res) {
  res.render('index');
});

const pagesArr = [];

const pagesFolder = './src/pages/';
const fs = require('fs');

fs.readdirSync(pagesFolder).forEach((fileName) => {
  if (fileName.includes('ejs')) {
    let shortName = fileName.replace('.ejs', '');
    pagesArr.push(shortName);
  }
});

pagesArr.forEach((page) => {
  app.get(`/pages/${page}`, function (req, res) {
    res.render(`pages/${page}`);
  });
});

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

const server = http.createServer(app);

server.listen((process.env.PORT, '0.0.0.0'), () => console.log(`running dev server on PORT ${port}`));
reload(app);
