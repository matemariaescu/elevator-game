'use strict';


function GameState(game_id, level) {
	this.game_id = game_id;

	this.floors = [];
	for (var floor = 0; floor < level.numFloors; floor++) this.floors.push([]);

	this.people = JSON.parse(JSON.stringify(level.people)); // deep copy

	this.time = 0;

	this.elevators = [];

	this.printer =	Printer.emit ('newState', {gameState : this}).bind(this);
};

GameState.prototype.addElevator = function(elevator) {
	this.elevators.push(elevator);
};

GameState.prototype.getElevators = function () {
    return this.elevators;
};

GameState.prototype.getPeopleOnFloor = function (floor) {

};

GameState.prototype.nextStep = function() {
	this.elevators.forEach(function(elevator) {
		elevator.nextFloor();
	});

	for (var floor = 0; floor < this.floors.length; floor++) {
		var elevators = this.elevators.filter(function(elevator) {
			return elevator.currentFloor === floor && !elevator.isFull();
		});
		if (elevators.length === 0) continue;

		while (this.floors[floor].length !== 0) {
			var p = this.floors[floor].shift();
			var e = Math.floor(Math.random()*elevators.length);
			elevators[e].peopleEnter([p]);
			if (elevators[e].isFull())
				elevators.splice(e, 1); // remove from array
			if (elevators.length === 0) break;
		}
	}

	if (this.people.length > 0) {
		var ps = this.people.shift();
		ps.forEach(function(p) {
			this.floors[p.fromFloor].push(p);
		}.bind(this));
	}

	this.time++;
}

GameState.prototype.done = function() {
	if (this.people.length > 0) return false;
	for (var floor = 0; floor < this.floors.length; floor++) {
		if (this.floors[floor].length > 0) return false;
	}
	for (var e = 0; e < this.elevators.length; e++) {
		if (this.elevators[e].people.length > 0) return false;
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
		elevator.socket.emit('newState', {
			state: this.getData(),
			elevator: elevator.getData()
		});
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
