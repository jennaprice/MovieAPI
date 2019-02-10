const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const logger = require('morgan');

app.set('view engine', 'pug');

const routes = require('./routes/index.js');

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index');
});
app.use('/api', routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
