'use strict';

var uuid = require('uuid'),

    levels = require('../data').levels,
    ElevatorState = require('../models/ElevatorState'),
	GameState = require('../models/GameState');

var games = {};

function sendError(socket, message) {
	socket.emit('error', {
		message: message
	});
};

exports.startLevel = function(socket, data) {
	console.log('startLevel:', data);
	var level = levels[data.level];

	var elevator = new ElevatorState(socket, level.maxElevatorCapacity);

	var game_id = uuid.v4();
	var game = new GameState(game_id, level);
	game.addElevator(elevator);

 	games[game_id] = game;

 	console.log('successfully created game:', game_id);
};

exports.nextStep = function() {
	for (var game_id in games) {
		var game = games[game_id];
		if (game.done()) {
			console.log('game done');
			game.publishResults();
			games[game_id] = null; // delete game
			continue;
		}
		game.nextStep();
		game.updateSockets();
	}
};

exports.goToFloor = function(socket, data) {
	var user_id = socket.request.user._id;
	var game_id = data.game_id;
	var floor = data.floor;

	var game = games[game_id];
	if (floor >= game.floors.length) {
		return sendError(socket, 'invalid floor number');
	}

	game.elevators.forEach(function(elevator) {
		if (elevator.socket.request.user._id === user._id)
			elevator.goToFloor(floor);
	});
};