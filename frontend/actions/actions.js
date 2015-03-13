var constants = require('../constants');

var ActionTypes = constants.ActionTypes;

module.exports = {
	receiveLeaderboard: function(leaderboard) {
    	this.dispatch(ActionTypes.RECEIVE_LEADERBOARD, leaderboard);
  	},
  	login: function(username, password) {
  		this.dispatch(ActionTypes.LOGIN, {
  			username: username,
  			password: password
  		});
  	},
  	logout: function() {
  		this.dispatch(ActionTypes.LOGOUT, {});
  	}
}