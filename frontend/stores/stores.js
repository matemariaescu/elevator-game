var LeaderboardStore = require('./LeaderboardStore'),
    AuthStore = require('./AuthStore'),
    OutputStore = require('./OutputStore');

module.exports = {
	LeaderboardStore: new LeaderboardStore(),
	AuthStore: new AuthStore(),
	OutputStore: new OutputStore()
};