var express = require('express');
var router = express.Router();
var twilio = require('../components/twilio/twilio');

router.post('/', function(req, res, next) {
  if (req.body.text){
    if (req.body.text.indexOf('payment') !== -1){
      twilio.call(process.env.TWILIO_NUMBER_TO_CALL, function(result){
        res.send('calling for error');
      })
    } else{
      res.send('no payment problems');
    }
  } else{
    res.status(400);
    res.send('please include text in the body');
  }
  
});

module.exports = router;
