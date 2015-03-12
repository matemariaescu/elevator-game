var constants = require('../constants');

var ActionTypes = constants.ActionTypes;

module.exports = {
	receiveLeaderboard: function(leaderboard) {
    	this.dispatch(ActionTypes.RECEIVE_LEADERBOARD, leaderboard);
  	}
}