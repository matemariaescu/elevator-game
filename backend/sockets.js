'use strict';

module.exports = function(io) {

	var data = [
		{id: 0, username: 'Lukas', points: 900},
		{id: 1, username: 'John', points: 1000},
		{id: 2, username: 'Mike', points: 200}
	];

	var id = 3;
	
	io.sockets.on('connection', function(socket) {
		console.log(socket.request.user);
	});

	setInterval(function() {
		data.push({id: id++, username: 'Mike', points: 200});
		if (data.length > 15) data = [];

		io.sockets.emit('leaderboard', data);
	}, 1000);

	
};
