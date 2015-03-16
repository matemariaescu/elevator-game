'use strict';


function GameState(game_id, level) {
	this.game_id = game_id;

	this.floors = [];
	for (var floor = 0; floor < level.numFloors; floor++) this.floors.push([]);

	this.people = level.people;

	this.time = 0;

	this.elevators = [];
};

GameState.prototype.addElevator = function(elevator) {
	this.elevators.push(elevator);
};

GameState.prototype.nextStep = function() {
	if (this.people.length > 0) return;

	this.elevators.forEach(function(elevator) {
		elevator.nextFloor();
	});

	for (var floor = 0; floor < this.floors.length; floor++) {
		var elevators = this.elevators.filter(function(elevator) {
			return elevator.currentFloor === floor && !elevator.isFull();
		});
		if (elevators.length === 0) continue;

		while (floors[floor].length !== 0) {
			var p = floors[floor].shift();
			var e = Math.random()*elevators.length;
			elavators[e].peopleEnter([p]);
			if (elavators[e].isFull())
				elevators.splice(e, 1); // remove from array
			if (elevators.length === 0) break;
		}
	}

	var p = people.shift();
	this.floors[p.fromFloor].push(p);

	this.time++;
}

GameState.prototype.done = function() {
	if (this.people.length > 0) return false;
	for (var floor = 0; floor < this.floors.length; floor++) {
		if (this.floors[floor].length > 0) return false;
	}
	return true;
};

GameState.prototype.getData = function() {
	return {
		game_id: this.game_id,
		floors: this.floors,
		time: this.time,
		elevators: this.elevators.map(function(e) {return e.getData();})
	};
};

GameState.prototype.updateSockets = function() {
	this.elevators.forEach(function(elevator) {
		elevator.socket.emit('newState', this.getData());
	}.bind(this));
};

GameState.prototype.publishResults = function() {
	var res = {};
	this.elevators.forEach(function(elevator) {
		res[elevator.socket.request.user._id] = elevator.peopleDelivered;
	});
	this.elevators.forEach(function(elevator){
		elevator.socket.emit('gameDone', res);
	});
};

module.exports = GameState;
