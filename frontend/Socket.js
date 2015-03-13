var Constants = require('./constants'),
    socket = require('socket.io-client');

socket = socket(window.location.origin);

socket.on('connect', function() {
	console.log('connected!!!');
});

module.exports = socket;