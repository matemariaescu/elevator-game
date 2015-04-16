'use strict';

function ElevatorState(socket, maxCapacity) {
	this.socket = socket;
	this.maxCapacity = maxCapacity;
	this.currentFloor = 0;
	this.floorQueue = [];
  //this.openedDoors = false;
	this.people = [];
	this.peopleDelivered = 0;
};

ElevatorState.prototype.getData = function() {
	return {
		maxCapacity: this.maxCapacity,
		currentFloor: this.currentFloor,
		floorQueue: this.floorQueue,
		people: this.people,
		peopleDelivered: this.peopleDelivered
	};
};

ElevatorState.prototype.nextFloor = function() {
  //this.openedDoors = false;
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
  //this.openedDoors = true;
	this.people = this.people.concat(people);
};
ElevatorState.prototype.goToFloor = function(floor) {
	this.floorQueue.push(floor);
};

ElevatorState.prototype.getId = function () {
  // elevator id in game; 1 for now
  return 1;
};

ElevatorState.prototype.getFloor = function() {
  return this.currentFloor;
};

ElevatorState.prototype.isDoorOpen = function () {
  return this.openedDoors;
};

ElevatorState.prototype.isOnFloor = function (floor) {
  if (floor == this.currentFloor)
  	return true;
  else return false;
};

module.exports = ElevatorState;
