const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const reload = require('reload');

app.use(express.static(path.join(__dirname, '/src')));

const port = process.env.PORT || 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`running dev server on PORT ${port}`));
reload(app);
