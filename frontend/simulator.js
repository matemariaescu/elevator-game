var constants = require('./constants'),
    Elevator = require('./elevator');
    State = require('./state');

function Simulator(codeObj, level, output, done) {
	this.codeObj = codeObj;
	this.levelObj = constants.levels[level];
	this.output = output;
	this.done = done;
	this.isRunning = false;
	this.setIntervalId = null;

	this.state = new State(this.levelObj.numFloors, this.stateUpdated.bind(this));
	this.elevator = new Elevator(this.levelObj.numFloors, output);

	console.log(this.codeObj);
	console.log(this.levelObj);
	this.output('created simulation');
}

Simulator.prototype.stateUpdated = function() {
	this.codeObj.stateUpdated(this.elevator, this.state);
};

Simulator.prototype.nextStep = function() {
	try {
		if (this.levelObj.events.length != 0) {
			var event = this.levelObj.events.shift();
			switch (event.type) {
			case 'PERSON_ARRIVES':
				this.output('person ' + event.id + ' arrives at floor ' + event.fromFloor);
				this.state.personArrives({
					id: event.id,
					fromFloor: event.fromFloor,
					toFloor: event.toFloor
				});
				break;
			}
		}
		var floor = this.elevator.nextFloor();
		var people = this.state.elevatorReachesFloor(floor);
		this.elevator.peopleEnter(people);
	} catch(e) {
		this.stop();
		this.output('***Exception***: ' + e);
	}
};
Simulator.prototype.run = function() {
	if (this.isRunning) return;
	this.isRunning = true;
	this.setIntervalId = setInterval(this.nextStep.bind(this), 1000);
};
Simulator.prototype.stop = function() {
	if (!this.isRunning) return;
	clearInterval(this.setIntervalId);
	this.isRunning = false;
	this.done();
};

module.exports = Simulator;
