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

app.get('/pages/*', function (req, res) {
  res.render('pages/sign-in');
});

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

const server = http.createServer(app);

server.listen(port, () => console.log(`running dev server on PORT ${port}`));
reload(app);
