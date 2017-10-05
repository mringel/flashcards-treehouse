const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.locals.prompt = "Who is buried in Grant's tomb?"
  res.locals.hint = "Think about whose tomb it is."
  res.render('card');
  // or it can be formatted like
  // res.render('card', {prompt: 'Who is buried..?'});
});


module.exports = router;
