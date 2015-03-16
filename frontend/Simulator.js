var Elevator = require('./Elevator'),
    Flux = require('./Flux'),
    Socket = require('./Socket');

function Simulator(codeObj, level, done) {
	this.codeObj = codeObj;
	this.level = level;
	this.done = done;
	this.isRunning = false;

	this.onStateChangedListener = null;

	this.output = Flux.actions.output;
};

/*Simulator.prototype.stateUpdated = function() {
	this.codeObj.stateUpdated(this.elevator, Flux.store('GameStateStore').getState());
};

Simulator.prototype.nextStep = function() {
	this.output('----- time: ' + this.time + ' -----');
	try {
		if (this.levelObj.events.length != 0) {
			var events = this.levelObj.events.shift();
			for (var i = 0; i < events.length; i++) {
				var event = events[i];
				switch (event.type) {
				case 'PERSON_ARRIVES':
					this.output('person ' + event.id + ' arrives at floor ' + event.fromFloor);
					Flux.actions.personArrives({
						id: event.id,
						fromFloor: event.fromFloor,
						toFloor: event.toFloor
					});
					break;
				}
			}
		}
		var floor = this.elevator.nextFloor();
		var people = this.state.elevatorReachesFloor(floor, this.elevator);
		this.elevator.peopleEnter(people);

		this.codeObj.stateUpdated(this.elevator, Flux.store('GameStateStore').getState());

		this.time++;
	} catch(e) {
		this.stop();
		this.output('***Exception***: ' + e);
	}
};*/
Simulator.prototype._onStateChanged = function(state) {
	this.output(JSON.stringify(state));
	//Flux.actions.output(JSON.stringify(state));
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
};
Simulator.prototype.stop = function() {
	if (!this.isRunning) return;
	Socket.removeListener('newState', this.onStateChangedListener);
	this.isRunning = false;
	this.done();
};

module.exports = Simulator;
