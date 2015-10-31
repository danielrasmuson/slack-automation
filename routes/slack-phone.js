var express = require('express');
var router = express.Router();
var twilio = require('../components/twilio/twilio');

var message = 'Daniel. DroneDeploys Payment API Hit a Critical Problem.';

router.get('/', function(req, res, next) {
  twilio.call(process.env.TWILIO_NUMBER_TO_CALL, function(result){
    res.send(result);
  })
});

router.post('/', function(req, res, next) {
  res.send(twilio.say(message));
});

module.exports = router;
