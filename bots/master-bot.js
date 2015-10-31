var _ = require('lodash');
var Rx = require('rx');
var bots = [require('./goals/goal-bot'), require('./asana/asana-bot')]

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

function getBot(botName){
  return Rx.Observable.create(function(observer){
    // todo have this loop
    var bot = _.first(bots.filter(function(bot){
      return botCMDName(bot.name) === botName;
    }));

    if (bot === undefined){
      observer.onError('Bot not found: '+botName+'. Known bots: '+bots.map(function(bot){
        return botCMDName(bot.name);
      }).join(', '));
    } else{
      observer.onNext(bot);
      observer.onCompleted();
    }
  });
}

module.exports = {
  ask: function(question){
    return Rx.Observable.create(function(observer){

      var commandWords = question.split(' ');

      getBot(commandWords[0]).forEach(function(bot){
        var command = bot.api[commandWords[1]];
        var commandBody = commandWords.slice(2).join(' ');

        if (command){
          command(commandBody).forEach(function(commandResponse){
            observer.onNext(answer(bot.name, bot.icon, commandResponse));
            observer.onCompleted();
          });
        } else{
          var helpMessage = help(bot.name, _.keys(bot.api));
          observer.onNext(answer(bot.name, bot.icon, helpMessage));
          observer.onCompleted();
        }
      }, function(err){
        observer.onError(err);
      })
    });
  }
}
