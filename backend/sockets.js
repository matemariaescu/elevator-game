'use strict';

var games = require('./controllers/games');

module.exports = function(io) {
	
	io.sockets.on('connection', function(socket) {
		console.log('connection:');
		console.log(socket.request.user);

		socket.on('startLevel', function(data) {
			games.startLevel(socket, data);
		});
		socket.on('goToFloor', function(data) {
			games.goToFloor(socket, data);
		});
	});

	setInterval(games.nextStep, 1000);



	/*var data = [];
	var id = 0;
	setInterval(function() {
		data.push({id: id++, username: 'Mike', points: 200});
		if (data.length > 15) data = [];

		io.sockets.emit('leaderboard', data);
	}, 1000);*/

	
};
