var Constants = require('./constants'),
    socket = require('socket.io-client');

socket = socket(window.location.origin);

socket.on('connect', function() {
	console.log('connected!!!');
});
socket.on('error', function(err) {
	console.log('cannot connect to socket: ', err);
});

module.exports = socket;