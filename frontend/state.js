var constants = require('./constants');

function State(numFloors, updateCallback) {
	this.numFloors = numFloors;
	this.floors = [];
	for (var i = 0; i < numFloors; i++) {
		this.floors.push([]);
	}
	this.updateCallback = updateCallback;
}
State.prototype.personArrives = function(data) {
	this.floors[data.fromFloor].push(data);
	this.updateCallback();
};
State.prototype.elevatorReachesFloor = function(floor) {
	var res = this.floors[floor];
	this.floors[floor] = [];
	this.updateCallback();
	return res;
};


module.exports = State;
