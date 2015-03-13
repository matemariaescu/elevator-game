var LeaderboardStore = require('./LeaderboardStore'),
    AuthStore = require('./AuthStore');

module.exports = {
	LeaderboardStore: new LeaderboardStore(),
	AuthStore: new AuthStore()
};