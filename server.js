const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const reload = require('reload');

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/src')));
app.set('views', './src');
app.set('view engine', 'ejs');
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

//port to Port
app.listen(PORT, () => console.log(`running dev server on PORT ${PORT}`));
