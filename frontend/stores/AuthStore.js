
var assign = require('object-assign'),
    constants = require('../constants'),
    EventEmitter = require('events').EventEmitter,
    Dispatcher = require('../Dispatcher');


var ActionTypes = constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _leaderboard = {};

var LeaderboardStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return _leaderboard;
  }

});

LeaderboardStore.dispatchToken = Dispatcher.register(function(action) {

  switch(action.type) {
    case ActionTypes.RECEIVE_LEADERBOARD:
    console.log('received leaderboard');
      _leaderboard = action.leaderboard;
      LeaderboardStore.emitChange();
      break;
  }

});

module.exports = LeaderboardStore;
