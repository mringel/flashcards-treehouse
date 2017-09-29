const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  const name = name: req.cookies.username;
  if (name) {
    res.render('index', { name }); // ES6 way of saying name: name
  } else {
    res.redirect('/hello');
  }
});

app.get('/cards', function(req, res) {
  res.locals.prompt = "Who is buried in Grant's tomb?"
  res.locals.hint = "Think about whose tomb it is."
  res.render('card');
  // or it can be formatted like
  // res.render('card', {prompt: 'Who is buried..?'});
});

app.get('/hello', function(req, res) {
  res.render('hello');
});

app.post('/hello', function(req, res) {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('App is running on localhost:3000');
});
