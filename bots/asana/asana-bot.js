var Rx = require('rx');
var request = require('request');

var ASANA_DOMAIN = 'https://'+process.env.ASANA_APIKEY+':@app.asana.com/api/1.0';
var LINEUP_PROJECTID = '23170885786522';

// asana
// asana lineup
var asana = {
  lineup: function(){
    return Rx.Observable.create(function(observer){

      request.get({
        url: ASANA_DOMAIN + '/tasks?project='+LINEUP_PROJECTID+'&completed_since=now',

      }, function(err, res){
        if (err){
          observer.onError(err);
        } else{
          var response = JSON.parse(res.body);
          if (response.errors){
            observer.onError(response);
          } else{
            var taskList = response.data.map(function(task, index){
              return index+1+'. '+task.name;
            }).join('\n');
            observer.onNext(taskList);
            observer.onCompleted();
          }
        }
      })
    });
  }
}

module.exports = {
  name: "Asana",
  icon: ":ballot_box_with_check:",
  api: asana
}
