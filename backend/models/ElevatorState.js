'use strict';

function ElevatorState(socket, maxCapacity) {
	this.socket = socket;
	this.maxCapacity = maxCapacity;
	this.currentFloor = 0;
	this.floorQueue = [];
	this.people = [];
	this.peopleDelivered = 0;
};

ElevatorState.prototype.nextFloor = function() {
	if (this.floorQueue.length != 0)
		this.currentFloor = this.floorQueue.shift();
	this.people = this.people.filter(function(p) {
		if (p.toFloor == this.currentFloor)
			this.peopleDelivered++;
		return p.toFloor != this.currentFloor;
	}.bind(this));
};
ElevatorState.prototype.isFull = function() {
	return this.maxCapacity === this.people.length;
};
ElevatorState.prototype.peopleEnter = function(people) {
	this.people = this.people.concat(people);
};
ElevatorState.prototype.goToFloor = function(floor) {
	this.floorQueue.push(floor);
};


module.exports = ElevatorState;
