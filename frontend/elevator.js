var constants = require('./constants');

function Elevator(numFloors, output) {
	this.currentFloor = 0;
	this.numFloors = numFloors;
	this.floorQueue = [];
	this.people = [];
	this.output = output;
}

Elevator.prototype.goToFloor = function(floor) {
	if (floor < 0 || floor >= this.numFloors) throw new Error('invalid floor number');
	this.output('add floor ' + floor + ' to elevator queue');
	this.floorQueue.push(floor);
};
Elevator.prototype.nextFloor = function() {
	if (this.floorQueue.length == 0) {
		this.output('floor queue is empty');
	}
	else {
		this.currentFloor = this.floorQueue.shift();
		this.output('elevator goes to floor ' + this.currentFloor);
		this.people = this.people.filter(function(p) {
			if (p.toFloor == this.currentFloor)
				this.output('person ' + p.id + ' leaves the elevator');
			return p.toFloor != this.currentFloor;
		}.bind(this));
	}
	return this.currentFloor;
}
Elevator.prototype.peopleEnter = function(people) {
	console.log(people);
	people.forEach(function(p) {
		this.output('person ' + p.id + ' enters the elevator');
	}.bind(this));
	this.people = this.people.concat(people);
}

module.exports = Elevator;
