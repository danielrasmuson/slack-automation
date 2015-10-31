var low = require('lowdb')
var Rx = require('rx');
var db = low('db.json')

// goal-bot
// goal-bot new
// goal-bot list
var goalBotApi = {
  list: function(){
    return Rx.Observable.create(function(observer){
        var goalNames = db.object.goals.map(function(goal, index){
          return index+1+". "+goal.title;
        }).join('\n');
       observer.onNext(goalNames);
    });
  },
  new: function(text){
    return Rx.Observable.create(function(observer){
      db('goals').push({ title: text})
      db.save();
      observer.onNext('Goal Created');
    });
  }
}


module.exports = {
  name: "Goal Bot",
  icon: ":star:",
  api: goalBotApi
}
