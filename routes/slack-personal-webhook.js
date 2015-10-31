// any message I post in daniel-personal will come here

var express = require('express');
var router = express.Router();
var bots = require('../bots/master-bot.js');

router.post('/', function(req, res, next) {

  bots.ask(req.body.text).forEach(function(answer){
    res.send(answer);
  })

});

module.exports = router;
