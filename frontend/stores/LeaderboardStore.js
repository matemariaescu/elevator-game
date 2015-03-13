
var Fluxxor = require('fluxxor'),

    constants = require('../constants');

var ActionTypes = constants.ActionTypes;

var LeaderboardStore = Fluxxor.createStore({
  initialize: function() {
    this.leaderboard = [];

    this.bindActions(ActionTypes.RECEIVE_LEADERBOARD, this.onReceiveLeaderboard);
  },
  onReceiveLeaderboard: function(payload) {
    this.leaderboard = payload;
    this.emit('change');
  },
  getState: function() {
    return this.leaderboard;
  }
});

module.exports = LeaderboardStore;
