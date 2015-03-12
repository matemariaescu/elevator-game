var Constants = require('./constants'),
    socket = require('socket.io-client');

socket = socket(Constants.URL);

socket.on('connect', function() {
	console.log('connected!!!');
});

module.exports = socket;