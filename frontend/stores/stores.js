var LeaderboardStore = require('./LeaderboardStore'),
    AuthStore = require('./AuthStore'),
    OutputStore = require('./OutputStore'),
    //ElevatorStore = require('./ElevatorStore'),
    GameStateStore = require('./GameStateStore');

module.exports = {
	LeaderboardStore: new LeaderboardStore(),
	AuthStore: new AuthStore(),
	OutputStore: new OutputStore(),
	//ElevatorStore: new ElevatorStore(),
	GameStateStore: new GameStateStore()
};