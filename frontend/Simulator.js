var Flux = require('./Flux'),
    Socket = require('./Socket');

function Simulator(codeObj, level, done) {
	this.codeObj = codeObj;
	this.level = level;
	this.done = done;
	this.isRunning = false;

	this.onStateChangedListener = null;
	this.onGameDoneListener = null;

	this.output = Flux.actions.output;
};

Simulator.prototype._onStateChanged = function(data) {
	this.output(JSON.stringify(data.state, null, 2));

	try {
		data.elevator.goToFloor = function(floor) {
			console.log('emit go to floor');
			Socket.emit('goToFloor', {
				game_id: data.state.game_id,
				floor: floor
			});
		};
		this.codeObj.stateUpdated(data.elevator, data.state);
	} catch(e) {
		this.stop();
		this.output('***Exception***: ' + e);
	}
};
Simulator.prototype.run = function() {
	if (this.isRunning) return;
	this.isRunning = true;
	Socket.emit('startLevel', {
		level: this.level
	});

	this.onStateChangedListener = function(data) {
		this._onStateChanged(data);
	}.bind(this);
	Socket.on('newState', this.onStateChangedListener);

	this.onGameDoneListener = function(data) {
		this.stop(data)
	}.bind(this);
	Socket.on('gameDone', this.onGameDoneListener);
};
Simulator.prototype.stop = function(data) {
	if (!this.isRunning) return;
	Socket.removeListener('newState', this.onStateChangedListener);
	Socket.removeListener('gameDone', this.onGameDoneListener);
	this.isRunning = false;
	this.done(data);
};

module.exports = Simulator;
