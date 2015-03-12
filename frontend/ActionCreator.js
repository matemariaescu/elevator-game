var Dispatcher = require('./Dispatcher');
var Constants = require('./constants');

var ActionTypes = Constants.ActionTypes;

var ActionCreator = {

  receiveLeaderboard: function(leaderboard) {
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_LEADERBOARD,
      leaderboard: leaderboard
    });
  }

};

module.exports = ActionCreator;