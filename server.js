const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const logger = require('morgan');

app.set('view engine', 'pug');

const routes = require('./routes/index.js');

app.use(logger('dev'));
app.use(bodyParser.json());

//setting middleware
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.send('Server is running');
});
app.use('/api', routes);
app.use(function(req, res) {
  res.json({
    status: 404,
    message: 'not found',
    detail: 'please check your route/ url, it is not valid'
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
