// any message I post in daniel-personal will come here

var express = require('express');
var router = express.Router();
var bots = require('../bots/master-bot.js');

router.post('/', function(req, res, next) {
  if (req.body === undefined || req.body.text === undefined){
    res.send('You must supply text in the post body');
  }

  bots.ask(req.body.text).forEach(function(answer){
    res.send(answer);
  }, function(err){
    res.status(400)
      .send('Error: '+err);
  })

});

module.exports = router;
