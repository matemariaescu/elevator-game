'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	fs = require('fs'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')(session),
	http = require('http'),
	io = require('socket.io'),
	passportSocketIo = require('passport.socketio'),
	config = require('./config');

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Require models
	fs.readdirSync(__dirname + '/../models').forEach(function(file) {
	  require(__dirname + '/../models/' + file);
	});

	// Showing stack errors
	app.set('showStackError', true);

	// Bodyparser
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	// Enable jsonp
	app.enable('jsonp callback');

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	var sessionStore = new mongoStore({
		mongooseConnection: db.connection,
		collection: 'sessions',
		autoReconnect: true
	});
	app.use(session({
		secret: config.sessionSecret,
		store: sessionStore,
		resave: true,
    	saveUninitialized: true
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// Use helmet to secure Express headers
	app.use(helmet());

	// Remove Express from HTTP headers
	app.disable('x-powered-by');


	// Setting the app router and static folder
	app.use(express.static(__dirname + '/../../frontend/public'));

	require('../routes')(app);


	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		res.status(500).jsonp({
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).jsonp({
			error: '404'
		});
	});

	// Init socket.io
	app.server = http.createServer(app);
	io = io.listen(app.server);

	io.use(passportSocketIo.authorize({
		cookieParser: cookieParser,
		secret: config.sessionSecret,
		store: sessionStore,        
		success: function(data, accept) {
			console.log('successful connection to socket.io');
			accept();
		},
		fail: function(data, message, error, accept) { 
			if(error) accept(new Error(message));
			console.log('failed connection to socket.io:', message);
    		accept(new Error('not authenticated')); 
		}
	}));

	require('../sockets')(io);

	return app;
};
