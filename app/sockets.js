'use strict';

module.exports = function(io) {

	var data = [
		{name: 'Lukas', points: 900},
		{name: 'John', points: 1000},
		{name: 'Mike', points: 200}
	];
	
	io.sockets.on('connection', function(socket) {
		console.log(socket.request.user);

		setInterval(function() {
			data.push({name: 'Mike', points: 200});

			socket.emit('leaderboard', data);
		}, 1000);
	});

	
};
