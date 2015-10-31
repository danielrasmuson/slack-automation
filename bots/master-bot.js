var _ = require('lodash');
var Rx = require('rx');
var goalBot = require('./goals/goal-bot');

function answer(botName, botIcon, message){
  return {
    text: message,
    username: botName,
    icon_emoji: botIcon
  };
}

function botCMDName(botName){
  return botName.replace(/ /i, '-').toLowerCase();
}

function help(botName, allCommands){
  var possibleCommands = allCommands
    .map(function(command){
      return botCMDName(botName)+' '+command
    }).join('\n');
  return '*Please send one of the possible commands.*\n\n'+possibleCommands;
}

module.exports = {
  ask: function(question){
    return Rx.Observable.create(function(observer){

      var commandWords = question.split(' ');

      // todo have this loop
      var command = goalBot.api[commandWords[1]];
      var commandBody = commandWords.slice(2).join(' ');

      if (command){
        command(commandBody).forEach(function(commandResponse){
          observer.onNext(answer(goalBot.name, goalBot.icon, commandResponse));
          observer.onCompleted();
        });
      } else{
        var helpMessage = help(goalBot.name, _.keys(goalBot.api));
        observer.onNext(answer(goalBot.name, goalBot.icon, helpMessage));
        observer.onCompleted();
      }

    });
  }
}
