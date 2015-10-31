var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');

var users = {
  sensei: {
    "username": "The Future",
    "icon_emoji": ":telescope:"
  }
}

function postMessageToJournal(message, callback){
  request.post({
      url: process.env.SLACK_PERSONAL_JOURNAL_POSTURL,
      body: JSON.stringify(_.extend({text: message}, users['sensei']))
    }, 
    callback
  )
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  postMessageToJournal('Hey Daniel. Is now a good time to reflect and think about the future?', function(){
    res.send('respond with a resource');
  });
});

module.exports = router;
