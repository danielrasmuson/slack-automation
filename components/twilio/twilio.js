var request = require('request');

var TWILIO_DOMAIN_API = 'https://'+process.env.TWILIO_ACCOUNTSID+':'+process.env.TWILIO_AUTHTOKEN+'@api.twilio.com/2010-04-01';
var twilio = {
  say: function(message){
    return '<Response><Say voice="alice">'+message+'</Say></Response>';
  },
  call: function(phone, callback, errCallback){
    request.post({
      url: TWILIO_DOMAIN_API+'/Accounts/'+process.env.TWILIO_ACCOUNTSID+'/Calls.json',
      form: {
        From: process.env.MY_TWILIO_NUMBER,
        To: phone,
        Url: process.env.HEROKU_DOMAIN+'/slack/phone'
      }
    }, function(err, res){
      if (err){
        errCallback(err);
      } else{
        callback(res)
      }
    });
  }
}

module.exports = twilio;
