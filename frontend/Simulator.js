var constants = require('./constants'),
    Elevator = require('./Elevator'),
    Flux = require('./Flux');

function Simulator(codeObj, level, done) {
	this.codeObj = codeObj;
	this.levelObj = constants.levels[level];
	this.done = done;
	this.isRunning = false;
	this.setIntervalId = null;

	this.output = Flux.actions.output;

	this.time = 0;

	Flux.actions.startNewGame(this.levelObj.numFloors);

	this.elevator = new Elevator(this.levelObj.numFloors);
}

Simulator.prototype.stateUpdated = function() {
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
};
Simulator.prototype.run = function() {
	if (this.isRunning) return;
	this.isRunning = true;
	//Flux.store('GameStateStore').on('change', this.stateUpdated.bind(this));
	this.setIntervalId = setInterval(this.nextStep.bind(this), 1000);
};
Simulator.prototype.stop = function() {
	if (!this.isRunning) return;
	clearInterval(this.setIntervalId);
	//Flux.store('GameStateStore').removeListener('change', this.stateUpdated.bind(this));
	this.isRunning = false;
	this.done();
};

module.exports = Simulator;
