const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/cards', function(req, res) {
  res.locals.prompt = "Who is buried in Grant's tomb?"
  res.locals.hint = "Think about whose tomb it is."
  res.render('card');
});

app.get('/hello', function(req, res) {
  res.render('hello');
});

app.post('/hello', function(req, res) {
  console.dir(req.body);
  res.render('hello');
});

app.listen(3000, () => {
  console.log('App is running on localhost:3000');
});
