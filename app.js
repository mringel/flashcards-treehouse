const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

// app.use((req, res, next) => {
//   console.log('Hello');
//   const err = new Error('Oh noes!');
//   err.status = 500;
//   next(err);
// });

app.get('/', function(req, res) {
  const name = req.cookies.username;
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
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', function(req, res) {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/Goodbye', function(req, res) {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
  console.log('App is running on localhost:3000');
});
